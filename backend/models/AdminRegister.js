const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    city: { type: String, required: true },
    phoneNo: { type: String, required: true },
    avatar: { type: String},
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});


userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.date = ret.date.toISOString().split('T')[0];
        delete ret._id;
        delete ret.__v;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
