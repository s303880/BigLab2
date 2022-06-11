import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Alert} from 'react-bootstrap';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import Layout from './Components/Layout';
import MainPage from './Components/MainPage';
import FilmForm from './Components/FilmForm';
import LoginForm from './Components/LoginForm';

import {useEffect, useState} from 'react'
import {getFilms, getFavorites, getBestRated, getRecentlyWatched, getUnseen, addFilm, editFilm, markFavorite, deleteFilm, logIn, logOut, getUserInfo} from './API'



function App() {


  const [films, setFilms] = useState([])

  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState('true');

  async function reload(id) {
    const library = await getFilms(id);
    setFilms(library);
  }

  async function refreshSession(){
    const user = await getUserInfo();
    setUser(user)
    setLoggedIn(true);
  }

  useEffect(() => {
    refreshSession();
    setLoading(false);
  }, []);

  useEffect(()=>{
    reload(user.id);
  }, [loggedIn])
  

  const addFilmcaller = async (film) => {
    try {
      setLoading(true);
      await addFilm(film)
      reload();
      setLoading(false);
    } catch (e) {
      const err = JSON.parse(e.message);
      setErrMessage(err.error)
      setLoading(false)
    }
  }

  const editFilmcaller = async (film) => {
    try {
      setLoading(true);
      await editFilm(film);
      reload();
      setLoading(false);
    } catch (e) {
      const err = JSON.parse(e.message);
      setErrMessage(err.error)
      setLoading(false)
    }
   }

  const toggleFavorite = async (id) => {
    try{
      setLoading(true);
      await markFavorite(id);
      reload();
      setLoading(false);
    }catch(e){
      const err = JSON.parse(e.message);
      setErrMessage(err.error)
      setLoading(false)
    }
  } 

   const removeFilmcaller = async (id) => {
    try {
      setLoading(true);
      await deleteFilm(id);
      reload();
      setLoading(false);
    } catch (e) {
      
      const err = JSON.parse(e.message);
      setErrMessage(err.error)
      setLoading(false)
    }
  }

  const handleLogin = async (credentials) => {
    try{
      const user = await logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      return true;
    }catch(e){
      return e;
    }
  }

 const handleLogout = async() => {
    await logOut();
    setLoggedIn(false);
    setUser('');
    setFilms([]);
 }
  

  if(loading){
    return <>waiting for data</>
  }

  if(errMessage){
      return (<Alert onClose={()=>setErrMessage('')} varient='danger' dismissible>{errMessage}</Alert>)
    }

  return (
          <BrowserRouter>
        <Routes>
          <Route element={<Layout handleLogout={handleLogout} loggedIn={loggedIn}/>}>
              <Route path='/'  element={!loggedIn ? <Navigate replace to ='/login'/> : <MainPage lib={films} user={user} toggleFavorite={toggleFavorite} changeRating={editFilmcaller} removeFilm={removeFilmcaller} filterFunction={getFilms}/>}/>
              <Route path='/login' element={<LoginForm handleLogin={handleLogin}/>}/>
              <Route path ='/addForm' element={!loggedIn ? <Navigate replace to ='/login'/> : <FilmForm lib={films} addFilm={addFilmcaller} user={user}/>}/>
              <Route path ='/editForm' element={!loggedIn ? <Navigate replace to ='/login'/> : <FilmForm lib={films} editFilm={editFilmcaller} editing={true}/>}/>
              <Route path ='/favorites' element={!loggedIn ? <Navigate replace to ='/login'/> : <MainPage lib={films} user={user} toggleFavorite={toggleFavorite} changeRating={editFilmcaller} filterFunction={getFavorites}/>}/>
              <Route path ='/best' element={!loggedIn ? <Navigate replace to ='/login'/> : <MainPage lib={films} user={user} toggleFavorite={toggleFavorite} changeRating={editFilmcaller} filterFunction={getBestRated}/>}/>
              <Route path ='/recent' element={!loggedIn ? <Navigate replace to ='/login'/> : <MainPage lib={films} user={user} toggleFavorite={toggleFavorite} changeRating={editFilmcaller} filterFunction={getRecentlyWatched}/>}/>
              <Route path ='/unseen' element={!loggedIn ? <Navigate replace to ='/login'/> : <MainPage lib={films} user={user}  toggleFavorite={toggleFavorite} changeRating={editFilmcaller} filterFunction={getUnseen}/>}/>
              <Route path='/*' element={<Navigate replace to='/'></Navigate>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
