import React, { useEffect, useState } from 'react';
import { Box, Card, Alert, Avatar, Button } from '@mui/material';
import { useAppStore } from '../../../store';
import { firebaseStorage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import imageCompression from 'browser-image-compression';

const FileCard = ({ file, handleInputChange }) => {
  return (
    <>
      <Card
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {file ? (
          <div style={{ position: 'relative' }}>
            <img
              src={file}
              component='img'
              style={{ width: '100%', height: '100%', objectFit: 'fill' }}
            />
          </div>
        ) : (
          <Avatar
            sx={{
              width: 100,
              height: 100,
            }}
            onClick={handleInputChange}
          >
          </Avatar>
        )}

      </Card>
      {file &&
        <Box sx={{ alignItems: 'center' }}>
          <Button size="small" onClick={handleInputChange}>Edit Picture</Button>
        </Box>
      }
    </>
  )
};


const SingleFileUpload = () => {
  const userData = useAppStore((state) => state.user);
  const setUserData = useAppStore((state) => state.setUser);
  const [uploadError, setUploadError] = useState({ value: false, message: '' });
  const [compressionError, setCompressionError] = useState({ value: false, message: '' });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const compressionOptions = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 720,
    useWebWorker: true,
  };

  const handleInputChange = async () => {
    const inputElement = document.getElementById('fileInput');
    if (inputElement) {
      inputElement.click();
    }
  };

  const handleFileChange = async (e) => {
    let compressedFile;
    const storageRef = ref(firebaseStorage, `${userData.emailUid}/profilePicture`);
    const selectedFile = e.target.files[0];
    try {
      if (!selectedFile || !selectedFile.type.startsWith('image/')) {
        setUploadError({ value: true, message: 'Invalid file selected. Please choose an image file' });
        return;
      }
      try {
        setUploadError({ value: false, message: '' });
        compressedFile = await imageCompression(selectedFile, compressionOptions);
      } catch (err) {
        setCompressionError({ value: true, message: err.message });
      }
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        if (progress === 100) {
          setFile(compressedFile);
          setUserData({ ...userData, profilePictureFileName: 'profilePicture' });
          downloadFile("profilePictureFileName");
        }
        console.log(`File ${selectedFile.name} uploaded successfully!`);
      }, (error) => {
        setUploadError({ value: true, message: error.message });
        setUploadProgress(0);
      });
    } catch (e) {
      setUploadError({ value: true, message: e.message });
      setUploadProgress(0);
    }
  };

  const downloadFile = async (fileName) => {
    if (userData[fileName]) {
      try {
        const filePath = `${userData.emailUid}/${userData[fileName]}`;
        const fileRef = ref(firebaseStorage, filePath);
        await getDownloadURL(fileRef)
          .then((downloadUrl) => {
            setFile(downloadUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };

  useEffect(() => {
    downloadFile("profilePictureFileName");
  }, [])

  return (
    <>
      <Box sx={{ mb: 2 }}>
        {(uploadError.message || compressionError.message) &&
          <Alert severity="error">
            {uploadError.message} {compressionError.message}
          </Alert>
        }
      </Box>
      <Box>
        <FileCard
          file={file}
          progress={uploadProgress}
          uploadError={uploadError}
          handleInputChange={handleInputChange}
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Box>
    </>
  );
};

export default SingleFileUpload;
