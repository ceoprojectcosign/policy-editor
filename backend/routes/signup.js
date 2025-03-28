app.post("/api/signup", async (req, res) => {
    const { email, referralCode } = req.body;
  
    // Save the user
    const userId = await db.createUser(email);
  
    // Optional: log the referral
    if (referralCode) {
      await db.trackReferral({
        referrer: referralCode,
        referredUser: userId,
      });
    }
  
    res.status(200).json({ success: true });
  });
  