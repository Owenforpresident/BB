import React, { useState }  from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Jumbotron} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { Redirect } from 'react-router-dom';

const Register = ({register, isAuthenticated}) => {
  const [admin, setAdmin] = useState(false);
  const [formData, setFormData] = useState({
  email: '',
  password: '',
  password2: ''
});




const { email, password, password2} = formData;


const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
  
  

 

const onSubmit = e => {
  e.preventDefault();
  if (password !== password2) {
    console.log('Passwords do not match');
  } else {
     register({ email, password, admin });
  }
};

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }


  return (
      <Container >
          <Jumbotron style={{ marginTop: "2%"}} fluid>
        <h2 className="display-2 text-secondary">Register for access</h2>
      </Jumbotron>
    <Form className= "mt-3" onSubmit={e => onSubmit(e)}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" value ={email} placeholder="Email"  onChange={e => onChange(e)}  required/>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" value= {password} placeholder="password"   onChange={e => onChange(e)}
            minLength='6' />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword2"> Re-enter Password</Label>
        <Input type="password" name="password2" value= {password2} placeholder="re-enter password"   onChange={e => onChange(e)}
            minLength='6'/>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" name= "admin" onClick={() => setAdmin(!admin)} />{' '}
         Admin Account
        </Label>
      </FormGroup>
      <Button type='submit' value= 'Register' className= "mt-3 mb-3">Submit</Button>
    </Form>
    
    </Container>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Register);