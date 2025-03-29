import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-gray-900 dark:bg-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-display text-[#1155cc] mb-4">
          Welcome to PolicyEditor
        </h1>
        <p className="text-lg font-light max-w-2xl mb-8">
          A modern tool for importing, editing, summarizing, and tracking education policies across school districts. Built for transparency, collaboration, and impact.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/policies"
            className="px-6 py-3 rounded bg-[#1155cc] hover:bg-[#0055cc] text-white font-semibold"
          >
            🧾 View & Edit Policies
          </Link>
          <Link
            to="/import"
            className="px-6 py-3 rounded bg-[#FF0000] hover:bg-[#990000] text-white font-semibold"
          >
            📥 Import Media
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Built with ❤️ for changemakers in education. Powered by Supabase, TailwindCSS, and GPT.
          </p>
        </div>
      </div>
    </div>
  );
}
