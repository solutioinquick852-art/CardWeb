-- ============================================
-- 1. 刪除舊表（如果存在）
-- ============================================

DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- ============================================
-- 2. 創建卡牌表
-- ============================================

CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    card_id VARCHAR(30) UNIQUE NOT NULL,           -- 卡牌編號（最多30位數字）
    card_name VARCHAR(2000) NOT NULL,           -- 卡牌名稱（最多2000字符）
    card_level VARCHAR(50),                      -- 卡牌等級
    card_score NUMERIC(4,1) NOT NULL,          -- 卡牌分數（支持1位小數）
    card_quantity INTEGER DEFAULT 1,              -- 卡牌數量
    image_url1 TEXT,                             -- 圖片 URL 1
    image_url2 TEXT,                             -- 圖片 URL 2
    image_url3 TEXT,                             -- 圖片 URL 3
    card_type VARCHAR(50),                       -- 卡牌類型/種類
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建索引以優化查詢
CREATE INDEX IF NOT EXISTS idx_cards_card_id ON cards(card_id);
CREATE INDEX IF NOT EXISTS idx_cards_type ON cards(card_type);
CREATE INDEX IF NOT EXISTS idx_cards_score ON cards(card_score);

-- ============================================
-- 3. 創建管理員表
-- ============================================

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,         -- 管理員用戶名
    password_hash TEXT NOT NULL,                   -- 密碼哈希（bcrypt）
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. 插入預設管理員
-- ============================================
-- 用戶名: admin
-- 密碼: admin123
-- 密碼哈希: $2a$10$xw.zVJTGyUA.FKWmG9SNx.oWX9DCOonFoy4oRDvhNRkm60TANon7e
--
-- 重要：這是預設密碼，首次登入後請立即修改！

INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2a$10$xw.zVJTGyUA.FKWmG9SNx.oWX9DCOonFoy4oRDvhNRkm60TANon7e');

-- ============================================
-- 5. 創建視圖（方便統計查詢）
-- ============================================

-- 按卡牌類型統計的視圖
CREATE OR REPLACE VIEW card_type_stats AS
SELECT
    card_type,
    COUNT(*) as total_count,
    AVG(card_score) as avg_score,
    MAX(card_score) as max_score,
    MIN(card_score) as min_score
FROM cards
GROUP BY card_type;

-- 按卡牌等級統計的視圖
CREATE OR REPLACE VIEW card_level_stats AS
SELECT
    card_level,
    COUNT(*) as total_count
FROM cards
GROUP BY card_level;

-- ============================================
-- 6. 設置PG
-- ============================================

GRANT SELECT, INSERT, UPDATE, DELETE ON cards TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON admins TO postgres;

-- ============================================
-- 完成
-- ============================================

-- 使用方法：
--
-- 直接執行
-- psql -U postgres -d card_inventory -f init.sql

-- 默認管理員賬號：
-- 用戶名: admin
-- 密碼: admin123
--
-- 測試查詢：
-- SELECT * FROM cards LIMIT 10;
-- SELECT * FROM admins;
--
-- 統計查詢：
-- SELECT * FROM card_type_stats;
-- SELECT * FROM card_level_stats;
--
-- 備份數據庫：
-- pg_dump -U postgres card_inventory > backup.sql
--
-- 恢復數據庫：
-- psql -U postgres card_inventory < backup.sql
