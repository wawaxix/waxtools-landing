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
