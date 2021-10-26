const mongoose = require("mongoose");

//creating a simple user schema
//holds data registed username email and passsword(hashed)

let userSchema = new mongoose.Schema({
    Date: Date,
    userName: String,
    password: String,
    email:String
});


module.exports = function(connectionString){

  let user;

  return {

      initialize: function(){
          return new Promise((resolve,reject)=>{
              let db1 = mongoose.createConnection(connectionString,{ useNewUrlParser: true,useUnifiedTopology: true });

              db1.on('error', ()=>{
                  reject();
              });
              db1.once('open', ()=>{
                  user = db1.model("users", userSchema);//compiling a db instance into user
                  resolve();
              });
          });
      },

      RegisterUser: function(data){
          return new Promise((resolve,reject)=>{

              let newUser = new user(data);
              if(newUser.exists({email:data.email })||newUser.exists({userName: data.userSame })){//if already exists reject with massage
                
                newUser.save((err) => {
                  if(err) {
                      reject(err);
                  } else {
                      resolve(`new user: ${newUser.email} successfully added`);
                  }
              });
            }else{
              reject(`User Name alredy exists`)
            }
          });
      },

      

      getUserByEmail: function(Cemail){
          return new Promise((resolve,reject)=>{
            user.findOne({email: Cemail}).exec().then(user=>{
                  resolve(user)
              }).catch(err=>{
                  reject(err);
              });
          });
      },
      getUserById: function(id){
          return new Promise((resolve,reject)=>{
            user.findOne({_id: id}).exec().then(user=>{
                  resolve(user)
              }).catch(err=>{
                  reject(err);
              });
          });
      },

      

  }

}