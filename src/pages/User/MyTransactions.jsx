import { useState, useEffect } from 'react';
import { useApi } from '../../services/apiService';
import {
  Tabs, Tab, Box, Card, CardContent,
  Typography, Chip, Button
} from '@mui/material';

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const { getMyTransactions, cancelTransaction } = useApi();

  // Implementasi transaction management
  // Filter berdasarkan status
  // Cancel transaction functionality
  
  return (
    <Box sx={{ py: 4 }}>
      {/* Status Tabs */}
      {/* Transactions List */}
      {/* Transaction Details */}
    </Box>
  );
}; 
export default MyTransactions; 