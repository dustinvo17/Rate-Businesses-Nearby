import React, { useState, useEffect } from "react"
import StarIcon from "@material-ui/icons/Star"
import "./RatingStars.css"
import { auth, firebase, firestore } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Typography } from "@material-ui/core"

import { connect } from "react-redux";
function RatingStars({ business, updateRatings }) {
  const [user] = useAuthState(auth);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [userRateDoc, setUserRateDoc] = useState(null);
  const ratingsRef = firestore.collection("ratings");
  useEffect(() => { // this hook will rerun whenever user changes
    if (!user) return setRating(null)
    setUserRateDoc(null) // reset userRateDoc to handle edge case when user change account
    ratingsRef // query to user rating for this business
      .where("uid", "==", user.uid)
      .where("businessId", "==", business.reference)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          // check if user has rated this business
          const ratingDoc = snapshot.docs[0]
          setUserRateDoc(ratingDoc) // set user rate doc reference
          setRating(ratingDoc.data().rating)
        }
      });
    return () => {
      setRating(null);
    };
  }, [user]);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleRate = (ratingValue) => {
    if (!user) return signInWithGoogle(); // prompt user to authenticate
    const confirm = window.confirm(`Confirm to update your rating for ${business.name}`)
    if(!confirm) return
    setRating(ratingValue);
    if (userRateDoc) {
      // if user has rated this busienss then update the rating value
      userRateDoc.ref.update({ rating: ratingValue });
      const newRatings = business.ratings.map((rat) => {
        if (rat.uid === user.uid) {
          rat.rating = ratingValue;
        }
        return rat;
      });
      updateRatings(newRatings);
    } else {
      // otherwise create new rating document
     
      const newRatingDoc = {
        rating: ratingValue,
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        displayName: user.displayName,
        businessId: business.reference,
      };
       // create new rating doc and update user rate doc reference
      ratingsRef.add(newRatingDoc).then(async (docRef) => {
        const userRateDoc = await docRef.get();
        setUserRateDoc(userRateDoc);
        updateRatings([...business.ratings, newRatingDoc]);
      });
    }
  };

  const renderStarInputs = () => {
    return [1, 2, 3, 4, 5].map((starValue) => {
      return (
        <label
          key={starValue}
          onMouseEnter={() => setHover(starValue)}
          onMouseLeave={() => setHover(null)}
        >
          <input
            type="radio"
            name="star"
            id={`star${starValue}`}
            vallue={starValue}
            onClick={() => handleRate(starValue)}
          />
          <StarIcon
            color={`${
              starValue <= (hover || rating) ? "secondary" : "action"
            }`}
          />
        </label>
      );
    });
  };
  return (
    <div>
      <div className="rating-stars">
        {renderStarInputs()}

        <Typography variant="body2">
          {userRateDoc && rating
            ? `You have rated this business 
       ${rating} ${userRateDoc.data().rating > 1 ? "stars" : "star"}`
            : "You have not rated this business yet"}
        </Typography>
      </div>

      <div></div>
    </div>
  );
}

export default connect(null, {})(RatingStars);
