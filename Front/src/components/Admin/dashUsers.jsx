
import { useEffect, useState } from "react";
import { TbUsersGroup } from "react-icons/tb";

export default function DashUsers({data}){

    const[activeProduct, setActiveProducts] = useState([]);
    const[InactiveProduct, setInactiveProducts] = useState([]);

    useEffect(() => {

        const active = data.filter((element) =>  element.status === true)
        setActiveProducts(active)

        const inactive = data.filter((element) =>  element.status === false)
        setInactiveProducts(inactive)


    }, [data])

    return(
        <div className="bg-blue-200 h-[90%] w-[90%] rounded-[10px] bg-gradient-to-r from-red-500 to-orange-500 flex flex-col">
          <div className="w-full h-[30%]  flex flex-row items-center pl-[50px]">
          <TbUsersGroup className="text-white text-[35px] mr-[20px]" />
            <h1 className="text-white text-[35px]">{`Usuarios  (${data.length})`}</h1>
          </div>
         <div className="w-full h-[65%] flex flex-row">
            <div className="h-full w-[50%]  border-r-[1px] border-white">
                <div className="w-full h-[20%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[20px]">Usuarios Inactivos</h1>
                </div>
                <div className="w-full h-[70%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[70px]">{`${InactiveProduct.length}`}</h1>
                </div>
            </div>
            <div className="h-full w-[50%]  ">
            <div className="w-full h-[20%]  flex items-center justify-center">
                    <h1 className="text-white text-[20px]">Usuarios Activos</h1>
                </div>
                <div className="w-full h-[70%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[70px]">{`${activeProduct.length}`}</h1>
                </div>
            </div>

         </div>
        
        </div>
    )
}