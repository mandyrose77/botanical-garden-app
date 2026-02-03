# 🌿 Botanical Garden Care Orchestrator - Design Document

## 🎯 Vision Statement

Transform data governance intelligence into a living, breathing botanical garden management system that prioritizes garden care based on real-world needs, intelligently assigns tasks to specialized gardeners, and provides strategic insights to garden directors.

---

## 📊 Core Feature Mapping

### Data Governance → Botanical Garden Translation

| Data Governance Concept | Botanical Garden Equivalent |
|------------------------|----------------------------|
| **Data Assets** | **Garden Zones** (Lily Pond, Desert House, Rainforest Conservatory, etc.) |
| **Asset Quality Score** | **Garden Health Score** (plant vitality, biodiversity, maintenance status) |
| **Usage Count** | **Visitor Engagement** (foot traffic, tour bookings, photo spots) |
| **Business Impact** | **Ecological Impact** (pollinator support, educational value, conservation status) |
| **Governance Status** | **Care Status** (thriving, needs_attention, critical, seasonal_prep) |
| **Data Stewards** | **Garden Caretakers** (horticulturists, botanists, groundskeepers) |
| **Tasks** | **Care Tasks** (pruning, watering, pest control, seasonal planting) |
| **Weekly Digest** | **Garden Director's Weekly Report** |

---

## 1️⃣ Garden Usage Metadata Schema

### Garden Zone Metadata

```javascript
{
  // Core Identity
  "id": "uuid",
  "name": "Tropical Rainforest Conservatory",
  "zone_type": "indoor_conservatory | outdoor_garden | greenhouse | pond | meadow",
  "size_sqft": 5000,
  "established_date": "2018-03-15",
  
  // Health & Status
  "health_score": 85,  // 0-100 based on plant vitality, pest issues, maintenance
  "care_status": "thriving | needs_attention | critical | seasonal_prep",
  "last_inspection_date": "2026-01-28",
  
  // Ecological Metadata
  "biodiversity_index": 92,  // Species diversity score
  "pollinator_support_level": "high | medium | low",
  "conservation_priority": "critical | high | medium | low",
  "native_species_count": 45,
  "endangered_species_count": 3,
  
  // Visitor Engagement (Usage Metadata)
  "monthly_visitor_count": 1250,
  "tour_bookings": 45,
  "educational_programs": 12,
  "photo_spot_popularity": 95,  // Social media mentions, visitor photos
  "visitor_satisfaction_score": 4.7,
  
  // Environmental Conditions
  "current_temperature": 78,
  "current_humidity": 85,
  "light_level": "high | medium | low",
  "soil_moisture_avg": 75,
  "air_quality_index": 95,
  
  // Seasonal Factors
  "current_season": "winter | spring | summer | fall",
  "bloom_status": "peak | emerging | dormant",
  "seasonal_care_needs": ["pruning", "fertilizing", "pest_monitoring"],
  
  // Resource Requirements
  "water_usage_gallons_per_week": 500,
  "maintenance_hours_per_week": 15,
  "specialist_care_required": true,
  
  // Relationships
  "primary_caretaker_id": "uuid",
  "backup_caretaker_ids": ["uuid", "uuid"],
  "connected_zones": ["butterfly_garden", "native_plant_meadow"],
  
  // Impact Metrics
  "educational_impact": "high | medium | low",
  "research_value": "high | medium | low",
  "community_engagement": 88,
  
  // Timestamps
  "created_at": "2018-03-15T00:00:00Z",
  "updated_at": "2026-02-02T19:00:00Z"
}
```

### Plant Collection Metadata (within zones)

