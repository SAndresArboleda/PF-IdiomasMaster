

const registerValidate = ({ name, lastname, email, age, img, password }) => {
  const errors = {};
  const regexImg = new RegExp("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$");
  const regexNameAndLast = new RegExp("^(?!.* (?: |$))[A-Z][a-z ]+$");

  //NAME
  if (!regexNameAndLast.test(name)) { errors.name = "Ingrese primer letra en mayuscula y sin espacios." };
  if (name.length > 20) { errors.name = "Nombre mayor a 20 caracateres." };
  if (!/^[^\d]*$/.test(name)) { errors.name = 'No puede contener numeros' }
  if (!name.length) { errors.name = "El nombre es obligatorio." };
  
  //LASTNAME
  if (!regexNameAndLast.test(lastname)) { errors.lastname = "Ingrese primer letras en mayuscula y sin espacios." };
  if (lastname.length > 20) { errors.lastname = "Apellido mayor a 20 caracteres." };
  if (!/^[^\d]*$/.test(lastname)) { errors.lastname = 'No puede contener numeros' }
  if (!lastname.length) { errors.lastname = "El apellido es obligatorio." };
  
  //IMAGE
  // if (!regexImg.test(img))
  //   errors.image = "permite solo archivos con extensión jpg o jpeg.";
  
  //EMAIL
  if (email.length > 30) { errors.email = "Email es mayor a 30 caracteres." };
  if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email debe contener @ y .com'
  if (!email.length) { errors.email = "El email es obligatorio." };
  // const existUser = await User.findOne({ email });
  // if (existUser) {return res.status(400).send("Email is already in use")}
  
  // //AGE
  if (!age.length) { errors.age = "La edad es obligatoria." };
  if (Number(age) > 90) { errors.age = "La edad debe ser menor a 90 años." };
  if (Number(age) < 18 ) { errors.age = "La edad debe ser mayor a 18 años." };
  
  // //PASSWORD
  if (password.length < 8) { errors.password = "La contraseña debe tener al menos 8 caracteres." };
  if (!password.length) errors.password = "Debe contener contraseña.";
  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) errors.password = 'El password debe contener Aa2*'

  return errors;
}


export default registerValidate;
