const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')  
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error(' could not connect to MongoDB...', err))
    
const CourseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Node.js Course',
    author: 'Aris', 
    tags: ['node', 'backend'],
    isPublished: true
});