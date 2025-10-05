import React, { useEffect, useMemo, useState } from 'react'

// Base URL of the backend API
const API = 'http://localhost:5001'

export default function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')
  const [attDate, setAttDate] = useState('')
  const [attStatus, setAttStatus] = useState('Present')

  const fetchStudents = () => {
    fetch(`${API}/students`)
      .then(r => r.json())
      .then(setStudents)
  }

  useEffect(() => { fetchStudents() }, [])

  const addStudent = async () => {
    if (!name || !email) return
    const res = await fetch(`${API}/students`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, email })
    })
    if (res.ok) {
      setName(''); setEmail('')
      fetchStudents()
    }
  }

  const deleteStudent = async (id) => {
    await fetch(`${API}/students/${id}`, { method: 'DELETE' })
    fetchStudents()
  }

  const addAttendance = async (id) => {
    if (!attDate) return
    await fetch(`${API}/students/${id}/attendance`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ date: attDate, status: attStatus })
    })
    setAttDate('')
    fetchStudents()
  }

  const filtered = useMemo(() => students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  ), [students, search])

  // Define Material Design-like colors
  const colors = {
    primary: '#ff5722',
    secondary: '#009688',
    bg: '#ffffff',
    surface: '#f5f5f5',
    danger: '#8b0019ff',
    text: '#212121',
    muted: '#616161'
  }

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: 24,
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: colors.surface,
      minHeight: '100vh'
    }}>
      <h1 style={{ marginBottom: 8, color: colors.primary }}>Admin Portal</h1>
      <p style={{ marginTop: 0, opacity: 0.8, color: colors.muted }}>
        Manage students, search, and record attendance.
      </p>

      {/* === Add Student + Search Section === */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 24
      }}>
        {/* Add Student Form */}
        <div style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: colors.bg,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: colors.primary }}>Add Student</h2>
          <input
            placeholder="Full name"
            value={name}
            onChange={e=>setName(e.target.value)}
            style={{
              width: '95%',
              padding: 12,
              marginBottom: 12,
              borderRadius: 4,
              border: `1px solid ${colors.surface}`,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            style={{
              width: '95%',
              padding: 12,
              marginBottom: 12,
              borderRadius: 4,
              border: `1px solid ${colors.surface}`,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
          <button
            onClick={addStudent}
            style={{
              padding: '10px 16px',
              borderRadius: 4,
              backgroundColor: colors.primary,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Add
          </button>
        </div>

        {/* Search Box */}
        <div style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: colors.bg,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: colors.primary }}>Search</h2>
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{
              width: '90%',
              padding: 10,
              borderRadius: 4,
              border: `1px solid ${colors.surface}`,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
        </div>
      </section>

      {/* === Student List Section === */}
      <section>
        <h2 style={{ color: colors.primary }}>Students ({filtered.length})</h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {filtered.map(s => (
            <div key={s.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              padding: 16,
              borderRadius: 12,
              backgroundColor: colors.bg,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', color: colors.text }}>{s.name}</div>
                <div style={{ fontSize: 14, color: colors.muted }}>{s.email}</div>

                {/* Attendance */}
                <details style={{ marginTop: 8 }}>
                  <summary style={{ cursor: 'pointer', color: colors.secondary }}>
                    Attendance ({(s.attendance || []).length})
                  </summary>
                  <ul>
                    {(s.attendance || []).map((a, i) => (
                      <li key={i}>{a.date} – {a.status}</li>
                    ))}
                  </ul>
                </details>
              </div>

              {/* Actions */}
              <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="date" value={attDate} onChange={e=>setAttDate(e.target.value)} style={{ padding: 6, borderRadius: 4, border: `1px solid ${colors.surface}` }} />
                  <select value={attStatus} onChange={e=>setAttStatus(e.target.value)} style={{ padding: 6, borderRadius: 4, border: `1px solid ${colors.surface}` }}>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                    <option>Excused</option>
                  </select>
                  <button onClick={() => addAttendance(s.id)} style={{
                    padding: '6px 10px',
                    borderRadius: 4,
                    backgroundColor: colors.secondary,
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Record
                  </button>
                </div>

                <button onClick={() => deleteStudent(s.id)} style={{
                  padding: '6px 10px',
                  borderRadius: 4,
                  backgroundColor: colors.danger,
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}