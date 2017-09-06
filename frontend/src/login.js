import React from 'react'
import update from 'immutability-helper'
import style from './style'
import {validated} from 'react-custom-validation'
import api from './../business_logic'
import {RaisedButton} from "material-ui";

class App extends React.Component {
    state = {
        fields: {
            email: '',
            password: '',
        },
        validations: {
            formError: '',
            formSuccess: ''
        }
    }

    fieldChange = (field, value) => {
        this.setState(update(this.state, {fields: {[field]: {$set: value}}}))
    }

    handleRequest = () => {
        let self = this
        api.login(this.state.fields.email, this.state.fields.password, function (resp) {
            console.log(resp)
            if (resp.error === undefined) {
                self.setState(update(self.state, {validations: {['formError']: {$set: ""}}}))
                self.setState(update(self.state, {validations: {['formSuccess']: {$set: "Thanks for logging in, dear User!"}}}))
            }
            else {
                self.setState(update(self.state, {validations: {['formSuccess']: {$set: ""}}}))
                self.setState(update(self.state, {validations: {['formError']: {$set: resp.error}}}))
            }
        })
    }


    render() {
        return (<Form
            fields={this.state.fields}
            validations={this.state.validations}
            onChange={this.fieldChange}
            onValid={() => this.handleRequest()} // eslint-disable-line no-alert
            onInvalid={() => {
                this.setState(update(this.state, {validations: {['formError']: {$set: "Error!"}}}))
                this.setState(update(this.state, {validations: {['formSuccess']: {$set: ""}}}))
            }} // eslint-disable-line no-alert
        />)
    }
}

const isRequired = (field) =>
    field ? null : 'This field is required.'

function validationConfig(props) {
    const {email, password} = props.fields

    return {
        fields: ['email', 'password'],

        validations: {
            email: [[isRequired, email]],
            password: [[isRequired, password,]],
        },
    }
}

class Form extends React.Component {
    render() {
        const {fields, validations, onChange, onValid, onInvalid, $field, $validation} = this.props
        return (
            <form className={style}>
                <h1>Hello, User</h1>
                <label>Email</label>
                {$validation.email.show && <span name="email-validation">{$validation.email.error.reason}</span>}
                <input name="email" type="text" value={fields.email}
                       {...$field('email', (e) => onChange('email', e.target.value))}/>

                <label>Password</label>
                {$validation.password.show &&
                <span name="password-validation">{$validation.password.error.reason}</span>}
                <input name="password" type="password" value={fields.password}
                       {...$field('password', (e) => onChange('password', e.target.value))}/>
                <span name="login-error">{validations.formError}</span>
                <span className="success" name="login-success">{validations.formSuccess}</span>
                <br />
                <RaisedButton
                    label="Log In"
                    name="login"
                    onClick={(e) => {
                        e.preventDefault()
                        this.props.$submit(onValid, onInvalid)
                    }}
                />
            </form>
        )
    }
}

Form = validated(validationConfig)(Form)

export default () => <App/>
