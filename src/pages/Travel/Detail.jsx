import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useActivityApi } from '../../services/activityService';

const Detail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const { getActivityById } = useActivityApi();

  useEffect(() => {
    const fetchActivity = async () => {
      const data = await getActivityById(id);
      setActivity(data);
    };

    fetchActivity();
  }, [id]);

  if (!activity) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{activity.name}</Typography>
      <img src={activity.imageUrl} alt={activity.name} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="body1">{activity.description}</Typography>
    </Container>
  );
};

export default Detail; 