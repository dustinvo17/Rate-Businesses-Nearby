import {firestore} from "../config/firebase"
const ratingsRef = firestore.collection('ratings')
export const ACTION_TYPES = {
    UPDATE_BUSINESSES:'UPDATE_BUSINESSES',
    SET_LOCATION:'SET_LOCATION',
    SET_DISTANCE:'SET_DISTANCE',
    SET_BUSINESS_TYPE:'SET_BUSINESS_TYPE'
}

export const updateBusinesses = (businesses) => (dispatch) => {
    Promise.all(businesses.map(business => {
        business['ratings'] = [] // intialize ratings list
        return ratingsRef.where("businessId","==",business.reference).get().then(snapshot => { // query ratings related to business
            if(snapshot.docs.length > 0 ) {           
                let totalRatings = 0
                snapshot.docs.forEach(doc => {
                    const ratingDoc = doc.data()
                    business.ratings.push(ratingDoc) // add rating to business.ratings list
                    totalRatings += ratingDoc.rating
                })
                business['averageRating'] = (totalRatings / snapshot.docs.length).toFixed(1) /// calculate average rating and round to 1 decimal place
            }
            return business
        })
    })).then(results =>  dispatch({type:ACTION_TYPES.UPDATE_BUSINESSES,payload:results}) )
   

}
export const setCurrentLocation = (lat,lng) => {
    return {
        type:ACTION_TYPES.SET_LOCATION,
        payload: {lat,lng}
    }
}

export const setCurrentDistance = (distanceInMiles) => {
 const distanceInMeters = Math.floor(distanceInMiles * 1609)
 return {
    type:ACTION_TYPES.SET_DISTANCE,
    payload:distanceInMeters
 }
}

export const setBusinessType = (businessType) => {
    return {
        type:ACTION_TYPES.SET_BUSINESS_TYPE,
        payload:businessType
    }
}

