import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import { Paper, Divider, Grid, Avatar, TextField, Button, Box, Typography } from '@mui/material'
import { useAppStore } from '../../store';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SingleFileUpload from '../account/UserDetails/profilePicture';

const BasicDetails = () => {
  const navigate = useNavigate()
  const user = useAppStore(state => state.user)
  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: '20px', marginBottom: '20px', minHeight: 420 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'inline-flex' }}>
          <RecentActorsIcon sx={{ fontSize: 40, color: '#a597ad' }} />
          <Typography variant="h1" sx={{ fontSize: '18px', fontWeight: 'bold', margin: '10px' }}>Basic Details</Typography>
        </Box>
        <Button
          sx={{ height: '30px', alignContent: 'center', backgroundColor: '#7d0e79' }}
          variant="contained"
          color="primary"
          onClick={() => navigate('/register')}
        >
          Edit
        </Button>
      </Box>
      <Divider light sx={{ marginBottom: '5px',}} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box>
          <SingleFileUpload/>
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Divider orientation="vertical" sx={{ borderRightWidth: 3, backgroundColor: 'gray' }} />
        </Box>
        <Box sx={{ paddingTop: '20px' }}>
          <Typography sx={{ fontSize: 22, paddingLeft: '2px', fontWeight: 'bold' }}>
            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </Typography>
          <Box sx={{ display: 'inline-flex' }}>
            <RoomIcon />
            <Typography sx={{ fontSize: 19 }}>
              Room Number
            </Typography>
          </Box>
          <br/>
          <Box sx={{ display: 'inline-flex' }}>
            <PersonIcon />
            <Typography sx={{ fontSize: 19 }}>
              {user.occupancyType.charAt(0).toUpperCase() + user.occupancyType.slice(1)} Sharing
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Mobile Number"
            label="Mobile Number"
            name="Mobile Number"
            value={user.mobile}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4} >
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Id"
            name="Email Id"
            value={user.email}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4} >
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Adhaar Number"
            label="Adhaar Number"
            name="Adhaar Number"
            value={user.adhaarNumber.replace(/(.{4})/g, '$1 ').trim()}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} >
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="College/Organization Name"
            label="College/Organization Name"
            name="College/Organization Name"
            value={user.collegeName.charAt(0).toUpperCase() + user.collegeName.slice(1)}
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
            id="College/Organization Id"
            label="College/Organization Id"
            name="College/Organization Id"
            value={user.collegeId}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3} >
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Parent/Gaurdian"
            label="Parent/Gaurdian Name"
            name="Parent/Gaurdian"
            value={user.parentName}
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
            id="Parent Mobile Number"
            label="Parent/Gaurdian Mobile Number"
            name="Parent Mobile Number"
            value={user.parentMobile}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Checked In Date"
            label="Checked In Date"
            name="Checked In Date"
            value={user.checkInDate && format(parseISO(user?.checkInDate), 'dd-mm-yyyy')}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Tentative Checkout Date"
            label="Tentative Checkout Date"
            name="Tentative Checkout Date"
            value={user.checkOutDate && format(parseISO(user?.checkOutDate), 'dd-mm-yyyy')}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="filled"
            type="text"
            margin="normal"
            required
            fullWidth
            id="Status"
            label="Profile Status"
            name="Status"
            value={user.status}
          // onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper >
  )
}
export default BasicDetails