// signup screen
'use client';
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const res = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Handle successful signup
        console.log('Signup successful');
      } else {
        // Handle signup error
        console.error('Signup failed');
      }
    } catch (err) {
      console.error('Signup request failed:', err);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Kullanıcı Adı</label>
          <input
            className="border p-2 rounded w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Parola</label>
          <input
            className="border p-2 rounded w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
