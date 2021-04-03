// frontend/src/components/ReviewDisplayPage/index.js
import React, { useState, useEffect} from 'react';
import ReactStars from "react-rating-stars-component";
import * as SpotActions from "../../store/spots"
function ReviewDisplayPage ({spotId}) {
    const [spotIsLoaded, setSpotIsLoaded] = useState(false);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
      (async() =>{
       const review = await SpotActions.getReview(spotId)
       await setReviews(review)
       setSpotIsLoaded(true)})();

        }, []);

    return (
        <div className="page-container">
            {spotIsLoaded && (
                reviews.map((review, i)=>{
            return(
            <div key={i}>
                {console.log(review.rating)}
                <ReactStars {...{
            size: 30,
            value: review.rating,
            edit: false
    }} />
                <h3>{review.reviewBody}</h3>
            </div>)
        })
            )}
        </div>
    )
}


export default ReviewDisplayPage
