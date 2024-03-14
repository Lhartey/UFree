const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
  },
});

const educationSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
  },
  graduationYear: {
    type: Number,
  },
});

const companyInformationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
  },
  industry: {
    type: String,
    required: true,
  },
  companySize: {
    type: String,
    required: true,
    enum: ['Big', 'Medium', 'Small']
  },
})

const contactInformationSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  }
});

const employerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  companyInformation: {
    type: companyInformationSchema,
    required: true,
  },
});


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['student', 'employer'],
  },
  firstname:{
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },
  profilePicture:{
    type: String,
  },
  skills:{
    type: [String],
    required: true,
    // Only applicable for students (schema option)
    of: { $ref: 'User', type: String }, // Reference the User model for userType check
    validate: {
      validator: function () {
        return this.userType === 'student';
      },
      message: 'Skills can only be added by student user',
  },
},
  experience:{
    type: experienceSchema,
    // Only applicable for students (schema option)
    of: { $ref: 'User', type: String }, // Reference the User model for userType check
    validate: {
      validator: function () {
        return this.userType === 'student';
      },
      message: 'Skills can only be added by student users',
  },
},
  education: {
    type: [educationSchema], // Array of education objects
    // Only applicable for students (schema option)
    of: { $ref: 'User', type: String }, // Reference the User model for userType check
    validate: {
      validator: function () {
        return this.userType === 'student';
      },
      message: 'Skills can only be added by student users',
  },
  },
  contactInformation:{
    type: [contactInformationSchema],
  },
}, {timestamps: true});



// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);