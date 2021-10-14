const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
 
const users=[];//for now this will changed



app.set('view-engine','ejs');
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{
    res.render('index.ejs')
})

app.get('/login' , (req,res)=>{

    res.render('login.ejs')
    
})
app.get('/register' , (req,res)=>{

    res.render('register.ejs')

})
app.post('/register' ,async (req,res)=>{

    res.render('register.ejs')

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);//this will saved in a data base
        users.push({
            id:Data.now().toString(),
            name:res.body.name,
            email:res.body.email,
            password:res.body.password


        })
        res.redirect('/login')
    }catch(err){
        res.redirect('/register')
        console.log(users)
    }

    console.log(users)
})



app.listen(3000)