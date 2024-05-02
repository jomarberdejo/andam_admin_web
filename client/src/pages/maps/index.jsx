import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const EmergencyMap = () => {
  const location = useLocation();
  const [mapCenter, setMapCenter] = useState([11.2905, 124.6962]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [fullLocationText, setFullLocationText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get("location");
    const fullLocationParam = searchParams.get("fullLocation");

    if (locationParam) {
      const [lat, lng] = locationParam.split(",").map(parseFloat);
      setMapCenter([lat, lng]);
      setMarkerPosition([lat, lng]);
      setFullLocationText(fullLocationParam || "");
    }
  }, [location]);

  return (
    <div>
      <div className="px-8 pt-6 pb-6 container">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
          Map
        </h2>
        <p className="text-md text-muted-foreground">
          This map is used to track the location of the specific report from the{" "}
          <span
            onClick={() => {
              navigate("/reports");
            }}
            className="text-blue-600 cursor-pointer"
          >
            reports page
          </span>
          .
        </p>
      </div>
      <div className="z-[0] h-[450px] relative container pb-6">
        <MapContainer center={mapCenter} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          {markerPosition !== null && (
            <Marker position={markerPosition}>
              <Popup>
                {fullLocationText ? (
                  <>
                    <p>This is the reported location from:</p>
                    <p>{fullLocationText}</p>
                  </>
                ) : (
                  <p>This is the reported location</p>
                )}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default EmergencyMap;
