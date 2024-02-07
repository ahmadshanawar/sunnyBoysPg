import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "@firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { Paper, MenuItem, Grid, Select, Box, Container, Card, Typography, Divider } from "@mui/material";
import AccordianComponent from "./accordianComponent";
import { doc, updateDoc } from "@firebase/firestore";

const Lobby = () => {
  const [tennants, setTennants] = useState([])
  const [selectedOption, setSelectedOption] = useState('new');

  const handleFilterChange = (event) => {
    setSelectedOption(event.target.value);

  };

  const getTennents = async () => {
    try {
      setTennants([])
      let data = [];
      setTennants([])
      let q;
      switch (selectedOption) {
        case 'new':
          q = query(collection(firebaseDb, "Users"), where("role", "==", 'READ'), where("status", "==", "Awaiting Approval"));
          break;
        case 'dormant':
          q = query(collection(firebaseDb, "Users"), where("role", "==", 'READ'), where("status", "==", "Departed"));
          break;
        default:
          q = query(collection(firebaseDb, "Users"), where("role", "==", 'READ'), where("status", "==", "Active"));
          break;
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setTennants(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleSave = async (stateObj) => {
    console.log(stateObj)
    try {
      const userRef = doc(firebaseDb, "Users", stateObj.uid);
      await updateDoc(userRef, { ...stateObj });
      getTennents(selectedOption)
      console.log('successfully updated')
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTennents(selectedOption)
  }, [selectedOption]);

  return (
    <Container maxWidth="xl">

      <Card elevation={3} sx={{ padding: 2, minHeight: '80vh' }} >
        <Typography variant="h4">Lobby</Typography>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', margin: 2 }}>
          <Select
            labelId="user-dropdown-label"
            id="user-dropdown"
            value={selectedOption}
            onChange={handleFilterChange}
            label="Select User Type"
            size="small"
            variant="standard"
          >
            <MenuItem value="dormant">Dormant Users</MenuItem>
            <MenuItem value="new">New Users</MenuItem>
            <MenuItem value="active">Active Users</MenuItem>
          </Select>
        </Box>
        <Grid>
          <Grid item xs={12}>
            <Paper>
              {tennants.map((tennant) => {
                return <AccordianComponent key={tennant.emailUid} tennant={tennant} handleSave={handleSave} />
              })}
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default Lobby;
