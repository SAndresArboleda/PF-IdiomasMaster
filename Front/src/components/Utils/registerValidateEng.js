// const registerValidateEng = ({ name, lastname, email, age, img, password }) => {
//   const errors = {};
//   const regexImg = new RegExp("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$");
//   const regexNameAndLast = new RegExp("^(?!.* (?: |$))[A-Z][a-z ]+$");

//   //NAME
//   if (name.length > 20) { errors.name = "Name longer than 20 characters." };
//   if (!/^[^\d]*$/.test(name)) { errors.name = 'Cannot contain numbers' }
//   if (!name.length) { errors.name = "Name is required." };
//   if (!regexNameAndLast.test(name)) { errors.name = "Enter first letter in uppercase and without spaces." };
  
//   //LASTNAME
//   if (lastname.length > 20) { errors.lastname = "Lastname longer than 20 characters." };
//   if (!/^[^\d]*$/.test(lastname)) { errors.lastname = 'Cannot contain numbers' }
//   if (!lastname.length) { errors.lastname = "Lastname is required." };
//   if (!regexNameAndLast.test(lastname)) { errors.lastname = "Enter first letters in uppercase and without spaces." };
  
//   //IMAGE
//   // if (!regexImg.test(img))
//   //   errors.image = "Only allows files with jpg or jpeg extension.";
  
//   //EMAIL
//   if (email.length > 30) { errors.email = "Email longer than 30 characters." };
//   if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email must contain @ and .com'
//   if (!email.length) { errors.email = "Email is required." };
//   // const existUser = await User.findOne({ email });
//   // if (existUser) {return res.status(400).send("Email is already in use")}
  
//   // //AGE
//   if (!age.length) { errors.age = "Age is required." };
//   if (Number(age) > 90) { errors.age = "Age must be less than 90 years." };
//   if (Number(age) < 18 ) { errors.age = "Age must be greater than 18 years." };
  
//   // //PASSWORD
//   if (password.length < 8) { errors.password = "Password must be at least 8 characters long." };
//   if (!password.length) errors.password = "Password is required.";
//   if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) errors.password = 'Password must contain Aa2*'

//   return errors;
// }

//   export default registerValidateEng;
  