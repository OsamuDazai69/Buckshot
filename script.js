// Open the modal on page load
window.onload = () => {
  const modal = document.getElementById("team-name-modal");
  const form = document.getElementById("team-name-form");

  // Show the modal
  modal.style.display = "flex";

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Set team names
    document.getElementById("team1-name").textContent = document.getElementById("team1-input").value || "Team 1";
    document.getElementById("team2-name").textContent = document.getElementById("team2-input").value || "Team 2";
    document.getElementById("team3-name").textContent = document.getElementById("team3-input").value || "Team 3";
    document.getElementById("team4-name").textContent = document.getElementById("team4-input").value || "Team 4";

    // Hide the modal
    modal.style.display = "none";
  });
};

// Initialize variables for counters
let redCounter = 0;
let blueCounter = 0;

// Center Buttons
const redButton = document.getElementById("red-button");
const blueButton = document.getElementById("blue-button");
const resetButton = document.getElementById("reset-button");
const decreaseRedButton = document.getElementById("decrease-red-button");
const decreaseBlueButton = document.getElementById("decrease-blue-button");
const redCount = document.getElementById("red-count");
const blueCount = document.getElementById("blue-count");

// Update counters
redButton.addEventListener("click", () => {
  redCounter++;
  redCount.textContent = redCounter;
});

decreaseRedButton.addEventListener("click", () => {
  if (redCounter > 0) redCounter--;
  redCount.textContent = redCounter;
});

blueButton.addEventListener("click", () => {
  blueCounter++;
  blueCount.textContent = blueCounter;
});

decreaseBlueButton.addEventListener("click", () => {
  if (blueCounter > 0) blueCounter--;
  blueCount.textContent = blueCounter;
});

resetButton.addEventListener("click", () => {
  redCounter = 0;
  blueCounter = 0;
  redCount.textContent = redCounter;
  blueCount.textContent = blueCounter;
});

// Team Counters
const resetTeamsButton = document.getElementById("reset-teams-button");
const teamButtons = {
  team1: { win: "team1-wins", loss: "team1-losses" },
  team2: { win: "team2-wins", loss: "team2-losses" },
  team3: { win: "team3-wins", loss: "team3-losses" },
  team4: { win: "team4-wins", loss: "team4-losses" },
};

// Ensure no duplicate event listeners are attached
Object.keys(teamButtons).forEach((team) => {
  // Add event listener for win button
  const winButton = document.getElementById(`${team}-win`);
  const winListener = () => {
    const wins = document.getElementById(teamButtons[team].win);
    const currentWins = parseInt(wins.textContent); // Get current wins
    wins.textContent = currentWins + 1; // Increment wins by 1

    // Automatically add a loss to other teams
    Object.keys(teamButtons).forEach((otherTeam) => {
      if (otherTeam !== team) {
        const losses = document.getElementById(teamButtons[otherTeam].loss);
        const currentLosses = parseInt(losses.textContent); // Get current losses
        losses.textContent = currentLosses + 1; // Increment losses by 1
      }
    });
  };

  // Remove existing listeners before adding new ones
  winButton.removeEventListener("click", winListener);
  winButton.addEventListener("click", winListener);

  // Add event listener for loss button
  const loseButton = document.getElementById(`${team}-lose`);
  const loseListener = () => {
    const losses = document.getElementById(teamButtons[team].loss);
    const currentLosses = parseInt(losses.textContent); // Get current losses
    losses.textContent = currentLosses + 1; // Increment losses by 1
  };

  // Remove existing listeners before adding new ones
  loseButton.removeEventListener("click", loseListener);
  loseButton.addEventListener("click", loseListener);
});

// Reset team points
resetTeamsButton.addEventListener("click", () => {
  Object.values(teamButtons).forEach(({ win, loss }) => {
    document.getElementById(win).textContent = "0";
    document.getElementById(loss).textContent = "0";
  });
});

// Squares Functionality
const squares = document.querySelectorAll(".square");
const resetSquaresButton = document.getElementById("reset-squares-button");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square.classList.contains("red")) {
      square.classList.remove("red");
      square.classList.add("blue");
    } else if (square.classList.contains("blue")) {
      square.classList.remove("blue");
      square.classList.add("yellow");
    } else if (square.classList.contains("yellow")) {
      square.classList.remove("yellow");
    } else {
      square.classList.add("red");
    }
  });
});

resetSquaresButton.addEventListener("click", () => {
  squares.forEach((square) => {
    square.classList.remove("red", "blue", "yellow");
  });
});

// Calculate Winner Button
const calculateWinnerButton = document.getElementById("calculate-winner");
const winnerModal = document.getElementById("winner-modal");
const winnerNameElement = document.getElementById("winner-name");

// Function to calculate the winner
calculateWinnerButton.addEventListener("click", () => {
  let teams = [
    { name: document.getElementById("team1-name").textContent, wins: parseInt(document.getElementById("team1-wins").textContent) },
    { name: document.getElementById("team2-name").textContent, wins: parseInt(document.getElementById("team2-wins").textContent) },
    { name: document.getElementById("team3-name").textContent, wins: parseInt(document.getElementById("team3-wins").textContent) },
    { name: document.getElementById("team4-name").textContent, wins: parseInt(document.getElementById("team4-wins").textContent) },
  ];

  // Find the winner with the highest wins
  let winner = teams.reduce((prev, curr) => (curr.wins > prev.wins ? curr : prev), teams[0]);

  // Check for a tie
  let tiedTeams = teams.filter((team) => team.wins === winner.wins);
  if (tiedTeams.length > 1) {
    winnerNameElement.textContent = "It's a Tie! 🏆";
  } else {
    winnerNameElement.textContent = `${winner.name} 🎖️🏆`;
  }

  // Show the winner modal
  winnerModal.style.display = "flex";

  // Close modal after 5 seconds
  setTimeout(() => {
    winnerModal.style.display = "none";
  }, 5000);
});
