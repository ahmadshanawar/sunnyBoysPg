import React, { useState, useEffect } from "react";
import {
  Grid,
  Divider,
  Typography,
  Paper,
  Card,
  CardMedia,
  Modal,
  IconButton,
  Fade,
} from "@mui/material";
import CancelIcon from '@mui/icons-material/CancelOutlined'
import { ref, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../../firebase";
import { useAppStore } from "../../store";
const UploadedIds = () => {
  const user = useAppStore((state) => state.user);
  const [files, setFiles] = useState({
    adhaarFrontFileName: null,
    adhaarBackFileName: null,
    collegeIdPhotoFileName: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const downloadFile = async (fileName) => {
    try {
      const filePath = `${user.emailUid}/${user[fileName]}`;
      const fileRef = ref(firebaseStorage, filePath);
      getDownloadURL(fileRef)
        .then((downloadUrl) => {
          setFiles((prevFiles) => ({
            ...prevFiles,
            [fileName]: downloadUrl,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    downloadFile("adhaarFrontFileName");
    downloadFile("adhaarBackFileName");
    downloadFile("collegeIdPhotoFileName");
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: "15px", minHeight: 290 }}>
      <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: "bold", margin: "10px" }}>
        Uploaded Documents
      </Typography>
      <Divider light sx={{ marginBottom: "10px" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3.5}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", margin: "10px", color: "gray" }}>Adhaar Front</Typography>
          {files.adhaarFrontFileName && (
            <Card sx={{ height: 220 }} onClick={() => handleImageClick(files.adhaarFrontFileName)}>
              <CardMedia component="img" alt="Adhaar Front" maxheight="180" image={files.adhaarFrontFileName} />
            </Card>
          )}
        </Grid>
        <Grid item xs={12} sm={0.5}>
          <Divider orientation="vertical" sx={{ marginTop: 1 }} />
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", margin: "10px", color: "gray" }}>Adhaar Back</Typography>
          {files.adhaarBackFileName && (
            <Card sx={{ height: 220 }} onClick={() => handleImageClick(files.adhaarBackFileName)}>
              <CardMedia component="img" alt="Adhaar Back" maxheight="180" image={files.adhaarBackFileName} />
            </Card>
          )}
        </Grid>
        <Grid item xs={12} sm={0.5}>
          <Divider orientation="vertical" sx={{ marginTop: 1 }} />
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", margin: "10px", color: "gray" }}>Alternate ID</Typography>
          {files.collegeIdPhotoFileName && (
            <Card sx={{ height: 220 }} onClick={() => handleImageClick(files.collegeIdPhotoFileName)}>
              <CardMedia component="img" alt="Alternate ID" maxheight="180" image={files.collegeIdPhotoFileName} />
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Modal for displaying the selected image */}
      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
      >
        <Fade in={!!selectedImage}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white", // Change the color as needed
              }}
            >
              <CancelIcon sx={{fontSize:50}} />
            </IconButton>
            <img src={selectedImage} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </div>
        </Fade>
      </Modal>
    </Paper>
  );
};

export default UploadedIds;
