// Import core React functions: useState (for data), useEffect (for side effects),
// and useMemo (for efficient filtering)
import React, { useEffect, useMemo, useState } from 'react'

// The base URL of the backend API (Flask microservice).
// In production, this might be an environment variable instead of localhost.
const API = 'http://localhost:5001'

// This is the main component for our frontend.
// Everything inside this function defines how the Student Admin Portal behaves.
export default function App() {
  // State variables store and update data within this component.
  // When a state value changes, React automatically re-renders the page section using it.
  const [students, setStudents] = useState([])     // all students loaded from backend
  const [name, setName] = useState('')             // new student's name input
  const [email, setEmail] = useState('')           // new student's email input
  const [search, setSearch] = useState('')         // search box filter
  const [attDate, setAttDate] = useState('')       // attendance date input
  const [attStatus, setAttStatus] = useState('Present') // attendance status selection

  // Fetch the full student list from the Flask backend
  const fetchStudents = () => {
    fetch(`${API}/students`)   // send GET request to backend
      .then(r => r.json())     // convert JSON response to JS object
      .then(setStudents)       // store data in React state
  }

  // Run fetchStudents() once when the component first loads
  // This is how we "initialise" the page with current backend data.
  useEffect(() => { fetchStudents() }, [])

  // Add a new student (POST request)
  const addStudent = async () => {
    // Don't allow empty name/email submissions
    if (!name || !email) return

    // Send a JSON payload to the Flask API
    const res = await fetch(`${API}/students`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, email })
    })

    // If the request succeeds, reset the form and refresh the student list
    if (res.ok) {
      setName(''); setEmail('')
      fetchStudents()
    }
  }

  // Delete a student by ID (DELETE request)
  const deleteStudent = async (id) => {
    await fetch(`${API}/students/${id}`, { method: 'DELETE' })
    fetchStudents() // refresh after deletion
  }

  // Add an attendance record for a student (POST request)
  const addAttendance = async (id) => {
    if (!attDate) return  // must have a date selected

    await fetch(`${API}/students/${id}/attendance`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ date: attDate, status: attStatus })
    })

    // Clear the attendance form and refresh data
    setAttDate('')
    fetchStudents()
  }

  // Filter students based on the search input.
  // useMemo ensures the filter only re-runs when students or search text changes.
  const filtered = useMemo(() => students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  ), [students, search])

  // JSX: the layout and visual structure of the app.
  // Inline CSS keeps this simple and self-contained for teaching purposes.
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Admin Portal</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Manage students, search and record attendance.
      </p>

      {/* === Top section: Add new students + Search box === */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Add Student Form */}
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Add Student</h2>
          <input
            placeholder="Full name"
            value={name}
            onChange={e=>setName(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />
          <button onClick={addStudent} style={{ padding: '8px 12px' }}>Add</button>
        </div>

        {/* Search Box */}
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Search</h2>
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
      </section>

      {/* === Student List Section === */}
      <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <h2>Students ({filtered.length})</h2>

        {/* Display each student record dynamically */}
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(s => (
            <div
              key={s.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                border: '1px solid #f2f2f2',
                borderRadius: 12,
                padding: 12
              }}
            >
              <div>
                {/* Student basic info */}
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.email}</div>

                {/* Collapsible Attendance List */}
                <details style={{ marginTop: 8 }}>
                  <summary>Attendance ({(s.attendance || []).length})</summary>
                  <ul>
                    {(s.attendance || []).map((a, i) => (
                      <li key={i}>{a.date} – {a.status}</li>
                    ))}
                  </ul>
                </details>
              </div>

              {/* Right-hand buttons: add attendance + delete */}
              <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                <div>
                  <input type="date" value={attDate} onChange={e=>setAttDate(e.target.value)} />
                  <select value={attStatus} onChange={e=>setAttStatus(e.target.value)}>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                    <option>Excused</option>
                  </select>
                  <button onClick={() => addAttendance(s.id)} style={{ marginLeft: 8 }}>Record</button>
                </div>

                {/* Delete student button */}
                <button
                  onClick={() => deleteStudent(s.id)}
                  style={{
                    background: '#ffe5e5',
                    border: '1px solid #f5b5b5',
                    padding: '6px 10px',
                    borderRadius: 8
                  }}
                >
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