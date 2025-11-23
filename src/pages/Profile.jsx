import React from "react";

const Profile = () => {
  const currentUser = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('currentUser')); } catch { return null; }
  }, []);

  return (
    <div style={styles.container}>
      <h1>Perfil (solo visualización)</h1>
      {currentUser ? (
        <div style={styles.card}>
          <div style={styles.avatarRow}>
            <div style={styles.avatar}>{(currentUser.name && currentUser.name.split(' ').map(n=>n[0]).slice(0,2).join('')) || (currentUser.email && currentUser.email[0].toUpperCase()) || 'U'}</div>
            <div>
              <div style={styles.name}>{currentUser.name || '-'}</div>
              <div style={styles.email}>{currentUser.email}</div>
            </div>
          </div>

          <div style={styles.row}><strong>Rol:</strong> <span style={styles.value}>{currentUser.role || '-'}</span></div>
          <div style={styles.row}><strong>Notas:</strong> <span style={styles.value}>Solo vista. No se permiten ediciones aquí.</span></div>
        </div>
      ) : (
        <p>No hay usuario autenticado. Ve a la página de login para iniciar sesión.</p>
      )}
    </div>
  );
};

const styles = {
  container: { color: '#eaeaea', padding: 24 },
  card: { background: '#141414', padding: 20, borderRadius: 8, maxWidth: 720 },
  avatarRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 64, height: 64, borderRadius: '50%', background: '#7B1F2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: 20 },
  name: { fontSize: 18, fontWeight: '600' },
  email: { color: '#cfcfcf', fontSize: 14 },
  row: { marginTop: 8 },
  value: { marginLeft: 8, color: '#ffdede' },
};

export default Profile;
