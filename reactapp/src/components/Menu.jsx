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

  const handleNavigate = (creationType) => {
    navigate(`/report?creationType=${creationType}`);
  };

  return (
    <div>
      <h1>{menuResponse.message || "Placeholder text"}</h1>
      <h3>{menuResponse.notice || "Placeholder text"}</h3>
      <p>データ件数: {menuResponse.historyCount} 件</p>
      {/* ボタン */}
      <div>
        <button type="button" name="creationType" value="onetime" onClick={() => handleNavigate("onetime")}>
          単発作成
        </button>
        <button type="button" name="creationType" value="regular" disabled>
          定期作成
        </button>
        <button type="button" name="creationType" value="reading" disabled>
          履歴
        </button>
      </div>
    </div>
  );
};
