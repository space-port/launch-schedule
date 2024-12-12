// Fetch launch data and display it
async function loadLaunches() {
    const response = await fetch('launch_schedule.json');
    const launches = await response.json();
  
    const launchContainer = document.getElementById('launches');
    launches.forEach((launch) => {
      const launchElement = document.createElement('div');
      launchElement.className = 'launch';
      launchElement.innerHTML = `
        <h3>${launch.name}</h3>
        <p>Destination: ${launch.destination}</p>
        <p>Launch Date: ${new Date(launch.date).toLocaleString()}</p>
        <p id="countdown-${launch.id}">Countdown: Calculating...</p>
      `;
      launchContainer.appendChild(launchElement);
  
      // Start the countdown
      startCountdown(launch.id, new Date(launch.date));
    });
  }
  
  // Countdown logic
  function startCountdown(id, targetDate) {
    const countdownElement = document.getElementById(`countdown-${id}`);
    function updateCountdown() {
      const now = new Date();
      const timeLeft = targetDate - now;
  
      if (timeLeft <= 0) {
        countdownElement.textContent = 'Countdown: Launch Complete!';
        clearInterval(timer);
        return;
      }
  
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
  
      countdownElement.textContent = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', loadLaunches);
  