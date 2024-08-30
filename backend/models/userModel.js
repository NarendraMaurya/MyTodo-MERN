const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
}, { timestamps: true });


// -------------- BEFORE SAVING TO DB, HASH THE PASSWORD -----------------
userSchema.pre('save', async function (next) {
    // If password not modified than do nothing
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;