import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";

const Favorite = () => {
  const [favCourse, setFavCourse] = useState([]);
  const [renderCards, setRenderCards] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [cartCourse, setCartCourse] = useLocalStorage("cart", [])
  const [isInCart, setIsInCart] = useState(false);

  const { t, i18n } = useTranslation()

  const removeFromCart = (id) => {
    const updatedCart = cartCourse.filter((course) => course._id !== id);
    setCartCourse(updatedCart);
    setIsInCart(false);
  };

  const getFav = () => {
    return JSON.parse(localStorage.getItem("fav"));
  };

  useEffect(() => {
    setFavCourse(getFav());
  }, []);

  console.log(favCourse);

  const handleEliminate = () => {
    localStorage.removeItem("fav");
    setFavCourse([]);
    setRenderCards();
    setPageNum();
  };

  // Paginado
  const [pagePosition, setPagePosition] = useState(1);
  const itemsOnPage = 3;
  const nextPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition < pageNum) {
        return prevPagePosition + 1;
      } else {
        return prevPagePosition;
      }
    });
  };
  const prevPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition > 1) {
        return prevPagePosition - 1;
      } else {
        return prevPagePosition;
      }
    });
  };
  useEffect(() => {
    setPagePosition(1);
  }, [favCourse]);

  useEffect(() => {
    if (favCourse === null) {
      return;
    }
    const pageNums = Math.ceil(favCourse.length / itemsOnPage);
    const itemsArray = Array.from({ length: pageNums }, (_, index) =>
      favCourse.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
    );
    const renderCard = itemsArray[pagePosition - 1] || [];
    setRenderCards(renderCard);
    setPageNum(pageNums);
  }, [favCourse, itemsOnPage, pagePosition]);
  // const [cartCourse, setCartCourse] = useLocalStorage("cart", [])
  // const [isInCart, setIsInCart] = useState(false);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favCourse.filter((course) => course._id !== id);
    setFavCourse(updatedFavorites);
    const pageNums = Math.ceil(updatedFavorites.length / itemsOnPage);
    setPageNum(pageNums);
    const itemsArray = Array.from({ length: pageNums }, (_, index) =>
      updatedFavorites.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
    );
    const renderCard = itemsArray[pagePosition - 1] || [];
    setRenderCards(renderCard);
  };

  console.log("favCourse", favCourse)

  return (
    <div className="w-full h-[90vh] mt-[80px] flex flex-col">
      {favCourse && favCourse.length === 0 || favCourse === null ? (
        <>
          <div className="w-full h-[85vh] mt-[80px] flex flex-col">
            <div className="flex justify-center items-center text-3xl font-bold text-black w-full h-[80%]">
              <h1 className="text-[60px] text-gray-600 ml-[50px]">
                {t("NO HAY CURSOS FAVORITOS")}
              </h1>
              <MdOutlineFavorite className="text-[150px] ml-[50px] text-gray-600" />
            </div>
            <div className="flex justify-center items-center text-3xl font-bold text-black w-full h-[20%]">
              <Link
                to="/home"
                className="bg-sky-700 h-[70px] w-[400px] m-6  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-white text-[30px] rounded-lg hover:bg-yellow-500 hover:text-black font-medium cursor:pointer"
              >
                <p>{t("EXPLORA MAS CURSOS")}</p>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-[90%]">
            <div className="w-full h-[15%] flex flex-row bg-white">
              <div className="w-[50%] h-full  flex items-center justify-evenly">
                {favCourse !== null && favCourse.length > 0 ? (
                  <div className=" w-[900px] border-b-[2px] border-[#848484] mt-[5px] mx-[90px]">
                    <h1 className="text-[25px] text-[#1F1F1F] m-[2px]">{`${t("CURSOS FAVORITOS")}: ${favCourse.length}`}</h1>
                  </div>
                ) : (
                  <Link></Link>
                )}
              </div>
              <div className="w-[50%] h-full flex flex-row items-center justify-evenly">
                <div className="bg-sky-700 h-[50px] w-[230px] m-6  flex flex-row items-center justify-center  text-white text-[20px] rounded-lg\ hover:bg-yellow-500 hover:text-black font-medium cursor:pointer">
                  <Link to="/home">
                    <button>{t("VER MAS CURSOS")}</button>
                  </Link>
                </div>
                {favCourse && favCourse.length > 0 ? (
                  <div className="bg-sky-700 h-[50px] w-[230px] m-6  flex flex-row items-center justify-center  text-white text-[20px] rounded-lg\ hover:bg-yellow-500 hover:text-black font-medium cursor:pointer">
                    <button onClick={handleEliminate}>{t("ELIMINAR TODOS")}</button>
                  </div>
                ) : (
                  <Link></Link>
                )}
              </div>
            </div>
            <div className="flex justify-evenly h-[85%] w-full items-center">
              {favCourse &&
                favCourse.length > 0 &&
                renderCards.map((element, index) => (
                  <Card
                    course={element}
                    key={element._id}
                    removeFromFavorites={removeFromFavorites}
                    removeFromCart={removeFromCart}
                  />
                ))}
            </div>
          </div>

          <div className="w-full h-[10%] ">
            <div className="h-[70px] items-center justify-center flex flex-row w-full">
              <IoIosArrowDropleft
                className={`text-[50px] m-[30px] ${pagePosition === 1 ? "cursor-not-allowed" : "cursor-pointer"
                  } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                onClick={prevPage}
                disabled={pagePosition === 1}
              />
              <div className="w-[50px] flex items-center justify-center">
                <h1 className="text-[30px] m-[30px] text-black">{`${pagePosition}`}</h1>
              </div>
              <IoIosArrowDropright
                className={`text-[50px] m-[30px] ${pagePosition === pageNum
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
                  } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                onClick={nextPage}
                disabled={pagePosition === pageNum}
              />
            </div>
          </div>
        </>
      )}
    </div>

    // <div className='bg-white  w-full h-full overflow-hidden bg-green-200 '>
    //   {
    //     favCourse &&
    //     favCourse.length > 0 ? (
    //       <div  className="bg-[#FF6B6C] h-[40px] w-[230px] bottom-8 left-6 absolute  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
    //     <button onClick={handleEliminate}>Eliminar Todos</button>
    //   </div>
    //     ) : (
    //       <Link></Link>
    //     )
    //   }
    //   <div  className="bg-[#FF6B6C] h-[40px] w-[250px] bottom-6 right-8 absolute  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
    //    <Link to='/home'>
    //    <button >Ver mas cursos</button>
    //    </Link>
    //   </div>
    //     { favCourse !== null && favCourse.length > 0 ?(<div className=" w-[900px] border-b-[2px] border-[#848484] mt-[5px] mx-[90px]">
    //           <h1 className="text-[25px] text-[#1F1F1F] m-[2px]">{`Cursos Favoritos: ${favCourse.length}`}</h1>
    //         </div>):(
    //           <Link></Link>
    //         )}

    //   <div className=' '>
    //     <div className="flex justify-evenly items-center h-[75%] w-full">
    //       {favCourse &&
    //         favCourse.length > 0 &&
    //         renderCards.map((element, index) => (
    //           <div key={index}>
    //             <Card course={element} removeFromFavorites={removeFromFavorites} />
    //           </div>
    //         ))}
    //     </div>
    //     <div className="flex justify-center w-full h-full bg-red-200">
    //       {
    //         favCourse &&
    //         favCourse.length > 0 ? (
    //           <div className='h-[70px] items-center justify-center flex flex-row w-full'>
    //           <IoIosArrowDropleft
    //             className={`text-[50px] m-[30px] ${
    //               pagePosition === 1 ? "cursor-not-allowed" : "cursor-pointer"
    //             } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
    //             onClick={prevPage}
    //             disabled={pagePosition === 1}
    //           />
    //           <div className="w-[50px] flex items-center justify-center">
    //             <h1 className="text-[30px] m-[30px] text-black">{`${pagePosition}`}</h1>
    //           </div>
    //           <IoIosArrowDropright
    //             className={`text-[50px] m-[30px] ${
    //               pagePosition === pageNum ? "cursor-not-allowed" : "cursor-pointer"
    //             } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
    //             onClick={nextPage}
    //             disabled={pagePosition === pageNum}
    //           />
    //           </div>
    //         ) : (
    //           <div className='flex justify-center w-full h-full my-[100px] bg-red-200'>
    //             <h1 >No hay cursos favoritos</h1>
    //           </div>
    //         )
    //       }

    //         </div>
    //   </div>

    // </div>
  );
};

export default Favorite;
