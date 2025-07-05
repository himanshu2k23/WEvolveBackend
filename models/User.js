const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['psychiatrist', 'therapist', 'psychologist'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    experience: { type: Number, min: 0, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    expertise: [{
        type: String,
        enum: [
            'Anxiety',
            'Depression',
            'Anger management',
            'Relationship skills',
            'Addiction',
            'Stress',
            'PTSD',
            'Grief & Loss',
            'Self-esteem',
            'Sleep issues',
            'Family issues',
            'Career guidance',
            'Child & Adolescent Issues',
            'Obsessive Compulsive Disorder (OCD)',
            'Eating Disorders',
            'Panic Attacks',
            'Sexual Health',
            'Couples Therapy',
            'Trauma Recovery',
            'Mindfulness & Meditation',
            'Workplace Stress',
            'Bipolar Disorder',
            'Parenting Challenges',
            'Personality Disorders',
            'Social Anxiety',
            'Suicidal Thoughts',
            'Self-harm',
            'Geriatric Issues',
            'Life Transitions',
            'LGBTQ+ Issues',
            'Academic Pressure'
        ]
    }],
    languages: [{
        type: String,
        enum: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Gujarati']
    }],
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        startTime: {
            type: String, 
            required: true
        },
        endTime: {
            type: String, 
            required: true
        }
    }],
    image: String
});

const userProfileSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
        required: true
    },
    primaryConcern: {
        type: String,
        enum: ['anxiety', 'depression', 'stress', 'relationships', 'trauma', 'other'],
        required: true
    },
    previousTherapy: {
        type: String,
        enum: ['never', 'current', 'past'],
        required: true
    },
    stressLevel: {
        type: String,
        enum: ['low', 'moderate', 'high', 'severe'],
        required: true
    },
    sleepQuality: {
        type: String,
        enum: ['excellent', 'good', 'poor', 'very-poor'],
        required: true
    },
    occupation: { type: String, required: true },
    goalFromTherapy: { type: String, required: true },
    availabilityPreference: {
        type: String,
        enum: ['weekdays', 'weekends', 'evenings', 'mornings'],
        required: true
    },
    communicationStyle: {
        type: String,
        enum: ['direct', 'compassionate', 'analytical', 'collaborative'],
        required: true
    }
});

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin', 'doctor'],
        default: 'user'
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    userProfile: {
        type: userProfileSchema,
        required: function () {
            return this.role === 'user';
        }
    },

    doctorProfile: {
        type: doctorProfileSchema,
        required: function () {
            return this.role === 'doctor';
        }
    }
});

module.exports = mongoose.model('User', userSchema);
