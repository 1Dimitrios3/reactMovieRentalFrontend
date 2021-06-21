import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from '../common/input';
import Select from '../common/select';

class Form extends Component {

    state = { 
        data : {},
        errors : {}
     }

     validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.data, this.schema, options)
        if(!error) return null;

        const errors = {};
        for (let item of error.details) { 
            errors[item.path[0]] = item.message;
        };

        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name]}
        const { error } = Joi.validate(obj, schema);
        // return error ? error.details[0].message : null;
        if(!error) return null;
        if([name] == 'password') return "Password must contain at least a letter, a number, a special character and be minimum 8 characters!"
        else return error.details[0].message;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // if we dont have any errors the const variable is set to null
        const errors = this.validate();
        
        // that is why we implement the conditional || in setState to always provide a value for errors object

        this.setState({ errors: errors || {} });  

        if(errors) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        // validate field on change
        const errors = {...this.state.errors};
        const errorMsg = this.validateProperty(input);
        if(errorMsg) errors[input.name] = errorMsg;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors})
    };

    renderButton(label) {
        return  (           
        <button 
        disabled={this.validate()}
        className="btn btn-primary">{label}
        </button>
        )
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select 
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
            />
        )
    }

    renderInput(name, label, type = 'text') {
        const { data, errors } = this.state;
        return (
        <Input 
              name={name}
              type={type}
              label={label}
              value={data[name]}
              onChange={this.handleChange}
              error={errors[name]}
              />
        );
    }

}
 
export default Form;