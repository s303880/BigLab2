import { Table } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"
import FilmRow from "./FilmRow"
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";

function FilmTable(props) {

  const navigate = useNavigate(); 


  
  const lib = props.lib;
 
  return (<div>
    <h1>All movies</h1>
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Favorite</th>
          <th>Date watched</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {lib.map((f) => { return <FilmRow key={f.id} film={f} films={lib} removeFilm={props.removeFilm} toggleFavorite={props.toggleFavorite} changeRating={props.changeRating} /> })}
      </tbody>
    </Table>
   
    <Button onClick={() => navigate('/addForm')}><Plus/></Button> {' '}
  </div>
  )
}

export default FilmTable;


