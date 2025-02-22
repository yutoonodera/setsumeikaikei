import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const [menuResponse, setMenuResponse] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // APIをfetchする(呼び出す)
    fetch("http://localhost:8080/api/v1", { method: "GET" })
      // レスポンスのデータ形式をjsonに設定
      .then((res) => res.json())
      // APIから渡されるレスポンスデータ(data)をstateにセットする
      .then((data) => {
        setMenuResponse(data);
      });
  }, []);

  const handleNavigate = (option) => {
    navigate(`/report?option=${option}`);
  };

  return (
    <div>
      <h1>{menuResponse.message || "Placeholder text"}</h1>
      <h3>{menuResponse.notice || "Placeholder text"}</h3>
      <p>データ件数: {menuResponse.historyCount} 件</p>
      {/* ボタン */}
      <div>
        <button type="button" name="option" value="onetime" onClick={() => handleNavigate("onetime")}>
          新規作成
        </button>
        <button type="button" disabled>
          継続作成
        </button>
        <button type="button" disabled>
          履歴
        </button>
      </div>
    </div>
  );
};
