import { createContext, useContext, useState, useEffect } from "react";

const AffiliateContext = createContext();

export function AffiliateProvider({ children }) {
  const [referralCode, setReferralCode] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("referral_code");
    if (stored) setReferralCode(stored);
  }, []);

  return (
    <AffiliateContext.Provider value={{ referralCode, setReferralCode }}>
      {children}
    </AffiliateContext.Provider>
  );
}

export const useAffiliateContext = () => useContext(AffiliateContext);
