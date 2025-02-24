import React, { useState, useEffect } from 'react';
import './AssetsModal.css'; // CSSファイルをインポート

export const FixedAssetsModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    land: 0,
    building: 0,
    equipment: 0,
    otherFixedAssets: 0
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
        <h2>固定資産入力</h2>
        <div className="form-group">
          <label htmlFor="land">土地:</label>
          <input
            type="number"
            id="land"
            name="land"
            value={formData.land || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="building">建物:</label>
          <input
            type="number"
            id="building"
            name="building"
            value={formData.building || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="equipment">設備:</label>
          <input
            type="number"
            id="equipment"
            name="equipment"
            value={formData.equipment || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="otherFixedAssets">その他:</label>
          <input
            type="number"
            id="otherFixedAssets"
            name="otherFixedAssets"
            value={formData.otherFixedAssets || ''}
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
