import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./login.css";
import AuthActions from "../../middleware/auth";
import Utils from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Alert, message } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const { UserLogin } = AuthActions;
  const { t } = useTranslation("translation", {
    keyPrefix: "login",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError(`${t("User Required")}`);
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError(`${t("Password Required")}`);
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await UserLogin({ email: username, password });
      if (response?.success) {
        Utils.setCurrentToken(response?.data);
        setUsername("");
        setPassword("");
        setRememberMe(false);
        setError("");
        message.success(t("success"));
        navigate("/app/movies", { state: { successMessage: t("success") } });
      } else {
        message.error(t("error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <h1 className="sign-in-heading">{t("title")}</h1>
        <div className="form-group">
          <input
            className="inputField"
            type="text"
            placeholder="Email"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className="error-message">{usernameError}</div>
          )}
        </div>
        <div className="form-group">
          <input
            className="inputField"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>
        <div className="form-group checkbox-container">
          <input
            className="inputField"
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">{t("Checkbox lable")}</label>
        </div>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <ClipLoader
            cssOverride={{
              display: "block",
              margin: "0 auto",
            }}
            size={50}
            color={"#2BD17E"}
            loading={loading}
          />
        ) : (
          <button type="submit" className="sign_in_btn">
            {t("title")}
          </button>
        )}

        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            showIcon
            closable
            onClose={() => setSuccessMessage("")}
          />
        )}
      </form>
    </div>
  );
};

export default Login;
