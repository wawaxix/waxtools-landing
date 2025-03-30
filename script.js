// Stripe checkout setup
const stripe = Stripe("pk_test_51Qzwa0GUMVxc2aDAx2cKkxojorEheP7nrt7hKS6naVw08Un1WQcfVkDkyHdp0DlotGqnmz9UFe56cECt0kHwJmEf00dRLn9nN4"); // ← TA CLÉ PUBLIQUE STRIPE ICI

document.getElementById("buyButton").addEventListener("click", async () => {
  const email = prompt("Entrez votre email pour recevoir la clé après paiement :");

  if (!email || !email.includes("@")) {
    alert("Adresse email invalide.");
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
