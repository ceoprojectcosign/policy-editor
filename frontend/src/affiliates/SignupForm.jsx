import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const referral = localStorage.getItem("referral_code");

    const payload = {
      email,
      referralCode: referral, // include the referral code in your backend payload
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("🎉 Signup complete", data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-black text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
