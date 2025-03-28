import supabase from '../lib/supabaseClient';

const UserProfile = ({ user }) => {
  if (!user) return null;

  const email = user.email || 'unknown';
  const role = user.user_metadata?.role || 'free';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded shadow mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {email[0].toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-sm">{email}</p>
          <p className="text-xs text-gray-500">
            {role === 'premium' ? '🚀 Premium Member' : '🏅 Policy Rookie (Free)'}
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;