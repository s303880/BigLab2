import { Heart, HeartFill, Star, StarFill, Trash3, Pencil} from 'react-bootstrap-icons';
import  {Button} from 'react-bootstrap';
import {Film} from '../Model/FilmLibrary' 
import { useNavigate } from "react-router-dom";

function FilmRow(props) {



  return (

    <tr>
      <FData f={props.film} fav={props.toggleFavorite} rating={props.changeRating} />
      <FAction film={props.film} removeFilm={props.removeFilm} editFilm={props.editFilm} />
    </tr>

  )
}

function FData(props) {

 
  let stars = []
  for (let n = 0; n < props.f.rating; ++n) {
    stars.push(n);
  }

  if (stars.length < 5) {
    for (let j = stars.length; j < 5; ++j) {
      stars.push(-j-1);
    }
  }



  return (<>

    {
      props.f.favorite && <td  class="favorite-title">{props.f.title}</td>
    }
    {
      props.f.favorite && <td class="heart-field"><HeartFill onClick={()=>props.fav(props.f.id)} /></td>
    }

    {
      !props.f.favorite && <td>{props.f.title}</td>
    }
    {
      !props.f.favorite && <td class="heart-field"><Heart onClick={()=>props.fav(props.f.id)} /></td>
    }

    <td>{props.f._formatWatchDate('DD-MM-YYYY') || "unseen"}</td>


    <td class="rating-field">
      {stars.map((s) => {
        if (s >= 0) {
          
          return <StarFill key={s} onClick={()=>{
            if(s+1 != props.f.rating){
            props.rating(new Film(props.f.id, props.f.title, props.f.favorite, props.f.watchDate, s+1))}}}/>
        } else {
          return <Star key={s} onClick={()=>{
            if(s*-1 != props.f.rating){
            props.rating(new Film(props.f.id, props.f.title, props.f.favorite, props.f.watchDate, s*-1))}}}/>
        }
      })}
    </td>







  </>)
}

function FAction(props) {
  const navigate = useNavigate()
  return (
    <td class="actions-field">
    <Button variant="outline-warning" onClick={() => navigate('/editForm', {state: {id:props.film.id, title:props.film.title, favorite:props.film.favorite, watchDate:props.film.watchDate !== null ? props.film.watchDate.format('YYYY-MM-DD') : '', rating:props.film.rating}})}><Pencil/></Button> 
    &nbsp;&nbsp;
    <Button variant="outline-danger" onClick={() => props.removeFilm(props.film.id)}><Trash3/></Button>
  </td>)
}


export default FilmRow;