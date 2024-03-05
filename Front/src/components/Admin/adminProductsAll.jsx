import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productData } from "./userData";

export default function AdminProductsAll({setSettings}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await productData();

      if (response) {
        setData(response.data);
      }
    };

    dataFetch();
  }, []);

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px]">
      <div className="w-full h-[40px]  flex flex-row">
        <div className="h-full w-[5%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Num</h1>
        </div>
        <div className="h-full w-[18%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Id Producto</h1>
        </div>
        <div className="h-full w-[12%]  bg-[#151139] flex items-center justify-center text-white ">
          <h1>Fecha </h1>
        </div>
        <div className="h-full w-[10%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Tipo</h1>
        </div>
        <div className="h-full w-[7%] bg-[#151139]  flex items-center justify-center text-white">
          <h1>Costo</h1>
        </div>
        <div className="h-full w-[7%] bg-[#151139]  flex items-center justify-center text-white">
          <h1>Estudiantes</h1>
        </div>
        <div className="h-full w-[11%] bg-[#151139] flex items-center justify-center text-white">
          <h1>Estado</h1>
        </div>
        <div className="h-full w-[10%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Fecha Inicio</h1>
        </div>
        <div className="h-full w-[10%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Fecha Cierre</h1>
        </div>
        <div className="h-full w-[11%]  bg-[#3b3194]  flex items-center justify-center text-white">
          <h1>Configurar</h1>
        </div>
      </div>
      <div className="bg-[#282a54] w-full h-[96%] max-h-[637px] overflow-y-scroll ">
        {data &&
          data.length > 0 &&
          data.map((element, index) => (
            <ProductCard
              key={element._id}
              index={index + 1}
              id={element._id}
              type={element.language}
              cost={element.price}
              status={element.status}
              date={element.start_time}
              finish={element.finish_time}
              updated={element.updatedAt}
              students={element.students}
              setSettings={{setSettings}}
            />
          ))}
      </div>
    </div>
  );
}
