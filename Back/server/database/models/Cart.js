const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      unique: false,
      default: "waiting",
      enum: ["waiting", "shopped"], 
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", CartSchema);
