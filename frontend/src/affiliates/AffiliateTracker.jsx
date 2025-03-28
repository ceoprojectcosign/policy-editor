import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // If using React Router

const AFFILIATE_KEY = "referral_code";

export default function AffiliateTracker() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      localStorage.setItem(AFFILIATE_KEY, ref);
      console.log(`🔥 Affiliate code detected: ${ref}`);
    }
  }, [location.search]);

  return null; // This is a tracking-only component, nothing visual
}
