const UserProfile = ({ user }) => {
    if (!user) return null
  
    return (
      <div className="flex items-center space-x-3 p-2 bg-white rounded shadow">
        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold text-white">
          {user.email[0].toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-sm">{user.email}</p>
          <p className="text-xs text-gray-500">🏅 Policy Rookie (Level 1)</p>
        </div>
      </div>
    )
  }
  
  export default UserProfile
  