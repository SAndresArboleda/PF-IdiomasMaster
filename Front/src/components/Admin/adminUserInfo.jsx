import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearchCircle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { adminProduct } from "../../redux/action/actions";
import { RiFileUserLine } from "react-icons/ri";
import { idUser, userCourses, userPayments } from "./userData";
import UserCoursesCard from "./userCourseCard";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import UserPaymentCard from "./userPaymentCard";
import { FaSearchPlus } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminInfoUser() {
  const initialUserState = {
    profile: "",
    _id: "",
    name: "",
    lastname: "",
    email: "",
    status: true,
    img: "",
    password: "",
  };

  const data = useSelector((state) => state.adminUser);

  const [user, setUser] = useState(initialUserState);
  const [payment, setPayment] = useState([]);
  const [courses, setCouses] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [coursePosition, setCoursePosition] = useState(1);
  const [paymentPosition, setPaymentPosition] = useState(1);
  const itemsOnPage = 5;

  const nextPage = () => {
    setCoursePosition((prevPagePosition) => {
      if (prevPagePosition < pageNum) {
        return prevPagePosition + 1;
      } else {
        return prevPagePosition;
      }
    });
  };

  const prevPage = () => {
    setCoursePosition((prevPagePosition) => {
      if (prevPagePosition > 1) {
        return prevPagePosition - 1;
      } else {
        return prevPagePosition;
      }
    });
  };

  useEffect(() => {
    setCoursePosition(1);
  }, [courses]);

  const pageNum = Math.ceil(courses.length / itemsOnPage);
  const itemsArray = Array.from({ length: pageNum }, (_, index) =>
    courses.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
  );

  const renderCards = itemsArray[coursePosition - 1] || [];

  const nextPagePayment = () => {
    setPaymentPosition((prevPagePosition) => {
      if (prevPagePosition < pageNum) {
        return prevPagePosition + 1;
      } else {
        return prevPagePosition;
      }
    });
  };

  const prevPagePayment = () => {
    setPaymentPosition((prevPagePosition) => {
      if (prevPagePosition > 1) {
        return prevPagePosition - 1;
      } else {
        return prevPagePosition;
      }
    });
  };

  useEffect(() => {
    setCoursePosition(1);
  }, [courses]);

  const pageNumber = Math.ceil(payment.length / itemsOnPage);
  const paymentArray = Array.from({ length: pageNum }, (_, index) =>
    payment.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
  );

  const paymentCards = paymentArray[paymentPosition - 1] || [];

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const { _id, name, lastname, email, status, img, profile, age } = data;

        setUser({
          _id,
          name,
          lastname,
          email,
          status,
          profile,
          age,
          img,
        });

        const responseCourses = await userCourses(_id);

        if (responseCourses.data) {
          setCouses(responseCourses.data);
        }

        const responsePayments = await userPayments(_id);

        if (responsePayments.data) {
          setPayment(responsePayments.data);
        }
      }
    };

    fetchData();
  }, [data]);

  const handleFetch = async (event) => {
    event.preventDefault();

    try {
      const response = await idUser(searchTerm);

      if (response.data) {
        const { _id, name, lastname, email, status, img, profile, age } =
          response.data;

        setUser({
          _id,
          name,
          lastname,
          email,
          status,
          profile,
          age,
          img,
        });

        const responseCourses = await userCourses(_id);

        if (responseCourses.data) {
          setCouses(responseCourses.data);
        }

        const responsePayments = await userPayments(_id);

        if (responsePayments.data) {
          setPayment(responsePayments.data);
        }
      }

      setSearchTerm("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El id no corresponde a ningún usuario",
      });
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px] overflow-croll">
      <div className="w-full h-[40px] bg-[#151139]  flex flex-row items-center">
        <p className=" text-white ml-6 text-[20px]">Busca un Usuario</p>
      </div>
      <div className="w-full h-[20%] bg-[#151139]  flex flex-row ">
        <div className="h-full w-[40%] ">
          <div className="w-full h-full pl-[20px] bg-[#151139] flex flex-row items-center">
            <input
              placeholder="Busca usuario por ID"
              type="search"
              value={searchTerm}
              className="w-[400px] h-[40px]  rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition mr-[15px]"
              onChange={handleSearch}
            />
            <IoSearchCircle
              className="text-[50px] text-white cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95"
              type="submit"
              onClick={handleFetch}
            />
          </div>
        </div>

        {user._id && user._id.length > 0 && (
          <div className="h-full w-[60%] flex items-center justify-center bg-[#373a6c] ">
            <div className="h-full w-[50%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[18px]">{`ID Usuario: ${user._id}`}</h1>
            </div>

            <div className="h-full w-[50%] flex items-center justify-center">
              <div className="h-full w-[90%]  flex flex-row items-center justify-center">
                <h1 className="text-[20px] text-white">{`${
                  user.status ? "Activo" : "Inactivo"
                }`}</h1>
                {user.status ? (
                  <div className="h-full w-[30%]  flex flex-row items-center justify-center">
                    <FaCircle className="text-[20px] ml-[5px] text-green-400" />
                  </div>
                ) : (
                  <div className="h-full w-[30%]  flex flex-row items-center justify-center">
                    <FaCircle className="text-[20px] ml-[5px] text-red-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {user._id && user._id.length ? (
        <>
          <div className="bg-[#282a54] w-full h-[96%] grid grid-cols-3 gap-[5px] p-[5px]">
            <div className="bg-[#282a54] w-full h-full flex flex-col gap-[5px] rounded-[10px]">
              <div className="w-full h-[25%] bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[40%] flex items-center">
                  <label
                    htmlFor="language"
                    className="text-yellow-500 text-[18px]"
                  >
                    Nombre Usuario
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    {`${user.name} ${user.lastname}`}
                  </label>
                </div>
              </div>
              <div className="w-full h-[75%] bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[10%] flex items-center">
                  <label
                    htmlFor="duration"
                    className="text-yellow-500 text-[18px]"
                  >
                    Imagen de Perfil
                  </label>
                </div>
                {user.img ? (
                  <div className="w-full h-[60%] flex items-center justify-center overflow-hidden ">
                    <img
                      src={user.img}
                      alt="Preview"
                      className="max-h-[250px] max-w-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[70%] flex items-center justify-center overflow-hidden ">
                    <RiFileUserLine className="w-full h-full flex items-center justify-center overflow-hidden text-white " />
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#282a54] w-full h-full flex flex-col gap-[5px] rounded-[10px]">
              <div className="w-full h-[25%] bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[40%] flex items-center">
                  <label
                    htmlFor="language"
                    className="text-yellow-500 text-[18px]"
                  >
                    Email de Usuario
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    {`${user.email}`}
                  </label>
                </div>
              </div>
              <div className="w-full h-[75%] bg-[#373a6c] pl-[20px] rounded-[10px] flex flex-col items-center justify-evenly">
                <div className="w-full h-[10%] flex items-center">
                  <label
                    htmlFor="duration"
                    className="text-yellow-500 text-[18px]"
                  >
                    Cursos del Usuario
                  </label>
                </div>
                <div className="w-[95%]  h-[60%] flex flex-col items-center ">
                  {courses && courses.length > 0 && (
                    <>
                      {renderCards.map((element) => (
                        <UserCoursesCard
                          key={element.id}
                          language={element.language}
                          level={element.level}
                          duration={element.duration}
                        />
                      ))}
                    </>
                  )}
                </div>
                <div className="h-[10%] items-center justify-center flex flex-row w-full ">
                  <IoChevronBackOutline
                    className={`text-[30px] m-[30px] ${
                      coursePosition === 1
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } text-white hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                    onClick={prevPage}
                    disabled={coursePosition === 1}
                  />
                  <div className="w-[50px] flex items-center justify-center">
                    <h1 className="text-[20px] m-[30px] text-white">{`${coursePosition}`}</h1>
                  </div>
                  <IoChevronForward
                    className={`text-[30px] m-[30px] ${
                      coursePosition === pageNum
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } text-white hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                    onClick={nextPage}
                    disabled={coursePosition === pageNum}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#282a54] w-full h-full flex flex-col gap-[5px] rounded-[10px]">
              <div className="w-full h-[25%] bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[40%] flex items-center">
                  <label
                    htmlFor="language"
                    className="text-yellow-500 text-[18px]"
                  >
                    Permisos del Usuario
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    {`${user.profile}`}
                  </label>
                </div>
              </div>
              <div className="w-full h-[75%] bg-[#373a6c] pl-[20px] rounded-[10px] flex flex-col items-center justify-evenly">
                <div className="w-full h-[10%] flex items-center">
                  <label
                    htmlFor="duration"
                    className="text-yellow-500 text-[18px]"
                  >
                    Pagos del Usuario
                  </label>
                </div>
                <div className="w-[95%]  h-[60%] flex flex-col items-center ">
                  {payment && payment.length > 0 && (
                    <>
                      {paymentCards.map((element) => (
                        <UserPaymentCard
                          key={element.id}
                          date={element.date}
                          amount={element.Amount}
                          status={element.status}
                        />
                      ))}
                    </>
                  )}
                </div>
                <div className="h-[10%] items-center justify-center flex flex-row w-full ">
                  <IoChevronBackOutline
                    className={`text-[30px] m-[30px] ${
                      paymentPosition === 1
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } text-white hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                    onClick={prevPagePayment}
                    disabled={paymentPosition === 1}
                  />
                  <div className="w-[50px] flex items-center justify-center">
                    <h1 className="text-[20px] m-[30px] text-white">{`${paymentPosition}`}</h1>
                  </div>
                  <IoChevronForward
                    className={`text-[30px] m-[30px] ${
                      paymentPosition === pageNum
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } text-white hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                    onClick={nextPagePayment}
                    disabled={paymentPosition === pageNum}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" w-full h-full rounded-[10px] items-center justify-center flex">
            <h1 className="text-yellow-500 text-[40px]">Busca un Usuario</h1>
            <FaSearchPlus className="text-white text-[40px] ml-[30px]" />
          </div>
        </>
      )}
    </div>
  );
}
