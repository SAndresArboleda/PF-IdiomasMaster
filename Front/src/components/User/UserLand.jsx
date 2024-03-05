import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { userCourses } from "../Admin/userData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserCourseCard from "./UserCourseCard";
import React from "react";
import Slider from "react-slick";
import { productData } from "../Admin/userData";
import UserPromoCard from "./UserPromoCard";
import UserDashboard from "./UserDashboard";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useTranslation } from "react-i18next";

export default function UserLanding() {
  const [userInfo, setUserInfo] = useState([]);
  const [beginnerData, setBeginnerData] = useState([]);
  const [popularData, setPopularData] = useState([]);
  const [weekendData, setWeekendData] = useState([]);
  const [userData, setUserData] = useLocalStorage("userData", {});
  const { t , i18n} = useTranslation()


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          color: "gray",
          borderRadius: "50px",
          position: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "19px",
          width: "20px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          color: "gray",
          borderRadius: "50px",
          position: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "19px",
          width: "20px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const userFetch = async () => {
      try {
        const response = await userCourses(userData._id);
        console.log(response)

        if (response) {
          setUserInfo(response.data);
        }
      } catch (error) {
        return error.message;
      }
    };

    userFetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productData();
        if (response) {
          filterData(response.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = (data) => {
    const beginnerCourses = data.filter(
      (element) => element.level === "Principiante"
    );
    setBeginnerData(beginnerCourses);

    const popularCourses = data.filter((element) => element.rank === 5);
    setPopularData(popularCourses);

    const weekendCourses = data.filter(
      (element) => element.schedule === "Fines de semana"
    );
    setWeekendData(weekendCourses);
  };

  return (
    <div className="w-full h-full mt-[80px] bg-white text-white">
      <div className="flex justify-end items-center w-full h-[80px] bg-[#1E68AD]">
        <div className="mr-10">
          <SearchBar></SearchBar>
        </div>
      </div>
      <div id="landing_descripton" className="w-full h-[530px] relative flex flex-col items-center justify-evenly bg-white">
        <UserDashboard userInfo={userInfo}/>
      </div>
     
        {userInfo && userInfo.length > 0 && (
          <>
           <div id="landing_descripton" className="w-full h-[420px] relative flex flex-col items-center justify-evenly bg-white">
            <div className="w-[90%] h-[50px]">
              <h1 className="text-black text-[30px] border-b-[1px] border-black">
                {t("MIS CURSOS")}
              </h1>
            </div>
            <div className="w-[90%] h-[90%] bg-white">
              <Slider {...settings} className="w-[full] h-[90%] flex flex-col items-center justify-center bg-white">
                {userInfo.map((element) => (
                  <UserCourseCard
                    key={element._id}
                    id={element._id}
                    language={element.language}
                    level={element.level}
                    schedule={element.schedule}
                    start_time={element.start_time}
                    duration={element.duration}
                  />
                ))}
              </Slider>
            </div>
            </div>
          </>
        )}
      
      <div id="landing_descripton" className="w-full h-[620px] relative flex flex-col items-center justify-evenly bg-white">
        <div className="w-[90%] h-[50px]">
          <h1 className="text-black text-[30px] border-b-[1px] border-black">
            {t("MAS POPULARES")}
          </h1>
        </div>
        <div className="w-[90%] h-[90%] bg-white">
          <Slider {...settings} className="w-full h-[90%] flex items-center justify-center">
            {popularData && popularData.length > 0 && popularData.map((element) => (
              <UserPromoCard
                key={element._id}
                id={element._id}
                language={element.language}
                level={element.level}
                schedule={element.schedule}
                start_time={element.start_time}
                duration={element.duration}
                image={element.image}
                name={"Popular"}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div id="landing_descripton" className="w-full h-[620px] relative flex flex-col items-center justify-evenly bg-white">
        <div className="w-[90%] h-[50px]">
          <h1 className="text-black text-[30px] border-b-[1px] border-black">
            {t("COMIENZA HOY UNA NUEVA AVENTURA")}
          </h1>
        </div>
        <div className="w-[90%] h-[90%] bg-white">
          <Slider {...settings} className="w-full h-[90%] flex items-center justify-center">
            {beginnerData && beginnerData.length > 0 && beginnerData.map((element) => (
              <UserPromoCard
                key={element._id}
                id={element._id}
                language={element.language}
                level={element.level}
                schedule={element.schedule}
                start_time={element.start_time}
                duration={element.duration}
                image={element.image}
                name={"Begginer"}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div id="landing_descripton" className="w-full h-[620px] relative flex flex-col items-center justify-evenly bg-white">
        <div className="w-[90%] h-[50px]">
          <h1 className="text-black text-[30px] border-b-[1px] border-black">
            {t("CURSOS DE FIN DE SEMANA")}
          </h1>
        </div>
        <div className="w-[90%] h-[90%] bg-white">
          <Slider {...settings} className="w-full h-[90%] flex items-center justify-center">
            {weekendData && weekendData.length > 0 && weekendData.map((element) => (
              <UserPromoCard
                key={element._id}
                id={element._id}
                language={element.language}
                level={element.level}
                schedule={element.schedule}
                start_time={element.start_time}
                duration={element.duration}
                image={element.image}
                rank={element.rank}
                name={"Weekend"}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
  
}
