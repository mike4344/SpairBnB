// frontend/src/components/ReviewFormModal/ReviewForm.js
import React, { useState } from "react";
import * as SpotActions from "../../store/spots";
import ReactStars from "react-rating-stars-component";
import {useHistory} from 'react-router-dom'

function ReviewForm({spotId}) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [reviewBody, setReviewBody] = useState('')
  const [rating, setRating] = useState(0)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const review = {reviewBody, rating}
    try{
        await SpotActions.postReview(spotId, review)
        history.push(`/spots/${spotId}`)
        window.location.reload()
      } catch(err){
        // setErrors(err.errors);
      }
    }

    const ratingSettings = {
        size: 30,
        value: 2.5,
        edit: true,
        onChange: newValue => {
            setRating(newValue)
          }
      };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Rate this spot
          <ReactStars {...ratingSettings} />
      </label>
      <label>
        How was your stay...
       <textarea className="review" value={reviewBody} onChange={e => setReviewBody(e.target.value)} />
      </label>
      <button className="signup-button" type="submit">Confirm Review</button>
    </form>
  );
}

export default ReviewForm;
