import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const currentUser = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('currentUser')); } catch { return null; }
  }, []);

  const initials = currentUser ? ((currentUser.name && currentUser.name.split(' ').map(n=>n[0]).slice(0,2).join('')) || (currentUser.email && currentUser.email[0].toUpperCase()) ) : null;

  return (
    <aside style={styles.sidebar}>
      <div style={styles.topArea}>
        <div style={styles.logo}>Plataforma</div>
        {currentUser && (
          <Link to="/profile" style={styles.avatarLink} aria-label="Perfil">
            <div style={styles.avatarSmall}>{initials || 'U'}</div>
          </Link>
        )}
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/students" style={styles.link}>Students</Link>
        <Link to="/login" style={styles.link}>Cerrar sesión</Link>
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: { width: 220, background: "#7B1F2A", color: "white", paddingTop: 20, minHeight: "100vh", boxSizing: "border-box" },
  logo: { fontSize: 18, fontWeight: "bold", padding: "0 20px 20px 20px", color: '#ffdede' },
  topArea: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' },
  avatarLink: { textDecoration: 'none' },
  avatarSmall: { width: 40, height: 40, borderRadius: '50%', background: '#3a0b0e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffdede', fontWeight: '600' },
  nav: { display: "flex", flexDirection: "column", padding: "0 12px" },
  link: { color: "#ffdede", padding: "10px 12px", textDecoration: "none", borderRadius: 6, marginBottom: 6 },
};

export default Sidebar;
