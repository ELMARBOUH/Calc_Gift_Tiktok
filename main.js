const giftValues = {
  rose: 1,
  heart: 10,
  diamond: 100,
  universe: 1000
};

// Approximate conversion rate (this varies and is simplified for demonstration)
const COIN_TO_USD_RATE = 0.03;

function calculateProfit(giftType, quantity) {
  const coins = giftValues[giftType] * quantity;
  const profit = (coins * COIN_TO_USD_RATE).toFixed(2);
  return { coins, profit };
}

function updateUI(coins, profit) {
  const totalCoinsElement = document.getElementById('totalCoins');
  const profitElement = document.getElementById('profit');
  
  // Animate the numbers
  animateNumber(totalCoinsElement, parseInt(totalCoinsElement.textContent), coins);
  animateNumber(profitElement, parseFloat(profitElement.textContent.slice(1)), profit, true);
}

function animateNumber(element, start, end, isCurrency = false) {
  const duration = 1000;
  const steps = 60;
  const increment = (end - start) / steps;
  let current = start;
  let step = 0;

  const animate = () => {
    current += increment;
    step++;
    
    if (isCurrency) {
      element.textContent = `$${current.toFixed(2)}`;
    } else {
      element.textContent = Math.round(current);
    }

    if (step < steps) {
      requestAnimationFrame(animate);
    } else {
      if (isCurrency) {
        element.textContent = `$${end.toFixed(2)}`;
      } else {
        element.textContent = end;
      }
    }
  };

  requestAnimationFrame(animate);
}

document.getElementById('calculate').addEventListener('click', () => {
  const giftType = document.getElementById('giftType').value;
  const quantity = parseInt(document.getElementById('quantity').value) || 0;
  
  const { coins, profit } = calculateProfit(giftType, quantity);
  updateUI(coins, parseFloat(profit));
  
  // Add button animation
  const button = document.getElementById('calculate');
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 100);
});

// Initialize with default values
const { coins, profit } = calculateProfit('rose', 1);
updateUI(coins, parseFloat(profit));