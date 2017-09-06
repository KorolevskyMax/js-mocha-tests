const faker = require('faker');
const api = require('../../frontend/business_logic/api');

generateUser = (passwordMatch = true, withDate = false) => {
    let pass = faker.name.findName();
    let user = {
        email: faker.internet.email(),
        password: pass,
        retypePassword: passwordMatch ? pass : faker.name.findName(),
    };
    if (withDate) {
        let today = new Date();
        user.created = user.modified = today;
    }
    return user;
};

registerUser = (user) => {
    api.register(user.email, user.password, user.retypePassword, async (resp) => {
        return resp.response
    });
};

loginUser = (user) => {
    api.login(user.email, user.password, async (resp) => {
        return resp.response
    });
};

module.exports = {
    generateUser,
    registerUser,
    loginUser
};
