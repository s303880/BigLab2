const express = require("express");
const FILMS = require("../modules/Filmdao");
const users = require("../modules/Userdao");
const db = require("../modules/DB");
const dayjs = require("dayjs");
const app = require("../server");


const filmRouter = express.Router();
const filmDao = new FILMS(db.db);
const userDAO = new users(db.db);


const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
};

filmRouter.get("/films/:user", isLoggedIn, async (req, res) => {
  if(Object.keys(req.params).length === 0){
    return res.status(422).json({ err: "invalid body" });
  }

  let x;
  try {
    x = await filmDao.getFilms(req.params.user);
  } catch (err) {
    console.log(err);
    return res.status(503).json({ err: "generic error" });
  }

  return res.status(200).json(x);
});

filmRouter.get("/films/favorites/:user", isLoggedIn, async (req, res) => {
  if(Object.keys(req.params).length === 0){
    return res.status(422).json({ err: "invalid body" });
  }
  let x;
  try {
    x = await filmDao.getFavoriteFilms(req.params.user);
  } catch (err) {
    console.log(err);
    return res.status(503).json({ err: "generic error" });
  }

  return res.status(200).json(x);
});

filmRouter.get("/films/best-rated/:user", isLoggedIn, async (req, res) => {
  if(Object.keys(req.params).length === 0){
    return res.status(422).json({ err: "invalid body" });
  }
  let x;
  try {
    x = await filmDao.getBestRatedFilms(req.params.user);
  } catch (err) {
    console.log(err);
    return res.status(503).json({ err: "generic error" });
  }

  return res.status(200).json(x);
});

filmRouter.get("/films/seen-last-month/:user", isLoggedIn, async (req, res) => {
  if(Object.keys(req.params).length === 0){
    return res.status(422).json({ err: "invalid body" });
  }
  let x, seenLastMonth;
  try {
    x = await filmDao.getFilms(req.params.user);
    seenLastMonth = x.filter((elem) => {
      if (elem.watchDate === null || elem.watchDate === '') return false;
      date = dayjs(elem.watchDate);
      currentDate = dayjs();
      const days = currentDate.diff(date) / (1000*60*60*24)
      if (days > 30) return false;
      else return true;
    });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ err: "generic error" });
  }

  return res.status(200).json(seenLastMonth);
});

filmRouter.get("/films/unseen/:user", isLoggedIn, async (req, res) => {
  if(Object.keys(req.params).length === 0){
    return res.status(422).json({ err: "invalid body" });
  }
  let x, unseen;
  try {
    x = await filmDao.getFilms(req.params.user);
    unseen = x.filter((elem) => {
      if (elem.watchDate === null || elem.watchDate === '') return true;
      else return false;
    });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ err: "generic error" });
  }

  return res.status(200).json(unseen);
});

filmRouter.get("/films/:id", isLoggedIn, async (req, res) => {
  let id = Number(req.params.id);
  let x;
  try {
    x = await filmDao.getFilmById(id);
  } catch (err) {
    console.log(err);
    return res.status(503).json({ err: "generic error" });
  }

  return res.status(200).json(x);
});

filmRouter.post("/film", isLoggedIn, async (req, res) => {
  console.log("film api -> createFilm");
  //data validation

  if (
    req.body.title === undefined ||
    req.body.favorite === undefined ||
    req.body.watchDate === undefined ||
    req.body.rating === undefined  || req.body.user === undefined
  ) {
  
    return res.status(422).json({ error: "body validation error" });
  }
  //empty body
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({ error: "empty body" });
  }
  let title = req.body.title;
  let favorite = Number(req.body.favorite);
  let watchDate = req.body.watchDate;
  if(watchDate !== ''){
    watchDate = dayjs(req.body.watchDate).format("YYYY-MM-DD")  
  }
  let rating = Number(req.body.rating);
  let user = Number(req.body.user);

  try {
    const userFound = await userDAO
      .getById(user)
      .then((value) => {
        const addFilm = filmDao
          .addFilm(title, favorite, watchDate, rating, user)
          .then((id) => {
            return res
              .status(201)
              .json({ message: `film added with id: ${id}` });
          });
      })
      .catch(() => {
        return res.status(404).json({ error: "user not found" });
      });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: "generic error" });
  }
});

filmRouter.put("/film/:id", isLoggedIn, async (req, res) => {
  console.log("film api -> editFilm");
  //data validation
  if (
    req.params.id === undefined ||
    req.body.title === undefined ||
    req.body.favorite === undefined ||
    req.body.watchDate === undefined ||
    req.body.rating === undefined
  ) {
    return res.status(422).json({ error: "request validation error" });
  }
  //empty body
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({ error: "empty body" });
  }

  let filmId = Number(req.params.id);
  let title = req.body.title;
  let favorite = Number(req.body.favorite);
  let watchDate;
  if(req.body.watchDate !== null){
    watchDate = dayjs(req.body.watchDate).format("YYYY-MM-DD")
  } else {
    watchDate = req.body.watchDate;
  }
  
  let rating = Number(req.body.rating);
  if (
    filmId <= 0 ||
    rating <= 0 ||
    rating > 5 ||
    title === "" ||
    favorite < 0 ||
    favorite > 1 
  ) {
    return res.status(422).json({ error: "invalid data" });
  }
  try {
    const exist = await filmDao.getFilmById(filmId).then(() => {
      const update = filmDao
        .updateFilm(filmId, title, favorite, watchDate, rating)
        .then(() => {
          return res.status(202).json({ message: "film updated" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ error: "error during the updating" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).json({ error: "film not found" });
        });
    });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: "general error" });
  }
});

filmRouter.put("/films/:id/favorite", isLoggedIn, async (req, res) => {
  console.log("film api -> mark favorite");
  const filmId = req.params.id;
  try {
    const exist = await filmDao.getFilmById(filmId).then(() => {
      const update = filmDao
        .markFavorite(filmId)
        .then(() => {
          return res.status(202).json({ message: "changed favorite state" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ error: "error: mark favorite" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).json({ error: "film not found" });
        });
    });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: "general error" });
  }
});

filmRouter.delete("/films/:id", isLoggedIn, async (req, res) => {
  console.log("film api -> delete");
  const filmId = req.params.id;
  try {
    const exist = await filmDao.getFilmById(filmId)
    .then(async () => {
      const del = await filmDao.deleteFilm(filmId).then(() => {
        return res.status(204).json({ message: "successfully deleted" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: "error: deletion" });
      })
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ error: "film not found" });
    });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: "general error" });
  }
});


module.exports = filmRouter;
