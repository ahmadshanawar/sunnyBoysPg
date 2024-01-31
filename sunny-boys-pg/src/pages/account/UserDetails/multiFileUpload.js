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
  Divider,
  Alert,
} from '@mui/material';
import { useAppStore } from '../../../store';
import { firebaseStorage } from '../../../firebase';
import { ref, uploadBytesResumable } from "@firebase/storage";
import CloudUploadIcon from '@mui/icons-material/CloudUploadTwoTone';
import imageCompression from 'browser-image-compression';

const FileCard = ({ type, file, progress , uploadError}) => (
  <Grid item xs={12} sm={4}>
    <Card sx={{ maxWidth: 210, maxHeight: 140 }}>
      {progress > 0 && <LinearProgress color={uploadError?.value ? "error":"success"} variant="determinate" value={progress} sx={{ minHeight: 14, borderRadius:'5px', margin:1 }} />}
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
  const [uploadError, setUploadError] = useState({ value: false, message: '' })
  const [compressionError, setCompressionError] = useState({ value: false, message: '' })

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
      if (!file || !file.type.startsWith('image/')) {
        setUploadError({ value: true, message: 'Invalid file selected. Please choose an image file' })
        return;
      }
      try {
        setUploadError({value:false, message:''})
        compressedFile = await imageCompression(file, compresionOptions);
      } catch (err) {
        setCompressionError({ value: true, message: err.message })
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

        setUploadError({ value: true, message: error.message });
        setUploadProgress((prevProgress) => ({ ...prevProgress, [type]: 0 }));
      });

    } catch (e) {
      setUploadError({ value: true, message: e.message });
      setUploadProgress((prevProgress) => ({ ...prevProgress, [type]: 0 }));
    }
  };

  return (
    <>

      <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>
        Upload ID Photos
      </Typography>
      <Divider sx={{ marginBottom: 3, borderWidth: 2, backgroundColor: 'lightBlue' }} />
      <Box sx={{mb:2}}>
        {(uploadError.message || compressionError.message) &&
          <Alert severity="error">
            {uploadError.message} {compressionError.message}
          </Alert>
        }
        </Box>
        <Box>
          <Grid container spacing={3}>
            {Object.entries(files).map(([type, file]) => (
              <FileUploadField
                key={type}
                label={`${type.charAt(0).toUpperCase() + type.slice(1)}`}
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
                uploadError={uploadError}
              />
            ))}
          </Grid>
        </Box>
      </>
      );
};

      export default MultiFileUpload;
