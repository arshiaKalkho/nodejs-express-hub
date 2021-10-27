if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}//adding environment variables
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')
const dbConnectionString = process.env.DATA_BASE_CONNECTION_STRING;
const dataServices = require('./data-services')


const DBconnection = dataServices(dbConnectionString);//cpnnection ready to go 

initializePassport(
    passport,
    DBconnection.getUserByEmail,
    DBconnection.getUserById
)

app.use('./viws/images/favicon.ico', express.static('./viws/images/favicon.ico'));
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname));

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.userName })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true

} 
))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs',{ err: ""})
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    
    
        const userAlreadyExists = await DBconnection.getUserByEmail(req.body.email);
        if(userAlreadyExists === null){

            
        

                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                
                DBconnection.RegisterUser({
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
                }).then().catch(
                    (err)=>{console.log(err)})
                
                
                
                res.redirect('/login')
            
        }else{
            
            res.render('register.ejs', { err: "email already in use"})
        }
    } 

)

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')

})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    return res.redirect('/')
    }
    next()
}


//we only start the if database works

DBconnection.initialize().then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`on port ${process.env.PORT||3000} we have liftoff" `)
    })    
}).catch((err)=>
{console.log("database is out of service",err)});

