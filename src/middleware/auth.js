import { baseURL } from "../config/constant";
import Utils from "../utils/utils";

const UserLogin = (payload) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = payload;
      const apiOptions = {
        endpoint: `${baseURL}/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          email,
          password,
        },
      };
      const apiResponse = await Utils.CallApi(apiOptions);
      resolve(apiResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};

const AuthActions = {
  UserLogin,
};

export default AuthActions;