```javascript
{
  "id": "uuid",
  "garden_zone_id": "uuid",
  "common_name": "Giant Water Lily",
  "scientific_name": "Victoria amazonica",
  "plant_family": "Nymphaeaceae",
  
  // Health Tracking
  "health_status": "excellent | good | fair | poor | critical",
  "last_health_check": "2026-01-30",
  "growth_rate": "rapid | normal | slow | dormant",
  
  // Care Requirements
  "water_frequency": "daily | weekly | biweekly",
  "sunlight_needs": "full_sun | partial_shade | full_shade",
  "temperature_range": {"min": 70, "max": 85},
  "humidity_range": {"min": 70, "max": 90},
  "soil_ph_preference": {"min": 6.5, "max": 7.5},
  
  // Conservation Status
  "endangered_status": "critically_endangered | endangered | vulnerable | least_concern",
  "native_region": "Amazon Basin",
  "conservation_program": true,
  
  // Visitor Interest
  "visitor_favorite": true,
  "bloom_season": ["summer", "fall"],
  "educational_signage": true,
  
  // Care History
  "last_watered": "2026-02-02T08:00:00Z",
  "last_fertilized": "2026-01-25T00:00:00Z",
  "last_pruned": "2026-01-20T00:00:00Z",
  "pest_issues": []
}
```

### Usage Activity Tracking

```javascript
{
  "id": "uuid",
  "garden_zone_id": "uuid",
  "activity_type": "visitor_entry | tour_group | photo_taken | educational_program | research_visit | maintenance_check",
  "timestamp": "2026-02-02T14:30:00Z",
  "visitor_count": 25,
  "duration_minutes": 45,
  "satisfaction_rating": 5,
  "weather_conditions": "sunny | cloudy | rainy",
  "special_events": ["butterfly_release", "guided_tour"],
  "notes": "School group from Lincoln Elementary - very engaged with carnivorous plants"
}
```

### Environmental Sensor Data

```javascript
{
  "id": "uuid",
  "garden_zone_id": "uuid",
  "sensor_type": "temperature | humidity | soil_moisture | light | air_quality",
  "reading_value": 78.5,
  "reading_unit": "fahrenheit | percent | lux | aqi",
  "timestamp": "2026-02-02T19:00:00Z",
  "alert_triggered": false,
  "optimal_range": {"min": 75, "max": 85}
}
```

---

## 2️⃣ Gardener/Caretaker Metadata Schema

### Gardener Profile

```javascript
{
  // Core Identity
  "id": "uuid",
  "full_name": "Maria Rodriguez",
  "email": "maria.rodriguez@botanicalgarden.org",
  "role": "master_gardener | horticulturist | botanist | groundskeeper | volunteer",
  "employment_type": "full_time | part_time | seasonal | volunteer",
  
  // Expertise & Specializations
  "specializations": [
    "tropical_plants",
    "orchid_care",
    "pest_management",
    "water_features",
    "conservation_breeding"
  ],
  "certifications": [
    "Certified Professional Horticulturist",
    "Master Gardener",
    "Integrated Pest Management Specialist"
  ],
  "years_experience": 12,
  "education": "MS in Botany",
  
  // Skills Matrix (for task matching)
  "skills": {
    "pruning": 95,           // 0-100 proficiency
    "propagation": 90,
    "pest_control": 85,
    "irrigation": 80,
    "soil_management": 88,
    "plant_identification": 95,
    "visitor_education": 75,
    "equipment_operation": 70
  },
  
  // Zone Assignments & Familiarity
  "primary_zones": ["tropical_conservatory", "orchid_house"],
  "backup_zones": ["fern_grotto", "bromeliad_garden"],
  "zone_familiarity": {
    "tropical_conservatory": 100,
    "orchid_house": 95,
    "fern_grotto": 70
  },
  
  // Availability & Workload
  "work_schedule": {
    "monday": {"start": "07:00", "end": "15:00"},
    "tuesday": {"start": "07:00", "end": "15:00"},
    "wednesday": {"start": "07:00", "end": "15:00"},
    "thursday": {"start": "07:00", "end": "15:00"},
    "friday": {"start": "07:00", "end": "15:00"},
    "saturday": "off",
    "sunday": "off"
  },
  "current_task_load": 8,  // Number of active tasks
  "max_task_capacity": 12,
  "availability_status": "available | busy | on_leave | seasonal_break",
  
  // Preferences & Constraints
  "preferred_task_types": ["propagation", "orchid_care", "visitor_tours"],
  "physical_limitations": [],
  "equipment_certifications": ["forklift", "chainsaw", "pesticide_applicator"],
  
  // Performance Metrics
  "task_completion_rate": 95,
  "average_task_quality_score": 92,
  "visitor_satisfaction_rating": 4.8,
  "peer_collaboration_score": 90,
  
  // Contact & Emergency
  "phone": "+1-555-0123",
  "emergency_contact": "John Rodriguez - +1-555-0124",
  "languages": ["English", "Spanish"],
  
  // Timestamps
  "hire_date": "2014-03-15",
  "last_training_date": "2025-11-10",
  "created_at": "2014-03-15T00:00:00Z",
  "updated_at": "2026-02-02T19:00:00Z"
}
```

