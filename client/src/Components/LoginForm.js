import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';

function LoginForm(props) {


  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    //form should already validate but to be sure
    if(password === '' || username === '' || !validateEmail(username)){
      setMessage({text:'Missing password or wrong email format', type:'danger'});
    } else {

      const res = await props.handleLogin(credentials);
  
      if(res === true){
        navigate('/')
      } else {
        setMessage({text:res, type:'danger'});
      }

    }
   
  };

  return (
    <>
      {message && <Alert onClose={()=>setMessage('')} variant={message.type} dismissible>{message.text}</Alert>}
      <br></br>
      <h1 style={{textAlign:'center'}}>Login page</h1>
      <br></br>
      <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId='username'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
            </Form.Group>
          </Col>
        </Row>
        <br></br>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Button variant='success' type="submit">Login</Button>
          </div>
      </Form>
      </Container>

    </>

  )
};


export default LoginForm;