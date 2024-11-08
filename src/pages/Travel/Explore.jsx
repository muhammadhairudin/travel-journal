import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  TextField,
  InputAdornment,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useApi } from '../../services/apiService';
import ActivityCard from '../../components/ActivityCard';

const Explore = () => {
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const { getActivities } = useApi();

  // Fetch activities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const activitiesData = await getActivities();
        console.log('Activities Data:', activitiesData); // Debugging
        setActivities(activitiesData);
        setFilteredActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter activities
  useEffect(() => {
    let filtered = [...activities];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(activity => 
        activity.categoryId === categoryFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActivities(filtered);
    setPage(1);
  }, [activities, searchTerm, categoryFilter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const currentActivities = filteredActivities.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Explore Activities</Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {currentActivities.length > 0 ? (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {currentActivities.map((activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
                <ActivityCard 
                  title={activity.name}
                  description={activity.description}
                  imageUrl={activity.imageUrl}
                  price={activity.price}
                  rating={activity.rating}
                />
              </Grid>
            ))}
          </Grid>

          {filteredActivities.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination 
                count={Math.ceil(filteredActivities.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No activities found
        </Typography>
      )}
    </Container>
  );
};

export default Explore;