import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useLocation, useParams } from "react-router-dom";
import Create_review from "./Detail_create_review";
import { updateReview, deleteReview } from "../../redux/action/actions";
import { useTranslation } from "react-i18next";
import bannedWords from "./banned_words";
import Swal from "sweetalert2";

const ReviewComponent = ({ submitCompleted }) => {
  const [reviews, setReviews] = useState([]);
  const [userEnrolled, setUserEnrolled] = useState(false);
  const [editMode, setEditMode] = useState({});
  const [editedReviews, setEditedReviews] = useState({});
  const [originalHeights, setOriginalHeights] = useState({});
  const [showOptions, setShowOptions] = useState({});
  const location = useLocation();
  const courseId = location.pathname.split("/").pop();
  const URL = import.meta.env.VITE_URL_HOST;
  const [userData] = useLocalStorage("userData", {});
  const dispatch = useDispatch();
  const reviewRefs = useRef({});
  const comentariosRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [comment, setComment] = useState("");

  let { id } = useParams();

  const cleanWord = (word) => {
    return word.replace(/[^\w\s]/gi, "").toLowerCase();
  };

  useEffect(() => {
    console.log("useEffect ejecutado");

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${URL}/getCourseReviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [URL, id, comment]);

  useEffect(() => {
    console.log("El envío se ha completado desde otro componente");
    fetchReviewsData();
  }, [submitCompleted]);

  const fetchReviewsData = async () => {
    console.log("Obteniendo reviews...");
    try {
      const response = await axios.get(`${URL}/getCourseReviews/${id}`);

      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    const verifyUserCourse = async () => {
      try {
        const response = await axios.get(
          `${URL}/getUserCourses/${userData._id}`
        );
        const enrolledCourses = response.data;
        const enrolledInCurrentCourse = enrolledCourses.some(
          (course) => course._id === courseId
        );
        setUserEnrolled(enrolledInCurrentCourse);
      } catch (error) {
        console.error("Error verifying user enrollment:", error);
      }
    };
    verifyUserCourse();
  }, [URL, courseId]);

  useEffect(() => {
    if (window.location.hash === "#comentarios") {
      comentariosRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reviews]);

  const handleEdit = (id) => {
    setOriginalHeights((prevState) => ({
      ...prevState,
      [id]: reviewRefs.current[id].clientHeight,
    }));
    setEditMode((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    setShowOptions((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleSave = async (id) => {
    try {
      const updatedBody = editedReviews[id];
      await dispatch(updateReview(id, updatedBody));
      setEditMode((prevState) => ({
        ...prevState,
        [id]: false,
      }));

      const updatedIndex = reviews.findIndex((review) => review._id === id);
      const updatedReviews = [...reviews];
      updatedReviews[updatedIndex] = {
        ...updatedReviews[updatedIndex],
        body: updatedBody,
      };
      setReviews(updatedReviews);

      console.log("Comentario actualizado exitosamente");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDelete = async (id) => {
    // Muestra un diálogo de confirmación utilizando SweetAlert2
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que deseas eliminar este comentario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        dispatch(deleteReview(id));
        setReviews(reviews.filter((review) => review._id !== id));
        Swal.fire(
          "¡Eliminado!",
          "El comentario ha sido eliminado correctamente.",
          "success"
        );
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const handleReviewPosted = () => {
    fetchReviewsData();
  };

  let roundedAverageRating = 0;

  if (reviews && reviews.length > 0) {
    const totalRating = reviews.reduce(
      (accumulator, review) => accumulator + review.rating,
      0
    );

    const averageRating = totalRating / reviews.length;

    roundedAverageRating = Math.round(averageRating);
  }

  return (
    <div
      className="bg-[#1E68AD] text-white w-4/5 flex flex-col items-start p-8 rounded-md mb-20"
      id="comentarios"
      ref={comentariosRef}
    >
      {userEnrolled && (
        <div className="mb-6">
          <Create_review onReviewPosted={handleReviewPosted} />
        </div>
      )}
      <hr
        style={{
          border: "1px solid white",
          width: "100%",
          borderRadius: "50px",
        }}
      />
      <br />
      <div>
        {reviews
          .slice()
          .reverse()
          .map((review) => (
            <div key={review._id}>
              <div
                className="border-gray-700 w-full mt-4 mb-8 border p-5 rounded-md bg-white text-black relative"
                ref={(el) => (reviewRefs.current[review._id] = el)}
              >
                {userData._id === review.student_review && (
                  <div className="absolute top-0 right-0">
                    <div >
                      <button
                        className="bg-transparent border-none"
                        onClick={() => {
                          setShowOptions((prevState) => ({
                            ...prevState,
                            [review._id]: !showOptions[review._id],
                          }));
                        }}
                      >
                        <img
                          src="https://res.cloudinary.com/dswgspnzw/image/upload/v1708737983/idiomasMaster/atxa826myw4qlppmtkz1.png"
                          alt="Settings Icon"
                          className="w-5 h-5 cursor-pointer m-2"
                        />
                      </button>
                      {showOptions[review._id] && (
                        <div className="absolute right-0 mt-2 w-[120px] bg-white border rounded-lg shadow-lg overflow-hidden">
                          <button
                           className="flex px-[11px] py-2 text-sm text-gray-700 hover:bg-gray-100 w-full "
                            onClick={() => handleEdit(review._id)}
                          >
                            <img
                              className="w-[26px] h-[26px] cursor-pointer mr-4"
                              src="https://res.cloudinary.com/dswgspnzw/image/upload/v1708732421/idiomasMaster/n6za1kvelpdac4v7mfln.png"
                              alt=""
                            />
                            Editar
                          </button>
                          <button
                            className="flex px-[11px] py-2 text-sm text-gray-700 hover:bg-gray-100 w-full  "
                            onClick={() => handleDelete(review._id)}
                          >
                            <img
                              className="w-[22px] h-[22px] cursor-pointer mr-[17px]"
                              src="https://res.cloudinary.com/dswgspnzw/image/upload/v1708736501/idiomasMaster/egjes7mxjbpbfwz3enbj.png"
                              alt=""
                            />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex items-center mb-4 ">
                  <img
                    className="w-10 h-10 mr-2 rounded-full"
                    src={review.student_img || "/img/avatar_land.png"}
                    alt="Profile"
                    style={{
                      objectFit: "cover",
                      justifySelf: "center",
                      width: "44px",
                    }}
                  />
                  <div>
                    <p className="text-black">
                      {review.student_name} {review.student_lastname}
                    </p>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 fill-current text-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      <span className="ml-2" style={{ fontSize: "14px" }}>
                        {review.rating}
                      </span>
                    </div>
                  </div>
                </div>
                {editMode[review._id] ? (
                  <textarea
                    className="w-full p-2 mb-4"
                    style={{
                      maxHeight: "100px",
                      height: `${originalHeights[review._id]}px`,
                    }}
                    value={editedReviews[review._id] || review.body}
                    onChange={(e) =>
                      setEditedReviews((prevState) => ({
                        ...prevState,
                        [review._id]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="mt-1">
                    {review.body.split(/\s+/).map((word, i) => (
                      <span key={i}>
                        {bannedWords.includes(cleanWord(word)) ? "*****" : word}{" "}
                      </span>
                    ))}
                  </p>
                )}
                <div className="flex flex-row md:flex-row items-start md:items-center justify-between">
                  <div className="flex flex-row md:flex-row items-start md:items-center justify-between">
                    {/* {editMode[review._id] ? (
                      <>
                        <button
                          className="flex px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                          onClick={() => handleEdit(review._id)}
                        >
                          <img
                            className="w-[26px] h-[26px] cursor-pointer mr-4"
                            src="https://res.cloudinary.com/dswgspnzw/image/upload/v1708732421/idiomasMaster/n6za1kvelpdac4v7mfln.png"
                            alt=""
                          />
                          {t("EDITAR")}
                        </button>
                        <button
                          className="flex  px-[11px] py-2 text-sm text-gray-700 hover:bg-gray-100 "
                          onClick={() => handleDelete(review._id)}
                        >
                          <img
                            className="w-[22px] h-[22px] cursor-pointer mr-[17px]"
                            src="https://res.cloudinary.com/dswgspnzw/image/upload/v1708736501/idiomasMaster/egjes7mxjbpbfwz3enbj.png"
                            alt=""
                          />
                          {t("ELIMINAR")}
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-between mt-4 text-sm text-white-600 fill-current"></div>
                    )} */}
                  </div>
                </div>
              </div>
              {review.reply && review.reply.length > 0 && (
                <div className="w-[100%] h-auto  flex items-end justify-end ">
                  <div className="w-[85%] h-auto bg-gray-100 border p-5 rounded-md text-black relative ">
                    <div className="w-full h-[60px] flex flex-row items-center justify-end ">
                      <h1 className="font-bold">Idiomas Master Admin</h1>

                      <div className="flex justify-center items-center ml-[10px] ">
                        <img
                          className="w-10 h-10 border-[2px] border-black  rounded-full"
                          src="/img/logo4.png"
                          alt="Profile"
                          style={{
                            objectFit: "cover",
                            justifySelf: "center",
                            width: "44px",
                          }}
                        />
                        <div></div>
                      </div>
                    </div>
                    <div
                      className="flex justify-center items-center
                       ml-[10px] "
                    >
                      <h1>
                        <span
                          style={{ color: "blue" }}
                        >{`@${review.student_name} ${review.student_lastname}, `}</span>
                        {review.reply}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-row md:flex-row items-start md:items-center justify-between">
                <div className="flex flex-row md:flex-row items-start md:items-center justify-between">
                  {editMode[review._id] ? (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mr-2"
                        onClick={() => handleSave(review._id)}
                      >
                        {t("GUARDAR")}
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={() => {
                          setEditMode((prevState) => ({
                            ...prevState,
                            [review._id]: false,
                          }));
                          setShowOptions((prevState) => ({
                            ...prevState,
                            [review._id]: false,
                          }));
                        }}
                      >
                        {t("CERRAR")}
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-between mt-4 text-sm text-white-600 fill-current"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewComponent;