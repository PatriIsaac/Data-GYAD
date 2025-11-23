import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Estudiante");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Simple login: check localStorage users (if any) and navigate
  const handleLogin = (e) => {
    e.preventDefault();
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
    }
    // navigate regardless for this demo (real app should block)
    navigate("/dashboard");
  };

  // Registration: single submit button, keep existing data untouched
  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];
    const exists = users.find((u) => u.email === email);
    if (exists) {
      setMessage({ type: 'error', text: 'Ya existe una cuenta con ese correo.' });
      return;
    }
    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setMessage({ type: 'success', text: 'Cuenta creada correctamente. Ahora puedes iniciar sesión.' });
    // clear form
    setName(""); setEmail(""); setPassword(""); setRole("Estudiante");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginTop: 0, color: '#fff' }}>Iniciar sesión</h2>
        {message && (
          <div style={{ marginBottom: 12, color: message.type === 'error' ? '#ffb4b4' : '#bfe6c9' }}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="tu@ejemplo.com"
          />

          <label style={styles.label}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="********"
          />

          <button type="submit" style={styles.loginButton}>
            Entrar
          </button>
        </form>

        <hr style={{ borderColor: '#2a2a2a', margin: '16px 0' }} />

        <h3 style={{ marginTop: 0, color: '#fff' }}>Crear cuenta</h3>
        <form onSubmit={handleRegister} style={styles.form}>
          <label style={styles.label}>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Tu nombre (opcional)"
          />

          <label style={styles.label}>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="tu@ejemplo.com"
          />

          <label style={styles.label}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="********"
          />

          <label style={styles.label}>Rol</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} style={{ ...styles.input, padding: 10 }}>
            <option>Estudiante</option>
            <option>Profesor</option>
            <option>Coordinador</option>
          </select>

          <button type="submit" style={styles.registerButton}>
            Crear cuenta
          </button>
        </form>

        <p style={{ marginTop: 12, color: '#cfcfcf' }}>
          Volver a <Link to="/" style={{ color: '#ffdede' }}>inicio</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0d" },
  card: { background: "#1f1f1f", padding: 28, borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.6)", width: 420, textAlign: "left", color: '#f4f4f5' },
  form: { display: "flex", flexDirection: "column" },
  label: { marginTop: 12, marginBottom: 6, color: "#d7d7d7", fontSize: 14 },
  input: { padding: "10px 12px", borderRadius: 6, border: "1px solid #2a2a2a", fontSize: 14, background: '#0f0f0f', color: '#eee' },
  loginButton: { marginTop: 18, padding: "10px 14px", background: "#7B1F2A", color: "white", border: "none", borderRadius: 6, cursor: "pointer" },
  registerButton: { marginTop: 18, padding: "10px 14px", background: "#7B1F2A", color: "white", border: "none", borderRadius: 6, cursor: "pointer" },
};

export default LoginPage;
