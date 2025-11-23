import React, { useEffect, useState } from "react";

const STORAGE_KEY = "students";

const getStudents = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveStudents = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const currentUser = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('currentUser')); } catch { return null; }
  }, []);

  useEffect(() => {
    const list = getStudents();
    if (list.length === 0) {
      const sample = [
        { id: 1, name: "María Pérez", identifier: "A001" },
        { id: 2, name: "Juan Gómez", identifier: "A002" },
      ];
      saveStudents(sample);
      setStudents(sample);
    } else setStudents(list);
  }, []);

  const canAdd = currentUser && currentUser.role === "Profesor";
  const canEdit = currentUser && currentUser.role === "Coordinador";

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !identifier) return;
    const next = [...students, { id: Date.now(), name, identifier }];
    saveStudents(next);
    setStudents(next);
    setName(""); setIdentifier("");
  };

  const startEdit = (s) => {
    setEditingId(s.id); setEditName(s.name);
  };

  const cancelEdit = () => { setEditingId(null); setEditName(""); };

  const saveEdit = (id) => {
    const next = students.map((s) => s.id === id ? { ...s, name: editName } : s);
    saveStudents(next); setStudents(next); cancelEdit();
  };

  const remove = (id) => {
    // eslint-disable-next-line no-restricted-globals
    // Use explicit window.confirm to avoid ESLint no-restricted-globals error
    if (!window.confirm("¿Eliminar este alumno?")) return;
    const next = students.filter((s) => s.id !== id);
    saveStudents(next); setStudents(next);
  };

  return (
    <div>
      <h1>Alumnos registrados</h1>
      <p>Acceso: {currentUser ? `${currentUser.name || currentUser.email} (${currentUser.role})` : 'Visitante'}</p>

      {canAdd && (
        <div style={{ marginBottom: 16, background: '#1b1b1b', padding: 12, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Agregar alumno</h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} style={{ padding:8, borderRadius:6, border:'1px solid #333', background:'#0f0f0f', color:'#eee' }} />
            <input placeholder="Código" value={identifier} onChange={(e) => setIdentifier(e.target.value)} style={{ padding:8, borderRadius:6, border:'1px solid #333', background:'#0f0f0f', color:'#eee' }} />
            <button style={{ padding:'8px 12px', background:'#7B1F2A', color:'white', borderRadius:6 }}>Agregar</button>
          </form>
        </div>
      )}

      <div style={{ background: '#141414', padding: 12, borderRadius: 8 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color:'#eee' }}>
          <thead>
            <tr>
              <th style={{ textAlign:'left', padding:8 }}>Nombre</th>
              <th style={{ textAlign:'left', padding:8 }}>Código</th>
              <th style={{ padding:8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} style={{ borderTop: '1px solid #222' }}>
                <td style={{ padding:8 }}>
                  {editingId === s.id ? (
                    <input value={editName} onChange={(e)=>setEditName(e.target.value)} style={{ padding:6, borderRadius:4, border:'1px solid #333', background:'#0f0f0f', color:'#eee' }} />
                  ) : s.name}
                </td>
                <td style={{ padding:8 }}>{s.identifier}</td>
                <td style={{ padding:8, textAlign:'center' }}>
                  {canEdit ? (
                    <>
                      {editingId === s.id ? (
                        <>
                          <button onClick={()=>saveEdit(s.id)} style={{ marginRight:6, padding:'6px 8px', background:'#2a7f2a', color:'#fff', borderRadius:4 }}>Guardar</button>
                          <button onClick={cancelEdit} style={{ padding:'6px 8px', background:'#555', color:'#fff', borderRadius:4 }}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={()=>startEdit(s)} style={{ marginRight:6, padding:'6px 8px', background:'#7B1F2A', color:'#fff', borderRadius:4 }}>Editar</button>
                          <button onClick={()=>remove(s.id)} style={{ padding:'6px 8px', background:'#8b1f1f', color:'#fff', borderRadius:4 }}>Eliminar</button>
                        </>
                      )}
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
