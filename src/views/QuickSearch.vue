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
  
      <main class="user-main">
        <h2>Quick Search</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by name, ID, or contact..." 
            @input="searchMembers"
          />
        </div>

        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="!loading && !searchQuery && results.length === 0">
          Please enter a search query to see results.
        </div>

        <table v-if="results.length > 0" class="member-table">
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
                <tr v-for="member in results" :key="member.id">
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

        <div v-else-if="!loading && searchQuery">
          No results found.
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'QuickSearch',
    data() {
      return {
        searchQuery: '',
        results: [],
        loading: false,
        error: null,
      };
    },    
    async mounted() {
      try {
        const sessionResponse = await apiClient.get('/login/session');
        const userId = sessionResponse.data.userId;
        const userRole = sessionResponse.data.userRole;

        if (!userId || userRole !== 'admin') {
          alert('Unauthorized access. Please log in as a admin.');
          this.$router.push('/login');
          return;
        }
      } catch (error) {
          alert('Unauthorized access. Please log in as a admin.');
          this.$router.push('/login');
      }
    },
    methods: {
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
      },
      async searchMembers() {
        if (this.searchQuery.trim() === '') {
          this.results = [];
          return;
        }

        this.loading = true;
        this.error = null;

        try {
          const response = await apiClient.get('/members/search', {
            params: { query: this.searchQuery },
          });
          this.results = response.data;
        } catch (err) {
          console.error('Error fetching search results:', err);
          this.error = 'Failed to fetch search results. Please try again.';
        } finally {
          this.loading = false;
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

.search-bar {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #2980b9;
}

.loading {
  color: blue;
}

.error {
  color: red;
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
  