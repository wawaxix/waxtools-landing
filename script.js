const particles = document.querySelector('.particles');

for (let i = 0; i < 100; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.left = Math.random() * 100 + '%';
  dot.style.top = Math.random() * 100 + '%';
  particles.appendChild(dot);
}

document.querySelectorAll('.dot').forEach(dot => {
  const size = Math.random() * 4 + 2;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.background = '#00ffff33';
  dot.style.position = 'absolute';
  dot.style.borderRadius = '50%';
  dot.style.animation = `float ${5 + Math.random() * 5}s infinite ease-in-out`;
});

const style = document.createElement('style');
style.textContent = `
@keyframes float {
  0% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(-20px); opacity: 0.2; }
  100% { transform: translateY(0); opacity: 0.8; }
}`;
document.head.appendChild(style);

// Stripe setup
const stripe = Stripe("pk_test_51Qzwa0GUMVxc2aDAx2cKkxojorEheP7nrt7hKS6naVw08Un1WQcfVkDkyHdp0DlotGqnmz9UFe56cECt0kHwJmEf00dRLn9nN4"); // ← TA CLÉ PUBLIQUE STRIPE ICI

document.getElementById("buyButton").addEventListener("click", async () => {
  try {
    const response = await fetch("https://waxtools-admin-api.onrender.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { id } = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: id });

    if (result.error) {
      alert(result.error.message);
    }
  } catch (err) {
    console.error(err);
    alert("Erreur lors du paiement.");
  }
});

// Message de remerciement après achat réussi
const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true") {
  document.querySelector("main").style.display = "none";
  document.getElementById("confirmation").style.display = "block";
  // Confetti animation 🎉
confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
  
}
