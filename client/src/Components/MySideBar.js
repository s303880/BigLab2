import { ListGroup, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function MySideBar(props) {
    const navigate = useNavigate()


        return (
        <Container class="text-info p-3 mb-2 bg-secondary text-dark">

            <ListGroup as="ul" id="left-sidebar-list">
                <Button variant='success' size="lg" onClick={() => navigate("/")} as="li" active>
                    All
                </Button>
                <Button variant='success' size="lg" onClick={()=>navigate('/favorites')} as="li" >
                    Favorites
                </Button>
                <Button variant='success' size="lg" onClick={() => navigate("/best")} as="li" >
                    Best Rated
                </Button> 
                <Button variant='success' size="lg" onClick={() => navigate("/recent")} as="li" >
                    Seen last month
                </Button>
                <Button variant='success' size="lg" onClick={() => navigate("/unseen")} as="li" >
                    Unseen
                </Button>
            </ListGroup>
        </Container>
    )
}

export default MySideBar;