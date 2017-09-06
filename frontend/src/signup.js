import React from 'react'
import Promise from 'bluebird'
import update from 'immutability-helper'
import validator from 'validator'
import {validated} from 'react-custom-validation'
import {RaisedButton} from "material-ui";
import style from './style'
import api from './../business_logic'

class App extends React.Component {
    state = {
        fields: {
            email: '',
            password: '',
            retypePassword: ''
        },
        validations: {
            formError: '',
            formSuccess: '',
        }
    }

    fieldChange = (field, value) => {
        this.setState(update(this.state, {fields: {[field]: {$set: value}}}))
    }

    handleRequest = () => {
        let self = this
        api.register(this.state.fields.email, this.state.fields.password, this.state.fields.retypePassword, function(resp) {
            console.log(resp)
            if (resp.error === undefined) {
                self.setState(update(self.state, {validations: {['formError']: {$set: ""}}}))
                self.setState(update(self.state, {validations: {['formSuccess']: {$set: "Thanks for registering, dear User!"}}}))
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

const isEmail = (email) =>
    validator.isEmail(email) ? null : 'This is not a valid email.'

const minLength = (password, length) =>
    password.length >= length ? null : 'Password is too short.'

const areSame = (password, rePassword) =>
    password === rePassword ? null : 'Passwords are not equal.'

function validationConfig(props) {
    const {email, password, retypePassword} = props.fields

    return {
        fields: ['email', 'password', 'retypePassword'],

        validations: {
            email: [
                [isRequired, email],
                [isEmail, email]
            ],
            password: [
                [isRequired, password],
                [minLength, password, 6]
            ],
            retypePassword: {
                rules: [
                    [isRequired, password],
                    [areSame, password, retypePassword]
                ],
                fields: ['password', 'retypePassword']
            }
        },
    }
}

class Form extends React.Component {
    render() {
        const {fields, validations, onChange, onValid, onInvalid, $field, $validation} = this.props
        return (
            <form className={style}>
                <h1>Please, register</h1>
                <label>Email</label>
                {$validation.email.show && <span name="signup-email-validation">{$validation.email.error.reason}</span>}
                <input name="signup-email" type="text" value={fields.email}
                       {...$field('email', (e) => onChange('email', e.target.value))}/>

                <label>Password</label>
                {$validation.password.show && <span name="signup-password-validation">{$validation.password.error.reason}</span>}
                <input name="signup-password" type="password" value={fields.password}
                       {...$field('password', (e) => onChange('password', e.target.value))}/>

                <label>Repeat password</label>
                {$validation.retypePassword.show && <span name="signup-repassword-validation">{$validation.retypePassword.error.reason}</span>}
                <input name="signup-repassword" type="password" value={fields.retypePassword}
                       {...$field('retypePassword', (e) => onChange('retypePassword', e.target.value))}/>
                <span name="signup-error">{validations.formError}</span>
                <span className="success" name="signup-success">{validations.formSuccess}</span>
                <br />
                <RaisedButton
                    label="Sign Up"
                    name="signup"
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
