export default function Cancel() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">❌ Payment Canceled</h2>
          <p className="text-gray-700">Your upgrade was canceled. You’re still on the free plan.</p>
          <a href="/upgrade" className="mt-4 inline-block text-blue-600 underline">
            Try again
          </a>
        </div>
      </div>
    );
  }