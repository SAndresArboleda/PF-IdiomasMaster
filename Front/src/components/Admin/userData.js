import axios from "axios";

const URL = import.meta.env.VITE_URL_HOST;

export const productData = async () => {
  try {
    const response = await axios.get(`${URL}/getAllCourses`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const usersData = async () => {
  try {
    const response = await axios.get(`${URL}/getAllUsers`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const paymentData = async () => {
  try {
    const response = await axios.get(`${URL}/getAllPayments`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const reviewData = async () => {
  try {
    const response = await axios.get(`${URL}/getAllReviews`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const idProduct = async (id) => {
  try {
    const response = await axios.get(`${URL}/getCourse/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putProduct = async ({
  id,
  language,
  level,
  price,
  duration,
  schedule,
  location,
  image,
  status,
  start_time,
  finish_time,
}) => {
  try {
    const response = await axios.put(`${URL}/putCourse`, {
      id,
      language,
      level,
      price,
      duration,
      schedule,
      location,
      image,
      status,
      start_time,
      finish_time,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const idUser = async (id) => {
  try {
    const response = await axios.get(`${URL}/getUserbyId/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putUser = async ({
  profile,
  id,
  name,
  lastname,
  email,
  status,
  img,
  password,
  age,
}) => {
  try {
    const response = await axios.put(`${URL}/putUser`, {
      profile,
      id,
      name,
      lastname,
      email,
      status,
      img,
      password,
      age,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userCourses = async (id) => {
  try {
    const response = await axios.get(`${URL}/getUserCourses/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userPayments = async (id) => {
  try {
    const response = await axios.get(`${URL}/getUserPayment/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const idReview = async (id) => {
  try {
    const response = await axios.get(`${URL}/getReviews/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putReview = async ({ reply, view, reviewId }) => {
  try {
    const response = await axios.put(`${URL}/putReview/${reviewId}`, {
      reply,
      view
    });

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getmailUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${URL}/getUser`, {
      email,
      password,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const getGoogleUser = async ({ email, name, lastname, image }) => {
  try {
    
    const response = await axios.post(`${URL}/getGoogleUser`, {
      email, name, lastname, image
    });

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};



export const deleteUser = async ({ email, id, password }) => {



  try {
    const response = await axios.post(`${URL}/deleteUser`, {
      email, id, password
    });

    if (response.data) {
        return response.data; 
      }
  } catch (error) {
    return(error)
  }
};


export const deleteUserReview = async ({id}) => {

  try {
    const response = await axios.delete(`${URL}/deleteReview/${id}`);

    if (response.data) {
        return response.data; 
      }
  } catch (error) {
    return(error)
  }
};