### Team Structure

```javascript
{
  "department": "Tropical Collections",
  "team_lead_id": "uuid",
  "team_members": ["uuid", "uuid", "uuid"],
  "zones_managed": ["tropical_conservatory", "orchid_house", "bromeliad_garden"],
  "team_capacity": {
    "total_hours_per_week": 160,
    "current_utilization": 75
  }
}
```

---

## 3️⃣ Garden Care Prioritization Algorithm

### Priority Score Calculation (0-100)

```javascript
function calculateGardenPriority(garden) {
  let score = 0;
  
  // 1. Health Status (30 points max)
  const healthWeight = {
    'critical': 30,
    'needs_attention': 20,
    'seasonal_prep': 15,
    'thriving': 5
  };
  score += healthWeight[garden.care_status] || 0;
  
  // 2. Visitor Engagement (25 points max)
  const visitorScore = Math.min(25, (garden.monthly_visitor_count / 2000) * 25);
  score += visitorScore;
  
  // 3. Conservation Priority (20 points max)
  const conservationWeight = {
    'critical': 20,
    'high': 15,
    'medium': 10,
    'low': 5
  };
  score += conservationWeight[garden.conservation_priority] || 0;
  
  // 4. Ecological Impact (15 points max)
  if (garden.pollinator_support_level === 'high') score += 10;
  if (garden.endangered_species_count > 0) score += 5;
  
  // 5. Seasonal Urgency (10 points max)
  const seasonalUrgency = garden.seasonal_care_needs.length * 2;
  score += Math.min(10, seasonalUrgency);
  
  // Bonus: Educational/Research Value
  if (garden.educational_impact === 'high') score += 5;
  if (garden.research_value === 'high') score += 5;
  
  return Math.min(100, score);
}
```

### Priority Reasoning Generator

```javascript
function generatePriorityReason(garden, score) {
  const reasons = [];
  
  if (garden.care_status === 'critical') {
    reasons.push('🚨 Requires immediate attention');
  }
  
  if (garden.monthly_visitor_count > 1000) {
    reasons.push('👥 High visitor engagement');
  }
  
  if (garden.endangered_species_count > 0) {
    reasons.push(`🦋 ${garden.endangered_species_count} endangered species`);
  }
  
  if (garden.pollinator_support_level === 'high') {
    reasons.push('🐝 Critical pollinator habitat');
  }
  
  if (garden.seasonal_care_needs.length > 0) {
    reasons.push(`🌱 ${garden.seasonal_care_needs.length} seasonal tasks pending`);
  }
  
  return reasons.join(' • ');
}
```

---

## 4️⃣ Intelligent Task Assignment System

### Task Types

