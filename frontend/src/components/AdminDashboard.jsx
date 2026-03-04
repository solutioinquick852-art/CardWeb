import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CardModal from './CardModal';

const API_URL = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

function AdminDashboard({ username, onLogout }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/cards`);
      setCards(response.data);
    } catch (error) {
      setError('獲取卡牌列表失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = () => {
    setEditingCard(null);
    setShowModal(true);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowModal(true);
  };

  const handleDeleteCard = async (id) => {
    if (!window.confirm('確定要刪除這張卡牌嗎？')) return;

    try {
      await axios.delete(`${API_URL}/api/admin/cards/${id}`);
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      setError('刪除卡牌失敗');
    }
  };

  const handleSaveCard = async (cardData) => {
    try {
      if (editingCard) {
        // Update
        const response = await axios.put(
          `${API_URL}/api/admin/cards/${editingCard.id}`,
          cardData
        );
        setCards(cards.map(card =>
          card.id === editingCard.id ? response.data : card
        ));
      } else {
        // Create
        const response = await axios.post(`${API_URL}/api/admin/cards`, cardData);
        setCards([...cards, response.data]);
      }
      setShowModal(false);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || '保存卡牌失敗');
    }
  };

  return (
    <div className="container">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h2>👑 管理面板</h2>
          <div>
            <span style={{ marginRight: '15px' }}>歡迎, {username}</span>
            <button className="btn btn-small" style={{ background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' }} onClick={onLogout}>
              登出
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="btn" onClick={handleAddCard}>
          + 添加卡牌
        </button>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>載入中...</div>
        ) : cards.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🃏</div>
            <p>還沒有卡牌，點擊上方按鈕添加第一張卡牌！</p>
          </div>
        ) : (
          <table className="card-table">
            <thead>
              <tr>
                <th>編號</th>
                <th>名稱</th>
                <th>類型/種類</th>
                <th>等級</th>
                <th>分數</th>
                <th>數量</th>
                <th>圖片</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(card => (
                <tr key={card.id}>
                  <td>{card.card_id}</td>
                  <td>{card.card_name}</td>
                  <td>{card.card_type || '-'}</td>
                  <td>{card.card_level || '-'}</td>
                  <td>{card.card_score}</td>
                  <td>{card.card_quantity}</td>
                  <td>
                    {card.image_url1 && '✓'}
                    {card.image_url2 && '✓'}
                    {card.image_url3 && '✓'}
                    {!card.image_url1 && !card.image_url2 && !card.image_url3 && '-'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-small btn-edit"
                        onClick={() => handleEditCard(card)}
                      >
                        編輯
                      </button>
                      <button
                        className="btn btn-small btn-delete"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showModal && (
          <CardModal
            card={editingCard}
            onSave={handleSaveCard}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
