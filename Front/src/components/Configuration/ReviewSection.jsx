import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdOutlineRateReview } from "react-icons/md";

const ReviewSection = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState({});
  const URL = import.meta.env.VITE_URL_HOST;
  const [userData] = useLocalStorage("userData", {});
  const { t , i18n} = useTranslation()

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(
          `${URL}/getUserReviews/${userData._id}`
        );
        setUserReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user reviews:", error);
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [URL, userData._id]);

  useEffect(() => {
    const fetchCourseInfo = async (courseId) => {
      try {
        const response = await axios.get(`${URL}/getCourse/${courseId}`);
        setCourses((prevState) => ({
          ...prevState,
          [courseId]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching course information:", error);
      }
    };

    userReviews.forEach((review) => {
      fetchCourseInfo(review.course_review);
    });
  }, [URL, userReviews]);

  return (
    <div className="h-full flex flex-col items-center w-full relative">
      <h2 className="w-full text-3xl text-center font-bold bg-blue-500 text-white py-2  ">
      {t("MIS RESEÑAS")}
      </h2>
      <div
        className="w-full overflow-auto"
        style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
      >
        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : userReviews.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 m-8">
            {userReviews.map((review) => (
              <li
                key={review._id}
                className="border border-[#3B82F6] rounded-lg shadow-md p-4 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center mb-2">
                    <img
                        src={review.student_img || "/img/avatar_land.png"}
                      alt=""
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <p className="text-small font-semibold mr-4">
                      {review.student_name} {review.student_lastname}
                    </p>
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 m-0.5 ${
                          index < review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        } cursor-pointer`}
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill={index < review.rating ? "orange" : "none"}
                          stroke={
                            index < review.rating ? "orange" : "currentColor"
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                        />
                      </svg>
                    ))}
                    <span className="text-small ml-2 font-semibold">
                      {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.body}</p>
                </div>
                {courses[review.course_review] && (
                  <div className="flex items-center mt-4">
                    <Link to={`/detail/${courses[review.course_review]._id}`}>
                      <img
                        src={courses[review.course_review].image}
                        alt=""
                        className="mr-3"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px",
                          width: "100px",
                          height: "100px",
                          outline: "solid 1px #3B82F6",
                        }}
                      />
                    </Link>
                    <div className="flex flex-col flex-grow">
                      <div className="flex-col">
                        <p className="text-[14px] ml-4 font-semibold text-[#3B82F6]">
                        {t(`LANGUAGE_${courses[review.course_review].language.toUpperCase()}`)}
                        </p>
                        <p className="text-[14px] ml-4 font-semibold">
                        {t(`NIVEL_${courses[review.course_review].level.toUpperCase()}`)}
                        </p>
                        <p className="text-[14px] ml-4 font-semibold">
                        {t(`DURACION_${courses[review.course_review].duration.toUpperCase()}`)}
                        </p>
                        <p className="text-[14px] ml-4 font-semibold">
                        {t(`SCHEDULE_${courses[review.course_review].schedule.toUpperCase()}`)}
                        </p>
                        <p className="text-[14px] ml-4 font-semibold">
                          ${courses[review.course_review].price}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/detail/${
                        courses[review.course_review]._id
                      }#comentarios`}
                      className="absolute bottom-4 right-4"
                    >
                      <button className="px-4 py-1 bg-[#3B82F6] text-white rounded hover:bg-blue-900">
                        {t("VER CURSO")}
                        
                      </button>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[60px] text-gray-600 ml-[50px] font-semibold  absolute top-[50%] w-full right-0 flex items-center justify-center">{t("NO SE ENCONTRARON RESEÑAS")}  <MdOutlineRateReview className="ml-4 mt-4" /></p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
