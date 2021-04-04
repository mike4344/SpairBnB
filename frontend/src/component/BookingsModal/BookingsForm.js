// frontend/src/components/BookingsFormModal/BookingsForm.js
import React, { useState } from "react";
import * as SpotActions from "../../store/spots";
import { useDispatch } from "react-redux";

function BookingsForm({spotId, onChange}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState({})
  const [endDate, setEndDate] = useState({})
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const booking = {startDate, endDate}
    try{
      await SpotActions.postBooking(spotId, booking)
      onChange()
      } catch(err){
        // setErrors(err.errors);
      }
    }


  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Start of Stay
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End of Stay
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <button className='signup-button'type="submit">Confirm Booking</button>
    </form>
  );
}

export default BookingsForm;
