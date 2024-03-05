import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLanguage } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import { TbMessageLanguage } from "react-icons/tb";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { Card } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addCart, deleteCart, getCartDB } from "../../redux/action/actions";

import { FaBookAtlas } from "react-icons/fa6";

import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";

const URL = import.meta.env.VITE_URL_HOST;

function HomeC() {
  const sortByDescending = (data) => {
    return data.sort((a, b) => b.price - a.price);
  };
  const sortByAscending = (data) => {
    return data.sort((a, b) => a.price - b.price);
  };
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("all");
  const [level, setLevel] = useState("all");
  const [num, setNum] = useState("all");
  const [courses, setCourses] = useState([]);

  const [cartCourse, setCartCourse] = useLocalStorage("cart", [])
  const [isInCart, setIsInCart] = useState(false);

  const removeFromCart = (id) => {
    const updatedCart = cartCourse.filter((course) => course._id !== id);
    setCartCourse(updatedCart);
    setIsInCart(false);
  };

  const { t, i18n } = useTranslation();

  // useEffect(()=>{
  //   dispatch(getCartDB(userData._id))
  // })

  const [pagePosition, setPagePosition] = useState(1);
  const itemsOnPage = 2;
  const nextPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition < pageNum) {
        return prevPagePosition + 1;
      } else {
        return prevPagePosition;
      }
    });
  };
  const prevPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition > 1) {
        return prevPagePosition - 1;
      } else {
        return prevPagePosition;
      }
    });
  };

  useEffect(() => {
    setPagePosition(1);
  }, [courses]);

  const pageNum = Math.ceil(courses.length / itemsOnPage);
  const itemsArray = Array.from({ length: pageNum }, (_, index) =>
    courses.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
  );

  const renderCards = itemsArray[pagePosition - 1] || [];

  useEffect(() => {
    const getAllCourse = async () => {
      const response = await axios.get(
        `${URL}/getCourseFilters?language=${language}&level=${level}`
      );

      if (num === "A" || num === "all") {
        const sortedData = sortByDescending(response.data);

        setCourses(sortedData);
      } else {
        const sortedData = sortByAscending(response.data);

        setCourses(sortedData);
      }
    };

    getAllCourse();
  }, [language, level, num]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(`${URL}/getAllCourses`);

        if (response.data) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getCourses();
  }, []);

  const handleChangeLanguage = (e) => {
    const value = e.target.value;

    setLanguage(value);
  };

  const handleChangeLevel = (e) => {
    const value = e.target.value;

    setLevel(value);
  };

  const handleChangeNum = (e) => {
    const value = e.target.value;

    setNum(value);
  };

  return (
    <div className="w-full h-[90vh] mt-[80px] flex flex-row">
      <div className="h-full  min-w-[300px] text-black justify-start bg-gradient-to-r bg-[#1E68AD] relative flex flex-col items-center">
        <div className="w-full  text-center flex flex-col items-center justify-center">
          <FaLanguage className="text-[80px] text-yellow-400" />
          <p className="text-[25px] m-[10px] text-yellow-400">
            {t("BUSCA_IDIOMA")}
          </p>
        </div>
        <div className=" w-full h-full flex flex-col items-center justify-evenly ">
          <div className="bg-[#1e417a] w-full h-[50px] flex flex-row items-center justify-evenly">
            <RiMoneyDollarCircleLine className="text-[30px] text-white " />
            <p className="text-[20px] text-white">{t("PRECIO")}</p>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="orderPrice"
            id="orderPrice"
            defaultValue="all"
            onChange={handleChangeNum}
          >
            <option value="all">{t("PRECIO_CURSO")}</option>
            <option value="B">{t("MIN_A_MAX")}</option>
            <option value="A">{t("MAX_A_MIN")}</option>
          </select>
          <div className="bg-[#1e417a] w-full h-[50px]  flex flex-row items-center justify-evenly">
            <FaRankingStar className="text-[30px] text-white " />
            <p className="text-[20px] text-white">{t("NIVEL_CURSO")}</p>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="filterLevel"
            id="filterLevel"
            onChange={handleChangeLevel}
            defaultValue="all"
          >
          <option value="all">{t("NIVEL_IDIOMA")}</option>
          <option value="Principiante">{t("PRINCIPIANTE")}</option>
          <option value="Intermedio">{t("INTERMEDIO")}</option>
          <option value="Avanzado">{t("AVANZADO")}</option>

          </select>
          <div className="bg-[#1e417a] w-full h-[50px]  flex flex-row items-center justify-evenly">
            <TbMessageLanguage className="text-[30px] text-white" />
            <p className="text-[20px] text-white">{t("IDIOMA")}</p>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="filterLanguage"
            id="filterLanguage"
            onChange={handleChangeLanguage}
            defaultValue="all"
          >
          <option value="all">{t("IDIOMA")}</option>
          <option value="Ingles">{t("INGLES")}</option>
          <option value="Frances">{t("FRANCES")}</option>
          <option value="Aleman">{t("ALEMAN")}</option>
          <option value="Italiano">{t("ITALIANO")}</option>
          <option value="Holandes">{t("HOLANDES")}</option>
          <option value="Portugues">{t("PORTUGUES")}</option>

          </select>
        </div>
      </div>

      <div className="flex flex-col items-start justify-star h-full w-full relative">
        <div className=" w-[600px] border-b-[2px] border-[#848484] my-[10px] mx-[90px]">
          <h1 className="text-[35px] text-[#1F1F1F] m-[2px]">
            {t("CURSOS_ENCONTRADOS")}: {courses.length}
          </h1>
        </div>
        {courses && courses.length > 0 ? (
          <>
            <div className="flex justify-evenly items-center h-[80%] w-full">
              {renderCards.map((element) => (
                <Card
                  key={element._id}
                  course={element}
                  removeFromCart={removeFromCart} 
                />
              ))}
            </div>

            <div className="h-[30px] items-center justify-evenly flex flex-row w-full">
              <IoIosArrowDropleft
                className={`text-[50px] ${
                  pagePosition === 1
                    ? "opacity-30 cursor-not-allowed"
                    : "cursor-pointer"
                } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                onClick={pagePosition === 1 ? null : prevPage}
              />
              <div className="w-[50px] flex items-center justify-center">
                <h1 className="text-[30px] text-black">{`${pagePosition}`}</h1>
              </div>
              <IoIosArrowDropright
                className={`text-[50px] ${
                  pagePosition === pageNum
                    ? "opacity-30 cursor-not-allowed"
                    : "cursor-pointer"
                } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                onClick={pagePosition === pageNum ? null : nextPage}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-evenly items-center h-[80%] w-full">
              <div className="flex items-center text-3xl font-bold text-black w-full h-[80%] flex-col justify-evenly">
                <FaBookAtlas className="text-[150px] ml-[50px] text-gray-600" />
                <h1 className="text-[60px] text-gray-600 ml-[50px]">
                  {t("NO SE HAN ENCONTRADO CURSOS")}
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeC;
