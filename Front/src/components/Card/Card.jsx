import { Link, useLocation } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import { LuCalendarSearch } from "react-icons/lu";
import { FaShoppingBasket } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { TbListDetails } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { addCart, deleteCart, getCartDB } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { useTranslation } from "react-i18next";

export const Card = ({ course, removeFromFavorites, removeFromCart }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const currentCart = useSelector((state) => state.currentCart);
  const [isFav, setIsFav] = useState(false);
  const [fav, setFav] = useLocalStorage("fav", "");
  const [isCart, setIsCart] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", "");
  const { isAuthenticated } = useAuth0();
  const [userData] = useLocalStorage("userData", {})
  const { t, i18n } = useTranslation()

  // Sector Carrito
  useEffect(() => {
    if (!cart || cart.length === 0) {
      return;
    }
    const isCourseCart = cart.some(
      (cartCourse) => cartCourse._id === course._id
    );
    setIsCart(isCourseCart);
  }, [course, cart]);

  const handleCart = () => {
    if (
      (!userData.isAuthenticated) ||
      userData.isAuthenticated === null
    ) {
      Swal.fire({
        icon: "info",
        title: t("NECESITAS_REGISTRARTE_CARRITO"),
        footer: `<a href="/register">${t("REGISTRARSE")}</a>`,
      });
      return;
    }
  
    dispatch(getCartDB(userData._id));
    setIsCart(!isCart);
    
    const itemCart = JSON.parse(window.localStorage.getItem("cart")) || [];
    
    if (!isCart && !itemCart.some(item => item._id === course._id)) {
      // Agregar al carrito
      const updatedCart = [...itemCart, course];
      setCart(updatedCart);
      window.localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else if (isCart) {
      // Eliminar del carrito
      console.log("Holaaaa")
      removeFromCart(course._id);
      const filteredCart = itemCart.filter((c) => c._id !== course._id);
      setCart(filteredCart);
      window.localStorage.setItem("cart", JSON.stringify(filteredCart));
    }
  };


  
  // Sector Favoritos
  useEffect(() => {
    if (!fav && fav.length === 0) {
      return;
    }
    const isCourseFav = fav.some((favCourse) => favCourse._id === course._id);
    setIsFav(isCourseFav);
  }, [course, fav]);

  const handleFavorite = () => {
    if (
      (!userData.isAuthenticated) ||
      userData.isAuthenticated === null
    ) {
      Swal.fire({
        icon: "info",
        title: t("NECESITAS_REGISTRARTE_FAVORITO"),
        footer: `<a href="/register">${t("REGISTRARSE")}</a>`,
      });
      return;
    }
    setIsFav(!isFav);
    if (!isFav) {
      const item = JSON.parse(window.localStorage.getItem("fav"));
      if (item !== null) {
        item.push(course);
        setFav(item);
      } else {
        setFav([course]);
      }
    } else {
      const eliminateItem = JSON.parse(window.localStorage.getItem("fav"));
      const filteredFav = eliminateItem.filter((c) => c._id !== course._id);
      setFav(filteredFav);
    }
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(course._id);
    const eliminateItem = JSON.parse(window.localStorage.getItem("fav"));
    const filteredFav = eliminateItem.filter((c) => c._id !== course._id);
    setFav(filteredFav);
  };

  if (location.pathname === "/cart") {
    return (
      <div className="overflow-hidden flex h-[220px] w-[90%] m-5 text-black  shadow-lg shadow-black/50 transform transition-transform mt-[40px]">
        <div className="h-full w-[35%] bg-[#151139] overflow-hidden items-center justify-center flex ">
          <img
            src={course.image}
            alt={course.lenguage}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="h-full w-[50%] flex flex-col justify-start  bg-[#f3f4f5]">
          <div className=" ml-[30px] h-[50px]  flex flex-row ">
            <img
              src={`/img/${course.language}.png`}
              alt={course.lenguage}
              className="h-[30px] w-[30px] m-[10px] "
            />
            <h2 className="text-black text-[30px] ">{t(`LANGUAGE_${course.language.toUpperCase()}`)}</h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black text-[17px]">{t("NIVEL")}{":"}{t(`NIVEL_${course.level.toUpperCase()}`)}</h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black text-[17px]">
              {t("HORARIOS")}{":"}{t(`SCHEDULE_${course.schedule.toUpperCase()}`)}
            </h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black text-[17px]">
              {t("DURACION_DE")}{":"}{t(`DURACION_${course.duration.toUpperCase()}`)}
            </h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black  text-[17px]">
              {t("FECHA INICIO")}{":"}{course.start_time.split("T")[0]}
            </h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black  text-[17px]">
              {t("FECHA FINALIZACION")}{":"}{course.finish_time.split("T")[0]}
            </h2>
          </div>
        </div>
        <div className="h-full w-[20%]  grid grid-rows-3 border-l-[1px]">
          <div className="w-full h-full bg-sky-700 flex items-center justify-end">
            {location.pathname !== "/favorite" && (
              <div className="">
                {isFav ? (
                  <button
                    onClick={handleFavorite}
                    className=" text-2xl mr-[20px] "
                  >
                    ❤️
                  </button>
                ) : (
                  <button
                    onClick={handleFavorite}
                    className=" text-2xl mr-[20px]"
                  >
                    🤍
                  </button>
                )}
              </div>
            )}
            {location.pathname === "/favorite" && (
              <div>
                <button
                  onClick={handleRemoveFromFavorites}
                  className=" absolute top-2 right-2 text-3xl "
                >
                  <TiDelete className="bg-white rounded-[15px]" />
                </button>
              </div>
            )}
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="text-black  text-[40px]">$ {course.price}</h2>
          </div>
          <Link
            to={`/detail/${course._id}`}
            className="bg-yellow-400 w-full px-[15px] text-black h-full  flex flex-row items-center  justify-evenly hover:bg-yellow-500 cursor:pointer hover:text-black"
          >
            <h1 className=" text-[15px] cursor:pointer">
              {t("DETALLE DEL PRODUCTO")}
            </h1>
            <TbListDetails className=" text-[35px] cursor:pointer " />
          </Link>
          {/* <div className="w-full h-full px-[15px] flex items-center text-white justify-center bg-sky-700 hover:bg-red-500 cursor:pointer">
            {isCart ? (
              <div className="flex items-center justify-center w-full h-full cursor-pointer" onClick={handleCart}>
                <button
                  className="text-[15px] mr-2"
                >
                  {t("ELIMINAR DEL CARRITO CARD")}
                </button>
                <FaRegTrashCan className="text-[30px] " />
              </div>
            ) : (
              <div className=" flex items-center justify-center" onClick={handleCart}>
                <button
                  className="text-[15px] cursor:pointer"
                >
                  {t("AGREGAR AL CARRITO CARD")}
                </button>
                <FaCartShopping className="text-[25px] cursor:pointer" />
              </div>
            )}
          </div> */}
        </div>
      </div>
    );
  }




  return (
    <div className="overflow-hidden h-[90%] w-[40%] max-w-[450px] m-5 text-black rounded-[10px] flex-col justify-center items-center  shadow-lg shadow-black/50 transform transition-transform">
      <div className="h-[40%] w-full overflow-hidden ">
        <img
          src={course.image}
          alt={course.lenguage}
          className="h-[250px] w-full object-cover"
        />
      </div>
      <div className="bg-[#1E68AD] h-[45%] w-full flex flex-col justify-start">
        <div className=" w-full h-[50px]  flex flex-row items-center justify-center">
          <img
            src={`/img/${course.language}.png`}
            alt={course.lenguage}
            className="h-[30px] w-[30px] m-[10px] "
          />
          {location.pathname !== "/favorite" && (
            <div className="">
              {isFav ? (
                <button
                  onClick={handleFavorite}
                  className=" absolute top-2 right-2 text-2xl "
                >
                  ❤️
                </button>
              ) : (
                <button
                  onClick={handleFavorite}
                  className=" absolute top-2 right-2 text-2xl "
                >
                  🤍
                </button>
              )}
            </div>
          )}
          {location.pathname === "/favorite" && (
            <div>
              <button
                onClick={handleRemoveFromFavorites}
                className=" absolute top-2 right-2 text-3xl "
              >
                <RxCrossCircled className="bg-white rounded-[15px]" />
              </button>
            </div>
          )}
          <p className="text-white text-[30px] ">{t(`LANGUAGE_${course.language.toUpperCase()}`)}</p>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <FaRankingStar className="text-[40px] text-yellow-400 m-[50px] " />
          <p className="text-white text-[20px]">{t(`NIVEL_${course.level.toUpperCase()}`)}</p>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <GrSchedule className="text-[40px] text-yellow-400 m-[50px] " />

          <p className="text-white text-[20px]">{t(`SCHEDULE_${course.schedule.toUpperCase()}`)}</p>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <LuCalendarSearch className="text-[40px] text-yellow-400 m-[50px] " />
          <p className="text-white text-[20px]">{t(`DURACION_${course.duration.toUpperCase()}`)}</p>
        </div>
      </div>
      <div className="bg-sky-700 h-[15%] w-full text-xl  grid grid-cols-2 items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <Link
            to={`/detail/${course._id}`}
            className="bg-white w-[80%] h-[70%] rounded-[10px] flex flex-row items-center justify-center hover:bg-yellow-500"
          >
            <button className="text-black flex  items-center justify-center h-[30px]">
              <FaShoppingBasket className="mr-1" /> {t("OBTENER AHORA")}
            </button>
          </Link>
        </div>
        <div className="bg-white w-[90%] h-[70%] rounded-[10px] flex flex-row items-center justify-center hover:bg-yellow-500 ">
          {isCart ? (
            <button
              className="text-black w-full h-full flex items-center justify-center cursor:pointer "
              onClick={handleCart}
            >
              <RxCross2 className=" mr-1" />
              {t("ELIMINAR DEL CARRITO CARD")}
            </button>
          ) : (
            <button
              className="text-black w-full flex items-center justify-center h-full cursor:pointer"
              onClick={handleCart}
            >
              <FaCartShopping className=" mr-1" />
              {t("AGREGAR AL CARRITO CARD")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
