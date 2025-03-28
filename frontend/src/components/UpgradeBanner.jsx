import StripeButton from './StripeButton';

const UpgradeBanner = ({ user }) => {
  const role = user?.user_metadata?.role || 'free';

  if (role === 'premium') return null;

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 shadow-sm">
      <p className="mb-2 font-medium">
        You’re on the free plan. Upgrade to unlock AI tools, analytics, and more.
      </p>
      <StripeButton />
    </div>
  );
};

export default UpgradeBanner;
