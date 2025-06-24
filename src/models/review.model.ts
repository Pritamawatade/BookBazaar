import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
},
    {
        timestamps: true,
    }
);

export const Review = model("Review", reviewSchema);