const Contest=require('../models/contest.model.js');
var fs = require('fs');

// Create and Save a new Note
exports.create = (req, res) => {

    console.log(req.file);
  if(!req.file) {
    return res.status(500).send({
        message: "Image not Uploaded"
    });
  }
    
    // Validate request
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Contest content can not be empty"
        });
    }


    // Create a Note
    const contest = new Contest({
        title: req.body.title, 
        description: req.body.content,
        date: req.body.date,
        image: req.file.filename,
        userId:req.body.userid
    });

    // Save Contest in the database
    contest.save()
    .then(data => {
        res.send({"status" : true,"message" : "Contest Upload Successfully"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Contest."
        });
    });
};

// Update Contest
exports.updateContest = (req, res) => {

    if(!req.file) {
        var updateData={
            title: req.body.title, 
            description: req.body.content,
            date: req.body.date
        }
    }else{

        var updateData={
            title: req.body.title, 
            description: req.body.content,
            date: req.body.date,
            image: req.file.filename
        }

        
        Contest.findById(req.params.contestId)
        .then(contestData => {
            console.log('file : '+contestData.image);
            fs.unlink('./public/images/'+contestData.image, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            }); 

        }).catch(err => {
            console.log(err);
        });
        
    }
    // Find note and update it with the request body
    Contest.findByIdAndUpdate(req.params.contestId, updateData, {new: true})
    .then(contest => {
        if(!contest) {
            return res.status(404).send({
                message: "contest not found with id " + req.params.contestId
            });
        }
       
        console.log('Contest Image : '+contest.image);

        res.send({status:true,message:"Contest Updated"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contest not found with id " + req.params.contestId
            });                
        }
        return res.status(500).send({
            message: "Error updating contest with id " + req.params.contestId
        });
    });
}    

// All Contest Displayed
exports.contestData = (req, res) => {
    Contest.find({userId: req.params.userId}).sort({_id: -1})
    .then(notes => {
        res.send(JSON.stringify(notes));
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contest."
        });
    });

} 

// Friends Contest ====
exports.friendsContest = (req, res) => {
    //let list = ["5d80d500ffe7223d88774aaa", "5d837e12b0d06d2d782346ea"];
    var friendListId = req.body.strArr;
    console.log(friendListId); // This is an array
    Contest.find({userId: { "$in": friendListId } }).sort({_id: -1})
    .then(notes => {
        res.send(JSON.stringify(notes));
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contest."
        });
    });
}

// Display Single Contest
exports.contestSingle = (req, res) => {

    Contest.findById(req.params.contestId)
    .then(contest => {
        if(!contest) {
            return res.status(404).send({
                message: "Contest not found with id " + req.params.contestId
            });            
        }
        res.send(contest);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contest not found with id " + req.params.contestId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Contest with id " + req.params.contestId
        });
    });

}   

// Delete Contest
exports.contestDelete = (req, res) => {
    Contest.findByIdAndRemove(req.params.contestId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Contest not found with id " + req.params.contestId
            });
        }
        console.log('note : '+note);
        console.log('Filename : '+note.image);
        fs.unlink('./public/images/'+note.image, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 

        res.send({message: "Contest deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Contest not found with id " + req.params.contestId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Contest with id " + req.params.contestId
        });
    });
} 

