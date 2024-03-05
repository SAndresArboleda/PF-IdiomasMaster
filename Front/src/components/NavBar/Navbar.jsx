import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";
import LogoutButton from "../Login/LogOut";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const [userData] = useLocalStorage("userData", {});
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useLocalStorage("lang", "");

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  console.log(localStorage.getItem("lang"));
  const defaultAvatarUrl =
    "https://www.pngitem.com/pimgs/m/508-5087236_tab-profile-f-user-icon-white-fill-hd.png";

  return (
    <div className="flex h-[70px] fixed z-20  top-0 w-full items-center justify-between text-white bg-[#000000d2] backdrop-blur-sm border-[#ffffff] border-b-2 border-solid">
      <div className="w-[1000px] h-full flex ml-2 items-center gap-10  ">
        <Link to="/" className=" w-[350px] h-full flex justify-center items-center">
          <img className="w-16" src="img\logo4.png" alt="Logo" />
          <h1 className="ml-[10px] text-[35px]">Idiomas Master</h1>
        </Link>
        <Link to="/about" className="h-full w-[220px] justify-center flex items-center cursor-pointer ">
          <h1 className="text-[20px] ml-[10px] cursor-pointer ">{t("SOBRE_NOSOTROS")}</h1>
          <BsFillInfoSquareFill className="text-[40px] ml-[15px] cursor-pointer " />
        </Link>

          <Link to="/home" className="h-full flex items-center justify-center">
          <h1>{t('CURSOS')}</h1>
            <FaDiscourse className="text-[30px] ml-1" />
          </Link>

        </div>

        <div className="flex ml-2 items-center gap-10 justify-around ">
        <select
          className="ml-[15px] appearance-none text-white bg-[#2D2D2D] font-semibold backdrop-blur-sm  border-2 border-gray-300 rounded-lg py-2 px-4  leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
          onChange={handleLanguageChange}
          defaultValue="idioma"
        >
          <option value="idioma">{t("IDIOMA")}</option>
          <option value="es">{t("ESPAÑOL")}</option>
          <option value="en">{t("ENGLISH")}</option>
          <option value="it">{t("ITALIAN")}</option>
          <option value="fr">{t("FRENCH")}</option>
        </select>
      </div>
  
        <Link
          to="/login"
          className="h-full w-[200px] justify-center flex items-center cursor-pointer"
        >
          <h1 className="text-[20px]  cursor-pointer ">{t("INGRESAR")}</h1>
          <IoLogIn className="text-[40px] cursor-pointer " />
        </Link>
   
    </div>
  );
};
