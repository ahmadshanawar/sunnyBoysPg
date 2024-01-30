import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  LinearProgress,
  IconButton,
  TextField,
  InputAdornment,
  CardContent,
} from '@mui/material';
import { useAppStore } from '../../../store';
import { firebaseStorage } from '../../../firebase';
import { ref, uploadBytesResumable } from "@firebase/storage";
import CloudUploadIcon from '@mui/icons-material/CloudUploadTwoTone';
import  imageCompression  from 'browser-image-compression';

const FileCard = ({ type, file, progress }) => (
  <Grid item xs={12} sm={4}>
    <Card sx={{ maxWidth: 210, maxHeight: 140 }}>
      {progress > 0 && <LinearProgress color="success" variant="determinate" value={progress} />}
      <CardContent>
        {file && (
          <div>
            <img src={URL.createObjectURL(file)} alt={type} style={{ maxWidth: '100%' }} />
          </div>
        )}
      </CardContent>
    </Card>
  </Grid>
);

const FileUploadField = ({ label, id, type, file, handleInputChange }) => (
  <Grid item xs={12} sm={4}>
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={file ? file.name : ''}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => document.getElementById(id).click()}>
              <CloudUploadIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      disabled
    />
    <input
      type="file"
      id={id}
      accept="image/*"
      onChange={(e) => handleInputChange(type, e.target.files[0])}
      style={{ display: 'none' }}
    />
  </Grid>
);

const MultiFileUpload = () => {
  const userData = useAppStore((state) => state.user);
  const setUserData = useAppStore((state) => state.setUser);
  const [files, setFiles] = useState({
    adhaarFront: null,
    adhaarBack: null,
    collegeIdPhoto: null,
  });
  const [uploadProgress, setUploadProgress] = useState({
    adhaarFront: 0,
    adhaarBack: 0,
    collegeIdPhoto: 0,
  });

  const compresionOptions = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 720,
    useWebWorker: true,
  }

  const handleInputChange = async (type, file) => {
    let compressedFile;
    const storageRef = ref(firebaseStorage, `${userData.emailUid}/${type}_${file.name}`);
    try {
      if (!file) {
        console.log('No file selected');
        return;
      }
      try {
        compressedFile = await imageCompression(file, compresionOptions);
      } catch (err) {
        console.log(err);
      }
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prevProgress) => ({ ...prevProgress, [type]: progress }));

        if (progress === 100) {
          setFiles((prevFiles) => ({ ...prevFiles, [type]: file }));
          setUserData({ ...userData, [`${type}FileName`]: `${type}_${file.name}` });
        }

        console.log(`File ${file.name} uploaded successfully!`);
      }, (error) => {
        console.log(error);
        setUploadProgress((prevProgress) => ({ ...prevProgress, [type]: 0 }));
      });

    } catch (e) {
      console.log(e);
      setUploadProgress((prevProgress) => ({ ...prevProgress, [type]: 0 }));
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>
        Upload ID Photos
      </Typography>
      <Box>
        <Grid container spacing={3}>
          {Object.entries(files).map(([type, file]) => (
            <FileUploadField
              key={type}
              label={`${type.charAt(0).toUpperCase() + type.slice(1)} Photo`}
              id={`${type}Input`}
              type={type}
              file={file}
              handleInputChange={handleInputChange}
            />
          ))}
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: '5px' }}>
          {Object.entries(files).map(([type, file]) => (
            <FileCard
              key={type}
              type={type}
              file={file}
              progress={uploadProgress[type]}
              handleInputChange={handleInputChange}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MultiFileUpload;
