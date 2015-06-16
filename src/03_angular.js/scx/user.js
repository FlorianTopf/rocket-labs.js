var mongoose = require('mongoose'); // mongoose for mongodb
var Schema = mongoose.Schema; // instantiate schema
var passportLocalMongoose = require('passport-local-mongoose'); // local strategy with mongoose

// define user model for DB =================
var UserSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    roleId: Number,
    active: Boolean,
    password: String
});

// tell mongoose to use passport-local
UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    hashField: 'password'
});

// create the mongoose model out of schema, use users collection
var UserEntity = mongoose.model('User', UserSchema, 'users');

module.exports = UserEntity;
