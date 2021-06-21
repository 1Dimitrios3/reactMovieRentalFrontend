import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class LoginForm extends Form {
    state = {
        data: {
            email: '',
            password: ''
        },
        errors: {}
    };

    schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = () => {
        // Call the server
        console.log('Submitted!')
    };

    render() { 
        // const { data, errors } = this.state;

        return <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
             {this.renderInput('email', 'Email')}
             {this.renderInput('password', 'Password', 'password')}
              {this.renderButton('Login')}
            </form>
        </div>;
    }
}
 
export default LoginForm;