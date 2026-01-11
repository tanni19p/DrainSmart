import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
};

export default MapClickHandler;
