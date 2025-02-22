import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Report = () => {
  const [reportResponse, setReportResponse] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reportOption = searchParams.get("option");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    option: reportOption,
    title: "",
    frequency: "onetime"
  });


  useEffect(() => {
    console.log('Fetching report data...');
    fetch(`http://localhost:8080/api/report?option=${reportOption}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setReportResponse(data);
        setFormData((prevData) => ({
          ...prevData,
          option: reportOption
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reportOption	]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <p>データ件数: {reportResponse.historyCount} 件</p>
      {/* フォームの追加 */}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="option"
            value="1"
            checked={formData.option === "1"}
            onChange={handleInputChange}
          />
          BS
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="2"
            disabled
            onChange={handleInputChange}
          />
          PL
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="3"
            disabled
            onChange={handleInputChange}
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
          required
        />
        <br />
        <label htmlFor="frequency">頻度を選択：</label>
        <select
          name="frequency"
          id="frequency"
          value={formData.frequency}
          onChange={handleInputChange}
        >
          <option value="onetime">1回</option>
          <option value="weekly">毎週</option>
          <option value="monthly">毎月</option>
        </select>
        <br />
        <button type="submit">作成する</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};
