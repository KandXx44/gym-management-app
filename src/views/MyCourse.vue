<template>
    <div class="user-page">
      <!-- Aside Box (Navigation) -->
      <aside class="user-aside">
        <nav>
          <ul>
            <li @click="goToPage('user')">User</li>
            <li @click="goToPage('profile')">Profile</li>
            <li @click="goToPage('sign-up')">Sign Up for Courses</li>
            <li @click="goToPage('my-course')">My Course</li>
          </ul>
        </nav>
        <button class="logout-button" @click="logout">Logout</button>
      </aside>
  
      <!-- Main Content (Upcoming Events) -->
      <main class="user-main">
        <h2>My Course</h2>
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
                <button @click="drop(course.id)" class="sign-up-button">Drop</button>
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
    name: 'MyCoursePage',
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
          const userId = localStorage.getItem('user_id');

          const response = await apiClient.get(`/user/courses/${userId}`);
          this.courses = response.data;
        } catch (error) {
          console.error("Error fetching courses data:", error);
          alert("Failed to load courses data.");
        }
      },
      goToPage(page) {
        if (page === 'user') {
          this.$router.push(`/gym-management-app/${page}`);
        } else {
          this.$router.push(`/gym-management-app/user/${page}`);
        }
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
      async drop(id) {
        if (confirm('Are you sure you want to drop this course?')) {
          try {
                await apiClient.delete(`/user/${id}`);
                this.fetchCourses();
                alert(`This course has been droped.`);
            } catch (error) {
                console.error("Error dropping course:", error);
                alert("Failed to drop course.");
            }
        }
      }
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

  .sign-up-button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .sign-up-button:hover {
    background-color: #2980b9;
  }
</style>