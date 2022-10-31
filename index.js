const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')  
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error(' could not connect to MongoDB...', err))
    
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
    name: 'java.js Course',
    author: 'Aris', 
    tags: ['node', 'frontend'],
    isPublished: true
});



const result = await course.save();
console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find({ author: 'Aris', isPublished: true})
        .limit(10)
        .sort({ name:1 })
        .select({ name: 1, tags: 1 });    
    console.log(courses);
}
getCourses();

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
}
updateCourse('634d1771181d505fea5af0f3');

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

removeCourse('634d1683ac87d37d7a63be10')