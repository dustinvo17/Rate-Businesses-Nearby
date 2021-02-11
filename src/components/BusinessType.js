import React, {useState, useEffect } from "react"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import {setBusinessType } from "../store/action"
import {connect} from "react-redux"

function BusinessType({setBusinessType,businessType}) {
  const renderOptions = () => {
    const options = ['restaurant','gas_station','cafe','book_store','movie_theater','primary_school','shoe_store' ];
    return options.map((op) => {
      const name = processName(op) // process name => 'book_store' => 'Book Store'
      return (
        <option value={op} key={name}>
          {name} 
        </option>
      );
    });
  };
  const handleChange = (e) => { // call action to update business type
    setBusinessType(e.target.value)
  };

  const processName = (businessType) => {
    const name = businessType.split('_').map(elem => elem.charAt(0).toUpperCase() + elem.slice(1)).join(' ')
    return name
  }
  return (
    <div>
      <FormControl variant="filled">
        <InputLabel htmlFor="businessTypeSelect">Business Type</InputLabel>
        <Select
          native
          value={businessType}
          onChange={handleChange}
          inputProps={{
            name: "BusinessType",
            id: "businessTypeSelect",
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
        businessType:state.businessType
    }
}
export default  connect(mapStateToProps, {setBusinessType})(BusinessType)
