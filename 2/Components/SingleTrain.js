import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

const SingleTrain = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    axios.get(/api/trains/${trainId}) // Replace with your backend API endpoint for fetching a single train
      .then(response => setTrain(response.data))
      .catch(error => console.error(error));
  }, [trainId]);

  if (!train) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{train.name}</Typography>
        <Typography variant="body1">Departure: {train.departureTime}</Typography>
        <Typography variant="body1">Arrival: {train.arrivalTime}</Typography>
        <Typography variant="body2">Delay: {train.delay} minutes</Typography>
        <Typography variant="body2">Seat Availability: {train.seatsAvailable}</Typography>
        <Typography variant="body2">Class: {train.coachClass}</Typography>
        {/* Additional details for a single train */}
      </CardContent>
    </Card>
  );
};

export default SingleTrain;