/*
  app.js - The main application logic

  This file takes data from data.js and displays it on the page.
  This is where you see "data flows from storage to screen"!
*/

// Step 1: Find the container element in our HTML where we'll put the zone cards
const container = document.getElementById('zones-container');

// Step 2: Define a helper function to get the right CSS class for health scores
function getHealthClass(score) {
    if (score >= 80) return 'health-excellent';
    if (score >= 60) return 'health-good';
    if (score >= 40) return 'health-fair';
    return 'health-poor';
}

// Step 3: Define a function to create HTML for a single zone card
function createZoneCard(zone) {
    // Template literals (backticks) let us write HTML with variables inserted
    return `
        <div class="zone-card">
            <h2 class="zone-name">${zone.name}</h2>
            <p class="zone-type">${zone.zone_type.replace('_', ' ')}</p>

            <div class="health-section">
                <div class="health-score ${getHealthClass(zone.health_score)}">
                    ${zone.health_score}
                </div>
                <span class="health-label">Health Score</span>
            </div>

            <div class="care-status status-${zone.care_status}">
                ${zone.care_status.replace('_', ' ')}
            </div>
        </div>
    `;
}

// Step 4: Loop through all zones and create cards for each one
// This is the "data to screen" flow!
function displayZones() {
    // Use map() to transform each zone object into HTML
    const cardsHTML = gardenZones.map(zone => createZoneCard(zone));

    // Join all the HTML strings together and put them in the container
    container.innerHTML = cardsHTML.join('');
}

// Step 5: Call the function to display everything when the page loads
displayZones();

// Log a message so you can see it worked (open browser developer tools to see this)
console.log('Garden zones loaded:', gardenZones.length, 'zones displayed');
