import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import PremiumOnly from '../components/PremiumOnly';
import UpgradeButton from '../components/UpgradeButton';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

      {user ? (
        <div className="mb-6">
          <p className="text-gray-700">Signed in as: <strong>{user.email}</strong></p>
          <p className="text-gray-700">Role: <strong>{user.user_metadata?.role || 'free'}</strong></p>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}

      <PremiumOnly>
        <div className="mt-6 border p-4 rounded bg-green-50 text-green-800">
          <h2 className="text-xl font-semibold mb-2">Premium Features</h2>
          <p>Here’s your exclusive access to premium tools, baby. ✨</p>
        </div>
      </PremiumOnly>

      {!user?.user_metadata?.role || user.user_metadata.role === 'free' ? (
        <div className="mt-6">
          <UpgradeButton />
        </div>
      ) : null}
    </div>
  );
}
