import {Navbar, Container, NavbarBrand, Button} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {Film, PersonFill, Search} from 'react-bootstrap-icons';
import { useNavigate} from "react-router-dom";



function MyNavbar(props){

  const navigate = useNavigate();

    const logOut = async () => {
      await props.handleLogout();
      navigate('/');
    }

    return(
    <Navbar style={{backgroundColor:'#174a27'}}>
        <Container fluid>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavbarBrand onClick={()=>navigate("/")} className="navbartitle" ><Film/>   Film Library</NavbarBrand>
          <NavbarCollapse style={{justifyContent:'center'}}id="navbarSupportedContent">
              
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <Button variant="light" type="submit">
                <Search/>
              </Button>
            </form>
          </NavbarCollapse>
          {
          props.loggedIn &&
          <div onClick={()=>logOut()} className="navbar-text">
            <PersonFill/>
            Logout
          </div>
          }
        </Container>
      </Navbar>
    )
}

export default MyNavbar;