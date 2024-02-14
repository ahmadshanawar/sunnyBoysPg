import { useState, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Box, Typography, Grid, TextField, Button, Divider } from "@mui/material";
import PaymentsTable from "./paymentsTable";

const AccordianComponent = ({ tennant, handleAddPayment }) => {
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

 const addPayment=()=>{
  handleAddPayment(tennant,paymentAmount,paymentDate,dueMonth)
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
            <Typography fontSize={'16px'}>{tennant?.checkInDate}</Typography>
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
            <Button disabled={!(paymentAmount && paymentDate)} onClick={addPayment} variant="contained" color="primary">Add</Button>
          </Grid>
        </Grid>
      </Box>
    </Accordion >
  );
};
export default AccordianComponent;