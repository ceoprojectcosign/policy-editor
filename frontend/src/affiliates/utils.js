export function getReferralCode() {
    return localStorage.getItem("referral_code");
  }
  
  export function setReferralCode(ref, days = 30) {
    localStorage.setItem("referral_code", ref);
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    localStorage.setItem("referral_expiry", expiry.toISOString());
  }
  
  export function isReferralValid() {
    const expiry = localStorage.getItem("referral_expiry");
    if (!expiry) return false;
    return new Date() < new Date(expiry);
  }
  