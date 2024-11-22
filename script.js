/**
 * Rolls a dice
 * @param {number} sides - The number of sides on the die.
 */
function rollDice(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <p>You rolled a D${sides}: <strong>${result}</strong></p>
  `;
}

/**
 * Saves to local storage.
 * @param {string} id 
 */
function saveToLocalStorage(id) {
  const element = document.getElementById(id);
  localStorage.setItem(id, element.value);
}

/**
 * Loads the content from local storage.
 * @param {string} id 
 */
function loadFromLocalStorage(id) {
  const element = document.getElementById(id);
  const savedValue = localStorage.getItem(id);
  if (savedValue !== null) {
    element.value = savedValue;
  }
}

/**
 * Armor Class Tracker.
 */
function initializeArmorClassTracker() {
  const characters = [
    { name: 'Berry', id: 'ac-berry' },
    { name: 'Cold Nose', id: 'ac-cold-nose' },
    { name: 'Creg', id: 'ac-creg' },
    { name: 'Hugak', id: 'ac-hugak' },
    { name: 'Kalavet', id: 'ac-kalavet' },
    { name: 'Kio', id: 'ac-kio' },
    { name: 'Raktham', id: 'ac-raktham' },
    { name: 'Enemy', id: 'ac-enemy' }
  ];

  const trackerDiv = document.getElementById('armor-class-tracker');

  // Check if the tracker div exists
  if (!trackerDiv) {
    console.error("Armor class tracker div not found!");
    return;
  }

  // Create a slot for each character
  characters.forEach(character => {
    const slot = document.createElement('div');
    slot.className = 'ac-slot';

    // Label for the character
    const label = document.createElement('label');
    label.innerText = character.name;

    // Input for AC
    const input = document.createElement('input');
    input.type = 'number';
    input.id = character.id;
    input.placeholder = 'AC';
    input.addEventListener('input', () => saveToLocalStorage(character.id));

    // Append to slot
    slot.appendChild(label);
    slot.appendChild(input);

    // Add slot to tracker
    trackerDiv.appendChild(slot);

    // Load saved data
    loadFromLocalStorage(character.id);
    console.log(`Added AC slot for ${character.name}`);
  });
}

/**
 * Initializes components on page load.
 */
function initializePage() {
  // Initialize text trackers
  const textTrackers = ['notes', 'initiative'];
  textTrackers.forEach(id => {
    loadFromLocalStorage(id);
    document.getElementById(id).addEventListener('input', () => saveToLocalStorage(id));
  });

  // Initialize the Armor Class Tracker
  initializeArmorClassTracker();
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', initializePage);
