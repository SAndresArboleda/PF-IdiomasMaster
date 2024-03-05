import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";
import LogoutButton from "../Login/LogOut";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useTranslation } from "react-i18next";
import { TiShoppingCart } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BsChatSquareQuoteFill } from "react-icons/bs";

export default function UserNavbar() {
  const { user, isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const [userData] = useLocalStorage("userData", {});
  const [cart, setCart] = useLocalStorage("cart", "");
  const [number, setNumber] = useState(0);
  const { t, i18n } = useTranslation();
  const currentCart = useSelector((state) => state.currentCart);

  const defaultAvatarUrl =
    "https://www.pngitem.com/pimgs/m/508-5087236_tab-profile-f-user-icon-white-fill-hd.png";
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

  const itemCart = JSON.parse(window.localStorage.getItem("cart"));

  useEffect(() => {
    if (itemCart && itemCart.length) {
      setNumber(itemCart.length);
    } else {
      setNumber(0);
    }

  }, [currentCart]);

  return (
    <div className="flex h-[70px] fixed z-20  top-0 w-full items-center justify-between text-white bg-[#000000d2] backdrop-blur-sm border-[#ffffff] border-b-2 border-solid">
      <div className="w-[550px] h-full flex ml-2 items-center gap-10">
        <Link
          to={"/user/home"}
          className=" w-[100px] h-full flex justify-center items-center"
        >
          <img className="w-16" src="/img/logo4.png" alt="Logo" />
        </Link>

        <Link
          to={"/home"}
          className="h-full w-[150px] jutsify-center flex items-center cursor-pointer"
        >
          <h1 className="text-[20px] ml-[10px] cursor-pointer ">
            {t("CURSOS")}
          </h1>
          <FaDiscourse className="text-[40px] ml-[15px] cursor-pointer " />
        </Link>
        <Link
          to="/cart"
          className="h-full w-[100px] jutsify-center flex items-center cursor-pointer relative"
        >
          <TiShoppingCart className="text-[50px] ml-[15px] cursor-pointer " />
          {number && number > 0 ?
        (<div className="w-[30px] h-[30px] bg-red-700 rounded-[20px] absolute top-2 left-[50px] flex items-center justify-center">
        <h1 className="font-bold text-[17px]">{number}</h1>
      </div>)  : (null)
        }
          
        </Link>
        <Link
          to="/favorite"
          className="h-full w-[100px] jutsify-center flex items-center cursor-pointer"
        >
          <FaHeart className="text-[40px] ml-[15px] cursor-pointer text-red-700 " />
        </Link>
    
        <Link to="/chat" className="h-full w-[100px] jutsify-center flex items-center cursor-pointer">
        <BsChatSquareQuoteFill className="text-[40px] ml-[15px] cursor-pointer " />
          </Link>
    
      </div>

      <div className="flex items-center justify-around h-full w-[40%]">
        {/* <Link to="/cart">
          <img className="w-[38px]" src="public\img\cart.png" alt="" />
        </Link> */}

        <div className="h-full w-[180px] justify-center flex items-center">
          <BiWorld className="text-[40px]" />
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
          to="/configuracion"
          className="h-full w-[120px] flex items-center"
        >
          <IoSettingsSharp className="text-[50px] cursor-pointer " />
          <img
            src={userData?.img || user?.picture || defaultAvatarUrl}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              position: "relative",
            }}
            alt=""
          />
        </Link>
        <div className="h-full w-[180px] justify-center flex items-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
