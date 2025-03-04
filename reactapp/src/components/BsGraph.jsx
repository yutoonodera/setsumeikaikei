import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Graph from './Graph';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const BsGraph = () => {
  const location = useLocation();
  const [initialData, setInitialData] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    totalCapital: 0
  });
  const [data, setData] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    totalCapital: 0
  });

  useEffect(() => {
    if (location.state) {
      console.log('location.state:', location.state); // デバッグ用
      setInitialData(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      if (initialData.totalAssets !== 0 || initialData.totalLiabilities !== 0 || initialData.totalCapital !== 0) {
        console.log('fetchData initialData:', initialData); // デバッグ用
        try {
          const response = await fetch('/api/v1/bs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(initialData)
          });

          const result = await response.json();
          console.log("result:", result); // デバッグ用
          setData(result);
        } catch (error) {
          console.error('APIリクエスト中にエラーが発生しました:', error);
        }
      }
    };

    fetchData();
  }, [initialData]);

  // PDFダウンロード関数
  const downloadPdf = async () => {
    const container = document.querySelector('.container'); // 対象のDOMを取得
    const backLink = document.querySelector('a[href="/report/bs"]'); // 「戻る」リンクを取得
    const downloadButton = document.querySelector('button'); // 「PDFをダウンロード」ボタンを取得

    if (!container) return;

    try {
      // 「戻る」リンクとボタンを非表示
      if (backLink) backLink.style.display = 'none';
      if (downloadButton) downloadButton.style.display = 'none';

      // html2canvasでスクリーンショットを撮影
      const canvas = await html2canvas(container);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      // PDFサイズ計算
      const imgWidth = 190; // A4サイズに調整
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 画像をPDFに追加
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('BS_Report.pdf'); // PDFをダウンロード
    } catch (error) {
      console.error('PDF生成中にエラーが発生しました:', error);
    } finally {
      // 「戻る」リンクとボタンを再表示
      if (backLink) backLink.style.display = '';
      if (downloadButton) downloadButton.style.display = '';
    }
  };

  return (
    <div className="container">
      <h1>BS 割合グラフ</h1>
      <Graph totalAssets={data.totalAssets} totalLiabilities={data.totalLiabilities} totalCapital={data.totalCapital} />
      <h2>財務指標</h2>
      <table>
        <tbody>
          <tr>
            <th>指標</th>
            <th>計算式</th>
            <th>値</th>
          </tr>
          <tr>
            <td>流動比率</td>
            <td>流動資産 ÷ 流動負債 × 100</td>
            <td>{(data.totalAssets / data.totalLiabilities * 100).toFixed(2)}%</td>
          </tr>
          <tr>
            <td>ROA</td>
            <td>当期純利益 ÷ 総資産 × 100</td>
            <td>計算値を追加してください</td>
          </tr>
          <tr>
            <td>ROE</td>
            <td>当期純利益 ÷ 自己資本 × 100</td>
            <td>計算値を追加してください</td>
          </tr>
        </tbody>
      </table>
      <a href="/report/bs">戻る</a>
      <button onClick={downloadPdf}>PDFをダウンロード</button>
    </div>
  );
};

export default BsGraph;
