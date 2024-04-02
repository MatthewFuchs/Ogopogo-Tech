document.addEventListener('DOMContentLoaded', function() {
    // Example: Fetch and display new registrations
    fetch('/api/new-registrations')
        .then(response => response.json())
        .then(data => {
            document.getElementById('newRegistrations').textContent = data.count;
        })
        .catch(error => console.error('Error loading new registrations:', error));

    // Repeat the fetch pattern for other metrics like active users, course enrollments, etc.
});

document.getElementById('createCourseForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById('courseName').value,
        courseID: document.getElementById('courseID').value,
        description: document.getElementById('courseDescription').value,
        instructor: document.getElementById('courseInstructor').value,
    };

    // Use the full URL including the endpoint to make the request
    fetch('http://localhost:8080/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json(); // Assuming the server responds with JSON
    })
    .then(data => {
        console.log('Success:', data);
        alert('Course created successfully!');
        // Optionally, redirect or clear the form here
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to create course. Check console for more details.');
    });
});

document.addEventListener('DOMContentLoaded', fetchCourses);

function fetchCourses() {
    fetch('http://localhost:8080/api/courses')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(courses => {
            const container = document.getElementById('coursesContainer');
            // Clear any existing content
            container.innerHTML = '';
            // Iterate over the courses and create HTML for each one
            courses.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course-item';
                courseDiv.innerHTML = `
                    <h3>${course.name}</h3>
                    <p><strong>ID:</strong> ${course.courseID}</p>
                    <p><strong>Description:</strong> ${course.description}</p>
                    <p><strong>Instructor:</strong> ${course.instructor}</p>
                `;
                container.appendChild(courseDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            const container = document.getElementById('coursesContainer');
            container.innerHTML = '<p>Error loading courses. Please try again later.</p>';
        });
}

