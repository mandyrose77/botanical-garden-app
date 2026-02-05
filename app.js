/*
  app.js - The main application logic

  This file takes data from data.js and displays it on the page.

  UPDATED: Now includes:
  - Click to view zone details
  - Filter by care status
  - Search zones by name

  KEY CONCEPTS:
  - Event listeners: respond to user clicks, typing, etc.
  - Show/hide elements: control what the user sees
  - Filtering data: show only items that match criteria
*/

// ============================================
// STEP 1: Get references to HTML elements
// ============================================
const container = document.getElementById('zones-container');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const detailPanel = document.getElementById('detail-panel');
const detailContent = document.getElementById('detail-content');
const closeDetailBtn = document.getElementById('close-detail');

// Track current filter state
let currentFilter = 'all';
let currentSearch = '';

// ============================================
// STEP 2: Helper functions
// ============================================

// Get CSS class for health score color
function getHealthClass(score) {
    if (score >= 80) return 'health-excellent';
    if (score >= 60) return 'health-good';
    if (score >= 40) return 'health-fair';
    return 'health-poor';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ============================================
// STEP 3: Create zone card HTML
// ============================================
// Added data-id attribute so we can identify which zone was clicked

function createZoneCard(zone) {
    return `
        <div class="zone-card" data-id="${zone.id}" data-status="${zone.care_status}">
            <h2 class="zone-name">${zone.name}</h2>
            <p class="zone-type">${zone.zone_type.replace(/_/g, ' ')}</p>

            <div class="health-section">
                <div class="health-score ${getHealthClass(zone.health_score)}">
                    ${zone.health_score}
                </div>
                <span class="health-label">Health Score</span>
            </div>

            <div class="care-status status-${zone.care_status}">
                ${zone.care_status.replace(/_/g, ' ')}
            </div>
        </div>
    `;
}

// ============================================
// STEP 4: Display zones (with filtering)
// ============================================

function displayZones() {
    const cardsHTML = gardenZones.map(zone => createZoneCard(zone));
    container.innerHTML = cardsHTML.join('');

    // After creating cards, apply current filters
    applyFilters();

    // Add click listeners to each card
    addCardClickListeners();
}

// ============================================
// STEP 5: Filter and Search logic
// ============================================

/*
  applyFilters() - Shows/hides zone cards based on:
  1. Current filter (care status)
  2. Current search text (zone name)

  A card is shown only if it matches BOTH criteria
*/
function applyFilters() {
    const cards = document.querySelectorAll('.zone-card');

    cards.forEach(card => {
        const status = card.dataset.status;
        const name = card.querySelector('.zone-name').textContent.toLowerCase();

        // Check if card matches filter
        const matchesFilter = currentFilter === 'all' || status === currentFilter;

        // Check if card matches search
        const matchesSearch = name.includes(currentSearch.toLowerCase());

        // Show card only if it matches both
        if (matchesFilter && matchesSearch) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ============================================
// STEP 6: Detail panel functions
// ============================================

/*
  showZoneDetail(zoneId) - Displays the detail panel for a zone

  This demonstrates:
  - Finding data by ID
  - Dynamically building complex HTML
  - Showing/hiding UI elements
*/
function showZoneDetail(zoneId) {
    // Find the zone in our data array
    const zone = gardenZones.find(z => z.id === zoneId);

    if (!zone) {
        console.error('Zone not found:', zoneId);
        return;
    }

    // Build the detail HTML
    detailContent.innerHTML = `
        <div class="detail-header">
            <h2>${zone.name}</h2>
            <p class="zone-type">${zone.zone_type.replace(/_/g, ' ')}</p>
            <div class="care-status status-${zone.care_status}">
                ${zone.care_status.replace(/_/g, ' ')}
            </div>
        </div>

        <p class="detail-description">${zone.description}</p>

        <div class="detail-stats">
            <div class="stat-item">
                <div class="stat-label">Health Score</div>
                <div class="stat-value">${zone.health_score}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Monthly Visitors</div>
                <div class="stat-value">${zone.monthly_visitor_count.toLocaleString()}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Biodiversity Index</div>
                <div class="stat-value">${zone.biodiversity_index}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Endangered Species</div>
                <div class="stat-value">${zone.endangered_species_count}</div>
            </div>
        </div>

        <div class="stat-item">
            <div class="stat-label">Last Inspection</div>
            <div class="stat-value">${formatDate(zone.last_inspection_date)}</div>
        </div>

        <div class="caretaker-info">
            <h4>Primary Caretaker</h4>
            <p>${zone.primary_caretaker}</p>
        </div>
    `;

    // Show the panel and overlay
    detailPanel.style.display = 'block';
    addOverlay();
}

function hideZoneDetail() {
    detailPanel.style.display = 'none';
    removeOverlay();
}

// Overlay functions (darkens background when detail panel is open)
function addOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    overlay.addEventListener('click', hideZoneDetail);
    document.body.appendChild(overlay);
}

function removeOverlay() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.remove();
    }
}

// ============================================
// STEP 7: Event listeners
// ============================================

// Add click listeners to zone cards
function addCardClickListeners() {
    const cards = document.querySelectorAll('.zone-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const zoneId = card.dataset.id;
            showZoneDetail(zoneId);
        });
    });
}

// Filter button clicks
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to clicked button
        button.classList.add('active');

        // Update current filter and apply
        currentFilter = button.dataset.filter;
        applyFilters();
    });
});

// Search input - fires on every keystroke
searchInput.addEventListener('input', (event) => {
    currentSearch = event.target.value;
    applyFilters();
});

// Close detail panel
closeDetailBtn.addEventListener('click', hideZoneDetail);

// Close detail panel with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideZoneDetail();
    }
});

// ============================================
// STEP 8: Initialize the app
// ============================================
displayZones();

console.log('Garden dashboard loaded:', gardenZones.length, 'zones');
console.log('Features: click to view details, filter by status, search by name');
