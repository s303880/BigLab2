class FILMS {
  constructor(db) {
    this.db = db;
  }

  getFilms(user) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE user = ?";
      this.db.all(sql, [user], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows !== undefined) {
          const films = rows.map((r) => ({
            id: r.id,
            title: r.title,
            favorite: r.favorite,
            watchDate: r.watchdate,
            rating: r.rating,
            user: r.user,
          }));
          resolve(films);
        } else {
          const films = "";
          resolve(films);
        }
      });
    });
  }

  getFavoriteFilms(user) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE films.favorite = 1 AND user = ?";
      this.db.all(sql, [user], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows !== undefined) {
          const films = rows.map((r) => ({
            id: r.id,
            title: r.title,
            favorite: r.favorite,
            watchDate: r.watchdate,
            rating: r.rating,
            user: r.user,
          }));
          resolve(films);
        } else {
          const films = "";
          resolve(films);
        }
      });
    });
  }

  getBestRatedFilms(user) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE films.rating = 5 AND user = ?";
      this.db.all(sql, [user], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows !== undefined) {
          const films = rows.map((r) => ({
            id: r.id,
            title: r.title,
            favorite: r.favorite,
            watchDate: r.watchdate,
            rating: r.rating,
            user: r.user,
          }));
          resolve(films);
        } else {
          const films = "";
          resolve(films);
        }
      });
    });
  }

  getFilmById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE films.id = ?";
      this.db.all(sql, [id], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows.length) {
          const films = rows.map((r) => ({
            id: r.id,
            title: r.title,
            favorite: r.favorite,
            watchDate: r.watchdate,
            rating: r.rating,
            user: r.user,
          }));
          resolve(films[0]);
        } else {
          reject("film not found");
        }
      });
    });
  }

  addFilm(title, favorite, watchdate, rating, user) {
    console.log("film dao -> addFilm");
    const sql =
      "INSERT INTO films (title, favorite, watchdate, rating, user) VALUES (?,?,?,?,?)";
    const list = [title, favorite, watchdate, rating, user];
    return new Promise((resolve, reject) => {
      this.db.run(sql, list, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  updateFilm(id, title, favorite, watchdate, rating) {
    console.log("film dao -> updateFilm");
    const sql =
      "UPDATE films SET title=?, favorite=?, watchDate=?, rating=? WHERE id=?";
    const list = [title, favorite, watchdate, rating, id];
    return new Promise((resolve, reject) => {
      this.db.run(sql, list, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }

  async markFavorite(id) {
    console.log("film dao -> markFavorite");
    let favorite = 0;
    let result = await this.getFilmById(id);
    if (!result.favorite) {
      favorite = 1;
    }
    const sql =
      "UPDATE films SET favorite=? WHERE id=?";
    const list = [favorite, id];
    return new Promise((resolve, reject) => {
      this.db.run(sql, list, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }

  deleteFilm(id) {
    console.log("film dao -> deleteFilm");
    const sql =
      "DELETE FROM films WHERE id=?";
    return new Promise((resolve, reject) => {
      this.db.run(sql, [id], function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }
}

module.exports = FILMS;
