import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Box, Typography, Grid, TextField, Button, Divider } from "@mui/material";
import PaymentsTable from "./paymentsTable";
import { format } from "date-fns";


const AccordianComponent = ({ tennant }) => {
  const [expanded, setExpanded] = useState(false);
  const [paymentDate, setPaymentDate] = useState()
  const [paymentAmount, setPaymentAmount] = useState()

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleAddPayment = async () => {
  //   try {
  //     const userRef = doc(firebaseDb, "Users", tennant.uid);
  //     await updateDoc(userRef, { paymentHistory: tennant.paymentHistory.push() });

  //     console.log('successfully updated')
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
   }

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
            <Typography fontSize={'16px'}>{format(tennant?.checkInDate, 'yyyy-MMM-dd')}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Status</Typography>
            <Typography fontSize={'16px'}>{tennant.status}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={'14px'} color={'#757575'} fontWeight={'bold'}>Due Date</Typography>
            <Typography fontSize={'16px'}>{format(tennant?.dueDate, 'yyyy-MMM-dd')}</Typography>
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