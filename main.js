var express = require('express')
var app = express()
var cors = require('cors')
  , assert = require('assert');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer  = require('multer')
var upload = multer({ dest: 'app/img/' })
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/social_db';
mongoose.connect(url);
var db = mongoose.connection;
var token = {logIn:'',userId:'',name:''};
var jwt = require('jsonwebtoken');
app.use(express.static('app'))
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongooos!');
});

var ttt = jwt.sign({ foo: 'bar' }, 'shhhhh');
var decode = jwt.verify(ttt,'shhhhh');
var bearer = ttt.split('.');
app.use(cors())

app.post('/me',function(req,res,next){
  token = JSON.parse(req.body.token)
  var me = db.collection('user').find({'token':token}).toArray(function(err,results){
     if (err) {
       res.json({
         type: false,
         data: "error occured in login" + err 
       });
     } else  
     if (results.length > 0) {
       res.json({
            type: true,
            user: results[0],
       });   
      }
     else {
       res.json({
         type: false,
         data: "incorrent email/password"
       });
    }
  });
});



app.post('/get-hero', function (req,res,next){
   db.collection('user').find(
     {'_id':ObjectId(req.body.userId)},
     function(err,results){
       results.toArray(function(err,result){
        res.send(result[0])
        
       })
     }
   )

})

app.post('/twitt',function(req,res,next){
msg = {
  from: req.body.userId,
  sent: new Date(),
  message: req.body.msg,
}  
   db.collection('twitts').save(msg)
   var cursor = db.collection('twitts').find().toArray(function(err, results) {
       res.send (results);
   })
   
})

app.post('/edit-profile',upload.single('imgProfile'), function(req,res,next) {
  var infProfile = req.body.infProfile;
  infProfile = JSON.parse(infProfile);
   
   if(req.file){

      infProfile.picUrl = req.file.filename

   }
   res.send(infProfile);
   db.collection('user').updateOne(
     {'_id':ObjectId(infProfile._id)},
     {
      $set:{
          name:infProfile.name,
          email:infProfile.email,
          password:infProfile.password,
          skills:infProfile.skills,
          phoneNumber:infProfile.phoneNumber,
          picUrl:infProfile.picUrl
       }
     }
   )
})

app.get('/', function (req, res) {

})

app.get('/get',function(req,res,next){               
var cursor = db.collection('user').find().toArray(function(err, results) {
  res.send (results);
})
})

app.post('/register',function(req,res,next){
	var tt = db.collection('user').find({$or: [{'name': req.body.name},{'email': req.body.email}]}).toArray(function(err,results){
        if (err) {
          res.json({
            type : false,
            data : "problems in registration"
          })
        }
		    if(results.length){
          res.json({
            type : false,
            data : "the user allready exist!!" 
          }) 
	      }
	    else{
        var token = jwt.sign(req.body,'shhhhh');
        bearer = token.split('.')[1];
	      db.collection('user').save({name: req.body.name , email:req.body.email ,password:req.body.password ,picUrl:"",skills:"",phoneNumber:911,token:bearer})
        db.collection('user').find(
          {'email':req.body.email},
          function(err,results){
            results.toArray(function(err,result){
              res.json({
                type : true,
                data : result[0],
                token: result[0].token
              })
            })
          }
        ) 	
	    }
	})
    
})
app.post('/login',function(req,res,next){
  
  var userLogin =	db.collection('user').find({$and: [{'name': req.body.name},{'password':req.body.password}]}).toArray(function(err,results){
  	 if (err) {
       res.json({
         type: false,
         data: "error occured in login" + err 
       });
     } else  
  	 if (results[0]) {
       res.json({
            type: true,
            user: results[0],
            token: results[0].token
       });   
  	  }
     else {
       res.json({
         type: false,
         data: "incorrent email/password"
       });
  	}
  });
});
app.get('/twitts',function(req,res,next){

   db.collection('twitts').find().sort({sent: -1}).toArray(function(err,result){
     res.send(result)
   });
})

app.listen(9000, function () {

})