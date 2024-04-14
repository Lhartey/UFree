const axios = require('axios');

async function uploadFileToFIleIO(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      'https://file.io/?api_key=df096d29-01a7-4968-82b9-b31ce9879f60',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.link;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

module.exports = { uploadFileToFIleIO };
