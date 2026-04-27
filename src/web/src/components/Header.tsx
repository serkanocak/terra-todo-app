import React from 'react';
import { LogOut, CheckCircle } from 'lucide-react';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="logo-section">
          <CheckCircle className="header-icon" size={28} />
          <h1>Terra Todo</h1>
        </div>
        {isAuthenticated && onLogout && (
          <button onClick={onLogout} className="header-logout-btn" title="Çıkış Yap">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        )}
      </div>
      <p>Modern Full-Stack Mülakat Projesi (TypeScript Sürümü)</p>
    </header>
  );
};

export default Header;