```javascript
const TASK_TYPES = {
  // Routine Maintenance
  'watering': {
    required_skills: ['irrigation', 'plant_care'],
    estimated_hours: 2,
    urgency: 'daily'
  },
  'pruning': {
    required_skills: ['pruning', 'plant_identification'],
    estimated_hours: 3,
    urgency: 'weekly'
  },
  'fertilizing': {
    required_skills: ['soil_management', 'plant_nutrition'],
    estimated_hours: 2,
    urgency: 'monthly'
  },
  
  // Specialized Care
  'pest_control': {
    required_skills: ['pest_management', 'ipm_certification'],
    estimated_hours: 4,
    urgency: 'immediate',
    certification_required: true
  },
  'propagation': {
    required_skills: ['propagation', 'plant_breeding'],
    estimated_hours: 6,
    urgency: 'seasonal'
  },
  'orchid_repotting': {
    required_skills: ['orchid_care', 'potting'],
    estimated_hours: 4,
    urgency: 'seasonal',
    specialization_required: 'orchid_care'
  },
  
  // Conservation & Research
  'seed_collection': {
    required_skills: ['conservation_breeding', 'plant_identification'],
    estimated_hours: 5,
    urgency: 'seasonal'
  },
  'health_assessment': {
    required_skills: ['plant_pathology', 'diagnostics'],
    estimated_hours: 3,
    urgency: 'weekly'
  },
  
  // Visitor Experience
  'educational_tour': {
    required_skills: ['visitor_education', 'public_speaking'],
    estimated_hours: 2,
    urgency: 'scheduled'
  },
  'signage_update': {
    required_skills: ['plant_identification', 'writing'],
    estimated_hours: 3,
    urgency: 'monthly'
  }
};
```

### Task Assignment Algorithm

```javascript
function autoAssignTask(task, gardeners, garden) {
  const candidates = [];
  
  for (const gardener of gardeners) {
    let score = 0;
    const reasons = [];
    
    // 1. Skills Match (40 points max)
    const taskSkills = TASK_TYPES[task.task_type].required_skills;
    let skillsMatched = 0;
    for (const skill of taskSkills) {
      if (gardener.skills[skill] >= 70) {
        score += 20;
        skillsMatched++;
        reasons.push(`Expert in ${skill} (${gardener.skills[skill]}/100)`);
      }
    }
    
    // 2. Zone Familiarity (25 points max)
    const familiarity = gardener.zone_familiarity[garden.id] || 0;
    score += (familiarity / 100) * 25;
    if (familiarity >= 80) {
      reasons.push(`Highly familiar with ${garden.name}`);
    }
    
    // 3. Specialization Match (20 points max)
    if (TASK_TYPES[task.task_type].specialization_required) {
      if (gardener.specializations.includes(TASK_TYPES[task.task_type].specialization_required)) {
        score += 20;
        reasons.push('Has required specialization');
      }
    }
    
    // 4. Availability & Workload (15 points max)
    const capacityRemaining = gardener.max_task_capacity - gardener.current_task_load;
    const capacityScore = (capacityRemaining / gardener.max_task_capacity) * 15;
    score += capacityScore;
    if (capacityRemaining >= 4) {
      reasons.push('Has available bandwidth');
    }
    
    // 5. Performance History (10 points bonus)
    if (gardener.task_completion_rate >= 90) {
      score += 5;
    }
    if (gardener.average_task_quality_score >= 90) {
      score += 5;
    }
    
    // Penalties
    if (gardener.availability_status !== 'available') {
      score = 0; // Cannot assign
    }
    
    candidates.push({
      gardener,
      score,
      reasons: reasons.join(' • ')
    });
  }
  
  // Sort by score and return top candidate
  candidates.sort((a, b) => b.score - a.score);
  return candidates;
}
```

---

## 5️⃣ Strategic Reporting for Garden Director

### Weekly Garden Health Digest

