import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearchCircle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";

import { adminProduct, adminReview } from "../../redux/action/actions";
import { FaTrashCan } from "react-icons/fa6";
import {
  deleteUserReview,
  idReview,
  idUser,
  putReview,
  putUser,
} from "./userData";

import { FaSearchPlus } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminManageReview() {
  const initialUserState = {
    _id: "",
    rating: null,
    body: "",
    view: true,
    reply: "",
    student_review: "",
    course_review: "",
  };

  const data = useSelector((state) => state.adminReview);

  const dispatch = useDispatch();
  const [review, setReview] = useState(initialUserState);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchReviewData = async () => {
      if (data) {
        const {
          _id,
          rating,
          body,
          view,
          reply,
          student_review,
          course_review,
        } = data;

        setReview({
          _id,
          rating,
          body,
          view,
          reply,
          student_review,
          course_review,
        });

        if (!view) {
          try {
            await putReview({ view: true, reviewId: _id });
          } catch (error) {
            console.error("Error updating review:", error);
          }
        }
      }
    };

    fetchReviewData();
  }, [data]);

  const resetForm = () => {
    setReview(initialUserState);
    setErrors({});
    setSuccessMessage("");
  };

  const handleFetch = async (event) => {
    event.preventDefault();

    try {
      const response = await idReview(searchTerm);

      if (response.data) {
        const {
          _id,
          rating,
          body,
          view,
          reply,
          student_review,
          course_review,
        } = response.data;

        setReview({
          _id,
          rating,
          body,
          view,
          reply,
          student_review,
          course_review,
        });

        if (!view) {
          try {
            await putReview({ view: true, reviewId: _id });
          } catch (error) {
            console.error("Error updating review:", error);
          }
        }
      }

      setSearchTerm("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "El id no corresponde a ningún producto",
        text: "Verifique el id proporcionado e intente nuevamente",
      });
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    if (review.student_review.length > 0) {
      const fetchData = async () => {
        try {
          const response = await idUser(review.student_review);
          console.log(user.student_review);
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [review.student_review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putReview({
        reviewId: review._id,
        reply: review.reply,
      });
      Swal.fire({
        icon: "success",
        title: "Respuesta Enviada",
        text: "La respuesta ha sido enviada Exitosamente",
      });
      resetForm();
      dispatch(adminReview({}));
    } catch (error) {
      console.error("Error al actualizar el curso:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "status" ? value === "true" : value === "false" ? false : value;
    setReview((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };


  const handleDeleteAsync = async () => {
    try {
      const response = await deleteUserReview({ id: review._id });
      if (response) {
        Swal.fire({
          title: "Borrado!",
          text: "El comentario ha sido borrado.",
          icon: "success",
        });

        resetForm();
        dispatch(adminReview({}));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDel = async () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Quieres Eliminar la Review del Usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Elimala!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAsync();
      }
    });
  };


  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px] ">
      <div className="w-full h-[40px] bg-[#151139] flex flex-row items-center">
        <p className="text-white ml-6 text-[20px]">
          Busca & Responde una Reseña
        </p>
      </div>
      <div className="w-full h-[20%] bg-[#151139] flex flex-row ">
        <div className="h-full w-[40%] ">
          <div className="w-full h-full pl-[20px] bg-[#151139] flex flex-row items-center">
            <input
              placeholder="Busca Reseña por ID"
              type="search"
              value={searchTerm}
              className="w-[400px] h-[40px] rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition mr-[15px]"
              onChange={handleSearch}
            />
            <IoSearchCircle
              className="text-[50px] text-white cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95"
              type="submit"
              onClick={handleFetch}
            />
          </div>
        </div>

        {review._id && review._id.length > 0 && (
          <div className="h-full w-[60%] flex items-center justify-center bg-[#373a6c] ">
            <div className="h-full w-[50%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[18px]">{`ID Reseña: ${review._id}`}</h1>
            </div>
            <div className="h-full w-[30%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[18px]">{`Valoracion Usuario: ${review.rating}`}</h1>
            </div>
          </div>
        )}
      </div>

      {review._id && review._id.length ? (
        <>
          <div className="bg-[#282a54] w-full h-[96%] grid grid-rows-2 gap-[5px] p-[5px]">
            <div className="bg-[#373a6b] w-full h-full rounded-[10px]">
              <div className="w-full h-[20%] flex items-center justify-evenly ">
                <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                  <h1 className="text-yellow-500">Nombre de Usuario:</h1>
                  <h1 className="text-white">
                    {user.name} {user.lastname}
                  </h1>
                </div>
                <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                  <h1 className="text-yellow-500">Email Usuario:</h1>
                  <h1 className="text-white">{user.email}</h1>
                </div>
                <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                  <h1 className="text-yellow-500">ID del Curso:</h1>
                  <h1 className="text-white">{review.course_review}</h1>
                </div>
              </div>
              <div className="w-full h-[80%] p-[20px] relative">
                <h1 className="text-yellow-500 text-[18px]">
                  Reseña del Usuario:
                </h1>
                <h1 className="text-white text-[18px]">{review.body}</h1>
                <button
                  onClick={handleDel}
                  className="w-[50px] h-[50px] bg-red-600 flex items-center justify-center rounded-[5px] absolute right-4 bottom-4 z-20"
                >
                  <FaTrashCan className="text-white text-[30px]" />
                </button>
              </div>
            </div>
            <div className="bg-[#373a6b] w-full h-full rounded-[10px]">
              <div className="w-full h-[5%] pl-[20px] mt-[5px]">
                <h1 className="text-yellow-500 text-[18px]">
                  Enviar una Respuesta
                </h1>
              </div>
              <div className="w-full h-[65%] p-[20px]">
                <textarea
                  className="w-[100%] h-[100%]"
                  value={review.reply}
                  name="reply"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="w-full h-[20%] flex items-center justify-center">
                <button
                  className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Enviar Respuesta
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full rounded-[10px] items-center justify-center flex">
            <h1 className="text-yellow-500 text-[40px]">Busca una Reseña</h1>
            <FaSearchPlus className="text-white text-[40px] ml-[30px]" />
          </div>
        </>
      )}
    </div>
  );
}
