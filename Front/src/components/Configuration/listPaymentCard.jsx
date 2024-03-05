export default function ListPaymentCard({
  language,
  level,
  price,
  duration,
  img,
  schedule
}) {
  return (
    language?  ( <div className="w-full h-[80px] flex flex-row px-[30px] border-b-[1px] border-gray-205">
    <div className="h-full w-[10%] flex items-center justify-center">
      <img src={img} className="w-[70px] h-[70px]"></img>
    </div>
    <div className="h-full w-[18%]  flex flex-col items-center justify-center">
    <h1 className="text-[17px] text-gray-700" >Lenguaje</h1>
      <h1 className="text-[17px]">{language}</h1>
    </div>
    <div className="h-full w-[18%]  flex flex-col items-center justify-center">
    <h1 className="text-[17px] text-gray-700" >Level</h1>
      <h1 className="text-[17px]">{level}</h1>
    </div>
    <div className="h-full w-[18%]  flex flex-col items-center justify-center">
    <h1 className="text-[17px] text-gray-700" >Horario</h1>
      <h1 className="text-[17px]">{schedule}</h1>
    </div>
    <div className="h-full w-[18%]  flex flex-col items-center justify-center">
    <h1 className="text-[17px] text-gray-700" >Duracion</h1>
      <h1 className="text-[17px]">{duration}</h1>
    </div>
    <div className="h-full w-[18%]  flex flex-col items-center justify-center">
    <h1 className="text-[17px] text-gray-700" >Precio</h1>
      <h1 className="text-[17px]">${price}</h1>
    </div>
  </div>) : null
   
  );
}
