export default function StripeButton() {
  const handleUpgrade = async () => {
    const res = await fetch('/api/create-checkout-session', { method: 'POST' });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <button
      onClick={handleUpgrade}
      className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
    >
      Upgrade to Premium
    </button>
  );
}
