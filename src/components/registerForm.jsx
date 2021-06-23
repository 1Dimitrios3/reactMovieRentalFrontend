import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import * as userService from '../services/userService';

class RegisterForm extends Form {
    state = { 
        data: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        errors: {}
     };

     schema = {
        firstName: Joi.string().required().min(3).label('Fist Name'),
        lastName: Joi.string().required().min(3).label('Last Name'),
        email: Joi.string().email().required().max(256).label('Email'),
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).label('Password')
    }

    doSubmit = async () => {
        try {
            await userService.register(this.state.data)
            this.props.history.push('/login');

        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() { 
        return <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('firstName', 'First Name')}
                {this.renderInput('lastName', 'Last Name')}
                {this.renderInput('email', 'Email', 'email')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderButton('Register')}
            </form>
        </div>
    }
}
 
export default RegisterForm;