import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadedIds from "../../Profile/uploadedIds";
import {
  MenuItem, Accordion, AccordionSummary, AccordionDetails, Stack,
  Typography, Grid, TextField, Select, Button, Card, Divider, InputLabel, FormControl, Switch
} from "@mui/material";
import { format, addMonths } from 'date-fns';

const AccordianComponent = ({ tennant, handleSave }) => {
  const [expanded, setExpanded] = useState(false);
  const [rentAmount, setRentAmount] = useState(tennant?.finalizedRent);
  const [checkInDate, setCheckInDate] = useState(tennant?.checkInDate);
  const [roomNumber, setRoomNumber] = useState(tennant?.roomNumber);
  const [occupancyType, setOccupancyType] = useState(tennant?.occupancyType);
  const [status, setStatus] = useState(tennant.status)
  const [switchToggle, setSwitchToggle] = useState(true)
  const handleApproveUser = () => {
    handleSave(
      {
        finalizedRent: rentAmount,
        checkInDate,
        roomNumber,
        occupancyType,
        status,
        uid: tennant.emailUid,
        paymentHistory: [{
          createdAt:new Date(),
          dueDate: format(new Date(checkInDate), 'yyyy-MM-dd'),
          dueAmount:rentAmount,
          status: 'Pending',
          paymentDate: '',
          paymentAmount:0,
          rent:rentAmount
        }]
      }
    )
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRoomNoChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handleOccupancyTypeChange = (event) => {
    setOccupancyType(event.target.value);
  };

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container textAlign={"center"}>
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
        </Grid>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={1}>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card elevation={3} sx={{ overflow: 'auto' }}>
              <UploadedIds userUid={tennant.emailUid} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl>
              <TextField
                sx={{ margin: 1, maxWidth: 200 }}
                size="small"
                label="Rent Amount"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                disabled={switchToggle}
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                fullWidth
              />
              <TextField
                size="small"
                sx={{ margin: 1, maxWidth: 200 }}
                label="Checkin Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={checkInDate ? checkInDate : ''}
                onChange={e => setCheckInDate(e.target.value)}
                fullWidth
                disabled={switchToggle}
              />
              <FormControl>
                <InputLabel>Room Number</InputLabel>
                <Select
                  disabled={switchToggle}
                  value={roomNumber}
                  sx={{ margin: 1, maxWidth: 200 }}
                  label="Room No"
                  defaultValue=""
                  fullWidth
                  size="small"
                  onChange={handleRoomNoChange}
                >
                  {[1, 2, 3, 4, 5, 6, 8].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                  {[101, 102, 103, 104, 105, 106, 107, 108].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                  {[201, 202, 203, 204, 205, 206, 207, 208].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Occupancy Type</InputLabel>
                <Select
                  disabled={switchToggle}
                  value={occupancyType}
                  size="small"
                  label="Occupancy"
                  defaultValue=""
                  fullWidth
                  sx={{ margin: 1, maxWidth: 200 }}
                  onChange={handleOccupancyTypeChange}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Double">Double</MenuItem>
                  <MenuItem value="Triple">Triple</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Status</InputLabel>
                <Select
                  disabled={switchToggle}
                  value={tennant?.status}
                  size="small"
                  label="Status"
                  defaultValue=""
                  fullWidth
                  sx={{ margin: 1, maxWidth: 200 }}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Departed">Departed</MenuItem>

                </Select>
              </FormControl>
              {(tennant?.status !== 'Dormant') && <Stack direction={"row"} justifyContent={"space-between"}>
                <Switch sx={{ marginLeft: '10px' }} onClick={() => { setSwitchToggle(!switchToggle) }}>Save</Switch>
                <Button size="small" disabled={switchToggle} variant="contained" color="success" onClick={handleApproveUser}>Save</Button>
              </Stack>}
            </FormControl>

          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
export default AccordianComponent;