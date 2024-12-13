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
        <h2>Member Management</h2>
        <button @click="addMember" class="add-button">Add Member</button>

        <table class="member-table">
            <thead>
                <tr>
                    <th>Member ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Contact</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="member in members" :key="member.id">
                    <td>{{ member.member_id }}</td>
                    <td>{{ member.name }}</td>
                    <td>{{ member.age }}</td>
                    <td>{{ member.gender }}</td>
                    <td>{{ member.contact }}</td>
                    <td>{{ member.height + " cm"}}</td>
                    <td>{{ member.weight + " kg"}}</td>
                    <td>
                        <button @click="editMember(member.id)" class="edit-button">Edit</button>
                        <button @click="deleteMember(member.id)" class="delete-button">Delete</button>
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
    name: 'Member',
    data() {
      return {
            members: [],
        };
    },
    mounted() {
        this.fetchMembers();
    },
    methods: {
      async fetchMembers() {
        try {
          await apiClient.get('/login/session');
          
          const response = await apiClient.get('/members');
          this.members = response.data;
        } catch (error) {
          this.$router.push('/login');
        }
      },
      goToPage(page) {
        this.$router.push(`/${page}`);
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
      },
      addMember() {
        this.$router.push('/add-member');
      },
      editMember(id) {
        this.$router.push(`/edit-member/${id}`);
      },
      async deleteMember(id) {
        if (confirm(`Are you sure you want to delete this member?`)) {
            try {
                await apiClient.delete(`/members/${id}`);
                this.fetchMembers();
                alert(`This member has been deleted.`);
            } catch (error) {
                console.error("Error deleting member:", error);
                alert("Failed to delete member.");
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

.member-table {
  width: 100%;
  border-collapse: collapse;
}

.member-table th,
.member-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.member-table th {
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
  