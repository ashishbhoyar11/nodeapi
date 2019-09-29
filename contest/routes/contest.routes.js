module.exports = (app) => {

const contests=require('../controller/contest.controller.js');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // callback(null, "./images");
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({storage: storage});

    app.post('/create_contest',upload.single('image'),contests.create);
    app.get('/get_contest/:userId',contests.contestData);
    app.delete('/delete_contest/:contestId', contests.contestDelete);
    app.get('/get_single_contest/:contestId', contests.contestSingle);
    app.post('/update_contest/:contestId',upload.single('image'), contests.updateContest);
    app.post('/get_friends_contest', contests.friendsContest);

    app.post('/get_friends_contest_comments', contests.friendsContestComments);
}

