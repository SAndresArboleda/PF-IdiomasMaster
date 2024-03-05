import { IoRocketSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function UserCourseCard({
  id,
  language,
  level,
  schedule,
  start_time,
  duration,
}) {

  const navigate = useNavigate()
  const { t , i18n} = useTranslation()
  
  const handleNavigate = () => {

   navigate(`/detail/${id}`)}

 

  return (
    <div className="w-[98%] h-[360px] bg-white flex items-center justify-center " onClick={handleNavigate}>
      <div className="w-[95%] h-[90%] border-[1px] border-gray-70 bg-white cursor-pointer shadow-md shadow-black/10 grid grid-rows-5  overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-black/20">
        <div className="bg-[#1E68AD] flex items-center justify-center">
          <h1 className="text-[25px]">{t(`LANGUAGE_${language.toUpperCase()}`)}</h1>
          <img src={`/img/${language}.png`} alt={language} className='h-[30px] w-[30px] m-[10px] '/>
        </div>
        <div className=" flex items-center justify-center">
          <h1 className="text-[25px] text-black">{t(`NIVEL_${level.toUpperCase()}`)}</h1>
        </div>
        <div className=" flex items-center justify-center">
          <h1 className="text-[25px] text-black">{t(`SCHEDULE_${schedule.toUpperCase()}`)}</h1>
        </div>
        <div className=" flex items-center justify-center w-ful h-full">
        
          <h1 className="text-[25px] text-black">{start_time.slice(0, 10)}</h1>
          <IoRocketSharp className="text-[40px] ml-[20px] text-[#2c5392]" />
        </div>
        <div className=" bg-yellow-400 flex items-center justify-center">
          <h1 className="text-[25px] text-black ">{t(`DURACION_${duration.toUpperCase()}`)}</h1>
        </div>
      </div>
    </div>
  );
}
