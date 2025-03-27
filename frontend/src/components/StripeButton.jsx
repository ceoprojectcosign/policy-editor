const StripeButton = () => {
  const handleUpgrade = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    const { url } = await res.json()
    window.location.href = url
  }
  return <button onClick={handleUpgrade}>Upgrade to Premium</button>
}

export default StripeButton
