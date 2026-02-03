/*
  cities.js - US cities data for the weather picker

  Each city needs latitude and longitude coordinates because
  the weather API uses coordinates (not city names) to find weather data.

  This is a common pattern: dropdown shows human-friendly names,
  but the code uses the technical data (coordinates) behind the scenes.
*/

const usCities = [
    {
        name: "New York, NY",
        lat: 40.7128,
        lon: -74.0060
    },
    {
        name: "Los Angeles, CA",
        lat: 34.0522,
        lon: -118.2437
    },
    {
        name: "Chicago, IL",
        lat: 41.8781,
        lon: -87.6298
    },
    {
        name: "Houston, TX",
        lat: 29.7604,
        lon: -95.3698
    },
    {
        name: "Phoenix, AZ",
        lat: 33.4484,
        lon: -112.0740
    },
    {
        name: "Philadelphia, PA",
        lat: 39.9526,
        lon: -75.1652
    },
    {
        name: "San Antonio, TX",
        lat: 29.4241,
        lon: -98.4936
    },
    {
        name: "San Diego, CA",
        lat: 32.7157,
        lon: -117.1611
    },
    {
        name: "Dallas, TX",
        lat: 32.7767,
        lon: -96.7970
    },
    {
        name: "Seattle, WA",
        lat: 47.6062,
        lon: -122.3321
    },
    {
        name: "Denver, CO",
        lat: 39.7392,
        lon: -104.9903
    },
    {
        name: "Boston, MA",
        lat: 42.3601,
        lon: -71.0589
    },
    {
        name: "Atlanta, GA",
        lat: 33.7490,
        lon: -84.3880
    },
    {
        name: "Miami, FL",
        lat: 25.7617,
        lon: -80.1918
    },
    {
        name: "Portland, OR",
        lat: 45.5152,
        lon: -122.6784
    }
];
