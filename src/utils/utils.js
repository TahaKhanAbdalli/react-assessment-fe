import axios from "axios";

async function CallApi(apiOptions) {
  let apiResponse = {};

  const config = {
    method: apiOptions?.method,
    url: apiOptions?.endpoint,
    headers: apiOptions?.headers,
    data: apiOptions?.data,
    params: apiOptions?.params,
    responseType: apiOptions?.responseType,
  };

  await axios(config)
    .then((result) => {
      apiResponse = result;
    })
    .catch((error) => {
      if (error.response.status === 401) {
      }
      apiResponse = error;
    });

  return apiResponse;
}

const removeCurrentUser = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log("removeCurrentUser -> error", error);
  }
};

const setCurrentToken = (token) => {
  try {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.log("setCurrentToken -> error", error);
  }
};

const getCurrentToken = () => {
  let token = null;
  try {
    token =
      localStorage.getItem("token") != null
        ? JSON.parse(localStorage.getItem("token"))
        : null;
  } catch (error) {
    console.log("getCurrentToken -> error", error);
    token = null;
  }
  return token;
};

const Utils = {
  CallApi,
  setCurrentToken,
  getCurrentToken,
  removeCurrentUser,
};

export default Utils;
