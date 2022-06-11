
import { Film } from './Model/FilmLibrary';

const APIURL = 'http://localhost:3001'

async function getFilms(user){
    const url = APIURL + `/films/${user}`
    
    try{
        const res = await fetch(url, {
            credentials: 'include'
        });
        if(res.ok){
            const filmjson = await res.json();
            
            const list = filmjson.map((f)=>{
                if(f.favorite === 1){
                    return new Film(f.id, f.title, true, f.watchDate, f.rating)
                } else {
                    return new Film(f.id, f.title, false, f.watchDate, f.rating)
                }})
            return list;
        } else {
            const text = await res.text();
            throw new TypeError(text)
        }
        
    }catch(ex){
        throw ex
    }
    
   
}

async function getFavorites(user){

    const url = APIURL + `/films/favorites/${user}`
    
    try{
        const res = await fetch(url,{
            credentials: 'include'
        });
        if(res.ok){
            const filmjson = await res.json();
            
            const list = filmjson.map((f)=>{
                    return new Film(f.id, f.title, true, f.watchDate, f.rating)})
            return list;
        } else {
            const text = await res.text();
            throw new TypeError(text)
        }
        
    }catch(ex){
        throw ex
    }
    
   
}


async function getBestRated(user){

    const url = APIURL + `/films/best-rated/${user}`
    
    try{
        const res = await fetch(url,{
            credentials: 'include'
        });
        if(res.ok){
            const filmjson = await res.json();
            
            const list = filmjson.map((f)=>{
                if(f.favorite === 1){
                    return new Film(f.id, f.title, true, f.watchDate, f.rating)
                } else {
                    return new Film(f.id, f.title, false, f.watchDate, f.rating)
                }})
            return list;
        } else {
            const text = await res.text();
            throw new TypeError(text)
        }
        
    }catch(ex){
        throw ex
    }
    
   
}


async function getRecentlyWatched(user){

    const url = APIURL + `/films/seen-last-month/${user}`
    
    try{
        const res = await fetch(url, {
            credentials: 'include'
        });
        if(res.ok){
            const filmjson = await res.json();
            
            const list = filmjson.map((f)=>{
                if(f.favorite === 1){
                    return new Film(f.id, f.title, true, f.watchDate, f.rating)
                } else {
                    return new Film(f.id, f.title, false, f.watchDate, f.rating)
                }})
            return list;
        } else {
            const text = await res.text();
            throw new TypeError(text)
        }
        
    }catch(ex){
        throw ex
    }
    
   
}

async function getUnseen(user){

    const url = APIURL + `/films/unseen/${user}`
    
    try{
        const res = await fetch(url, {
            credentials: 'include'
        });
        if(res.ok){
            const filmjson = await res.json();
            
            const list = filmjson.map((f)=>{
                return new Film(f.id, f.title, false, f.watchDate, f.rating)})
            return list;
        } else {
            const text = await res.text();
            throw new TypeError(text)
        }
        
    }catch(ex){
        throw ex
    }
}
    

    async function addFilm(film) {
        const url = APIURL + '/film';
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(film),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                return true;
            } else {
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (ex) {
            throw ex;
        }
    }


    async function editFilm(film) {
        const url = APIURL + `/film/${film.id}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(film),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                return true;
            } else {
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (ex) {
            throw ex;
        }
    }

    async function markFavorite(id){
        const url = APIURL + `/films/${id}/favorite`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                return true;
            } else {
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (ex) {
            throw ex;
        }
    }

    async function deleteFilm(id) {
        const url = APIURL+ `/films/${id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(response.ok) {
                return true;
            } else {
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch(ex) {
            throw ex;
        }
    }

    const logIn = async (credentials) => {
        const response = await fetch(APIURL + '/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(credentials),
        });
        if(response.ok) {
          const user = await response.json();
          return user;
        }
        else {
          const errDetails = await response.text();
          throw errDetails;
        }
      };
      
      const getUserInfo = async () => {
        const response = await fetch(APIURL + '/api/sessions/current', {
          credentials: 'include',
        });
        const user = await response.json();
        if (response.ok) {
          return user;
        } else {
          throw user;  // an object with the error coming from the server
        }
      };
      
      const logOut = async() => {
        const response = await fetch(APIURL + '/api/sessions/current', {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok)
          return null;
      }
      


export {getFilms, getFavorites, getBestRated, getRecentlyWatched, getUnseen, addFilm, editFilm, markFavorite, deleteFilm, logIn, getUserInfo, logOut};