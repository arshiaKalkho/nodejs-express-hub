if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')



initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)




const users=[];//for now, this will be changed



app.set('view-engine','ejs'); 
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))



app.get('/', checkAuthenticated,(req,res)=>{
    res.render('index.ejs',{name: req.user.name})
})

app.get('/login' ,checkNotAuthenticated, (req,res)=>{

    res.render('login.ejs')
    
})
app.get('/register', checkNotAuthenticated, (req,res)=>{

    res.render('register.ejs')

})
app.post('/register',checkNotAuthenticated ,async (req,res)=>{

    res.render('register.ejs')

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);//this will be saved in a data base
        users.push({
            id:Data.now().toString(),
            name:     req.body.name,
            email:    req.body.email,
            password: hashedPassword


        })
        res.redirect('/login')
    }catch{
        res.redirect('/register')
        
    }

   
})



app.delete('/logout', (req, res) => {//loging out, forms don't support this by default
    req.logOut()
    res.redirect('/login')
  }) 

function checkAuthenticated(req, res, next) {//this middleware will always check to see if user is authenticated
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {//same, but this will activly redirect user to home
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
  }
  
app.listen(3000)