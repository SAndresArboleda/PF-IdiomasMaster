import { useSelector, useDispatch } from "react-redux";
import { SearchBar } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import Landing_card from "../Landing_card/Landing_card";
import Landing_reviews from "../Landing_reviews/Landing_reviews";
import { postThirdPartyUser, setUserdata } from "../../redux/action/actions"; // Importa la acción adecuada
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { getGoogleUser } from "../Admin/userData";
import { useTranslation } from "react-i18next";

import { useTypewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const [num, setNum] = useState(1);
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [userData, setUserDataLocally] = useLocalStorage("userData", {
    // email: "",
    // password: "",
  });
  const card_landing_data = [
    {
      img: "/img/landing_card01.png",
      title: t("PRESENCIAL_O_EN_LINEA"),
      description: t("APRENDE_EN_TIEMPO_REAL"),
    },
    {
      img: "/img/landing_card02.png",
      title: t("GRUPAL_O_CLASES_PRIVADAS"),
      description: t("CURSOS_DISEÑADOS"),
    },
    {
      img: "/img/landing_card03.png",
      title: t("DE_PRINCIPIANTE_A_AVANZADO"),
      description: t("CURSOS_DISEÑADOS"),
    },
  ];
  const card_landing_reviews = [
    {
      img: "/img/student_02.png",
      review: t("INCREIBLE_EXPERIENCIA"),
      name: "Alejandra, Ramirez",
      location: "Bogota, Colombia",
    },
    {
      img: "/img/student_03.png",
      review: t("TRANSFORMADOR"),
      name: "Jorge, Calabria",
      location: "Buenos Aires, Argentina",
    },
  ];
  const landing_string = [
    {
      title: t("HACER_LO_IMPOSIBLE_ES"),
      word: t("DIVERTIDO"),
      color:
        "text-[120px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-700 shadow-text",
    },
    {
      title: t("SUPERAR_DESAFIOS_ES"),
      word: t("EMOCIONANTE"),
      color:
        "text-[120px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-700",
    },
    {
      title: t("BUSCAR_NUEVAS_OPORTUNIDADES_ES"),
      word: t("ENERGIZANTE"),
      color:
        "text-[120px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-green-700",
    },
    {
      title: t("EXPLORAR_HORIANTES_ES"),
      word: t("INCREIBLE"),
      color:
        "text-[120px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-red-700",
    },
    {
      title: t("DESAFIAR_LIMITES_ES"),
      word: t("INSPIRADOR"),
      color:
        "text-[120px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-700",
    },
  ];

  const [typeEffect] = useTypewriter({
    words: [landing_string[num].word],
    loop: {},
  });

  const navigate = useNavigate();



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated && user && user.email) {
          const response = await getGoogleUser({
            email: user.email,
            name: user.given_name,
            lastname: user.family_name,
            image: user.picture,
          });

          if (response && response.data) {
            const updatedUserData = {
              ...userData,
              ...response.data,
              isAuthenticated: true,
            };

            setUserDataLocally(updatedUserData);
            dispatch(setUserdata(updatedUserData));
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user, setUserDataLocally, dispatch]);

  useEffect(() => {
    if (typeEffect.length === 0 && num === 4) {
      setNum(0);
    }
    if (typeEffect.length === 0 && num <= 3) {
      setNum(num + 1);
    }
  }, [typeEffect]);

  return (
    <div className="w-full h-[150px] bg-black text-white">
      <div className="flex justify-end items-end w-full h-full bg-[#1E68AD]">
        <div className="mr-5 mb-3">
          <SearchBar></SearchBar>
        </div>
      </div>

      <div className="flex  col justify-end items-center w-full h-[600px] relative bg-white">
        <div className=" flex w-full h-full absolute  bg-gradient-to-r from-black via-white/10 to-white/0 ">
          <div className="h-full w-full items-start pl-[30px] justify-center flex flex-col">
            <p className="text-[40px] text-white font-semibold border-b-4 border-white">{`${landing_string[num].title}`}</p>
            <div className={`${landing_string[num].color} `}>
              <div className="h-[200px]">
                <span className={landing_string[num].color}>{typeEffect}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full h-full  ">
          <img
            src={`img/Rail_0${num}.png`}
            className="object-cover "
            alt="Imagen"
          />
        </div>
      </div>
      <div
        id="landing_descripton"
        className="w-full h-[420px] relative flex items-center justify-evenly bg-white"
      >
        <div
          id="main_landing_card"
          className=" flex justify-between items-center h-full w-full   "
        >
          {card_landing_data.map((element, index) => (
            <Landing_card
              key={index}
              img={element.img}
              title={element.title}
              description={element.description}
            />
          ))}
        </div>
      </div>
      {/* <marquee direction="left" behavior="alternate" scrollamount="5" className="text-black">
        <div className="w-full h-[50px] bg-white text-black">
        Texto en movimiento...
        </div>
        
        
        </marquee> */}
      <div className="flex flex-row items-center justify-evenly w-full h-[600px] relative bg-[#ff5555]">
        {card_landing_reviews.map((element, index) => (
          <Landing_reviews
            img={element.img}
            key={index}
            review={element.review}
            name={element.name}
            location={element.location}
          />
        ))}
      </div>
    </div>
  );
};
