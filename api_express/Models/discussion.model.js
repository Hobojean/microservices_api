const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const DiscussionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: Number,
        required: true
    },
    users: [{
        fk_id_user: {
            type: Number,
            required: true
        }
    }],
    messages: [{
        owner: {
            type: Number,
        },
        fk_id_message: {
            type: Number,
        }
    }],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    },
});

DiscussionSchema.plugin(uniqueValidator);

const Discussion = mongoose.model('discussions', DiscussionSchema);

module.exports = Discussion;
