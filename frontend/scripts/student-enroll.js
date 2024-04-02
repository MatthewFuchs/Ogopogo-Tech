document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/courses')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('courseSelect');
            data.courses.forEach(course => {
                let option = new Option(course.name, course.id);
                select.add(option);
            });
        })
        .catch(error => console.error('Error loading courses:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    // Simulate fetching courses from the backend
    const mockCourses = [
        { id: "course4", name: "User Interface Design" },
        { id: "course5", name: "Python for Data Science" },
        { id: "course6", name: "Cloud Computing Fundamentals" },
    ];

    const select = document.getElementById('courseSelect');
    mockCourses.forEach(course => {
        let option = new Option(course.name, course.id);
        select.add(option);
    });
});


document.getElementById('enroll-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const courseId = document.getElementById('courseSelect').value;
    // Assuming the student's ID is obtained from the session or a global variable
    fetch('/api/enroll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: courseId, studentId: studentId }),
    })
    .then(response => {
        if (response.ok) {
            alert('Enrollment successful!');
            // Optionally, redirect or update the UI accordingly
        } else {
            alert('Enrollment failed. Please try again.');
        }
    })
    .catch(error => console.error('Error enrolling in course:', error));
});
