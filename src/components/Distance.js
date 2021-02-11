import React, {useState } from "react"
import { makeStyles} from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import {setCurrentDistance } from "../store/action"
import {connect} from "react-redux"
function Distance({setCurrentDistance,distance }) {
  const renderOptions = () => {
      const options = [5,10,15,30]
      return options.map(op => {
          return <option value={op} key={op}>{op} miles</option>
      })
  }
  const handleChange = (e) => { // call action to update current distance
    setCurrentDistance(e.target.value)

  }
  return (
    <div>
      <FormControl variant="filled">
        <InputLabel htmlFor="distanceSelect">Distance</InputLabel>
        <Select
          native
          value={Math.floor(distance / 1609)}
          onChange={handleChange}
          inputProps={{
            name: "Distance",
            id: "distanceSelect",
          }}
        >
          {renderOptions()}
        </Select>
      </FormControl>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
      distance:state.currentDistance
  }
}
export default connect(mapStateToProps, {setCurrentDistance} )(Distance)
