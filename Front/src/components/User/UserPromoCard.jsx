import { FaStar } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import { LuCalendarSearch } from "react-icons/lu";
import { BsCalendar2DayFill } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UserPromoCard({
  id,
  language,
  level,
  schedule,
  start_time,
  duration,
  image,
  name,
  rank
}) 

{
  const { t , i18n} = useTranslation()
  const navigate = useNavigate()

  const handleNavigate = () => {
   navigate(`/detail/${id}`)}



  return (
    <div className="w-[98%] h-[500px] bg-white flex items-center justify-center" onClick={handleNavigate}>
    <div className="w-[95%] h-[90%] border-[1px] border-gray-70 bg-white cursor-pointer shadow-md shadow-black/10 overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-black/20 relative group:">
      <div className="bg-[#1E68AD] flex items-center justify-center w-full h-[25%] relative">
        <h1 className="text-[25px]">{t(`LANGUAGE_${language.toUpperCase()}`)}</h1>
        <img src={`/img/${language}.png`} alt={language} className='h-[30px] w-[30px] m-[10px] '/>
        {name && name === "Popular" && (<FaStar className="text-[60px] text-yellow-400 absolute top-3 right-6" />)}
        {name && name === "Begginer" && (<GrLanguage className="text-[50px] text-yellow-400 absolute top-3 right-6" />)}
        {name && name === "Weekend" && (<BsCalendar2DayFill className="text-[50px] text-yellow-400 absolute top-3 right-6" />)}
        
      </div>

      <div className= "flex items-center justify-center w-full h-[50%] relative">
      <img src={image} alt={image} className="w-full h-full"></img>
      <div className="absolute bg-transparent w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-white">
        <div className="w-full h-[70px] flex flex-row items-center justify-start">
          <FaRankingStar className="text-[40px] text-black m-[30px] "/>
          <h2 className="text-black text-[20px]">{t(`NIVEL_${level.toUpperCase()}`)}</h2>
        </div>
        <div className="w-full h-[70px] flex flex-row items-center justify-start">
          <GrSchedule className="text-[40px] text-black m-[30px] "/>
          <h2 className="text-black text-[20px]">{t(`SCHEDULE_${schedule.toUpperCase()}`)}</h2>
        </div>
        <div className="w-full h-[60px] flex flex-row items-center justify-start">
          <LuCalendarSearch className="text-[40px] text-black m-[30px] "/>
          <h2 className="text-black text-[20px]">{start_time.slice(0, 10)}</h2>
        </div>
      </div>
      </div>
     
      <div className="bg-yellow-400 flex items-center justify-center w-full h-[25%]">
        <h1 className="text-[25px] text-black ">{t(`DURACION_${duration.toUpperCase()}`)}</h1>
      </div>
    </div>
  </div>
  
  );
}