```javascript
{
  "report_type": "weekly_digest",
  "period": {
    "start": "2026-01-27",
    "end": "2026-02-02",
    "week": "Week of February 2, 2026"
  },
  
  // Overall Health Summary
  "summary": {
    "overall_health_score": 87,  // Average across all zones
    "total_zones": 12,
    "thriving_zones": 8,
    "zones_needing_attention": 3,
    "critical_zones": 1,
    "total_visitor_count": 3450,
    "visitor_satisfaction": 4.6,
    "tasks_completed": 45,
    "conservation_milestones": 2
  },
  
  // Garden Wins (Positive Highlights)
  "garden_wins": [
    {
      "type": "bloom_success",
      "title": "Rare Orchid Blooms After 3 Years",
      "description": "Paphiopedilum rothschildianum successfully bloomed in Orchid House",
      "impact": "high",
      "zone": "Orchid House",
      "image_url": "/photos/orchid-bloom.jpg"
    },
    {
      "type": "conservation_success",
      "title": "Endangered Fern Propagation Success",
      "description": "Successfully propagated 25 specimens of critically endangered tree fern",
      "impact": "critical",
      "zone": "Fern Grotto"
    },
    {
      "type": "visitor_milestone",
      "title": "Record Visitor Engagement",
      "description": "Butterfly Garden reached 1,200 visitors this week - highest ever",
      "impact": "medium",
      "zone": "Butterfly Garden"
    }
  ],
  
  // Strategic Priorities (Areas Needing Attention)
  "strategic_priorities": [
    {
      "type": "health_concern",
      "title": "Desert House Requires Immediate Attention",
      "description": "Pest infestation detected in succulent collection",
      "urgency": "critical",
      "zone": "Desert House",
      "recommended_actions": [
        "Deploy integrated pest management protocol",
        "Isolate affected specimens",
        "Increase monitoring frequency"
      ],
      "assigned_to": "Carlos Martinez (Pest Management Specialist)"
    },
    {
      "type": "seasonal_preparation",
      "title": "Spring Planting Season Approaching",
      "description": "3 zones require seasonal preparation within 2 weeks",
      "urgency": "high",
      "zones": ["Native Plant Meadow", "Perennial Border", "Vegetable Garden"],
      "estimated_hours": 40
    }
  ],
  
  // Visitor Engagement Trends
  "visitor_trends": {
    "total_visitors": 3450,
    "change_from_last_week": "+12%",
    "most_popular_zones": [
      {
        "name": "Butterfly Garden",
        "visitors": 1200,
        "satisfaction": 4.9
      },
      {
        "name": "Tropical Conservatory",
        "visitors": 850,
        "satisfaction": 4.7
      }
    ],
    "educational_programs": 8,
    "tour_groups": 12
  },
  
  // Environmental Insights
  "environmental_insights": {
    "weather_impact": "Unseasonably warm temperatures accelerated spring blooms",
    "pollinator_activity": "High - 15 butterfly species observed",
    "water_usage": {
      "total_gallons": 12500,
      "change_from_baseline": "-8% (efficient irrigation improvements)"
    }
  },
  
  // Team Performance
  "team_highlights": {
    "tasks_completed": 45,
    "completion_rate": 94,
    "top_performers": [
      {
        "name": "Maria Rodriguez",
        "tasks_completed": 12,
        "quality_score": 98
      }
    ],
    "training_completed": 3,
    "volunteer_hours": 120
  },
  
  // Conservation Impact
  "conservation_impact": {
    "endangered_species_count": 23,
    "propagation_successes": 2,
    "seed_bank_additions": 150,
    "research_collaborations": 4
  },
  
  // Upcoming Events & Milestones
  "upcoming": [
    {
      "event": "Spring Plant Sale",
      "date": "2026-03-15",
      "preparation_status": "on_track"
    },
    {
      "event": "Orchid Show",
      "date": "2026-03-22",
      "preparation_status": "needs_attention"
    }
  ]
}
```

---

## 🎨 User Interface Concepts

### Dashboard Views

