// Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  messageId: { type: String, required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
