const { Schema, model } = require(`mongoose`);

const CourseSchema = new Schema(
  {
    language: {
      type: String,
      require: true,
      unique: false,
      enum: ["Ingles", "Frances", "Aleman", "Italiano", "Holandes", "Portugues"],
    },

    level: {
      type: String,
      require: true,
      unique: false,
      enum: ["Principiante", "Intermedio", "Avanzado"],
    },

    price: {
      type: Number,
      require: true,
      unique: false,
      min: 25,
      max: 500,
    },

    duration: {
      type: String,
      requiere: true,
      unique: false,
      enum: ["1 Mes", "2 Meses", "3 Meses", "4 Meses"],
    },

    schedule: {
      type: String,
      require: true,
      unique: false,
      enum: [
        "Fines de semana",
        "Durante la semana",
        "Lunes, Miércoles, Viernes",
        "Martes, Jueves",
      ],
    },

    start_time: {
      type: String,
      require: true,
      unique: false,
    },

    finish_time: {
      type: String,
      require: true,
      unique: false,
    },

    location: {
      type: String,
      require: true,
      unique: false,
    },
    rank: {
      type: Number,
      unique: false,
      require: false,
      enum: [1, 2, 3, 4, 5],
    },

    image: {
      type: String,
      require: false,
      unique: false,
    },
    status: {
      type: Boolean,
      unique: false,
      require: true,
      default: true,
      enum: [true, false],
    },

    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    review_course: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        require: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Course", CourseSchema);
