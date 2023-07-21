import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

const TrainsList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('/api/trains') // Replace with your backend API endpoint for fetching all trains
      .then(response => setTrains(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Trains Schedule
      </Typography>
      {trains.map(train => (
        <Card key={train.id}>
          <CardContent>
            <Typography variant="h5">{train.name}</Typography>
            <Typography variant="body1">Departure: {train.departureTime}</Typography>
            <Typography variant="body1">Arrival: {train.arrivalTime}</Typography>
            <Typography variant="body2">Delay: {train.delay} minutes</Typography>
            <Typography variant="body2">Seat Availability: {train.seatsAvailable}</Typography>
            <Typography variant="body2">Class: {train.coachClass}</Typography>
            <Button component={Link} to={/trains/${train.id}} variant="contained" color="primary">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrainsList;