const { Schema, model } = require(`mongoose`);
const validator = require(`validator`);
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    require: false,
    unique: false,
    minlength: 3,
    maxlength: 30,
  },

  lastname: {
    type: String,
    require: false,
    unique: false,
    minlength: 3,
    maxlength: 30,
  },

  age: {
    type: Number,
    require: false,
    unique: false,
    min: 8,
    max: 99,
  },

  email: {
    type: String,
    require: true,
    unique: true,
    lowcase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: `Por favor, inserte un Email válido`,
    },
  },

  password: {
    type: String,
    require: false,
    unique: false,
    minlength: 6,
    maxlength: 15,
    match: [
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      `Por favor, inserte una contraseña válida`,
    ],
  },
  
  img: {
    type: String,
    unique: false,
    require: false,
  },

  status: {
    type: Boolean,
    unique: false,
    require: false,
    default: true,
    enum: [true, false],
  },
  status: {
    type: Boolean,
    unique: false,
    require: false,
    default: true,
    enum: [true, false],
  },

  profile: {
    type: String,
    unique: false,
    require: true,
    default: "user",
    enum: ["user", "admin"],
  },
  
  user_course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    require: false,
  },
  user_reviews: {
    type: Schema.Types.ObjectId,
    ref: "Reviews",
    require: false,
  },
  user_payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    require: false,
  },
  },
  {
    timestamps: true,
  }
);


UserSchema.methods.encrypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model("User", UserSchema);
