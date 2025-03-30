// Stripe Checkout setup
console.log("WaxTools script chargé ✅");

const stripe = Stripe("pk_test_51Qzwa0GUMVxc2aDAx2cKkxojorEheP7nrt7hKS6naVw08Un1WQcfVkDkyHdp0DlotGqnmz9UFe56cECt0kHwJmEf00dRLn9nN4");

document.getElementById("buyButton").addEventListener("click", async () => {
  console.log("Bouton acheter cliqué ✅");

  try {
    const response = await fetch("https://waxtools-admin-api.onrender.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
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

const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true") {
  const key = params.get("key") || "(clé indisponible)";

  setTimeout(() => {
    document.querySelector("main").style.display = "none";
    const confirm = document.getElementById("confirmation");
    confirm.style.display = "block";

    const keyDisplay = document.createElement("p");
    keyDisplay.innerHTML = `<strong>Clé Premium :</strong> ${key}`;
    confirm.appendChild(keyDisplay);

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
