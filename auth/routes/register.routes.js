module.exports = (app) => {

    const register = require('../controller/register.controller.js');

    app.get('/registerUsers', register.registerUsers);
    app.post('/addFriends/:userId', register.addFriends);
}