// messageRoutes.js

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.put('/messages/:messageId/mark-as-read', async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    message.isRead = true;
    await message.save();

    return res.status(200).json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
