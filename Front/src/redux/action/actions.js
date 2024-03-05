import {
  COURSE_DETAIL,
  FILTER_LANGUAGE,
  FILTER_LEVEL,
  ORDER_PRICE,
  SEARCH,
  ALL_COURSES,
  POST_COURSE_FAILURE,
  POST_COURSE_REQUEST,
  POST_COURSE_SUCCESS,
  FILTERED_COURSES,
  ADMINPRODUCT,
  ADMINUSER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_USER_DATA,
  ALL_USERS,
  USER_COURSES,
  REVIEW_SENT_SUCCESS,
  REVIEW_SENT_ERROR,
  GET_CART,
  ADD_CART,
  DELETE_CART,
  UPDATE_REVIEW_ERROR,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_REQUEST,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  ADMINREVIEW,
  GET_COURSE_REVIEW,
  CLOSE_CART,
} from "./actiontypes";
import axios from "axios";

const URL = import.meta.env.VITE_URL_HOST;

export const getAllCourses = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/getAllCourses`);
    dispatch({
      type: ALL_COURSES,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export function getCoursesDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getCourse/${id}`);
      dispatch({
        type: COURSE_DETAIL,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}
export const filterLanguage = (language) => {
  return {
    type: FILTER_LANGUAGE,
    payload: language,
  };
};

export const filterLevel = (level) => {
  return {
    type: FILTER_LEVEL,
    payload: level,
  };
};
export const orderPrice = (orden) => {
  return {
    type: ORDER_PRICE,
    payload: orden,
  };
};
export function search(value) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getCourse/name?name=${value}`);

      if (Array.isArray(data)) {
        dispatch({
          type: SEARCH,
          payload: [data, value],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const postCourseRequest = () => ({
  type: POST_COURSE_REQUEST,
});

export const postCourseSuccess = () => ({
  type: POST_COURSE_SUCCESS,
});

export const postCourseFailure = (error) => ({
  type: POST_COURSE_FAILURE,
  payload: error,
});

export const postCourseData = (courseData) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/createCourse`, courseData);
    console.log("Solicitud POST exitosa:", response.data);
  } catch (error) {
    console.error("Error al enviar los datos del curso:", error.message);
  }
};

export const postUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/createUser`, userData);
    return response
  } catch (error) {
    return error
  }
};

export const postThirdPartyUser = (user) => async (dispatch) => {
  try {
    const userData = {
      name: user.given_name,
      lastname: user.family_name,
      email: user.email,
      img: user.picture,
    };
    console.log("ESTO ES USERDATA EN THIRPARTY", userData);
    const response = await axios.post(`${URL}/createUser`, userData);
    alert("Usuario creado con éxito", response.data);
  } catch (error) {
    const message = error.response.data;
    alert(`${message}`);
  }
};

export const postReview = (formData) => {
  return async (dispatch) => {
    try {
      console.log("ESTO RECIBE ACTION FORMDATA:", formData);
      const response = await axios.post(`${URL}/createReview`, formData);
      console.log("Reseña guardada exitosamente:", response);

      dispatch(reviewPostSuccess(response));

      return response;
    } catch (error) {
      console.error("Error al guardar la reseña:", error);

      dispatch(reviewPostError(error));
      throw error;
    }
  };
};

const reviewPostSuccess = (data) => ({
  type: REVIEW_SENT_SUCCESS,
  payload: data,
});

const reviewPostError = (error) => ({
  type: REVIEW_SENT_ERROR,
  payload: error,
});

export const getUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/getUser`, userData);
    console.log("Respuesta del servidor:", response.data);

    localStorage.setItem("userData", JSON.stringify(response.data));

    dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data,
    });

    alert("Se ha conectado");
  } catch (error) {
    console.error("Error al obtener usuario:", error);

    dispatch({
      type: GET_USER_FAILURE,
      payload: error.payload.data.message,
    });

    alert(error.payload.data.message);
  }
};

export const updateUser = (changedFields) => async (dispatch) => {
  try {
    console.log(changedFields, "ESTO ENVIA LA ACTION UPDATEUSER");
    const response = await axios.put(`${URL}/putUser`, changedFields);
    console.log("Respuesta del servidor al guardar cambios:", response.data);
  } catch (error) {
    console.error("Error al guardar cambios:", error);
  }
};

export const updateReview = (id, updatedBody) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_REVIEW_REQUEST });

      console.log("ID recibido en la acción:", id);
      console.log("Cuerpo actualizado recibido en la acción:", updatedBody);

      const response = await axios.put(`${URL}/putReview/${id}`, {
        body: updatedBody,
      });

      console.log("Respuesta del servidor:", response.data);

      dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: response.data });
      console.log("Review updated:", response.data);
    } catch (error) {
      dispatch({ type: UPDATE_REVIEW_ERROR, payload: error.message });
      console.error("Error updating review:", error);
    }
  };
};

export const filteredCourses = (data) => {
  return {
    type: FILTERED_COURSES,
    payload: data,
  };
};

export const adminProduct = (data) => {
  return {
    type: ADMINPRODUCT,
    payload: data,
  };
};

export const adminUser = (data) => {
  return {
    type: ADMINUSER,
    payload: data,
  };
};

export const adminReview = (data) => {
  return {
    type: ADMINREVIEW,
    payload: data,
  };
};

export function getAllUsers() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getAllUsers`);
      dispatch({
        type: ALL_USERS,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export function getUserCourses(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getUserCourses/${id}`);
      dispatch({
        type: USER_COURSES,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export const createPreference = async (product) => {
  try {
    const { data } = await axios.post(`${URL}/createPreference`, product);
    window.location.href = data;
  } catch (error) {
    console.log(error.message);
  }
};

export const setUserdata = (user) => {
  return {
    type: SET_USER_DATA,
    payload: user,
  };
};

export function getCartDB(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getCart/${id}`);
      dispatch({
        type: GET_CART,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}
export function addCart(cart) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(`${URL}/addCartProduct`, cart);
      dispatch({
        type: ADD_CART,
        payload: data,
      });
    } catch (error) {}
  };
}
export function deleteCart(cart) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(`${URL}/deleteCartProduct`, cart);
      dispatch({
        type: DELETE_CART,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

// Acción para la eliminación de la revisión
export const deleteReview = (reviewId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    try {
      await axios.delete(`${URL}/deleteReview/${reviewId}`);

      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
    } catch (error) {
      dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.message });
    }
  };
};
export function getCourseReview(data) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_COURSE_REVIEW,
        payload: data,
      });
    } catch (error) {}
  };
}
export function closeCart(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL}/closeCart/${id}`);
      dispatch({
        type: CLOSE_CART,
        payload: data,
      });
    } catch (error) {}
  };
}
