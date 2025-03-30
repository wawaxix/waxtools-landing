console.log("WaxTools script chargé ✅");

const stripe = Stripe("pk_test_51Qzwa0GUMVxc2aDAx2cKkxojorEheP7nrt7hKS6naVw08Un1WQcfVkDkyHdp0DlotGqnmz9UFe56cECt0kHwJmEf00dRLn9nN4");

const buyButton = document.getElementById("buyButton");
if (buyButton) {
  buyButton.addEventListener("click", async () => {
    console.log("Bouton acheter cliqué ✅");
    try {
      const response = await fetch("https://waxtools-admin-api.onrender.com/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
}

const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true") {
  setTimeout(() => {
    document.querySelector("main")?.classList.add("hidden");
    const confirmation = document.getElementById("confirmation");
    confirmation.classList.remove("hidden");

    const key = params.get("key");
    const keyDisplay = document.getElementById("displayKey");
    if (key && keyDisplay) {
      keyDisplay.textContent = key;
    }

    const copyBtn = document.getElementById("copyKeyBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(key).then(() => {
          const msg = document.getElementById("copyMessage");
          msg.classList.remove("hidden");
          setTimeout(() => msg.classList.add("hidden"), 2000);
        });
      });
    }

    let count = 0;
    const interval = setInterval(() => {
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
      count++;
      if (count === 5) clearInterval(interval);
    }, 500);
  }, 300);
}

if (params.get("cancelled") === "true") {
  document.querySelector("main")?.classList.add("hidden");
  document.getElementById("cancelled").classList.remove("hidden");
}
