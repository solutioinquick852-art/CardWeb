-- 寶可夢卡牌查詢系統 - 數據庫初始化 Script
-- 版本: 1.0
-- 創建日期: 2026-03-02

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
-- 5. 插入測試數據（寶可夢卡牌）
-- ============================================

INSERT INTO cards (card_id, card_name, card_level, card_score, card_quantity, card_type, image_url1, image_url2, image_url3) VALUES
-- 皮卡丘系列（電系）
('001', '皮卡丘', 'UR', 9.8, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'),

('002', '皮卡丘', 'UR', 9.5, 2, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('003', '皮卡丘', 'UR', 9.3, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('004', '皮卡丘', 'SSR', 8.5, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('005', '皮卡丘', 'SSR', 8.0, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('006', '皮卡丘', 'SSR', 7.5, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('007', '皮卡丘', 'SR', 7.0, 2, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('008', '皮卡丘', 'SR', 6.5, 3, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('009', '皮卡丘', 'R', 6.0, 2, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

('010', '皮卡丘', 'R', 5.5, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
 '', ''),

-- 噴火龍系列（火系）
('101', '噴火龍', 'UR', 8.8, 2, '火',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif',
 ''),

('102', '水箭龜', 'SSR', 7.5, 3, '水',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
 '', ''),

('103', '妙蛙種子', 'SSR', 6.8, 1, '草',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
 '', ''),

-- 超夢系列（超能力系）
('201', '超夢', 'UR', 9.9, 1, '超能力',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/150.gif',
 ''),

-- 耿鬼系列（幽靈系）
('301', '耿鬼', 'SSR', 8.2, 4, '幽靈',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
 '', ''),

-- 快龍系列（龍系）
('401', '快龍', 'SSR', 8.5, 2, '龍',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
 '', ''),

-- 電系卡牌（其他）
('501', '雷丘', 'SR', 7.0, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
 '', ''),

('502', '皮卡西', 'SR', 7.5, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png',
 '', ''),

('503', '雷丘', 'SR', 8.0, 1, '電',
 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png',
 '', '');

-- ============================================
-- 6. 創建視圖（方便統計查詢）
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
-- 7. 設置注釋和權限
-- ============================================

COMMENT ON TABLE cards IS '寶可夢卡牌表 - 儲存所有卡牌信息';
COMMENT ON COLUMN cards.card_id IS '卡牌唯一編號（1-30位數字）';
COMMENT ON COLUMN cards.card_name IS '卡牌名稱（最多2000字符）';
COMMENT ON COLUMN cards.card_level IS '卡牌等級（UR, SSR, SR, R等）';
COMMENT ON COLUMN cards.card_score IS '卡牌分數（支持1位小數）';
COMMENT ON COLUMN cards.card_type IS '卡牌類型/種類（電、火、水、草等）';
COMMENT ON COLUMN cards.image_url1 IS '第一張圖片URL';
COMMENT ON COLUMN cards.image_url2 IS '第二張圖片URL';
COMMENT ON COLUMN cards.image_url3 IS '第三張圖片URL';

COMMENT ON TABLE admins IS '管理員表 - 儲存管理員登入信息';
COMMENT ON COLUMN admins.username IS '管理員用戶名（唯一）';
COMMENT ON COLUMN admins.password_hash IS '密碼哈希（bcrypt加密）';

GRANT SELECT, INSERT, UPDATE, DELETE ON cards TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON admins TO postgres;

-- ============================================
-- 完成
-- ============================================

-- 使用方法：
--
-- 方法 1: 直接執行
-- psql -U postgres -d card_inventory -f init.sql
--
-- 方法 2: 在 Render 的 PostgreSQL 連接中執行
-- 1. 打開 Render Dashboard
-- 2. 找到你的 PostgreSQL 服務
-- 3. 點擊 "Query" 或 "psql shell"
-- 4. 複製上面的 SQL 並執行
--
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
