import MyNavbar from './MyNavbar';
import {Outlet} from 'react-router-dom';

function Layout(props){

    return(
      <div>
      <MyNavbar handleLogout={props.handleLogout} loggedIn={props.loggedIn}></MyNavbar>
      <Outlet/>
      </div>
    )
  };


  export default Layout;