'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@') && password.length >= 6) {
      localStorage.setItem('auth', 'true');
      router.push('/propiedades');
    }
  };

  return (
    <div className={darkMode ? "login-container dark" : "login-container"}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          marginBottom: '20px',
          padding: '8px 12px',
          cursor: 'pointer'
        }}
      >
        Cambiar a {darkMode ? 'modo claro' : 'modo oscuro'}
      </button>

      <div className="login-box">
        <h1>Inicio de Sesión</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          background: #f9f9f9;
          color: #111;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          transition: background 0.3s, color 0.3s;
        }
        .login-container.dark {
          background: #121212;
          color: #eee;
        }
        .login-box {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          width: 300px;
          max-width: 100%;
          transition: background 0.3s, color 0.3s;
        }
        .login-container.dark .login-box {
          background: #1e1e1e;
          box-shadow: 0 0 15px rgba(255,255,255,0.1);
        }
        label {
          display: block;
          margin: 1rem 0 0.5rem;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .login-container.dark input {
          background: #333;
          border: 1px solid #555;
          color: #eee;
        }
        button[type="submit"] {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.7rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        button[type="submit"]:hover {
          background: #005bb5;
        }
      `}</style>
    </div>
  );
}
