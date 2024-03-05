const { Schema, model } = require(`mongoose`);

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      unique: false,
      min: 1,
      max: 5,
    },

    body: {
      type: String,
      required: true,
      unique: false,
      minlength: 15,
      maxlength: 300,
    },
    reply: {
      type: String,
      required: false,
      unique: false,
      minlength: 15,
      maxlength: 300,
    },

    view: {
      type: Boolean,
      unique: false,
      require: false,
      default: false,
      enum: [true, false],
    },

    student_name: {
      type: String,
      required: true,
    },

    student_lastname: {
      type: String,
      required: true,
    },
    
    student_img: {
      type: String,
      required: false,
    },

    student_review: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course_review: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = model("Review", ReviewSchema);
