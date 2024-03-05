const Course = require("../.././database/models/Course");
const { cloudinary } = require("../../utils/cloudinary");

const createCourse = async (req, res) => {
  try {
    const { language, level, price, duration, start_time, finish_time, location, image, schedule } = req.body;
    
    let imageUrl = "";

    if (image) {
 
      const uploadedImage = await cloudinary.uploader.upload(image, {
        upload_preset: "ml_default",
        folder: "idiomasMaster" 
      });
      console.log("imagen subida a cloudinary con exito:", uploadedImage);
      imageUrl = uploadedImage.url;
    }
    console.log("URL de la imagen:", imageUrl);

    const newCourse = new Course({
      language,
      level,
      price,
      duration,
      start_time,
      finish_time,
      location,
      image: imageUrl,
      schedule,
    });

    console.log("Nuevo curso a guardar en la base de datos:", newCourse);

    await newCourse.save();
    
    console.log("Curso guardado exitosamente en la base de datos.");
    return res.status(200).send(`Course created: ${language}`);
  } catch (error) {
    console.error("Error al crear el curso:", error);
    return res.status(500).send(error.message);
  }
};

module.exports = createCourse;
