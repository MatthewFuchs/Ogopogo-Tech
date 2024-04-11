const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Course = require('../models/courseModel'); // Adjust the path to your model

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Course Model Test', () => {
  // Testing successful course creation
  it('create & save course successfully', async () => {
    const courseData = { name: 'Introduction to Computer Science', code: 'CS101', credit: 3 };
    const validCourse = new Course(courseData);
    const savedCourse = await validCourse.save();
    
    // Ensuring the saved document contains all necessary fields
    expect(savedCourse._id).toBeDefined();
    expect(savedCourse.name).toBe(courseData.name);
    expect(savedCourse.code).toBe(courseData.code);
    expect(savedCourse.credit).toBe(courseData.credit);
  });

  // Testing field validation
  it('insert course successfully, but the field not defined in schema should be undefined', async () => {
    const courseWithInvalidField = new Course({ name: 'Advanced Database', code: 'DB102', credit: 4, department: 'Computer Science' });
    const savedCourseWithInvalidField = await courseWithInvalidField.save();
    expect(savedCourseWithInvalidField._id).toBeDefined();
    expect(savedCourseWithInvalidField.department).toBeUndefined();
  });

  // Testing validation error
  it('create course without required field should fail', async () => {
    const courseWithoutRequiredField = new Course({ code: 'CS103' });
    let err;
    try {
      await courseWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });
});
