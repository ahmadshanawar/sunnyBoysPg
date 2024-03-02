import React, { useState, useEffect } from 'react';
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

const PaymentsTable = ({ paymentHistory }) => {
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('asc');
  
  // Sort paymentHistory based on createdAt on initial load
  useEffect(() => {
    handleSort(orderBy);
  }, []);

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
    <Paper elevation={3} sx={{ padding: 1, borderRadius: '20px', marginBottom: '2px', minHeight: 290 }}>
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
                  <Typography fontWeight="bold">Rent</Typography>

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
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'paymentDate'}
                  direction={orderBy === 'paymentDate' ? order : 'asc'}
                  onClick={() => handleSort('paymentDate')}
                >
                  <Typography fontWeight="bold">Amount Paid</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'paymentDate'}
                  direction={orderBy === 'paymentDate' ? order : 'asc'}
                  onClick={() => handleSort('paymentDate')}
                >
                  <Typography fontWeight="bold">Amount Due</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'end' }}>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={() => handleSort('createdAt')}
                >
                  <Typography >Created At</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPaymentHistory?.map((payment, index) => (
              <TableRow key={index} >
                <TableCell sx={{ fontWeight: 'bold' }}>{payment?.dueDate && format(payment.dueDate, 'dd-MMM-yyyy')}</TableCell>
                <TableCell>₹{payment?.rent}</TableCell>
                <TableCell>
                  <Stack direction={'row'} sx={{ display: 'inline-flex' }}>
                    <Box>
                      {getStatusIcon(payment.status)}
                    </Box>
                    <Box sx={{ padding: '5px' }}>
                      {payment.status}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{payment?.paymentDate && format(payment.paymentDate, 'dd-MMM-yyyy')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{payment?.paymentAmount && payment.paymentAmount}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>₹{payment?.dueAmount && payment.dueAmount}</TableCell>
                <TableCell sx={{ textAlign: 'end' }}>{payment?.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PaymentsTable;
