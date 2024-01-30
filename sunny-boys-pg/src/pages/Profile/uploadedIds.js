import { useAppStore } from "../../store";
import { Grid, Divider,Typography, Paper, TextField } from "@mui/material";

const UploadedIds = () => {
  const user = useAppStore((state) => state.user);
  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: '10px' }}>
      <Typography variant="h1" sx={{ fontSize: '18px', fontWeight: 'bold', margin: '10px' }}>Uploaded Documents</Typography>
      <Divider light sx={{ marginBottom: '10px' }} />
      <Typography sx={{ fontSize: '14px', fontWeight: 'bold', margin: '10px', color:'gray' }}>Adhaar Front:</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: 'bold', margin: '10px', color:'gray' }}>Adhaar Back:</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: 'bold', margin: '10px', color:'gray' }}>Alternate ID:</Typography>
    </Paper>
  )
}

export default UploadedIds;