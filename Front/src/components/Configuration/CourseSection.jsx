import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserCourses } from "../../redux/action/actions";
import { RiShareLine } from "react-icons/ri";
import { SiShopee } from "react-icons/si";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";import { useTranslation } from "react-i18next";


const CourseSection = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const userCourses = useSelector((state) => state.userCourses);
  const [userData, setUserData] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
    const { t , i18n} = useTranslation()
    
  useEffect(() => {
    dispatch(getAllUsers());
    setIsUserLoaded(false);
  }, [user, dispatch]);

  useEffect(() => {
    if (allUsers && !isUserLoaded && !userLogin) {
      allUsers.forEach((u) => {
        if (u.email === user.email) {
          setUserData(u);
          setIsUserLoaded(true);
        }
      });
    }
  }, [allUsers, user, isUserLoaded]);

  useEffect(() => {
    if (userData && isUserLoaded) {
      dispatch(getUserCourses(userData._id));
    }
    if (userLogin) {
      dispatch(getUserCourses(userLogin._id));
    }
  }, [userData]);
  

  return (
    <div className="flex-rows w-full h-full  items-center grid grid-cols-2 gap-[10px] grid-rows-auto overflow-hidden  justify-center p-[10px] overflow-y-scroll relative">
      
      {userCourses && userCourses.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center absolute w-full">
          <SiShopee className="text-[80px] text-gray-600 ml-[50px] font-semibold flex" />
            <p className="text-[60px] text-gray-600 ml-[50px] font-semibold flex">
            {t("AUN NO TIENES CURSOS REALIZADOS")}
            </p>
            
          </div>
        </>
      ) : (
        <>
          {userCourses &&
        userCourses.map((c, index) => (
          <div key={index} className="flex item-center justify-center">
            <div className="bg-white shadow-lg border-[1px] border-gray-200 flex flex-col w-[90%]">
              <img
                src={c.image}
                alt={c.language}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  {t(`LANGUAGE_${c.language.toUpperCase()}`)}
                </h3>
                <p className="text-gray-600 mb-2">{t("NIVEL")}{" "}{t(`NIVEL_${c.level.toUpperCase()}`)}</p>
                <p className="text-gray-600 mb-2"> {t("DURACION_DE")}{" : "}{t(`DURACION_${c.duration.toUpperCase()}`)}</p>
                <p className="text-gray-600 mb-2">
                  {t("EMPIEZA EL DIA")}{c.start_time.split("T")[0]}
                </p>
                <p className="text-gray-600 mb-2">
                  {t("FECHA FINALIZACION")}{" : "}{c.finish_time.split("T")[0]}
                </p>
                <p className="text-gray-600 mb-2">{t("HORARIOS")}{" : "}{t(`SCHEDULE_${c.schedule.toUpperCase()}`)}</p>
                <div className="flex items-center flex-row justify-between mt-4">
                  <div>
                    <p className="text-2xl font-semibold">${c.price}</p>
                  </div>
                  <div >
              
                    <EmailShareButton
                      subject={`Este curso de ${c.language} es Excelente para ti!`}
                      body={`Te recomiendo este curso de ${c.language} ${c.level}, donde podrás aprender mucho!\n El costo solo es ${c.price} dolares y aprenderas mucho como lo he hecho yo\n`}
                      separator={`\n`}
                      url={`\nhttps://idiomasmaster-toqy.onrender.com/detail/${c._id}`}
                    >
                      <EmailIcon />
                    </EmailShareButton>
                    <FacebookShareButton
                      url={`https://idiomasmaster-toqy.onrender.com/`}
                      quote={`Estoy orgulloso de decirles que esto aprendiendo ${c.language} ${c.level} con Idiomas Master`}
                      hashtag={`#IdiomasMaster`}
                    >
                      <FacebookIcon />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      title={`Estas clases de ${c.language} ${c.level} te podrian gustar\n`}
                      separator={`\n`}
                      url={`\nhttps://idiomasmaster-toqy.onrender.com/detail/${c._id}`}
                    >
                      <WhatsappIcon />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </>
      )}
      
      
     
    </div>
  );
};

export default CourseSection;
