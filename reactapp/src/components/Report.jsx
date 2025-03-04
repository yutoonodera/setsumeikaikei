import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Report = () => {
  const [reportResponse, setReportResponse] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージのステートを追加
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const creationType = searchParams.get("creationType");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    creationType: creationType,
    reportType: "1",
    title: "",
    frequency: "onetime"
  });

  useEffect(() => {
    console.log('Fetching report data...');
    fetch(`http://localhost:8080/api/report?creationType=${creationType}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setReportResponse(data);
        setFormData((prevData) => ({
          ...prevData,
          creationType: creationType
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [creationType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      reportType: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // バリデーションを追加
    if (!formData.reportType) {
      setErrorMessage("エラー: タイプを選択してください。");
      return;
    }
    if (!formData.title) {
      setErrorMessage("エラー: タイトルを入力してください。");
      return;
    }

    fetch("http://localhost:8080/api/report/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseMessage(data.message);
        setErrorMessage("");  // 成功時にはエラーメッセージをクリア
        if (data.redirect) {
          navigate(data.redirect);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div>
      <h1>{reportResponse.message || "Placeholder text"}</h1>
      <h3>{reportResponse.notice || "Placeholder text"}</h3>
      {/* フォームの追加 */}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="reportType"
            value="1"
            checked={formData.reportType === "1"}
            onChange={handleRadioChange}
          />
          BS
        </label>
        <label>
          <input
            type="radio"
            name="reportType"
            value="2"
            checked={formData.reportType === "2"}
            onChange={handleRadioChange}
			disabled
          />
          PL
        </label>
        <label>
          <input
            type="radio"
            name="reportType"
            value="3"
            checked={formData.reportType === "3"}
            onChange={handleRadioChange}
            disabled
          />
          CS
        </label>
        <br />
        <label htmlFor="title">タイトル：</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          maxLength="255"
        />
        <br />
        <button type="submit">作成する</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};
