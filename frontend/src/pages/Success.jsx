export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Payment Successful</h2>
        <p className="text-gray-700">Your premium access is now active.</p>
        <a href="/" className="mt-4 inline-block text-blue-600 underline">
          Go back to dashboard
        </a>
      </div>
    </div>
  );
}
