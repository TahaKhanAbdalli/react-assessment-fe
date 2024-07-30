import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "./authRoutes";
import { AppRoutes } from "./appRoutes";
import "./style.css";
import Utils from "../utils/utils";
import { useTranslation } from "react-i18next";
import { Col, Row, Select } from "antd";
import NotFound from "../pages/NotFound/404";

const withAuth = (Component: FC) => {
  const WrappedComponent = (props: any) => {
    const token = Utils.getCurrentToken();
    if (!token) {
      return <Navigate to="/auth" />;
    }
    return <Component {...props} />;
  };

  return WrappedComponent;
};

const isAuthenticated = (Component: FC) => {
  const WrappedComponent = (props: any) => {
    const token = Utils.getCurrentToken();
    if (token) {
      return <Navigate to="/app" />;
    }
    return <Component {...props} />;
  };

  return WrappedComponent;
};

const AppRoutesWithAuth = withAuth(AppRoutes);
const AuthRoutesAuthenticated = isAuthenticated(AuthRoutes);

const items = [
  {
    value: "1",
    label: "EN",
  },
  {
    value: "2",
    label: "FR",
  },
];

export const App = () => {
  const { i18n } = useTranslation();
  const handleLangChange = (e: string) => {
    i18n.changeLanguage(e === "1" ? "en" : "fr");
  };

  return (
    <>
      <Row gutter={20} justify="end">
        <Col>
          <div style={{ margin: "20px" }}>
            <Select
              defaultValue="1"
              onChange={handleLangChange}
              options={items}
            />
          </div>
        </Col>
      </Row>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/auth"} replace />} />
          <Route path="/auth/*" element={<AuthRoutesAuthenticated />} />
          <Route path="/app/*" element={<AppRoutesWithAuth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
