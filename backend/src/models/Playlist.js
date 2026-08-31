const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        visibility: {
            type: String,
            enum: ["public", "private", "collaborative"],
            default: "private"
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song"
            }
        ],
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Playlist", playlistSchema);
