const e = require("express");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: Object,
        default: null,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    authMethod: {
        type: String,
        enum: ["local", "google","facebook", "github"],
        required: true,
        default: "local",
    },
    passwordResetToken: {
        type: String,
        default: null,
    },
    passwordResetExpires: {
        type: Date,
        default: null,
    },
    accountVerificationToken: {
        type: String,
        default: null,
    },
    accountVerificationExpires: {
        type: Date,
        default: null,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    totalEarnings: {
        type: Number,
        default: 0,
    },
    nextEarningDate: {
        type: Date,
        default: () =>
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), // Next month's 1st date
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
    }, 
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
        },
    ],
    hasSelectedPlan: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    // isAdmin: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },
}   , { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;