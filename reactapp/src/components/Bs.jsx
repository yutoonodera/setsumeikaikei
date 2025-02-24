import React, { useState } from 'react';
import { FixedAssetsModal } from './FixedAssetsModal';
import { CurrentAssetsModal } from './CurrentAssetsModal';

export const Bs = () => {
  const [isFixedModalOpen, setIsFixedModalOpen] = useState(false);
  const [isCurrentModalOpen, setIsCurrentModalOpen] = useState(false);
  const [totalFixedAssets, setTotalFixedAssets] = useState(0);
  const [totalCurrentAssets, setTotalCurrentAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

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

  return (
    <div>
      <h1>資産合計: {totalAssets}</h1>
      <h2>固定資産合計: {totalFixedAssets}</h2>
      <h2>流動資産合計: {totalCurrentAssets}</h2>
      <button onClick={handleOpenFixedModal}>固定資産入力</button>
      <button onClick={handleOpenCurrentModal}>流動資産入力</button>
      <FixedAssetsModal isOpen={isFixedModalOpen} onClose={handleCloseFixedModal} onSave={handleSaveFixed} />
      <CurrentAssetsModal isOpen={isCurrentModalOpen} onClose={handleCloseCurrentModal} onSave={handleSaveCurrent} />
    </div>
  );
};
