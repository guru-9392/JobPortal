import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#f8f9fa',
    borderTop: '1px solid #e9ecef',
    padding: '20px 0',
    marginTop: '50px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  text: {
    color: '#6c757d',
    fontSize: '14px',
    margin: 0,
  },
};

export default Footer;