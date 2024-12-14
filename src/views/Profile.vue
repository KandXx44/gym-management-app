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

    <!-- Main Content (User Information) -->
    <main class="user-main">
      <h2>My Profile</h2>
      <table class="user-info-table">
        <tbody>
          <tr>
            <td>Member ID</td>
            <td>{{ user.member_id }}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{{ user.name }}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{{ user.age }}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{{ user.gender }}</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>{{ user.contact }}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{{ user.height }}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{{ user.weight }}</td>
          </tr>
        </tbody>
      </table>

      <button class="edit-button" @click="editProfile(user.member_id)">Edit</button>
    </main>
  </div>
</template>

<script>
import apiClient from '../api.js';

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {
        member_id: '',
        name: '',
        age: '',
        gender: '',
        contact: '',
        height: '',
        weight: ''
      }
    };
  },
  async mounted() {
    const userId = localStorage.getItem('user_id');
    await apiClient.get(`/user/${userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      });
  },
  methods: {
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
    editProfile(id) {
      this.$router.push(`/gym-management-app/edit-profile/${id}`);
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

.user-info-table {
  width: 100%; /* Full width */
  border-collapse: collapse; /* Collapse borders */
  margin-bottom: 20px; /* Space below the table */
}

.user-info-table th,
.user-info-table td {
  border: 1px solid #ccc; /* Border for table cells */
  padding: 10px; /* Padding for table cells */
  text-align: left; /* Align text to the left */
}

.user-info-table th {
  background-color: #f4f4f4; /* Header background color */
}

.edit-button {
  padding: 10px 15px; /* Padding for the button */
  background-color: #3498db; /* Button color */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor for hover */
}

.edit-button:hover {
  background-color: #2980b9; /* Darker color on hover */
}
</style>
