import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import registerValidate from "../Utils/registerValidate";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/action/actions";
import Swal from "sweetalert2";
import "./ColoredToast.css";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.postStatus);
  const postStatusFail = useSelector((state) => state.postStatusFail);
  const postError = useSelector((state) => state.postError);
  const [status, setStatus] = useState(postStatus);
  const [lang, setLang] = useState('')
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setLang(localStorage.getItem("lang"))
  }, [])
  const [state, setState] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
  });
 const registerValidate = ({ name, lastname, email, age, img, password }) => {
    const errors = {};
    const regexImg = new RegExp("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$");
    const regexNameAndLast = new RegExp("^(?!.* (?: |$))[A-Z][a-z ]+$");
  
    //NAME
    if (!regexNameAndLast.test(name)) { errors.name = t("INGRESE PRIMER LETRA EN MAYUSCULA Y SIN ESPACIOS.") };
    if (name.length > 20) { errors.name = t("NOMBRE MAYOR A 20 CARACATERES.") };
    if (!/^[^\d]*$/.test(name)) { errors.name = t("NO PUEDE CONTENER NUMEROS" )}
    if (!name.length) { errors.name = t("EL NOMBRE ES OBLIGATORIO.") };
    
    //LASTNAME
    if (!regexNameAndLast.test(lastname)) { errors.lastname = t("INGRESE PRIMER LETRA EN MAYUSCULA Y SIN ESPACIOS.") };
    if (lastname.length > 20) { errors.lastname = t("APELLIDO MAYOR A 20 CARACTERES.") };
    if (!/^[^\d]*$/.test(lastname)) { errors.lastname = t("NO PUEDE CONTENER NUMEROS" ) }
    if (!lastname.length) { errors.lastname = t("EL APELLIDO ES OBLIGATORIO.") };
    
    //IMAGE
    // if (!regexImg.test(img))
    //   errors.image = "permite solo archivos con extensión jpg o jpeg.";
    
    //EMAIL
    if (email.length > 30) { errors.email = t("EMAIL ES MAYOR A 30 CARACTERES.") };
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = t('EMAIL DEBE CONTENER @ Y .COM')
    if (!email.length) { errors.email = t("EL EMAIL ES OBLIGATORIO.") };
    // const existUser = await User.findOne({ email });
    // if (existUser) {return res.status(400).send("Email is already in use")}
  
    //AGE
    if (!age.length) { errors.age = t("LA EDAD ES OBLIGATORIA.") };
    if (Number(age) > 90) { errors.age = t("LA EDAD DEBE SER MENOR A 90 AÑOS.") };
    if (Number(age) < 18 ) { errors.age = t("LA EDAD DEBE SER MAYOR A 18 AÑOS.") };
  
    //PASSWORD
    if (password.length < 8) { errors.password = t("LA CONTRASEÑA DEBE TENER AL MENOS 8 CARACTERES.") };
    if (!password.length) errors.password = t("DEBE CONTENER CONTRASEÑA.");
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) errors.password = t('EL PASSWORD DEBE CONTENER Aa2*')
  
    return errors;
 }
  
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLang(localStorage.getItem("lang"))
    // if (lang === "en") {
    //   const newErrors = registerValidateEng({ ...state, [name]: value });
    //   setErrors({ ...errors, [name]: newErrors[name] });
    // }
    // if (lang === "es") {
    const newErrors = registerValidate({ ...state, [name]: value });
      setErrors({ ...errors, [name]: newErrors[name] });
    // }

    setState({ ...state, [name]: value });
  };

  


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setState((prevState) => ({
          ...prevState,
          img: reader.result,
        }));
      };
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(postUser(state));
    console.log(response)
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: t("USUARIO_CREADO"),
        showConfirmButton: false,
        timer: 2300
      });
      setStatus(false)
      navigate("/login")
    } else {
      Swal.fire({
        icon: 'error',
        title: t("ERROR_AL_CREAR_USUARIO"),
        text: `${response.response.data}` // Puedes mostrar el mensaje de error específico si lo proporciona la función de registro
      });
    }
  };

  useEffect(()=>{
    buttonDisabled(errors)
  })

  const buttonDisabled = () => {
    let btn = true;
    if (Object.values(state).some(value => value.trim() === '')) btn = true
    else {
      btn = false
    }
    return btn;

  }
  console.log(state);
  console.log(buttonDisabled());
  console.log(errors);

  return (
    <div className="w-full h-[90vh] mt-[80px] grid grid-cols-2">
      <div className="w-full h-full flex relative">
        <img
          className="h-full object-cover rounded-l-md animate-fade-right animate-ease-in-out"
          src="img\bg-002.png"
          alt=""
        />
        <div className="absolute w-full h-full bg-black/50 animate-fade-right animate-ease-in-out"></div>
      </div>
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="bg-gradient-to-r from-sky-600 to-sky-600 w-[80%] h-[95%] rounded-[20px] flex flex-col items-center shadow-lg shadow-black/50 animate-fade-left animate-ease-in-out">
          <div className=" w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-b-yellow-400">
            <h1 className="text-[40px] text-yellow-400">{t("REGISTRO_DE_USUARIO")}</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" w-[80%] h-[90%] grid grid-rows-6 py-[10px]"
          >
            <div className=" w-full h-full">
              <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden ">
                  <div className="w-[20%] h-full bg-sky-900 flex items-center justify-center">
                    <FaUser className="text-[36px] text-white" />
                  </div>

                  <input
                    className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                    onChange={handleChange}
                    name="name"
                    placeholder= {t("INGRESA NOMBRE")}
                    id="name"
                    type="text"
                    value={state.name}
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {t(errors.name)}
                </span>
              </div>
            </div>
            <div className=" w-full h-full">
              <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                  <div className="w-[20%] h-full bg-sky-900 flex items-center justify-center">
                    <FaUserTag className="text-[40px] text-white" />
                  </div>

                  <input
                    className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                    onChange={handleChange}
                    name="lastname"
                    placeholder= {t("INGRESA APELLIDO")}
                    id="lastname"
                    type="text"
                    value={state.lastname}
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >{errors.lastname}
                </span>
              </div>
            </div>
            <div className=" w-full h-full">
              <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                  <div className="w-[20%] h-full bg-sky-900 flex items-center justify-center">
                    <FaUserClock className="text-[40px] text-white" />
                  </div>

                  <input
                    className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                    onChange={handleChange}
                    placeholder={t("INGRESA EDAD")}
                    name="age"
                    id="age"
                    type="number"
                    value={state.age}
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {errors.age}
                </span>
              </div>
            </div>
            <div className=" w-full h-full">
              <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                  <div className="w-[20%] h-full bg-sky-900 flex items-center justify-center">
                    <MdEmail className="text-[40px] text-white" />
                  </div>

                  <input
                    className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                    onChange={handleChange}
                    name="email"
                    placeholder= {t("INGRESA EMAIL")}
                    id="email"
                    type="email"
                    value={state.email}
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {errors.email}
                </span>
              </div>
            </div>
            <div className=" w-full h-full">
              <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                  <div className="w-[20%] h-full bg-sky-900 flex items-center justify-center">
                    <RiLockPasswordLine className="text-[40px] text-white" />
                  </div>

                  <input
                    className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                    onChange={handleChange}
                    placeholder={t("INGRESA CONTRASEÑA")}
                    name="password"
                    id="password"
                    type="password"
                    value={state.password}
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {errors.password}
                </span>
              </div>
            </div>
            <div className=" w-full h-full grid grid-rows-2">
              <div className="w-full h-full flex items-center justify-center">
                <input
                  disabled={buttonDisabled()}
                  className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  type="submit"
                  value={t("REGISTRARSE")}
                />
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <ul>
                  <li className="flex m-2">
                    <h1>{t("YA_TIENES_CUENTA")}</h1>
                    <Link
                      className="text-yellow-400 ml-2 font-bold text-l hover:text-yellow-600	"
                      to="/login"
                    >
                      <h1>{t("INICIAR_SESION")}</h1>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
