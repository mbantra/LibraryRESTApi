const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email : { type: String, required: true, unique: true },
    password: { type: String, required: true } 
});


UserSchema.pre('save', async function(next)  {
    const user = this;
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

UserSchema.methods.isPasswordValid = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;