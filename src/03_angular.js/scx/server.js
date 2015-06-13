// server.js

// set up ========================
var express = require('express');
var scx = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var logger = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport'); // passport lib for authentication
var LocalStrategy = require('passport-local').Strategy; // passport lib for authentication
var cookieParser = require('cookie-parser');
var session = require('express-session');


// configuration =================
mongoose.connect('mongodb://127.0.0.1:27017/local');
mongoose.connection.on('error', function (error) {
    // return error if connection fails
    console.log(error);
});

scx.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
scx.use(logger('dev'));                                         // log every request to the console
scx.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
scx.use(bodyParser.json());                                     // parse application/json
scx.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
scx.use(methodOverride());
scx.use(cookieParser());
scx.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
scx.use(passport.initialize());
scx.use(passport.session());


// get database model =================
var UserEntity = require('./user');
// config for passport
passport.use(new LocalStrategy({ usernameField: 'email' }, UserEntity.authenticate()));
passport.serializeUser(UserEntity.serializeUser());
passport.deserializeUser(UserEntity.deserializeUser());


// listen (start app with node server.js) ======================================
scx.listen(8080);
console.log("App listening on port 8080");


// application -------------------------------------------------------------
scx.get('/', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// api ---------------------------------------------------------------------
var baseUrl = '/frontend-api';

// middleware for checking if the user is authenticated
function requireAuth(req, res, next){
    // check if the user is logged in
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect(baseUrl + '/sessions');
}

// create user session
scx.post(baseUrl + '/sessions', passport.authenticate('local'), function (req, res) {
    // get user
    var user = req.user;

    // we return the respective user object on success
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        active: user.active
    });
});

// destroy a user session
scx.delete(baseUrl + '/sessions', requireAuth, function (req, res) {
    req.logout();
    res.json({ message: 'Logged Out!' });
});

// helper to redirect to error if not logged in
scx.get(baseUrl + '/sessions', function (req, res) {
    res.json({ message: 'Please Login!' }, 401);
});

// save a user => unauthenticated for testing purposes
scx.post(baseUrl + '/users', function (req, res) {
    // get request body
    var reqBody = req.body;

    UserEntity.count({}, function (err, count) {
        console.log( "Number of users:", count );

        // create new user
        var newUser = new UserEntity({
            id: count+1,
            name: reqBody.name,
            email: reqBody.email,
            roleId: reqBody.roleId,
            active: reqBody.active
        });

        // somehow register doesn't return a proper error when user already exists
        UserEntity.register(newUser, reqBody.password,
            function (err, user) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                // we don't return the password
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId,
                    active: user.active
                });
            }
        );
    });
});

// update a user
scx.put(baseUrl + '/users/:id', requireAuth, function (req, res) {
    // get request body
    var reqBody = req.body;
    // use mongoose to find and update a user
    UserEntity.findOneAndUpdate({ 'id': req.params.id}, reqBody,
        function (err, user) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            // we don't return the password
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                active: user.active
            });
        }
    );
});

// partially update a user
scx.patch(baseUrl + '/users/:id', requireAuth, function (req, res) {
    // get request body
    var reqBody = req.body;
    // use mongoose to find and update a user
    UserEntity.findOneAndUpdate({ 'id': req.params.id}, reqBody,
        function (err, user) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            // we don't return the password
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                active: user.active
            });
        }
    );
});

// delete a user
scx.delete(baseUrl + '/users/:id', requireAuth, function (req, res) {
    // use mongoose to find and update a user
    UserEntity.findOneAndRemove({ 'id': req.params.id},
        function (err, user) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            // we don't return the password
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                active: user.active
            });
        }
    );
});

// get all users
scx.get(baseUrl + '/users', requireAuth, function (req, res) {
    // use mongoose to get all users in the database
    UserEntity.find(
        function (err, users) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            // we don't return the password
            res.json(users.map(function (user) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId,
                    active: user.active
                }
            })); // return all users in JSON format
        }
    );
});

// get one user
scx.get(baseUrl + '/users/:id', requireAuth, function (req, res) {
    // use mongoose to get one user in the database
    UserEntity.findOne({ 'id': req.params.id},
        function (err, user) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            // we don't return the password
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                active: user.active
            }); // return all users in JSON format
        }
    );
});
