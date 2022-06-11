
import { Container, Row, Col, Alert } from 'react-bootstrap';
import MySideBar from './MySideBar';
import FilmTable from './FilmTable';
import {useState, useEffect} from 'react'


function MainPage(props){

    //used to filter
    const [lib, setLib] = useState(props.lib);
    const [errMessage, setErrMessage] = useState('');

    useEffect(()=>{
      if(props.filterFunction !== undefined){
      async function load(){
          try{
            const list = await props.filterFunction(props.user.ID);
          setLib(list)
          }catch(e){
            const err = JSON.parse(e.message);
            setErrMessage(err.error)
          }
        
      }
      load();
    }
    }, [props.filterFunction]);

  
    return(
      
    <Container fluid>
    {errMessage && <Alert onClose={()=>setErrMessage('')} varient='danger' dismissible>{errMessage}</Alert>}
    <Row>
      <Col sm={4} id="left-sidebar">
        <MySideBar/>
      </Col>
      <Col sm={8} id="main-content">
        <FilmTable lib={lib} toggleFavorite={props.toggleFavorite} changeRating={props.changeRating} removeFilm={props.removeFilm}/>
      </Col>
    </Row>

    </Container>
    
    )
}

export default MainPage;