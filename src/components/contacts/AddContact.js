import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from '../layout/TextInputGroup'; 
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    if (name === '') {
        this.setState({errors: {name: 'Name is required'}});
        return;
    }

    if (email === '') {
        this.setState({errors: {email: 'Email is required'}});
        return;
    }

    if (phone === '') {
        this.setState({errors: {phone: 'Phone is required'}});
        return;
    }

    const newContact = {
        name,
        email,
        phone,
        errors: {}
    };

    const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
      
    dispatch({type: 'ADD_CONTACT', payload: res.data});

    // Clear state
    this.setState({name: '', email: '', phone: ''});

    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                <TextInputGroup
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                 <TextInputGroup
                    name="phone"
                    label="Phone"
                    type="tel"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
