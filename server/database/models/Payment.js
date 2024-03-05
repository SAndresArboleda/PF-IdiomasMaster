const { Schema, model } = require(`mongoose`);

const PaymentSchema = new Schema(
  {
    Amount: {
      type: Number,
      require: true,
      unique: false,
    },

    date: {
      type: Date,
      require: true,
      unique: false,
    },

    status: {
      type: String,
      require: true,
      unique: false,
      emun: ["Pending", "Approved", "Cancelled", "Rejected"],
    },

    view: {
      type: Boolean,
      unique: false,
      require: true,
      default: false,
      enum: [true, false],
    },

    student_payment: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    course_payment: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Payment", PaymentSchema);
