import { useState, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Box, Typography, Grid, TextField, Button, Divider } from "@mui/material";
import PaymentsTable from "./paymentsTable";
import { firebaseDb } from "../../../firebase";
import { doc, setDoc } from '@firebase/firestore';
import { format, addMonths } from 'date-fns';

const AccordianComponent = ({ tennant }) => {
  const [expanded, setExpanded] = useState(false);
  const [paymentDate, setPaymentDate] = useState();
  const [paymentAmount, setPaymentAmount] = useState();
  const [dueMonth, setDueMonth] = useState();

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const formattedMonth = currentDate.getFullYear() + '-' + (currentMonth < 10 ? '0' : '') + currentMonth;
    setDueMonth(formattedMonth);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAddPayment = async () => {
    const currentDate = new Date();
    const currentMonth = format(currentDate, 'yyyy-MM'); // Get current month in YYYY-MM format
    let totalAmountPaid = 0;
    let isNewMonth = true; // Set isNewMonth to true initially

    // Check if the selected due month exists in payment history
    const existingPaymentIndex = tennant?.paymentHistory?.findIndex(payment => format(payment.dueDate, 'yyyy-MM') === dueMonth);

    if (existingPaymentIndex !== -1) {
      isNewMonth = false; // Set isNewMonth to false if the selected due month exists in payment history
      // Sum up the total payment amount for the selected month
      totalAmountPaid = tennant.paymentHistory.reduce((total, payment) => {
        if (format(payment.dueDate, 'yyyy-MM') === dueMonth) {
          return total + payment.paymentAmount;
        }
        return total;
      }, 0);
    }

    // Calculate total due amount
    const totalRent = tennant?.finalizedRent;
    const dueAmount = parseFloat(totalRent) - parseFloat(paymentAmount) - totalAmountPaid;

    // Determine due date for the new row
    let newDueDate = currentDate; // Use the current date by default
    if (!isNewMonth && tennant.paymentHistory[existingPaymentIndex]) {
      newDueDate = tennant.paymentHistory[existingPaymentIndex].dueDate;
    }

    // Add new payment object
    let updatedPaymentRow = {
      paymentDate: paymentDate,
      paymentAmount: parseFloat(paymentAmount),
      rent: totalRent,
      status: (totalAmountPaid + parseFloat(paymentAmount) >= totalRent) ? 'Paid' : 'Pending',
      dueAmount: dueAmount < 0 ? 0 : dueAmount,
      dueDate: newDueDate, // Use the determined due date
      createdAt: new Date() // Corrected typo in property name
    };

    // Add a new row for the payment
    tennant.paymentHistory.push(updatedPaymentRow);

    // Check if rent is paid in full for the selected month
    if (totalAmountPaid + parseFloat(paymentAmount) >= totalRent) {
      // Update status to 'Paid' and add a new row for the next month
      updatedPaymentRow.status = 'Paid';
      const nextMonthDate = addMonths(newDueDate, 1);
      const nextMonthFormatted = format(nextMonthDate, 'yyyy-MM-dd');

      tennant.paymentHistory.push({
        paymentDate: "",
        paymentAmount: 0,
        rent: totalRent,
        status: 'Pending',
        dueAmount: totalRent,
        dueDate: nextMonthFormatted,
        createdAt: new Date() // Corrected typo in property name
      });
    }

    try {
      const userRef = doc(firebaseDb, "Users", tennant.uid);
      await setDoc(userRef, {
        ...tennant,
        paymentHistory: tennant.paymentHistory,
      });
      console.log('successfully updated');
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: expanded ? '#f0e9e9' : '' }}>
        <Grid container textAlign={"center"}>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Room</Typography>
            <Typography fontSize={'16px'} >{tennant.roomNumber}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Name</Typography>
            <Typography fontSize={'16px'}>{tennant.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Mobile</Typography>
            <Typography fontSize={'16px'}>{tennant.mobile.slice(3)}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Checkin Date</Typography>
            <Typography fontSize={'16px'}>{tennant?.checkInDate}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Status</Typography>
            <Typography fontSize={'16px'}>{tennant.status}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Due Date</Typography>
            <Typography fontSize={'16px'}>{tennant?.dueDate}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <Divider sx={{ marginBottom: 2 }} />
      <Box pl={2} pr={2}>
        <PaymentsTable paymentHistory={tennant?.paymentHistory} />
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
          <Grid item>
            <TextField
              variant="outlined"
              type="month"
              margin="normal"
              required
              fullWidth
              size="small"
              id="month"
              label="Rent Month"
              name="month"
              InputLabelProps={{ shrink: true }}
              value={dueMonth}
              onChange={(e) => setDueMonth(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              type="date"
              margin="normal"
              required
              fullWidth
              size="small"
              id="Payment Date"
              label="Payment Date"
              name="Payment Date"
              InputLabelProps={{ shrink: true }}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </Grid>
          <Grid item mt={1}>
            <TextField
              type='number'
              size='small'
              label="Amount Paid"
              variant="outlined"
              value={paymentAmount}
              onChange={e => { setPaymentAmount(e.target.value) }} />
          </Grid>
          <Grid item mt={1} mr={3}>
            <Button disabled={!(paymentAmount && paymentDate)} onClick={handleAddPayment} variant="contained" color="primary">Add</Button>
          </Grid>
        </Grid>
      </Box>
    </Accordion >
  );
};
export default AccordianComponent;