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
      <h2>Upcoming Events</h2>
      <div class="events-list">
        <div v-for="(event, index) in events" :key="index" class="event">
          <h3>{{ event.name }}</h3>
          <p>{{ event.course_date.split('T')[0] }} - {{ event.course_time.slice(0, 5) }}</p>
          <p>{{ event.coach }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import apiClient from '../api.js';

export default {
  name: 'UserPage',
  data() {
    return {
      events: [],
    };
  },
  mounted() {
      this.fetchCourses();
  },
  methods: {
    async fetchCourses() {
      try {
        // Check session validity
        const sessionResponse = await apiClient.get('/login/session');
        const userId = sessionResponse.data.userId;
        const userRole = sessionResponse.data.userRole;

        if (!userId || userRole !== 'member') {
          alert('Unauthorized access. Please log in as a member.');
          this.$router.push('/login');
          return;
        }

        // Fetch user courses
        const response = await apiClient.get(`/user/courses/${userId}`);
        this.events = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
          alert('Session expired. Please log in again.');
          this.$router.push('/login');
        } else {
          console.error("Error fetching courses:", error);
          alert("Failed to load courses.");
        }
      }
    },
    goToPage(page) {
      if (page === 'user') {
        this.$router.push(`/${page}`);
      } else {
        this.$router.push(`/user/${page}`);
      }
    },
    logout() {
      apiClient.post('/login/logout')
        .then(() => {
          // Clear client-side session or authentication tokens if applicable
          alert("Logged out successfully!");
          this.$router.push('/login'); // Redirect to login page
        })
        .catch(error => {
          console.error("Error during logout:", error);
          alert("Failed to log out. Please try again.");
        });
    }
  },
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

.events-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.event {
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.event h3 {
  margin-top: 0;
  color: #333;
}
</style>
