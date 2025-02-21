import React, { useState, useEffect } from "react";

export const Menu = () => {
  const [menuResponse, setMenuResponse] = useState({});

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

  return (
    <div>
      <h1>{menuResponse.message || "Placeholder text"}</h1>
      <h3>{menuResponse.notice || "Placeholder text"}</h3>
      <p>データ件数: {menuResponse.historyCount} 件</p>
      {/* ボタン */}
      <form action="/report" method="get">
        <button type="submit" name="option" value="onetime">
          新規作成
        </button>
        <button type="submit" disabled>
          継続作成
        </button>
        <button type="submit" disabled>
          履歴
        </button>
      </form>
    </div>
  );
};
