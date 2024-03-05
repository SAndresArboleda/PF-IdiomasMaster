import { IoSearchCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { search } from "../../redux/action/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";
const URL = import.meta.env.VITE_URL_HOST;

import { useTranslation } from "react-i18next";



export const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const { t , i18n} = useTranslation()


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.get(`${URL}/getCourse/name?name=${searchTerm}`);
      console.log(data)
      if (Array.isArray(data)) {
        dispatch(search(searchTerm));
  
        Swal.fire({
          icon: 'success',
          title: 'Hora de aprender',
          text: 'Se encontraron cursos con ese nombre.',
          showConfirmButton: false,
          timer: 2200
        }).then(() => {
          setSearchTerm("");
          navigate("/search");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos!',
          text: 'No hay cursos con ese nombre. Por favor, inténtelo de nuevo.'
        });
      }

    } catch (error) {
      console.error('Error en la búsqueda:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos!',
        text: 'No se pudieron buscar los cursos. Por favor, inténtelo de nuevo.'

      });
    }
  };
  
  const handleSearch = (event) => {
    const value = event.target.value
    const aux = value.toLowerCase()
    if(aux === "inglese" || aux === 'anglais' || aux === 'english' || aux === 'ingles'){
      setSearchTerm('ingles');
      return
    }
    if(aux === "spagnolo" || aux === 'espagnol' || aux === 'spanish' || aux === 'español'){
      setSearchTerm('español');
      return
    }
    if(aux === "italiano" || aux === 'italien' || aux === 'italian' ){
      setSearchTerm('italiano');
      return
    }
    if(aux === "francese" || aux === 'français' || aux === 'french' || aux === 'frances'){
      setSearchTerm('frances');
      return
    }
    if(aux === "olandese" || aux === 'néerlandais' || aux === 'dutch' || aux === 'holandes'){
      setSearchTerm('holandes');
      return
    }
    if(aux === "portoghese" || aux === 'portugais' || aux === 'portuguese' || aux === 'portugues'){
      setSearchTerm('portugues');
      return
    }
    setSearchTerm(value)
  }

  // Determine if the button should be disabled based on the length of searchTerm
  const isButtonDisabled = searchTerm.length <= 3;

  return (
    <div className="flex items-center justify-start h-full w-[400px]">
      <input
        placeholder={t("BUSCA_Y_APRENDE_UN_IDIOMA_NUEVO")}
        type="search"
        className="w-[400px] h-[40px] bg-[#ffffff] border-2 border-[#ffffff] rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition"
        onChange={handleSearch}
      />
      <IoSearchCircle
        className={`text-[50px] cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95 ${isButtonDisabled ? 'pointer-events-none opacity-50' : ''}`}
        onClick={!isButtonDisabled ? handleSubmit : null}
        type="submit"
      />
    </div>
  );
};