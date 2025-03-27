import StripeButton from './StripeButton'

const UpgradeBanner = ({ user }) => {
  if (user?.role === 'premium') return null
  return (
    <div className="p-2 bg-yellow-100 rounded">
      <p>You’re on the free plan. Upgrade to unlock AI tools, analytics, and more.</p>
      <StripeButton />
    </div>
  )
}

export default UpgradeBanner