import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { postReview } from "../../redux/action/actions";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Create_review = ({ onReviewPosted }) => {
  const [userData] = useLocalStorage("userData", {});
  const { user } = useAuth0();
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const courseId = location.pathname.split("/").pop();
  const { t, i18n } = useTranslation();
  const [comment, setComment] = useState(null);
  const [submitCompleted, setSubmitCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!comment.trim()) {
        throw new Error("El comentario no puede estar vacío");
      }

      const formData = {
        rating: rating,
        body: comment,
        user_id: userData._id,
        user_name: userData.name,
        user_lastname: userData.lastname,
        user_img: userData.img,
        course_id: courseId,
      };

      const response = await dispatch(postReview(formData));
      console.log("Response:", response);

      if (response) {
        const result = await Swal.fire({
          title: "¡Reseña enviada!",
          text: "Tu reseña ha sido enviado exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
        });

        if (result.isConfirmed) {
          setIsLoading(false);
          setComment("");
          setSubmitCompleted(true);
          onReviewPosted();
        }
      } else {
        console.error("Error al guardar el comentario:", response);
      }
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="w-full mb-4">
      <div className="bg-[#1E68AD] flex items-start">
        <hr />
        <h2 className="text-2xl text-white mb-4">
          {t("¡CUÉNTANOS TU EXPERIENCIA!")}
        </h2>
      </div>

      <br />
      <div className="">
        <div className="flex items-center">
          <img
            className="w-10 h-10 mr-2 rounded-full object-cover justify-self-center"
            src={user?.picture || userData?.img || "/img/avatar_land.png"}
            alt=""
          />
          <span className="text-white font-bold">
            {user?.name}
            {userData?.name + " " + userData?.lastname}
            <b
              style={{ fontSize: "14px", fontWeight: "100", marginLeft: "4px" }}
            >
              ↴
            </b>
          </span>
        </div>
        <div className="flex items-center mt-4">
          <span
            className="flex justify-self relative"
            style={{ top: "-2px", marginRight: "6px", fontSize: "18px" }}
          >
            {t("VALORACIÓN")}
            {" : "}
          </span>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-6 h-6 cursor-pointer`}
              onClick={() => handleStarClick(index + 1)}
              onMouseEnter={(e) => {
                for (let i = 0; i <= index; i++) {
                  const star =
                    e.currentTarget.parentNode.childNodes[i].childNodes[0];
                  star.setAttribute("fill", "orange");
                }
              }}
              onMouseLeave={(e) => {
                for (let i = 0; i < 5; i++) {
                  const star =
                    e.currentTarget.parentNode.childNodes[i].childNodes[0];
                  if (i >= rating) {
                    star.setAttribute("fill", "white");
                  } else {
                    star.setAttribute("fill", "orange");
                  }
                }
              }}
            >
              {index < rating ? (
                <path
                  fill="orange"
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                />
              ) : (
                <path
                  fill="white"
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                />
              )}
            </svg>
          ))}
          <span className="text-red ml-1 relative" style={{ top: "-2px" }}>
            {rating}
          </span>
        </div>
        <form
          className="max-w-2xl bg-white rounded-lg border border-gray-700 p-2 mx-auto mt-4"
          onSubmit={handleSubmit}
        >
          <div className="px-3 mb-2 mt-2 w-full h-full">
            <textarea
              placeholder={t("ESCRIBE AQUÍ TU RESEÑA.")}
              style={{ width: "500px" }}
              className="w-500 bg-gray-100 rounded border border-gray-300 leading-normal resize-none h-30 py-2 px-3 font-small placeholder-gray-500 focus:outline-none focus:bg-grayv text-black"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="flex justify-end px-4">
            {isLoading && (
              <div className="flex justify-end px-4">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-5 h-5 mt-1 ml-0text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <input
              type="submit"
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-[#1E68AD] hover:bg-black"
              value={t("ENVIAR RESEÑAS")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create_review;
