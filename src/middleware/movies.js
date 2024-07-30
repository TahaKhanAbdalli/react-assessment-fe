import { baseURL } from "../config/constant";
import Utils from "../utils/utils";

const getMovies = async (dataLength, page) => {
  try {
    const apiOptions = {
      endpoint: `${baseURL}/movie?limit=${dataLength}&page=${page}`,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${Utils.getCurrentToken()}`,
        "ngrok-skip-browser-warning": true,
      },
      method: "GET",
    };
    const apiResponse = await Utils.CallApi(apiOptions);
    return apiResponse.data;
  } catch (error) {
    return error;
  }
};

const addMovie = async (params) => {
  try {
    const apiOptions = {
      endpoint: `${baseURL}/movie`,
      headers: {
        Authorization: `Bearer ${Utils.getCurrentToken()}`,
      },
      method: "POST",
      data: params,
    };
    const apiResponse = await Utils.CallApi(apiOptions);

    return apiResponse.data;
  } catch (error) {
    return error;
  }
};

const uploadImage = async (url) => {
  const formData = new FormData();
  formData.append("file", url);

  const apiOptions = {
    endpoint: `${baseURL}/upload`,
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      Authorization: `Bearer ${Utils.getCurrentToken()}`,
    },
    method: "POST",
    data: formData,
  };
  const apiResponse = await Utils.CallApi(apiOptions);

  return apiResponse.data;
};

const updateMovie = async (id, params) => {
  try {
    const apiOptions = {
      endpoint: `${baseURL}/movie/${id}`,
      headers: {
        Authorization: `Bearer ${Utils.getCurrentToken()}`,
      },
      method: "PUT",
      data: params,
    };
    const apiResponse = await Utils.CallApi(apiOptions);

    return apiResponse.data;
  } catch (error) {
    return error;
  }
};

const MovieActions = {
  getMovies,
  updateMovie,
  addMovie,
  uploadImage,
};

export default MovieActions;
