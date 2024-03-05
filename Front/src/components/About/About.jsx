import Slider from "react-slick";
import AboutCard from "./AboutCard";
import Us from "./Us";
import { useTranslation } from "react-i18next";


export const About = () => {

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "80px",
    slidesToShow: 3,
    speed: 500
  };




  const { t, i18n } = useTranslation()


  return (
    <div className="w-full h-[110vh] mt-[80px] flex flex-col items-center justify-center">
      <div className="w-full h-[40%] flex  flex-col items-center justify-center">
        <div className="w-full h-[40%] flex justify-center">
          <h1 className="text-[60px] font-bold bg-gradient-to-r from-blue-700 to-pink-600 text-transparent bg-clip-text">{t("NUESTRO PROYECTO")}</h1>
        </div>
        <div className="w-[70%] h-[70%] flex items-center justify-center ">
          <h1 className="text-[20px]">
            {t("EL_INTERES")}
          </h1>
        </div>
      </div>
      <div className="w-[1300px] h-[1000px] flex flex-col">
        <div className="w-full h-[150px] flex items-center justify-center">
          <h1 className="text-[60px] font-bold bg-gradient-to-r from-red-500 to-amber-500 text-transparent bg-clip-text">{t("NUESTRO EQUIPO")}</h1>
        </div>
        <Slider {...settings}>
          {Us.map((element) => (
            <AboutCard
              key={element.name}
              name={element.name}
              Location={element.Location}
              gitHub={element.gitHub}
              email={element.email}
              linkedIn={element.linkedIn}
              img={element.img}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
