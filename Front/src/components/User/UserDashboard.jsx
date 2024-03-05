import { useState, useEffect } from "react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import UserDashboardCard from "./UserDashboardCard";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function UserDashboard({ userInfo }) {
  const [userData] = useLocalStorage("userData", {});
  const [idiomas, setIdiomas] = useState({});
  const { t, i18n } = useTranslation();

  console.log(userInfo);

  useEffect(() => {
    const obtenerNivelesMasAltos = () => {
      const niveles = {
        Principiante: 1,
        Intermedio: 2,
        Avanzado: 3,
      };

      const nivelesMasAltos = {};

      userInfo.forEach((curso) => {
        const { language, level } = curso;

        if (
          !nivelesMasAltos[language] ||
          nivelesMasAltos[language] < niveles[level]
        ) {
          nivelesMasAltos[language] = niveles[level];
        }
      });

      setIdiomas(nivelesMasAltos);
    };

    obtenerNivelesMasAltos();
  }, [userInfo]);


  return (
    <div className="w-[90%] h-full px-[40px] flex flex-row border-[1px] border-gray-100 my-[20px] rounded-[10px] shadow-lg shadow-black/10 bg-gradient-to-r from-gray-200 via-white to-gray-200">
      <div className="h-full w-[50%] flex flex-col items-center justify-center">
        <div className="w-full h-[15%] flex items-center justify-center">
          <h1 className="text-[40px] text-black">
            {`${t("HOLA")}, ${userData.name} ${userData.lastname} 👋!`}
          </h1>
        </div>
        <div className="w-[400px] h-[400px] flex items-center justify-center overflow-hidden rounded-[100%]">
          {userData.img ? (
            <img
              src={userData.img}
              alt={userData.img}
              className="w-full h-full"
            />
          ) : (
            <img
              src="/img/avatar_land.png"
              alt="avatar_landing"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
      <div className="h-full w-[50%] flex flex-col items-center justify-center">
        <div className="w-full h-[15%] flex items-center justify-center">
          <h1 className="text-[40px] text-black">{t("TU PROGRESO")} 🏆</h1>
        </div>
        {userInfo && userInfo.length > 0 ? (
          <>
            <div className="w-full h-[370px] grid grid-rows-6 gap-[6px] p-[10px] rounded-[10px] border-gray-200 shadow-md shadow-black/10 bg-gradient-to-r from-yellow-400 to-orange-400">
              {Object.entries(idiomas).map(([idioma, nivel], index) => (
                <UserDashboardCard
                  key={index}
                  index={index}
                  idioma={idioma}
                  nivel={nivel}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-[400px] flex flex-col items-center justify-evenly p-[10px] rounded-[10px] border-gray-200 shadow-md shadow-black/10 bg-gradient-to-r from-yellow-400 to-orange-400">
              <FaMagnifyingGlassPlus className="text-[90px] text-black" />
              <h1 className="text-[50px] text-black">
                {" "}
                {t("AUN NO TIENES CURSOS")}
              </h1>
              <h1 className="text-[50px] text-black">
                {t("EXPLORA NUESTROS CURSOS")}
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
