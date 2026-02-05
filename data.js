/*
  data.js - Hardcoded sample data for our garden zones

  This is our "storage" for now. Later, this data would come from a database.
  Each object in the array represents one garden zone with properties
  matching the design document schema.

  UPDATED: Added more fields for the detail view (visitor count, biodiversity, etc.)
*/

const gardenZones = [
    {
        id: "zone-001",
        name: "Tropical Rainforest Conservatory",
        zone_type: "indoor_conservatory",
        health_score: 85,
        care_status: "thriving",
        // Detail fields
        monthly_visitor_count: 1250,
        biodiversity_index: 92,
        endangered_species_count: 3,
        last_inspection_date: "2026-01-28",
        primary_caretaker: "Maria Rodriguez",
        description: "A lush indoor rainforest featuring plants from tropical regions worldwide."
    },
    {
        id: "zone-002",
        name: "Desert House",
        zone_type: "greenhouse",
        health_score: 45,
        care_status: "needs_attention",
        monthly_visitor_count: 820,
        biodiversity_index: 65,
        endangered_species_count: 1,
        last_inspection_date: "2026-01-30",
        primary_caretaker: "Carlos Martinez",
        description: "Home to cacti and succulents from arid regions. Currently dealing with pest issues."
    },
    {
        id: "zone-003",
        name: "Orchid House",
        zone_type: "greenhouse",
        health_score: 92,
        care_status: "thriving",
        monthly_visitor_count: 980,
        biodiversity_index: 88,
        endangered_species_count: 5,
        last_inspection_date: "2026-02-01",
        primary_caretaker: "Maria Rodriguez",
        description: "Features over 200 orchid species from around the world."
    },
    {
        id: "zone-004",
        name: "Butterfly Garden",
        zone_type: "outdoor_garden",
        health_score: 30,
        care_status: "critical",
        monthly_visitor_count: 1200,
        biodiversity_index: 78,
        endangered_species_count: 2,
        last_inspection_date: "2026-02-02",
        primary_caretaker: "Sarah Chen",
        description: "A pollinator paradise with native flowers that attract butterflies and bees."
    },
    {
        id: "zone-005",
        name: "Lily Pond",
        zone_type: "pond",
        health_score: 35,
        care_status: "critical",
        monthly_visitor_count: 650,
        biodiversity_index: 70,
        endangered_species_count: 1,
        last_inspection_date: "2026-01-25",
        primary_caretaker: "James Wilson",
        description: "Water garden featuring water lilies and lotus. Algae bloom requires immediate attention."
    },
    {
        id: "zone-006",
        name: "Native Plant Meadow",
        zone_type: "meadow",
        health_score: 68,
        care_status: "seasonal_prep",
        monthly_visitor_count: 450,
        biodiversity_index: 85,
        endangered_species_count: 0,
        last_inspection_date: "2026-01-29",
        primary_caretaker: "Sarah Chen",
        description: "Wildflower meadow showcasing plants native to the region. Preparing for spring bloom."
    },
    {
        id: "zone-007",
        name: "Fern Grotto",
        zone_type: "indoor_conservatory",
        health_score: 88,
        care_status: "thriving",
        monthly_visitor_count: 720,
        biodiversity_index: 82,
        endangered_species_count: 2,
        last_inspection_date: "2026-01-31",
        primary_caretaker: "Maria Rodriguez",
        description: "A shaded retreat featuring ferns from prehistoric lineages."
    },
    {
        id: "zone-008",
        name: "Rose Garden",
        zone_type: "outdoor_garden",
        health_score: 72,
        care_status: "seasonal_prep",
        monthly_visitor_count: 890,
        biodiversity_index: 55,
        endangered_species_count: 0,
        last_inspection_date: "2026-01-27",
        primary_caretaker: "Carlos Martinez",
        description: "Classic rose garden with over 50 varieties. Winter pruning in progress."
    }
];
