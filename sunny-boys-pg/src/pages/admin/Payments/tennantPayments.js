import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "@firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { Paper, Typography, Grid, Divider, Box, Container, Card } from "@mui/material";
import PaymentsAccordian from "./paymentsAccordian";
import { doc, updateDoc } from "@firebase/firestore";
import { format, addMonths } from 'date-fns';

const TennantPayments = () => {
  const [tennants, setTennants] = useState([])

  const getTennents = async () => {
    try {
      setTennants([])
      let data = [];
      setTennants([])
      const q = query(collection(firebaseDb, "Users"), where("role", "==", 'READ'), where("status", "==", "Active"));
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
      await updateDoc(userRef, {
        ...stateObj,
        dueDate: format(addMonths(new Date(stateObj.checkInDate), 1), 'yyyy-MM-dd')
      });
      getTennents()
      console.log('successfully updated')
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTennents()
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Payments</Typography>
      <Divider />
      <Card elevation={3} sx={{ padding: 2, minHeight: '80vh' }} >
        <Grid>
          <Grid item xs={12}>
            <Paper>
              {tennants.map((tennant) => {
                return <PaymentsAccordian key={tennant.emailUid} tennant={tennant} handleSave={handleSave} />
              })}
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default TennantPayments;
