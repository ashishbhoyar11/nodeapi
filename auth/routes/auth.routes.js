module.exports = (app) => {
    const register = require('../controller/register.controller.js');
    const login = require('../controller/login.controller.js');

    app.post('/register', register.registerCreate);
    app.post('/login', login.loginUser);
    

}    