1. **Garden Director Dashboard**
   - Priority Garden Zones (Top 12 by care needs)
   - Weekly Health Score Trend
   - Visitor Engagement Heatmap
   - Conservation Milestones
   - Team Workload Overview

2. **Gardener Task View**
   - My Assigned Tasks (sorted by urgency)
   - My Garden Zones
   - Today's Schedule
   - Care Reminders
   - Quick Actions (log completion, report issues)

3. **Garden Zone Detail View**
   - Health Score & Status
   - Plant Collection Inventory
   - Visitor Engagement Stats
   - Environmental Conditions (live sensors)
   - Care History Timeline
   - Assigned Caretakers

4. **Reports & Analytics**
   - Weekly Digest
   - Seasonal Trends
   - Conservation Impact Report
   - Visitor Analytics
   - Resource Usage (water, labor hours)

---

## 🔄 Workflow Examples

### Example 1: Morning Priority Review

**Garden Director's Workflow:**
1. Opens dashboard at 7:00 AM
2. Reviews overnight sensor alerts (Desert House temperature spike)
3. Sees prioritized list: Desert House at top (health score dropped to 65)
4. Reviews auto-generated care recommendations
5. Approves priority list
6. System auto-assigns urgent pest control task to Carlos (specialist)

### Example 2: Seasonal Task Assignment

**System Workflow:**
1. Detects spring season approaching
2. Analyzes 3 zones needing seasonal preparation
3. Generates task list: soil amendment, pruning, new plantings
4. Matches tasks to gardeners:
   - Soil work → James (soil management expert, available)
   - Pruning → Maria (pruning specialist, familiar with zones)
   - Planting → Sarah (propagation expert, loves spring work)
5. Sends notifications to team
6. Tracks completion and quality

### Example 3: Conservation Success Story

**Weekly Report Workflow:**
1. System detects rare orchid bloomed (sensor + photo verification)
2. Logs as conservation milestone
3. Tracks visitor engagement spike (photos, tour interest)
4. Includes in weekly digest as "Garden Win"
5. Generates social media content suggestion
6. Updates conservation database

---

## 📱 Mobile App Features

### For Gardeners (Field Use)
- Quick task check-in/completion
- Photo documentation
- Issue reporting with location
- Plant identification assistance
- Care history lookup
- Weather alerts

### For Visitors (Optional Public App)
- Self-guided tour maps
- Plant information (scan QR codes)
- Bloom alerts ("What's blooming now")
- Event calendar
- Photo sharing
- Educational content

---

## 🔌 Integration Opportunities

1. **Weather Services** - Automatic care adjustments based on forecast
2. **IoT Sensors** - Real-time environmental monitoring
3. **Social Media** - Track visitor engagement, trending plants
4. **Research Databases** - Conservation status updates, plant databases
5. **Inventory Systems** - Seed bank, supplies, equipment
6. **Volunteer Management** - Scheduling, training tracking

---

## 🎯 Success Metrics

### Garden Health
- Average health score across zones
- Reduction in critical status zones
- Plant survival rates
- Biodiversity index improvement

### Operational Efficiency
- Task completion rate
- Average time to address issues
- Resource usage optimization
- Team utilization rate

### Visitor Experience
- Visitor satisfaction scores
- Repeat visit rate
- Educational program attendance
- Social media engagement

### Conservation Impact
- Endangered species propagated
- Seed bank contributions
- Research collaborations
- Community education reach

---

## 🚀 Next Steps for Implementation

1. **Database Schema Design** - Transform Supabase tables
2. **API Endpoint Mapping** - Rename and adapt existing endpoints
3. **Mock Data Generation** - Create realistic botanical garden data
4. **UI Redesign** - Garden-themed interface
5. **Algorithm Tuning** - Adjust prioritization for garden context
6. **Testing Scenarios** - Create realistic use cases

---

*This design maintains all the intelligent features of your data governance platform while bringing them to life in a beautiful, meaningful botanical garden context!* 🌺🦋🌿