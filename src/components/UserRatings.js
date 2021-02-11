import React from "react"
import User from "./User"
import StarIcon from "@material-ui/icons/Star"
import { Box, Grid, Typography } from "@material-ui/core"
export default function UserRatings({ ratings }) {
  const renderStars = (ratingValue) => {
    return [1, 2, 3, 4, 5].map((value) => {
      return <StarIcon color={`${
        value <= ratingValue ? "secondary" : "action"
      }`} />;
    });
  };

  return (
    <div>
      {ratings && ratings.length > 0 ? (
        <Grid container spacing={5}>
          {ratings.map((rating) => (
            <Grid item md={6} sm={12}>
              <Box boxShadow={3} style={{ padding: "15px" }}>
                <User user={{ displayName: rating.displayName, photoURL: rating.photoURL }} />
                {renderStars(rating.rating)}
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : <Typography>There is currently no ratings for this business</Typography>
      }
    </div>
  );
}
