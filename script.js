// Stripe checkout setup
const stripe = Stripe("sk_test_51Qzwa0GUMVxc2aDA4e97EzYqBOcbWEmzF2Y5UT1g9yc7t28oXIKzJnqX3E75oD9y0A8lBR7zUe1CgJh779HH0YbZ00Wx4Ylj57"); // ← TA CLÉ PUBLIQUE TEST

document.getElementById("buyButton").addEventListener("click", async () => {
    const email = document.getElementById("emailInput").value.trim();
  
    if (!email || !email.includes("@")) {
      alert("Merci de renseigner une adresse email valide.");
      return;
    }
  
    try {
      const response = await fetch("https://waxtools-admin-api.onrender.com/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
  
      if (data.id) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de la session de paiement.");
    }
  });
  
  // ✅ Gestion des résultats
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "true") {
    setTimeout(() => {
      document.querySelector("main").style.display = "none";
      document.getElementById("confirmation").style.display = "block";
  
      let count = 0;
      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 }
        });
        count++;
        if (count === 5) clearInterval(interval);
      }, 500);
    }, 300);
  }
  
  if (params.get("cancelled") === "true") {
    document.querySelector("main").style.display = "none";
    document.getElementById("cancelled").style.display = "block";
  }