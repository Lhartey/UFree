// markMessageAsRead.js

import axios from 'axios';

const markMessageAsRead = async (messageId) => {
  try {
    await axios.post(`/api/messages/${messageId}/read`);
    console.log('Message marked as read successfully');
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
};

export default markMessageAsRead;
