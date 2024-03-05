const validation = (course) => {
    const errors = {};
  
    if (!course.language) {
      errors.language = "El campo Lenguaje es obligatorio";
    }
  
    if (!course.level) {
      errors.level = "El campo Nivel es obligatorio";
    }
  
    if (!course.price) {
      errors.price = "El campo Precio es obligatorio";
      
    } if (isNaN(course.price)) {
      errors.price = "El campo Precio debe ser un número";
    } else if(course.price < 25 || course.price > 500) {
      errors.price = "El precio debe ser entre 50 y 300 USD";
    }
  
    if (!course.duration) {
      errors.duration = "El campo Duración es obligatorio";
    }
  
    if (!course.schedule) {
      errors.schedule = "El campo Horario es obligatorio";
    }
  
    if (!course.start_time) {
      errors.start_time = "El campo Hora de inicio es obligatorio";
    }
  
    if (!course.finish_time) {
      errors.finish_time = "El campo Hora de finalización es obligatorio";
    }
  
    if (!course.location) {
      errors.location = "El campo Ubicación es obligatorio";
    }
  
    if (!course.image) {
      errors.image = "El campo URL de la imagen es obligatorio";
    }
  
    return errors;
  };
  export default validation
