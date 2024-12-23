<template>
    <div class="user-page">
      <!-- Aside Box (Navigation) -->
      <aside class="user-aside">
        <nav>
          <ul>
            <li @click="goToPage('admin')">Admin</li>
            <li @click="goToPage('quick-search')">Quick Search</li>
            <li @click="goToPage('member')">Member</li>
            <li @click="goToPage('employee')">Employee</li>
            <li @click="goToPage('equipment')">Equipment</li>
            <li @click="goToPage('course')">Course</li>
          </ul>
        </nav>
        <button class="logout-button" @click="logout">Logout</button>
      </aside>
  
      <!-- Main Content (Upcoming Events) -->
      <main class="user-main">
        <h2>Course Management</h2>
        <button @click="addCourse" class="add-button">Add Course</button>

        <table class="course-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Coach</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.id">
              <td>{{ course.course_id }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.course_date.split('T')[0] }}</td>
              <td>{{ course.course_time.slice(0, 5) }}</td>
              <td>{{ course.duration + " mins"}}</td>
              <td>{{ course.coach }}</td>
              <td>
                  <button @click="editCourse(course.id)" class="edit-button">Edit</button>
                  <button @click="deleteCourse(course.id)" class="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'Course',
    data() {
      return {
        courses: [],
      };
    },
    mounted() {
        this.fetchCourses();
    },
    methods: {
      async fetchCourses() {
        try {
          const response = await apiClient.get('/courses');
          this.courses = response.data;
        } catch (error) {
          console.error('Error fetching courses:', error);
          alert('Failed to load courses.');
        }
      },
      goToPage(page) {
        this.$router.push(`/gym-management-app/${page}`);
      },
      logout() {
        const userId = localStorage.getItem('user_id');

        apiClient.post('/login/logout', { user_id: userId })
          .then(() => {
            localStorage.clear();
            alert('Logged out successfully!');
            this.$router.push('/gym-management-app');
          })
          .catch(error => {
            console.error('Error during logout:', error);
            alert('Failed to log out. Please try again.');
          });
      },
      addCourse() {
        this.$router.push('/gym-management-app/add-course');
      },
      editCourse(id) {
        this.$router.push(`/gym-management-app/edit-course/${id}`);
      },
      async deleteCourse(id) {
        if (confirm(`Are you sure you want to delete this course?`)) {
            try {
                await apiClient.delete(`/courses/${id}`);
                this.fetchCourses();
                alert(`This course has been deleted.`);
            } catch (error) {
                console.error("Error deleting course:", error);
                alert("Failed to delete course.");
            }
        }
      },
    }
  };
  </script>

<style scoped>
.user-page {
  display: flex;
  height: 100vh;
}

.user-aside {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ccc;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  padding: 10px 0;
  cursor: pointer;
  color: #42b983;
}

nav ul li:hover {
  text-decoration: underline;
}

.logout-button {
  margin-top: 20px; /* Space above the button */
  padding: 10px; /* Padding for the button */
  background-color: #e74c3c; /* Logout button color */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor for the button */
  width: 100%; /* Full width for the button */
}

.logout-button:hover {
  background-color: #c0392b; /* Darker color on hover */
}

.user-main {
  flex: 1;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.add-button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #2980b9;
}

.course-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.course-table th,
.course-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.course-table th {
  background-color: #f4f4f4;
}

.edit-button {
  padding: 5px 10px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #e67e22;
}

.delete-button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
  