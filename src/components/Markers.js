import React, { useState } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import { connect } from "react-redux"
import {Avatar,Typography} from "@material-ui/core";
function Markers({ businesses }) {
  const [selected, setSelected] = useState(null);
  const renderMarkers = () => {
    if (!businesses) return;
    return businesses.map((business) => {
      const { geometry } = business;
      return (
        <Marker
          onClick={() => setSelected(business)}
          position={{
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
          }}
        />
      );
    });
  };

  //

  return (
    <React.Fragment>
      {renderMarkers()}
      {selected ? (
        <InfoWindow
          position={{
            lat: selected.geometry.location.lat(),
            lng: selected.geometry.location.lng(),
          }}
          onCloseClick={() => setSelected(null)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
            size="large"
              src={
                selected.photos && selected.photos.length > 0
                  ? selected.photos[0].getUrl()
                  : ""
              }
            ></Avatar>

            <Typography variant="body2" style={{ margin: "15px 0" }}>
              {selected.name}
            </Typography>
            <Typography variant="body2" color="secondary">
              {selected.vicinity}
            </Typography>
          </div>
        </InfoWindow>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    businesses: state.businesses,
  };
};
export default connect(mapStateToProps, {})(Markers);
