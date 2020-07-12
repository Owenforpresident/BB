import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated  }) => {
  
    const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = formData;
   
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };
  
  
   if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  
  return (
    <Form style={{ marginTop: "6%"}} onSubmit={e => onSubmit(e)} >
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input    type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="password" value= {password} onChange={e => onChange(e)} />
      </FormGroup>
    
    
      <Button classname="mt-3" type='submit' value='Login' >Submit</Button>
    </Form>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);