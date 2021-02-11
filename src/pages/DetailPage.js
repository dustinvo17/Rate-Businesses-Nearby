import React, { useEffect ,useState} from "react"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Typography } from "@material-ui/core"
import StarIcon from "@material-ui/icons/Star"
import RatingStars from "../components/RatingStars/RatingStars"
import UserRatings from "../components/UserRatings"
import { useHistory } from "react-router-dom"
import { updateBusinesses } from "../store/action"
const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  rating: {
    cursor: "pointer",
    marginRight: "20px",
  },
  vertiCalSpace: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    maxHeight:'80vh',
    cursor: "pointer",
    objectFit: "cover",
    borderRadius: 10,
  },
}));
function DetailPage({ businessData }) {
  const [business,setBusiness] = useState(null)
  const history = useHistory();
  //TODO: if not business redirect to homepage
  const classes = useStyles();
  useEffect(() => {
    if (!businessData) return history.push("/");
    setBusiness(businessData)
  }, []);

  const updateRatings = (newRatings) =>{
    let total = 0
    newRatings.forEach(r => total += r.rating)
    const averageRating = (total / newRatings.length).toFixed(1)
    setBusiness({...business,ratings:newRatings,averageRating})
  }
  return (
    <Container>
      {business ? (
        <div>
          <Typography variant="h4">{business.name}</Typography>
          <div className={`${classes.flexContainer} ${classes.vertiCalSpace}`}>
            <Typography
              variant="body2"
              className={`${classes.rating} ${classes.flexContainer}`}
            >
              <Typography variant="body2" className={`${classes.rating} ${classes.flexContainer}`}>
                      <StarIcon color="action" color="secondary" style={{margin:'0 5px 2px 0' }}/>
                      {
                        business.ratings.length ? 
                        `${business.averageRating} (${business.ratings.length})` : 'No Ratings Yet'
                      }
                    
                    </Typography>
            </Typography>
            <Typography variant="body2" color="secondary">
            {business.vicinity}
            </Typography>
          </div>
            {business.photos && business.photos.length > 0 ?
                <img
                className={classes.image}
                alt={business.name}
                src={business.photos[0].getUrl()}
              />
                : <Typography variant="h5">There is no photo related to this store</Typography>
        }
          
          <RatingStars business={business} updateRatings={updateRatings} />
          <UserRatings ratings={business.ratings} />
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => {
  const reference = ownProps.match.params.reference // access route param reference to fetch business data related
  if(!state.businesses) return {}
  const businessIndex = state.businesses.findIndex(
    (business) => business.reference === reference
  );
  return {
    businessData: state.businesses[businessIndex]
  };
};
export default connect(mapStateToProps)(DetailPage);
