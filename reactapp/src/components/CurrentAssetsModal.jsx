import React, { useState, useEffect } from 'react';
import './AssetsModal.css'; // 同じCSSファイルを使用

export const CurrentAssetsModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    cash: 0,
    notesReceivable: 0,
    accountsReceivable: 0,
    securities: 0,
	inventory: 0,
	allowanceForDoubtfulAccounts: 0,
	otherCurrentAssets: 0
  });

  useEffect(() => {
    if (isOpen) {
      // モーダルが開かれたときに初期値を設定しない
    }
  }, [isOpen]);

  useEffect(() => {
    onSave(formData);
  }, [formData, onSave]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseFloat(value) || 0
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>流動資産入力</h2>
        <div className="form-group">
          <label htmlFor="cash">現金:</label>
          <input
            type="number"
            id="cash"
            name="cash"
            value={formData.cash || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notesReceivable">受取手形:</label>
          <input
            type="number"
            id="notesReceivable"
            name="notesReceivable"
            value={formData.notesReceivable || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountsReceivable">売掛金:</label>
          <input
            type="number"
            id="accountsReceivable"
            name="accountsReceivable"
            value={formData.accountsReceivable || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="securities">有価証券:</label>
          <input
            type="number"
            id="securities"
            name="securities"
            value={formData.securities || ''}
            onChange={handleInputChange}
          />
        </div>
		<div className="form-group">
		  <label htmlFor="inventory">商品:</label>
		  <input
		    type="number"
		    id="inventory"
		    name="inventory"
		    value={formData.inventory || ''}
		    onChange={handleInputChange}
		  />
		</div>
		<div className="form-group">
		  <label htmlFor="allowanceForDoubtfulAccounts">貸倒引当金:</label>
		  <input
		    type="number"
		    id="allowanceForDoubtfulAccounts"
		    name="allowanceForDoubtfulAccounts"
		    value={formData.allowanceForDoubtfulAccounts || ''}
		    onChange={handleInputChange}
		  />
		</div>
		<div className="form-group">
		  <label htmlFor="otherCurrentAssets">その他:</label>
		  <input
		    type="number"
		    id="otherCurrentAssets"
		    name="otherCurrentAssets"
		    value={formData.otherCurrentAssets || ''}
		    onChange={handleInputChange}
		  />
		</div>
        <div className="form-group">
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  );
};
