import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [input, setInput] = useState('');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: input })
    });
    const data = await res.json();
    setUsername(data.username);
  };

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUsername('');
  };

  return (
    <div>
      <h1>ASAP Auth</h1>
      {username ? (
        <>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
