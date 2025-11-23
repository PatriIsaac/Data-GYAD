import React from "react";

const DashboardPage = () => {
  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Academic Dashboard</h2>
      </nav>

      {/* CONTENIDO */}
      <div style={styles.content}>
        <h1 style={styles.title}>Visualización del Desempeño Académico</h1>

        <div style={styles.card}>
          <iframe
            title="Reporte Power BI"
            width="100%"
            height="500px"
            src="https://app.powerbi.com/reportEmbed?reportId=b8554f0b-d606-4905-873e-24008ebd0fbe&autoAuth=true&ctid=8dbd6711-3051-4a69-bb5e-8714606711d6"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© 2025 — Plataforma Académica</p>
      </footer>
    </div>
  );
};

// Estilos inline (rápidos y limpios)
const styles = {
  container: {
    backgroundColor: "#0b0b0d",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    backgroundColor: "#7B1F2A",
    padding: "15px 30px",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
  },
  content: {
    padding: "30px",
    flex: 1,
    color: '#e6e6e6'
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    color: "#f4f4f5",
  },
  card: {
    backgroundColor: "#141414",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#070606",
    color: "#d9bfbf",
    marginTop: "30px",
  },
};

export default DashboardPage;
