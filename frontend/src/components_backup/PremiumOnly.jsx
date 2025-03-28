export default function PremiumOnly({ children, user }) {
  const role = user?.user_metadata?.role || 'free';
  return role === 'premium' ? children : null;
}
