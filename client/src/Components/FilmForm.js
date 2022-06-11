import { useState } from "react";
import dayjs from "dayjs";
import {Film} from '../Model/FilmLibrary'
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";



function FilmForm(props) {

    const navigate = useNavigate();
    const location = useLocation();

    
    const defaultCode = '';
    const [id, setId] = useState(location.state !== null ? location.state.id : defaultCode);
    const [title, setTitle] = useState(location.state !== null ? location.state.title : defaultCode);
    const [favorite, setFavorite] = useState(location.state !== null ? location.state.favorite : false);
    const [rating, setRating] = useState(location.state !== null ? location.state.rating : 0);
    const [watchDate, setWatchDate] = useState(location.state !== null ? (location.state.watchDate !== '' ? location.state.watchDate : defaultCode) : defaultCode);
    
  
    
    const handleSubmit = (event) => {
        
        event.preventDefault();
        

        if(props.editing===true){
                props.editFilm(new Film(id, title, favorite, dayjs(watchDate), Number(rating)))
            }  else {
                    if(props.lib.filter((f)=>f.id==id).length == 0){
                        if(watchDate === '' ){
                            props.addFilm({title: title, favorite: favorite, watchDate: watchDate, rating: Number(rating), user:props.user.ID})
                        } else {
                            
                            props.addFilm({title: title, favorite: favorite, watchDate: dayjs(watchDate), rating: Number(rating), user:props.user.ID})
                        }
                        
                    } else {
                        alert("l'id inserito esiste già");
                        document.getElementById("id").focus()
                        return false
                    }
        }

        navigate('/');
    }

    

    return (
        
    
        <div style={{ borderColor: 'grey', borderWidth: 2, borderStyle: 'dotted', padding: 10 }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' >
                    <Form.Label>Film id</Form.Label>
                    <Form.Control id='id' type='text' value={id} required={true} placeholder="Film id" disabled={true} onChange={(event) => { setId(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={title} required={true} onChange={(event) => { setTitle(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Rating   </Form.Label>
                    <Form.Control type='number' value={rating} required={true} min={0} max={5} onChange={(event) => { setRating(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>watch Date</Form.Label>
                    <Form.Control type='date' value={watchDate} onChange={(event) => { setWatchDate(event.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check checked={favorite} type="checkbox" value={favorite} label="Favorite" onChange={(event) => { setFavorite(!favorite) }} />
                </Form.Group>
                <div align='right'>
                    <Button variant='outline-secondary' onClick={() => navigate('/')}>Cancel</Button>
                    <Button type='submit' variant='outline-success'>Save</Button>
                </div>
            </Form></div>

    )

}

export default FilmForm;