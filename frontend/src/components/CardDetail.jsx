import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

function CardDetail({ card }) {
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/cards/distribution?card_id=${card.card_id}`
        );
        setDistribution(response.data);
      } catch (error) {
        console.error('獲取分數分佈失敗:', error);
      }
    };

    fetchDistribution();
  }, [card]);

  // 將分數分佈按分數排序（從高到低）
  const sortedDistribution = [...distribution].sort((a, b) => parseFloat(b.card_score) - parseFloat(a.card_score));

  return (
    <div className="container">
      <div className="card-detail">
        <div className="card-detail-header">
          <h2>{card.card_name}</h2>
        </div>

        <div className="card-info-grid">
          <div className="info-item">
            <div className="info-label">編號(No. )</div>
            <div className="info-value">{card.card_id}</div>
          </div>
          <div className="info-item">
            <div className="info-label">名稱 (Name)</div>
            <div className="info-value">{card.card_name}</div>
          </div>
          {card.card_type && (
            <div className="info-item">
              <div className="info-label">類型/種類 (Variety/Pedigree)</div>
              <div className="info-value">{card.card_type || '-'}</div>
            </div>
          )}
          <div className="info-item">
            <div className="info-label">等級 (Grade)</div>
            <div className="info-value">{card.card_level || '-'}</div>
          </div>
          <div className="info-item">
            <div className="info-label">分數 (Score)</div>
            <div className="info-value">{card.card_score || '-'}</div>
          </div>
        </div>

        <h3 style={{ margin: '30px 0 20px', color: '#00c49a', fontWeight: 'bold' }}>
          分數分佈 (Score Distribution)
        </h3>

        {sortedDistribution.length > 0 ? (
          <div className="distribution-container">
            <div className="distribution-group">
              <div className="distribution-items">
                {sortedDistribution.map((score, index) => (
                  <div key={index} className="distribution-item">
                    <div className="distribution-score">
                      {parseFloat(score.card_score).toFixed(1)}
                    </div>
                    <div className="distribution-count">
                      ({score.count})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            暫無分數分佈資料(No more scores of card)
          </div>
        )}

        {card.statistics && (
          <>
            <h3 style={{ margin: '30px 0 20px', color: '#00c49a', fontWeight: 'bold' }}>
              同類型卡牌統計 (Same Type Card Statistics)
            </h3>
            <div className="statistics-grid">
              <div className="stat-box">
                <div className="stat-value" style={{color: '#fff'}}>{card.statistics.total_same_type}</div>
                <div className="stat-label" style={{color: '#fff'}}>總數量 (Total)</div>
              </div>
              <div className="stat-box">
                <div className="stat-value" style={{color: '#fff'}} >{card.statistics.higher_score_count}</div>
                <div className="stat-label" style={{color: '#fff'}}>更高分數 (Higher Score)</div>
              </div>
              <div className="stat-box">
                <div className="stat-value" style={{color: '#fff'}}>{card.statistics.same_score_count}</div>
                <div className="stat-label" style={{color: '#fff'}}>相同分數 (Same Score)</div>
              </div>
            </div>
          </>
        )}

        {(card.image_url1 || card.image_url2 || card.image_url3) && (
          <>
            <h3 className="extra-info-title" style={{ margin: '30px 0 20px', color: '#00c49a', fontWeight: 'bold' }} >
              額外資料(Additional Information)
            </h3>
            <div className="card-images">
              {card.image_url1 && (
                <img
                  src={card.image_url1}
                  alt={card.card_name}
                  className="card-image"
                />
              )}
              {card.image_url2 && (
                <img
                  src={card.image_url2}
                  alt={`${card.card_name} 2`}
                  className="card-image"
                />
              )}
              {card.image_url3 && (
                <img
                  src={card.image_url3}
                  alt={`${card.card_name} 3`}
                  className="card-image"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CardDetail;
