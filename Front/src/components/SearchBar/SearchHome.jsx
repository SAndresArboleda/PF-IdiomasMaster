import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { FaLanguage } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";



export const SearchHome = () => {


  // const searchName = useSelector(state => state.coursesName);
  // const searchLanguage = useSelector(state => state.courseLanguage);

  const { t, i18n } = useTranslation()

  const searchName = useSelector(state => state.coursesName)
  const searchLanguage = useSelector(state => state.courseLanguage)

  var language = searchLanguage.charAt(0).toUpperCase() + searchLanguage.slice(1).toLowerCase();

  const sortByDescending = (data) => {
    return data.sort((a, b) => b.price - a.price);
  };
  const sortByAscending = (data) => {
    return data.sort((a, b) => a.price - b.price);
  };


  // Estados Locales 

  const [level, setLevel] = useState("all");
  const [num, setNum] = useState("all");
  const [courses, setCourses] = useState([]);
  const [pagePosition, setPagePosition] = useState(1);
  const itemsOnPage = 2;

  useEffect(() => {
    setPagePosition(1);
  }, [courses]);

  const pageNum = Math.ceil(courses.length / itemsOnPage);
  const itemsArray = Array.from({ length: pageNum }, (_, index) =>
    courses.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
  );
  const renderCards = itemsArray[pagePosition - 1] || [];

  useEffect(() => {
    setCourses(searchName);
  }, [searchName]);

  useEffect(() => {
    const getAllCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getCourseFilters?language=${searchName[0].language}&level=${level}`
        );

        let sortedData = response.data;
        if (num === "A" || num === "all") {
          sortedData = sortedData.sort((a, b) => b.price - a.price);
        } else {
          sortedData = sortedData.sort((a, b) => a.price - b.price);
        }

        setCourses(sortedData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getAllCourse();
  }, [level, num]);

  const handleChangeLevel = (e) => {
    const value = e.target.value;
    setLevel(value);
  };

  const handleChangeNum = (e) => {
    const value = e.currentTarget.value;
    setNum(value);
  };

  const nextPage = () => {
    setPagePosition(prevPagePosition =>
      prevPagePosition < pageNum ? prevPagePosition + 1 : prevPagePosition
    );
  };

  const prevPage = () => {
    setPagePosition(prevPagePosition =>
      prevPagePosition > 1 ? prevPagePosition - 1 : prevPagePosition
    );
  };

  return (
    <div className="w-full h-[90vh] mt-[80px] flex flex-row">
      <div className="h-full  min-w-[300px] text-black justify-start bg-gradient-to-r bg-[#1E68AD] relative flex flex-col items-center">
        <div className="w-full h-[200px] flex flex-col items-center justify-center">
          <FaLanguage className="text-[80px] text-yellow-400" />
          <h1 className="text-[25px] m-[10px] text-yellow-400">
            {t("BUSCA_IDIOMA")}
          </h1>
        </div>
        <div className=" w-full h-[450px] flex flex-col items-center justify-evenly ">
          <div className="bg-[#1e417a] w-full h-[50px] flex flex-row items-center justify-evenly">
            <RiMoneyDollarCircleLine className="text-[30px] text-white " />
            <h1 className="text-[20px] text-white">{t("PRECIO")}</h1>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="orderPrice"
            id="orderPrice"
            defaultValue="all"
            onChange={handleChangeNum}
          >

            <option value="all"><h1>{t("PRECIO_CURSO")}</h1></option>
            <option value="B"><h1>{t("MIN_A_MAX")}</h1></option>
            <option value="A"><h1>{t("MAX_A_MIN")}</h1></option>

          </select>
          <div className="bg-[#1e417a] w-full h-[50px]  flex flex-row items-center justify-evenly">
            <FaRankingStar className="text-[30px] text-white " />
            <h1 className="text-[20px] text-white">{t("NIVEL_CURSO")}</h1>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="filterLevel"
            id="filterLevel"
            onChange={handleChangeLevel}
            defaultValue="all"
          >
            <option value="all"><h1>{t("NIVEL_IDIOMA")}</h1></option>
            <option value="Principiante"><h1>{t("PRINCIPIANTE")}</h1></option>
            <option value="Intermedio"><h1>{t("INTERMEDIO")}</h1></option>
            <option value="Avanzado"><h1>{t("AVANZADO")}</h1></option>
          </select>


        </div>
      </div>

      <div className="flex flex-col items-start justify-start bg-white h-full w-[85%] relative">
        <div className='flex '>
          <div className=" w-[900px] border-b-[2px] border-[#848484] my-[10px] mx-[90px]">
            <h1 className="text-[35px] text-[#1F1F1F] m-[2px]">{t("CURSOS_ENCONTRADOS")} {courses.length}</h1>
          </div>
          {/* <div className="bg-[#FF6B6C] h-[40px] flex flex-row items-center justify-center my-[10px] text-black text-[20px] rounded-lg hover:bg-yellow-500 font-medium">
            <Link to='/home'>
            <h1 className="m-4">{t("VER_MAS_CURSOS")}</h1>
            </Link>
          </div> */}
        </div>
        <div className="flex justify-evenly items-center h-[75%] w-full">
          {courses &&
            courses.length > 0 &&
            renderCards.map((element, index) => (

              <Card course={element} />

            ))}
        </div>

        <div className="h-[70px] items-center justify-center flex flex-row w-full">
          <IoIosArrowDropleft
            className={`text-[50px] m-[30px] ${pagePosition === 1 ? "cursor-not-allowed" : "cursor-pointer"
              } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
            onClick={prevPage}
            disabled={pagePosition === 1}
          />
          <div className="w-[50px] flex items-center justify-center">
            <h1 className="text-[30px] m-[30px] text-black">{`${pagePosition}`}</h1>
          </div>
          <IoIosArrowDropright
            className={`text-[50px] m-[30px] ${pagePosition === pageNum ? "cursor-not-allowed" : "cursor-pointer"
              } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
            onClick={nextPage}
            disabled={pagePosition === pageNum}
          />
        </div>
      </div>
    </div>
  );
}