import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, setUserdata } from "../../redux/action/actions";
import LoginButton from "../../googleLogin";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useEffect, useState } from "react";
import { getmailUser } from "../Admin/userData";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userData);
  const { t, i18n } = useTranslation()

  const [userData, setUserDataLocally] = useLocalStorage("userData", {
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataLocally({ ...userData, [name]: value });
  };

  const buttonDisabled = () => {
    for (const user in userData) {
      if (userData[user].length === 0) {
        return true;
      }
    }
    return false;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form with data:", userData);
      const response = await getmailUser({
        email: userData.email,
        password: userData.password,
      });
      if (response.status === 200) {
        const updatedUserData = {
          ...userData,
          ...response.data,
          isAuthenticated: true,
        };
        navigate("/redirect")
        setUserDataLocally(updatedUserData);
        dispatch(setUserdata(updatedUserData));
        Swal.fire({
          icon: 'success',
          title: t("LOGUEADO"),
          showConfirmButton: false,
          timer: 2200,
        });
      }else{


        if(response.response.status === 405){

          Swal.fire({
            icon: 'error',
            title: t("Usuario Desactivado"),
            text: t(`El usuario se encuentra desactivado`)
          })
        } else{

          Swal.fire({
            icon: 'error',
            title: t("ERROR_AL_INGRESAR"),
            text: t("ERROR_AL_INICIAR_SESION")
          })
        }
        
      }
    } catch (error) {
   
      Swal.fire({
        icon: 'error',
        title: t("ERROR_AL_INGRESAR"),
        text: t("ERROR_AL_INICIAR_SESION")
      })
    }
  };

  return (
    <div className="w-full h-[90vh] mt-[80px] grid grid-cols-2">
      <div className="w-full h-full flex relative">
        <img
          className="h-full object-cover rounded-l-md animate-fade-right animate-ease-in-out"
          src="img\bg-001.png"
          alt=""
        />
        <div className="absolute w-full h-full bg-black/50 animate-fade-right animate-ease-in-out"></div>
      </div>
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="bg-gradient-to-r from-sky-600 to-sky-600 w-[80%] h-[80%] rounded-[20px] flex flex-col items-center shadow-lg shadow-black/50 animate-fade-left animate-ease-in-out">
          <div className=" w-[70%] h-[15%] flex items-center justify-center border-b-[1px] border-b-yellow-400">
            <h1 className="text-[40px] text-yellow-400">{t("INICIAR_SESION")}</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" w-[80%] h-[60%] grid grid-rows-3 py-[10px]"
          >
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
                    required
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                {/* <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {errors.email}
                </span> */}
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
                    placeholder= {t("INGRESA CONTRASEÑA")}
                    name="password"
                    id="password"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                {/* <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {errors.password}
                </span> */}
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <input
                disabled={buttonDisabled()}
                className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                type="submit"
                value={t("INICIAR_SESION")}
              />
            </div>
          </form>
          <div className=" w-[70%] h-[15%] flex items-center flex-col justify-evenly border-t-[1px] border-t-yellow-500">
            <LoginButton />
          </div>
          <div className=" w-[70%] h-[5%] flex items-center flex-col ">
            <ul>
              <li className="text-white flex" >
                <h1>{t("NO_TIENES_CUENTA")}</h1>
                <Link
                  className="text-yellow-400 ml-2 font-bold text-l hover:text-yellow-600	"
                  to="/register"
                >
                  <h1>{t("REGISTRATE")}</h1>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
