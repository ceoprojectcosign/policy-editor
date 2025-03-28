export default function Upgrade() {
    return (
      <div className="min-h-screen bg-white text-gray-800 p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Unlock Premium Features</h1>
        <p className="mb-4">Upgrade to the premium plan and get access to:</p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>🔍 Web-based PDF Scraper</li>
          <li>🧠 AI-powered Summarization</li>
          <li>📊 Engagement Analytics</li>
          <li>📜 Unlimited Version History</li>
          <li>🚀 Priority Feature Access</li>
        </ul>
        <p className="text-sm text-gray-600 mb-2">$10/month — cancel anytime.</p>
        <StripeButton />
      </div>
    );
  }