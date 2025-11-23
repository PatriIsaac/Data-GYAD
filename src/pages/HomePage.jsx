import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const currentUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser'));
    } catch {
      return null;
    }
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Plataforma de seguimiento académico</h1>
        <p style={styles.subtitle}>Portal de visualización de reportes educativos.</p>
        <div style={styles.userInfo}>
          Rol: {currentUser ? (currentUser.role || 'Coordinador') : 'Invitado'}
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2>Ir al Dashboard</h2>
          <p>Visualiza los reportes de desempeño académico embebidos desde Power BI.</p>
          <Link to="/dashboard" style={styles.link}>Abrir Dashboard</Link>
        </div>
      </main>

      <footer style={styles.footer}>© 2025 — Plataforma Académica</footer>
    </div>
  );
};

const styles = {
  container: { fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0b0b0d', color: '#f4f4f5' },
  header: { background: '#7B1F2A', color: 'white', padding: '24px 32px' },
  title: { margin: 0 },
  subtitle: { marginTop: 6, opacity: 0.9 },
  userInfo: { marginTop: 6, color: '#ffdede', fontSize: 14 },
  main: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { background: '#1f1f1f', padding: 24, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.4)', maxWidth: 720, textAlign: 'center', color: '#f4f4f5' },
  link: { display: 'inline-block', marginTop: 12, padding: '10px 16px', background: '#7B1F2A', color: 'white', borderRadius: 6, textDecoration: 'none' },
  footer: { textAlign: 'center', padding: 16, background: '#070606', color: '#cfcfcf' }
};

export default HomePage;
