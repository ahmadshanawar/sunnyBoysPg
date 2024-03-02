import { useEffect } from "react";
import { useAppStore } from "../../store";
import { doc, getDoc } from "@firebase/firestore";
import { firebaseDb } from "../../firebase";
import { Box, Grid } from "@mui/material";

import AddressDetails from "../Profile/addressDetails";
import UploadedIds from "../Profile/uploadedIds";
import BasicDetails from "../Profile/basicDetails";
import PaymentDetails from "../Profile/paymentDetails";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);
  const setIsLoggedIn = useAppStore(state => state.setIsLoggedIn);
  const isLoggedIn = useAppStore(state => state.isLoggedIn);
  const getUserInformation = async () => {
    try {
      const docRef = doc(firebaseDb, "Users", user.emailUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = docSnap.data();
        if (!result.isUserRegistered) {
          navigate('/register')
        }
        setUser(result);
        setIsLoggedIn(true)
      } else {
        console.log("No such document!");
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(err)
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn])

  useEffect(() => {
    getUserInformation()
  }, []);

  return ((isLoggedIn && user.isUserRegistered) &&
    <Box sx={{ marginTop: '5%', marginLeft: '3%', marginRight: '3%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6.5} >
          <BasicDetails />
        </Grid>
        <Grid item xs={12} sm={5.5} >
          <PaymentDetails />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} >
          <AddressDetails />
        </Grid>
        <Grid item xs={12} sm={7} >
          <UploadedIds />
        </Grid>
      </Grid>
    </Box >)
}
export default Profile;