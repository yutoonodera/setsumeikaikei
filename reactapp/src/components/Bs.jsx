import React, { useState } from 'react';
import { FixedAssetsModal } from './FixedAssetsModal';
import { CurrentAssetsModal } from './CurrentAssetsModal';
import { useNavigate } from 'react-router-dom';

export const Bs = () => {
  const [isFixedModalOpen, setIsFixedModalOpen] = useState(false);
  const [isCurrentModalOpen, setIsCurrentModalOpen] = useState(false);
  const [totalFixedAssets, setTotalFixedAssets] = useState(0);
  const [totalCurrentAssets, setTotalCurrentAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities] = useState(2000); // 負債合計
  const [totalCapital] = useState(5000); // 資本合計
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージ用の状態
  const navigate = useNavigate();

  const handleOpenFixedModal = () => {
    setIsFixedModalOpen(true);
  };

  const handleOpenCurrentModal = () => {
    setIsCurrentModalOpen(true);
  };

  const handleCloseFixedModal = () => {
    setIsFixedModalOpen(false);
  };

  const handleCloseCurrentModal = () => {
    setIsCurrentModalOpen(false);
  };

  const handleSaveFixed = (formData) => {
    const { land, building, equipment, otherFixedAssets } = formData;
    const totalFixed = land + building + equipment + otherFixedAssets;
    setTotalFixedAssets(totalFixed);
    setTotalAssets(totalFixed + totalCurrentAssets); // 資産合計を更新
  };

  const handleSaveCurrent = (formData) => {
    const { cash, notesReceivable, accountsReceivable, securities, inventory, allowanceForDoubtfulAccounts, otherCurrentAssets } = formData;
    const totalCurrent = cash + notesReceivable + accountsReceivable + securities + inventory + allowanceForDoubtfulAccounts + otherCurrentAssets;
    setTotalCurrentAssets(totalCurrent);
    setTotalAssets(totalFixedAssets + totalCurrent); // 資産合計を更新
  };

  const handleNavigateToGraph = () => {
    // 資産合計と資本合計＋負債合計をチェック
    if (totalAssets !== totalLiabilities + totalCapital) {
      setErrorMessage("エラー: 資産合計が負債合計と資本合計の合計と一致しません。");
	}else if(totalAssets === 0 && totalLiabilities === 0 && totalCapital === 0){
	  setErrorMessage("エラー: すべて金額が0です。");
    } else {
    
      setErrorMessage(""); // エラーメッセージをクリア
      navigate('/bs/graph', {
        state: {
          totalAssets,
          totalLiabilities,
          totalCapital
        }
      });
    }
  };

  return (
    <div>
      <h1>資産合計: {totalAssets}</h1>
      <h2>固定資産合計: {totalFixedAssets}</h2>
      <h2>流動資産合計: {totalCurrentAssets}</h2>
      <button onClick={handleOpenFixedModal}>固定資産入力</button>
      <button onClick={handleOpenCurrentModal}>流動資産入力</button>
      <FixedAssetsModal isOpen={isFixedModalOpen} onClose={handleCloseFixedModal} onSave={handleSaveFixed} />
      <CurrentAssetsModal isOpen={isCurrentModalOpen} onClose={handleCloseCurrentModal} onSave={handleSaveCurrent} />
      <h1>資本合計: 5000</h1>
      <h1>負債合計: 2000</h1>
      
      {/* エラーメッセージを表示 */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      
      <button onClick={handleNavigateToGraph}>グラフ表示</button>
    </div>
  );
};
