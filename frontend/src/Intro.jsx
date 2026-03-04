import React from 'react';
import Hero from './Hero';

function Intro() {
  return (
    <div className="container">
      <Hero />

      <div className="card-detail">
        <div className="card-detail-header">
          <h2>關於本系統</h2>
        </div>
        <div className="info-item" style={{ marginBottom: '20px' }}>
          <div className="info-value">
            <h3>專業評級標準</h3>
            <p style={{ marginTop: '10px', lineHeight: '1.8', color: '#28a745' }}>
              卡牌評級不只是收藏的保障，更是市場交易的信任基礎。
              每一張卡牌都經過嚴格檢測，包括卡面狀態、印刷品質、邊角磨損等細節，
              最終以標準化分數呈現。這樣的評級系統，讓收藏者能清楚了解卡牌的真實價值，
              並在市場上獲得更高的認可。
            </p>
            <p style={{ marginTop: '10px', lineHeight: '1.8', color: '#00c49a' }}>
              Card grading is not only a safeguard for collections but also a foundation of trust
              in market transactions. Each card undergoes strict inspection, including surface condition,
              print quality, and corner wear, ultimately presented as a standardized score.
              This grading system allows collectors to clearly understand the true value of their cards
              and gain greater recognition in the market.
            </p>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">評級服務</div>
          <div className="info-value">
            <ul style={{ lineHeight: '1.8', paddingLeft: '20px', color: '#333' }}>
              <li>🎯 嚴格的檢測流程</li>
              <li>📊 標準化的評級系統</li>
              <li>🔒 真實性認證保障</li>
              <li>💎 專業市場價值評估</li>
            </ul>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">服務優勢</div>
          <div className="info-value">
            <ul style={{ lineHeight: '1.8', paddingLeft: '20px', color: '#333' }}>
              <li>✅ 認可度高，提升交易信心</li>
              <li>✅ 評級準確，保障收藏價值</li>
              <li>✅ 專業團隊，豐富經驗</li>
              <li>✅ 快速服務，即時查詢</li>
            </ul>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">評級流程</div>
          <div className="info-value">
            <ol style={{ lineHeight: '1.8', paddingLeft: '20px', color: '#333' }}>
              <li><strong>初步檢查：</strong>卡面狀態、印刷清晰度</li>
              <li><strong>詳細評估：</strong>邊角磨損、表面痕跡</li>
              <li><strong>專業打分：</strong>依據標準給予評級分數</li>
              <li><strong>品質認證：</strong>專家核驗並發放證書</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
