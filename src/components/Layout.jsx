import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.main}>{children}</main>
    </div>
  );
};

const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#0b0b0d", color: '#eaeaea' },
  main: { flex: 1, padding: 24 },
};

export default Layout;
