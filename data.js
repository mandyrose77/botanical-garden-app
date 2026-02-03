/*
  data.js - Hardcoded sample data for our garden zones

  This is our "storage" for now. Later, this data would come from a database.
  Each object in the array represents one garden zone with properties
  matching the design document schema.
*/

const gardenZones = [
    {
        id: "zone-001",
        name: "Tropical Rainforest Conservatory",
        zone_type: "indoor_conservatory",
        health_score: 85,
        care_status: "thriving"
    },
    {
        id: "zone-002",
        name: "Desert House",
        zone_type: "greenhouse",
        health_score: 45,
        care_status: "needs_attention"
    },
    {
        id: "zone-003",
        name: "Orchid House",
        zone_type: "greenhouse",
        health_score: 92,
        care_status: "thriving"
    },
    {
        id: "zone-004",
        name: "Butterfly Garden",
        zone_type: "outdoor_garden",
        health_score: 30,
        care_status: "thriving"
    },
    {
        id: "zone-005",
        name: "Lily Pond",
        zone_type: "pond",
        health_score: 35,
        care_status: "critical"
    },
    {
        id: "zone-006",
        name: "Native Plant Meadow",
        zone_type: "meadow",
        health_score: 68,
        care_status: "seasonal_prep"
    },
    {
        id: "zone-007",
        name: "Fern Grotto",
        zone_type: "indoor_conservatory",
        health_score: 88,
        care_status: "thriving"
    },
    {
        id: "zone-008",
        name: "Rose Garden",
        zone_type: "outdoor_garden",
        health_score: 72,
        care_status: "seasonal_prep"
    }
];
