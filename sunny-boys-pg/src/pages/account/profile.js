import { useEffect } from "react";
import { useAppStore } from "../../store";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { firebaseDb } from "../../firebase";
import { Box, Grid } from "@mui/material";

import AddressDetails from "../Profile/addressDetails";
import UploadedIds from "../Profile/uploadedIds";
import BasicDetails from "../Profile/basicDetails";

const Profile = () => {
  const { state } = useLocation();
  const setUser = useAppStore((state) => state.setUser);
  const setIsLoggedIn = useAppStore(state => state.setIsLoggedIn);
  const isLoggedIn = useAppStore(state => state.isLoggedIn);

  const getUserInformation = async () => {
    try {
      const docRef = doc(firebaseDb, "Users", state.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const result = docSnap.data();
        setUser(result);
        setIsLoggedIn(true)
      } else {
        console.log("No such document!");
        setIsLoggedIn(false)
      }
    } catch (err) {
      console.log(err)
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    getUserInformation()
  }, []);

  return (isLoggedIn &&
    <Box sx={{ marginTop: '6%', marginLeft: '3%', marginRight: '3%' }}>
      <BasicDetails />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} >
          <AddressDetails />
        </Grid>
        <Grid item xs={12} sm={6} >
          <UploadedIds />
        </Grid>
      </Grid>
    </Box >)
}
export default Profile;