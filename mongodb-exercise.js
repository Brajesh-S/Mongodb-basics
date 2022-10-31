const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});
const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 })
}
 
async function run() {
    const result = await getCourses();
    console.log(result);
}
 
async function updateCourse(id) {
    console.log('ins')
    const course = await Course.findById(id);
    console.log(course)
    if (!course) return;
 
    course.isPublished = true;
    course.author = 'Another Author';
 
    const result = await course.save();
    console.log(result);
}
 
updateCourse('5a68fde3f09ad7646ddec17e');
console.log(getCourses)
