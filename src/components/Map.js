import React, { useEffect, useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { updateBusinesses } from "../store/action"
import { connect } from "react-redux"
import Markers from "./Markers"
import Loading from './Loading'
import "../pages/styles/pages.css"
const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries = ["places"];
function Map({ updateBusinesses, currentLocation,currentDistance, businessType }) {
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
 
  useEffect(() => {
    if (!currentLocation || !currentDistance ||!map) return;
    function callback(results, status) {
      if (status === "OK" && updateBusinesses) return updateBusinesses(results);
    }
    const service = new window.google.maps.places.PlacesService(map) // instantiate google map service object
    const request = { // request config to fetch business nearby data
      location: new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      ),
      radius: `${currentDistance}`,
      type: [businessType],
    };
    service.nearbySearch(request, callback);
  }, [map,currentLocation,currentDistance,businessType]);

  const onLoad = useCallback(async (map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    
    setMap(null);
  }, []);

  return (
    isLoaded ? (
      <div className="mapWrapper">
         <GoogleMap 
        mapContainerStyle={containerStyle}
        zoom={12}
        center={currentLocation}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Markers/>
      </GoogleMap>
        </div>
        
    ) : 
    <Loading/>
  )
  
}
const mapStateToProps = (state) => {

  return { currentLocation: state.currentLocation, currentDistance: state.currentDistance, businessType: state.businessType};
};
export default connect(mapStateToProps, { updateBusinesses })(Map);
