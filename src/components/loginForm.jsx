import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { login } from '../services/authService';

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

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await login(data.email, data.password);
            this.props.history.push('/')
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors}
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
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