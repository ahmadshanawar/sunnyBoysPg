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
import { format } from 'date-fns';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const PaymentDetails = () => {
  let paymentHistory = [
    { paymentDate: '', paymentAmount: 2500, dueDate: '2024-01-15', forMonth: 'January', status: 'Pending' },
    { paymentDate: '2024-02-01', paymentAmount: 2500, dueDate: '2024-02-15', forMonth: 'February', status: 'Paid' },
    { paymentDate: '2024-03-01', paymentAmount: 2500, dueDate: '2024-03-15', forMonth: 'March', status: 'Paid' },
    { paymentDate: '2024-04-01', paymentAmount: 2500, dueDate: '2024-04-15', forMonth: 'April', status: 'Paid' },
    { paymentDate: '2024-05-01', paymentAmount: 2500, dueDate: '2024-05-15', forMonth: 'May', status: 'Paid' },
    { paymentDate: '2024-05-01', paymentAmount: 2500, dueDate: '2024-05-15', forMonth: 'May', status: 'Paid' },
    { paymentDate: '2024-05-01', paymentAmount: 2500, dueDate: '2024-05-15', forMonth: 'May', status: 'Paid' },
    { paymentDate: '2024-05-01', paymentAmount: 2500, dueDate: '2024-05-15', forMonth: 'May', status: 'Paid' },
  ]

  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('asc');

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const sortedPaymentHistory = paymentHistory.sort((a, b) => {
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
    <Paper elevation={3} sx={{ padding: 2, borderRadius: '20px', marginBottom: '20px', minHeight: 400 }}>
      <Box sx={{ display: 'inline-flex' }}>
        <CurrencyRupeeIcon sx={{ fontSize: 35, color: '#a597ad' }} />
        <Typography variant="h1" sx={{ fontSize: '18px', fontWeight: 'bold', margin: '6px' }}>Payment Details</Typography>
      </Box>
      <Divider light sx={{ marginBottom: '10px' }} />
      <TableContainer component={Paper} sx={{ maxHeight: 348 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'lightgray' }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'paymentDate'}
                  direction={orderBy === 'paymentDate' ? order : 'asc'}
                  onClick={() => handleSort('paymentDate')}
                >
                  <Typography fontWeight="bold">Payment Date</Typography>
                </TableSortLabel>
              </TableCell>
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
                  active={orderBy === 'forMonth'}
                  direction={orderBy === 'forMonth' ? order : 'asc'}
                  onClick={() => handleSort('forMonth')}
                >
                  <Typography fontWeight="bold">Month</Typography>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPaymentHistory.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment?.paymentDate && format(payment.paymentDate, 'dd-mm-yyyy')}</TableCell>
                <TableCell>{format(payment.dueDate, 'dd-mm-yyyy')}</TableCell>
                <TableCell>{payment.forMonth}</TableCell>
                <TableCell>{payment.paymentAmount}</TableCell>

                <TableCell>
                  <Stack direction={'row'}>
                    <>
                      {getStatusIcon(payment.status)}
                    </>
                    <>
                      {payment.status}
                    </>
                  </Stack>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PaymentDetails;
