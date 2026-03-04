import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="copyright">
            © {currentYear} Sam Tam. 保留所有權利.
          </p>
          <p className="copyright-en">
            © {currentYear} Sam Tam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
