import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Stack,
  Divider,
  Typography,
  Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useAppStore } from '../../store';
import { format } from 'date-fns';

const PaymentDetails = () => {
  const paymentHistory = useAppStore(state => state.user?.paymentHistory)
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('asc');

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const sortedPaymentHistory = paymentHistory?.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const getStatusIcon = (status) => {
    if (status === 'Paid') {
      return <CheckCircleIcon style={{ color: 'green' }} />;
    } else {
      return <WarningIcon style={{ color: 'red' }} />;
    }
  };
  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: '20px', marginBottom: '20px', minHeight: 290 }}>
      <Box sx={{ display: 'inline-flex' }}>
        <CurrencyRupeeIcon sx={{ fontSize: 35, color: '#a597ad' }} />
        <Typography variant="h1" sx={{ fontSize: '18px', fontWeight: 'bold', margin: '6px' }}>Payment Details</Typography>
      </Box>
      <Divider light sx={{ marginBottom: '2px' }} />
      <TableContainer component={Paper} sx={{ maxHeight: 348 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'lightgray' }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'dueDate'}
                  direction={orderBy === 'dueDate' ? order : 'asc'}
                  onClick={() => handleSort('dueDate')}
                >
                  <Typography fontWeight="bold">Due Date</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'paymentAmount'}
                  direction={orderBy === 'paymentAmount' ? order : 'asc'}
                  onClick={() => handleSort('paymentAmount')}
                >
                  <Typography fontWeight="bold">Amount ₹</Typography>

                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  <Typography fontWeight="bold">Status</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'paymentDate'}
                  direction={orderBy === 'paymentDate' ? order : 'asc'}
                  onClick={() => handleSort('paymentDate')}
                >
                  <Typography fontWeight="bold">Paid On</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign:'end'}}>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={() => handleSort('createdAt')}
                >
                  <Typography>...</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPaymentHistory?.map((payment, index) => (              
              <TableRow key={index}>
                <TableCell>{payment?.dueDate && format(payment.dueDate, 'dd-MMM-yyyy')}</TableCell>
                <TableCell>{payment?.paymentAmount}</TableCell>
                <TableCell>
                  <Stack direction={'row'} sx={{display:'inline-flex'}}>
                    <>
                      {getStatusIcon(payment.status)}
                    </>
                    <Box sx={{padding:'5px'}}>
                      {payment.status}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{payment?.paymentDate}</TableCell>
                <TableCell  sx={{ textAlign:'end', fontSize:12}}>{payment?.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PaymentDetails;
