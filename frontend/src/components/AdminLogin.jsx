import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        username,
        password
      });

      if (response.data.success) {
        onLogin(username);
      }
    } catch (err) {
      setError(err.response?.data?.error || '登入失敗');
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>🔐 管理頁面</h2>

        {error && <div className="error-message">{error}</div>}

        {!showChangePassword && !showResetPassword ? (
          <>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>用戶名</label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>密碼</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn">
                登入
              </button>
            </form>
            <Link to="/" style={{ display: 'block', marginTop: '15px', textAlign: 'center', color: '#3b4cca' }}>
              返回首頁
            </Link>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setShowChangePassword(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b4cca',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '5px 10px'
                }}
              >
                修改密碼
              </button>
              {' | '}
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b4cca',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '5px 10px'
                }}
              >
                忘記密碼
              </button>
            </div>
          </>
        ) : (
          <>
            {showChangePassword && (
              <ChangePassword
                onCancel={() => setShowChangePassword(false)}
              />
            )}
            {showResetPassword && (
              <ResetPassword onCancel={() => setShowResetPassword(false)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ChangePassword({ onCancel }) {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [staticKey, setStaticKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 驗證金輪
    if (!staticKey || staticKey.trim() === '') {
      setError('請輸入金輪 (Static Key)');
      return;
    }

    // 驗證新密碼確認
    if (newPassword !== confirmPassword) {
      setError('新密碼和確認密碼不匹配');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/admin/change-password`, {
        username,
        old_password: oldPassword,
        new_password: newPassword,
        static_key: staticKey
      });

      if (response.data.success) {
        setSuccess('密碼修改成功！');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setStaticKey('');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || '修改失敗';
      if (errorMsg.includes('無效的金輪') || errorMsg.includes('Invalid')) {
        setError('金輪無效，請檢查後重新輸入');
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <>
      <h3 style={{color: '#00c49a',
    fontWeight: '700',
    marginBottom: '30px',
    textAlign: 'center'}}>修改密碼</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>用戶名</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>舊密碼</label>
          <input
            type="password"
            className="form-input"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>新密碼</label>
          <input
            type="password"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>確認新密碼</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>金輪 (Static Key)</label>
          <input
            type="password"
            className="form-input"
            value={staticKey}
            onChange={(e) => setStaticKey(e.target.value)}
          required
          />
        </div>
        <button type="submit" className="btn">
          修改密碼
        </button>
      </form>
      <button className="btn btn-secondary" onClick={onCancel}>
        返回
      </button>
    </>
  );
}

function ResetPassword({ onCancel }) {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [staticKey, setStaticKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 驗證金輪
    if (!staticKey || staticKey.trim() === '') {
      setError('請輸入金輪 (Static Key)');
      return;
    }

    // 驗證新密碼確認
    if (newPassword !== confirmPassword) {
      setError('新密碼和確認密碼不匹配');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/admin/reset-password`, {
        username,
        new_password: newPassword,
        static_key: staticKey
      });

      if (response.data.success) {
        setSuccess('密碼重置成功！');
        setUsername('');
        setNewPassword('');
        setConfirmPassword('');
        setStaticKey('');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || '重置失敗';
      if (errorMsg.includes('無效的金輪') || errorMsg.includes('Invalid')) {
        setError('金輪無效，請檢查後重新輸入');
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <>
      <h3 style={{color: '#00c49a',
    fontWeight: '700',
    marginBottom: '30px',
    textAlign: 'center'}}>重置密碼</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>用戶名</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>新密碼</label>
          <input
            type="password"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>確認新密碼</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>金輪 (Static Key)</label>
          <input
            type="password"
            className="form-input"
            value={staticKey}
            onChange={(e) => setStaticKey(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          重置密碼
        </button>
      </form>
      <button className="btn btn-secondary" onClick={onCancel}>
        返回
      </button>
    </>
  );
}

export default AdminLogin;
