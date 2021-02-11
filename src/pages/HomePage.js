import React, { useEffect } from "react"
import Map from "../components/Map"
import BusinessesList from "../components/BusinessesList"
import { setCurrentLocation } from "../store/action"
import { connect } from "react-redux"
import "./styles/pages.css"
function HomePage({ setCurrentLocation, currentLocation }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(latitude, longitude);
        },
        (failure) => {
          console.log(failure);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);
  return (
    <div className="homepage" >
      <BusinessesList />
      {currentLocation !== null ?  <Map /> : ''}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { currentLocation: state.currentLocation };
};
export default connect(mapStateToProps, { setCurrentLocation })(HomePage);
