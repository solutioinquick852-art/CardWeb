import React, { useState, useEffect } from 'react';

function CardModal({ card, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    card_id: '',
    card_name: '',
    card_level: '',
    card_score: '',
    card_quantity: 1,
    image_url1: '',
    image_url2: '',
    image_url3: '',
    card_type: ''
  });

  useEffect(() => {
    if (card) {
      setFormData({
        card_id: card.card_id,
        card_name: card.card_name,
        card_level: card.card_level || '',
        card_score: card.card_score,
        card_quantity: card.card_quantity,
        image_url1: card.image_url1 || '',
        image_url2: card.image_url2 || '',
        image_url3: card.image_url3 || '',
        card_type: card.card_type || ''
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.card_id || !formData.card_name || !formData.card_score) {
      alert('請填寫必填欄位');
      return;
    }

    // 編號限制為30位數字
    if (!/^\d{1,30}$/.test(formData.card_id)) {
      alert('卡牌編號必須為1-30位數字');
      return;
    }

    onSave({
      ...formData,
      card_score: parseFloat(formData.card_score),
      card_quantity: parseInt(formData.card_quantity) || 1
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header-wrapper">
          <div className="modal-header">
            <div className="modal-header-content">
              <h2>{card ? '編輯卡牌' : '添加卡牌'}</h2>
            </div>
            <button
              className="modal-close"
              onClick={onCancel}
              aria-label="關閉"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>卡牌編號 *</label>
            <input
              type="text"
              name="card_id"
              className="form-input"
              value={formData.card_id}
              onChange={handleChange}
              maxLength={30}
              pattern="\d*"
              required
            />
          </div>

          <div className="form-group">
            <label>卡牌名稱 *</label>
            <textarea
              name="card_name"
              className="form-input"
              value={formData.card_name}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>卡牌類型/種類</label>
            <input
              type="text"
              name="card_type"
              className="form-input"
              value={formData.card_type}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>卡牌等級</label>
            <input
              type="text"
              name="card_level"
              className="form-input"
              value={formData.card_level}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>卡牌分數 *</label>
            <input
              type="number"
              name="card_score"
              className="form-input"
              value={formData.card_score}
              onChange={handleChange}
              min="1"
              max="10"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label>卡牌數量</label>
            <input
              type="number"
              name="card_quantity"
              className="form-input"
              value={formData.card_quantity}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>圖片 URL 1</label>
            <input
              type="url"
              name="image_url1"
              className="form-input"
              value={formData.image_url1}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>圖片 URL 2</label>
            <input
              type="url"
              name="image_url2"
              className="form-input"
              value={formData.image_url2}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>圖片 URL 3</label>
            <input
              type="url"
              name="image_url3"
              className="form-input"
              value={formData.image_url3}
              onChange={handleChange}
            />
          </div>

          <div className="action-buttons" style={{ justifyContent: 'center' }}>
            <button 
            	type="submit" 
            	className="btn" 
            	style={{ width: 'auto'}}>
              保存
            </button>
            <button
              type="button"
              className="btn"
              onClick={onCancel}
              style={{ width: 'auto', background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' }}
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardModal;
