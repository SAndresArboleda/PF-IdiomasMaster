
import { useEffect, useState } from "react";
import { GoCodeReview } from "react-icons/go";

export default function DashReviews({data}){

    const[InactiveProduct, setInactiveProducts] = useState([]);

    useEffect(() => {

        const inactive = data.filter((element) => !element.reply);
        setInactiveProducts(inactive)


    }, [data])

    return(
        <div className="bg-blue-200 h-[90%] w-[90%] rounded-[10px] bg-gradient-to-r from-green-500 to-green-700 flex flex-col">
          <div className="w-full h-[30%]  flex flex-row items-center pl-[50px]">
          <GoCodeReview  className="text-white text-[35px] mr-[20px]" />
            <h1 className="text-white text-[35px]">{`Comentarios`}</h1>
          </div>
         <div className="w-full h-[65%] flex flex-row">
            <div className="h-full w-[50%]  border-r-[1px] border-white">
                <div className="w-full h-[20%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[20px]">En espera Respuesta</h1>
                </div>
                <div className="w-full h-[70%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[70px]">{`${InactiveProduct.length}`}</h1>
                </div>
            </div>
            <div className="h-full w-[50%]  ">
            <div className="w-full h-[20%]  flex items-center justify-center">
                    <h1 className="text-white text-[20px]">Comentarios Activos</h1>
                </div>
                <div className="w-full h-[70%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[70px]">{`${data.length}`}</h1>
                </div>
            </div>

         </div>
        
        </div>
    )
}