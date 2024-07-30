import { useEffect, useState } from "react";
import "../CreateMovie/CreateMovies.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { InputNumber, message, Upload } from "antd";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import MovieActions from "../../middleware/movies";
import { Alert } from "antd";
import { RcFile } from "antd/es/upload";
import { baseURL } from "../../config/constant";
import { useNavigate, useLocation } from "react-router-dom";

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const CreateMovies = () => {
  const location = useLocation();
  const { data, update } = location.state || {};
  const { t } = useTranslation("translation", {
    keyPrefix: "CreateMovies",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [title, setTitle] = useState<string>("");
  const [publishYear, setPublishYear] = useState<string>("2023");
  const [imageBase64, setImageBase64] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    if (update) {
      setImageUrl(data?.poster);
      setImageBase64(data?.poster);
      setTitle(data?.title);
      setPublishYear(data?.year);
    }
  }, [update]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log(info.file.originFileObj);
      const getBaseUrl = await getBase64(info.file.originFileObj);
      setImageUrl(info.file.originFileObj);
      setImageBase64(getBaseUrl);
    }
  };

  const handleSubmit = async () => {
    if (title === "" || publishYear === "" || imageUrl === undefined) {
      message.error("All the fields are required ");
      return;
    } else {
      const values =
        update && imageBase64 === imageUrl
          ? null
          : await MovieActions.uploadImage(imageUrl);
      const payload = {
        title: title,
        year: publishYear,
        poster:
          update && imageBase64 === imageUrl
            ? imageUrl
            : `${baseURL}/uploads/${values?.data?.path}`,
      };

      const response = update
        ? await MovieActions.updateMovie(data?._id, payload)
        : await MovieActions.addMovie(payload);
      console.log(response);
      if (response?.success) {
        // Display success message
        message.success(response?.message);
        navigate("/app/movies");
      } else {
        message.success(response?.message);
      }
    }

    setTitle("");
    setPublishYear("");
    setImageBase64(undefined);
    setImageUrl(undefined);
    setLoading(false);
  };

  const handleCancle = () => {
    setTitle("");
    setPublishYear("");
    setImageUrl(undefined);
    navigate(-1);
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadButton = (
    <div className="plus-icon-bottom-text">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {t("Add_movie")}
      </div>
    </div>
  );
  return (
    <div className="createMovies">
      <div className="create-movies-main-container">
        {/* Desktop design */}
        <div className="create-movies-box">
          <div className="create-movies-heading">
            <p className="create-movie-title">
              {update ? t("edit_movie") : t("Create_movie")}
            </p>
          </div>
          <div className="create-movie-form">
            <div className="create-movie-form-row">
              <div className="create-movie-col-6">
                <Upload
                  accept="image/jpeg,image/jpg,image/png"
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader custom-uploader"
                  showUploadList={false}
                  customRequest={dummyRequest}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageBase64 ? (
                    <img
                      src={imageBase64}
                      alt="avatar"
                      className="uploadImage"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div className="create-movie-col-6">
                <div className="form-inputs">
                  <Input
                    placeholder={t("title")}
                    value={title}
                    className="create-movie-form-input"
                    style={{ width: "100%" }}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <InputNumber
                    placeholder={t("publish_year")}
                    className="create-movie-form-input"
                    value={Number(publishYear)}
                    controls={false}
                    style={{ width: "50%" }}
                    onChange={(value: number | null) =>
                      setPublishYear(String(value))
                    }
                    min={1900}
                    max={2050}
                  />
                </div>
                <div className="form-buttons">
                  <button className="btn_cancle" onClick={handleCancle}>
                    {t("Cancel_btn")}
                  </button>
                  <button className="btn_submit" onClick={handleSubmit}>
                    {t("Submit_btn")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Design */}
        <div className="create-movies-mobile-box">
          <div className="create-movies-heading">
            <p className="create-movie-title">{t("Create_movie")}</p>
          </div>
          <div className="form-inputs">
            <Input
              placeholder={t("title")}
              value={title}
              className="create-movie-form-input"
              style={{ width: "100%" }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputNumber
              placeholder={t("publish_year")}
              className="create-movie-form-input"
              value={Number(publishYear)}
              controls={false}
              style={{ width: "50%" }}
              onChange={(value: number | null) => setPublishYear(String(value))}
              min={1900}
              max={2023}
            />
          </div>
          <div className="upload-box">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader custom-uploader"
              showUploadList={false}
              customRequest={dummyRequest}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageBase64 ? (
                <img
                  src={imageBase64}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "inherit",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className="form-buttons">
            <button className="btn_cancle" onClick={handleCancle}>
              {t("Cancel_btn")}
            </button>
            <button className="btn_submit" onClick={handleSubmit}>
              {t("Submit_btn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMovies;
