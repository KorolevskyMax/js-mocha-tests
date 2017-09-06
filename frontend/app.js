import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Signup from './src/signup';
import Login from './src/login';
import {Tabs, Tab} from 'material-ui';

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();



class Menu extends React.Component {
    state = { value: 'signup'};

    componentDidMount = () => {
        let route = window.location.href.split("/")[3];
        this.setState({value: route === undefined ? 'signup' : route});
    };

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Login" value="login" data-route="/login" value="login">
                    <br/>
                    <br/>
                    <br/>
                    <Login />
                </Tab>
                <Tab label="Register" value="signup" data-route="/signup" value="signup">
                    <br/>
                    <br/>
                    <br/>
                    <Signup />
                </Tab>
            </Tabs>
        )
    }
}

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Menu/>
            </MuiThemeProvider>
        )
    }
}
