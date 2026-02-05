/*
  app.js - The main application logic

  This file takes data from data.js and displays it on the page.

  UPDATED: Now includes:
  - Click to view zone details
  - Filter by care status
  - Search zones by name
  - ANIMATED health score rings (SVG-based)

  KEY CONCEPTS:
  - Event listeners: respond to user clicks, typing, etc.
  - Show/hide elements: control what the user sees
  - Filtering data: show only items that match criteria
  - SVG animations: animated circular progress indicators
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

/*
  Calculate the stroke-dashoffset for the SVG ring animation
  - circumference = 2 * PI * radius = 2 * 3.14159 * 28 = ~176
  - offset = circumference * (1 - percentage/100)
  - When offset = 0, ring is full; when offset = circumference, ring is empty
*/
function calculateStrokeOffset(score) {
    const circumference = 176; // 2 * PI * 28
    return circumference * (1 - score / 100);
}

// ============================================
// STEP 3: Create zone card HTML with animated ring
// ============================================

function createZoneCard(zone) {
    const healthClass = getHealthClass(zone.health_score);
    const strokeOffset = calculateStrokeOffset(zone.health_score);

    return `
        <div class="zone-card" data-id="${zone.id}" data-status="${zone.care_status}" data-score="${zone.health_score}">
            <h2 class="zone-name">${zone.name}</h2>
            <p class="zone-type">${zone.zone_type.replace(/_/g, ' ')}</p>

            <div class="health-section">
                <div class="health-score-wrapper ${healthClass}">
                    <!-- SVG Ring for animated health score -->
                    <svg class="health-ring" viewBox="0 0 64 64">
                        <circle class="health-ring-bg" cx="32" cy="32" r="28"></circle>
                        <circle
                            class="health-ring-progress"
                            cx="32"
                            cy="32"
                            r="28"
                            style="stroke-dashoffset: 176;"
                            data-target-offset="${strokeOffset}"
                        ></circle>
                    </svg>
                    <div class="health-score">${zone.health_score}</div>
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

    // Animate the health score rings after a brief delay
    setTimeout(animateHealthRings, 100);
}

/*
  animateHealthRings() - Animates all health score rings on page load

  This creates a staggered animation effect where each ring
  fills up to its target value one after another.
*/
function animateHealthRings() {
    const rings = document.querySelectorAll('.health-ring-progress');

    rings.forEach((ring, index) => {
        const targetOffset = ring.dataset.targetOffset;

        // Stagger the animation start time for each card
        setTimeout(() => {
            ring.style.strokeDashoffset = targetOffset;
        }, index * 100); // 100ms delay between each card
    });
}

// ============================================
// STEP 5: Filter and Search logic
// ============================================

function applyFilters() {
    const cards = document.querySelectorAll('.zone-card');

    cards.forEach(card => {
        const status = card.dataset.status;
        const name = card.querySelector('.zone-name').textContent.toLowerCase();

        const matchesFilter = currentFilter === 'all' || status === currentFilter;
        const matchesSearch = name.includes(currentSearch.toLowerCase());

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

function showZoneDetail(zoneId) {
    const zone = gardenZones.find(z => z.id === zoneId);

    if (!zone) {
        console.error('Zone not found:', zoneId);
        return;
    }

    const healthClass = getHealthClass(zone.health_score);
    const strokeOffset = calculateStrokeOffset(zone.health_score);

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

    detailPanel.style.display = 'block';
    addOverlay();
}

function hideZoneDetail() {
    detailPanel.style.display = 'none';
    removeOverlay();
}

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

function addCardClickListeners() {
    const cards = document.querySelectorAll('.zone-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const zoneId = card.dataset.id;
            showZoneDetail(zoneId);
        });
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        applyFilters();
    });
});

searchInput.addEventListener('input', (event) => {
    currentSearch = event.target.value;
    applyFilters();
});

closeDetailBtn.addEventListener('click', hideZoneDetail);

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
console.log('Features: glassmorphism UI, animated health rings, filters, search');
