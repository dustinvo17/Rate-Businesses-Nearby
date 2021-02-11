import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar, Button,CircularProgress,Container} from "@material-ui/core"
import {Link} from "react-router-dom"
import StarIcon from '@material-ui/icons/Star'
import Distance from "./Distance"
import BusinessType from "./BusinessType"
import Loading from "./Loading"
const useStyles = makeStyles((theme) => ({
  container: {
    width: "35vw",
    padding: 20,
  },
  gridContainer: {   
    padding:'15px 5px',
    borderBottom: '1px solid lightgrey',
   
  },
  image: {
    height: 200,
    width: '100%',
    cursor:'pointer',
    objectFit: "cover",
    borderRadius: 10,  
  },
  rating: {
    display:'flex',
    cursor:'pointer',
    alignItems:'center'
  }
}));
function BusinessesList({ businesses }) {
  const classes = useStyles();

  const renderBusinessesList = () => {
    return businesses.map(business => {
   
      // process business type property: ex: gas_station => Gas Station
       const type = business.types.length ?  business.types[0].split('_').map(word => word[0].toUpperCase() +  word.substring(1)).join(' ') : '' 
       const imgUrl = business.photos && business.photos.length ? business.photos[0].getUrl() : ''
        return (
            <Grid key={business.reference} container className={classes.gridContainer}  spacing={2}>
              <Grid item md={4}>
              <Link to={`/business/${business.reference}`} style={{textDecoration:'none'}}>
              <img
                  className={classes.image}
                  alt={`${business.name} snapshot/`}
                  src={imgUrl}
                />
              </Link>
               
              </Grid>
              <Grid item xs={12} md={8} container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                     {business.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom color="secondary">
                      {business.vicinity}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {type}
                    </Typography>
                    <Typography variant="body2" color={business.opening_hours && business.opening_hours.open_now ? "primary" : "error"}>
                      {business.opening_hours && business.opening_hours.open_now ? 'Open Now' : 'Closed'}
                    </Typography>
                  </Grid>
                  <Grid item style={{display:'flex',justifyContent:'space-between'}}>
      
                    <Typography variant="body2" className={classes.rating}>
                      <StarIcon color="action" color="secondary" style={{margin:'0 5px 2px 0' }}/>
                      {
                        business.ratings.length ? 
                        `${business.averageRating} (${business.ratings.length})` : 'No Ratings Yet'
                      }
                    
                    </Typography>
                    <Link to={`/business/${business.reference}`} style={{textDecoration:'none'}}>
                    <Button variant="contained" color="primary">Learn More</Button>
                    </Link>
                 
                  </Grid>
                </Grid>
                <Grid item>
                  <Avatar  elevation={5}  src={business.icon}></Avatar>
                </Grid>
            </Grid>
            </Grid>
        );
    })
   
  };

  return (
    <div className={`${classes.container} businessListWrapper`}>
    
      {businesses ?<React.Fragment>
      
        <div style={{display: 'flex',justifyContent:'space-between',alignItems: 'center',margin:'15px 0'}}>
        <Typography variant="h5">Explore Businesses Nearby</Typography>
        <Distance/>
        <BusinessType/>
        </div>
       
        {renderBusinessesList()}
        
        </React.Fragment>:
       <Loading/>
         }
  
    </div>
  );
}
const mapStateToProps = (state) => {
  return { businesses: state.businesses };
};
export default connect(mapStateToProps, {})(BusinessesList);
