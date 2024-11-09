import { useState, useEffect } from 'react';
import { useApi } from '../../services/apiService';
import {
  Grid, Card, CardMedia, CardContent, Typography,
  Button, TextField, MenuItem, Box, Pagination
} from '@mui/material';

const Explore = () => {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const { getActivities, getCategories } = useApi();

  // Implementasi fetch data dan filter
  // Integrasi dengan API activities & categories
  // Implementasi add to cart functionality
  
  return (
    <Box sx={{ py: 4 }}>
      {/* Search & Filter Section */}
      {/* Activities Grid */}
      {/* Pagination */}
    </Box>
  );
};

export default Explore; 