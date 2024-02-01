import { useAppStore } from "../../store";
import { Grid, Divider, Paper, TextField, Typography , Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

const AddressDetails = () => {
  const user = useAppStore((state) => state.user);


  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: '20px', marginBottom: '20px', minHeight:315 }}>
       <Box sx={{ display: 'inline-flex' }}>
        <HomeIcon sx={{ fontSize: 40, color: '#a597ad' }} />
        <Typography variant="h1" sx={{ fontSize: '18px', fontWeight: 'bold', margin: '10px' }}>Address Details</Typography>
      </Box>
     
      <Divider light sx={{ marginBottom: '10px' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="House Number"
            label="House Number"
            name="House Number"
            value={user.houseNumber}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Lane"
            label="Lane"
            name="Lane"            
            value={user.lane}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
      <TextField
        variant="filled"
        type="text"
        margin="normal"
        required
        fullWidth
        id="Locality"
        label="Locality"
        name="Locality"
        value={user.locality}
      // onChange={(e) => setPassword(e.target.value)}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4.5} >
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="City"
            label="City"
            name="City"
            value={user.city}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4.5}>
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="State"
            label="State"
            name="State"
            value={user.state}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Pin Code"
            label="Pin Code"
            name="Pin Code"
            value={user.pinCode}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AddressDetails;