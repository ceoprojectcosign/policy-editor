const AFFILIATE_KEY = "referral_code";

export default function useAffiliate() {
  const getRef = () => localStorage.getItem(AFFILIATE_KEY);

  const setRef = (code) => {
    if (code) {
      localStorage.setItem(AFFILIATE_KEY, code);
    }
  };

  const clearRef = () => localStorage.removeItem(AFFILIATE_KEY);

  return { getRef, setRef, clearRef };
}
