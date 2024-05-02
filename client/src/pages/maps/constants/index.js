import L from "leaflet";

const evacuationMarkerIcon = L.icon({
  iconUrl:
    "https://cdn.vectorstock.com/i/preview-1x/45/86/shipboard-assembly-station-vector-46194586.webp",
  iconSize: [30, 30],
  iconAnchor: [22, 22],
});

const tsunamiHazardIcon = L.icon({
  iconUrl:
    "https://t4.ftcdn.net/jpg/00/02/68/75/360_F_2687589_DjSlQjOgqVJbGQEWpz9fBz9VfK8nx7.jpg",
  iconSize: [30, 30],
  iconAnchor: [22, 10],
});

const safeAreaMarkers = [
  {
    position: [11.30258, 124.70131],
    description: "Guindapunan Elementary School",
  },
  {
    position: [11.2993, 124.6958],
    description: "Jugaban, National High School",
  },
  {
    position: [11.301, 124.6864],
    description: "Plaza Triumpho, Carigara Leyte",
  },
  {
    position: [11.2931, 124.6755],
    description: "Bislig Carigara Leyte Evacuation Center",
  },
];

const tsunamiHazardMarkers = [
  {
    position: [11.30297, 124.6854],
    description: "Tsunami Danger - Carigara Boulevard",
  },
];

export {
  evacuationMarkerIcon,
  safeAreaMarkers,
  tsunamiHazardIcon,
  tsunamiHazardMarkers,
};
