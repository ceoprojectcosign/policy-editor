import { useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Sign in or Sign up</h2>
      {sent ? (
        <p className="text-green-600">✅ Check your email for the magic link.</p>
      ) : (
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Send Magic Link
          </button>
        </form>
      )}
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
}