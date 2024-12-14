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
        <h2>Employee Management</h2>
        <button @click="addEmployee" class="add-button">Add Employee</button>

        <table class="employee-table">
            <thead>
                <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Contact</th>
                <th>Admin</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.employee_id }}</td>
                <td>{{ employee.name }}</td>
                <td>{{ employee.position }}</td>
                <td>{{ employee.contact }}</td>
                <td>{{ employee.is_admin ? 'Yes' : 'No' }}</td>
                <td>
                    <button @click="editEmployee(employee.id)" class="edit-button">Edit</button>
                    <button @click="deleteEmployee(employee.id)" class="delete-button">Delete</button>
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
    name: 'Employee',
    data() {
      return {
          employees: [],
        };
    },
    mounted() {
        this.fetchEmployees();
    },
    methods: {
      async fetchEmployees() {
        try {
          const response = await apiClient.get('/employees');
          this.employees = response.data;
        } catch (error) {
          console.error('Error fetching employees:', error);
          alert('Failed to load employees.');
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
      addEmployee() {
        this.$router.push('/gym-management-app/add-employee');
      },
      editEmployee(id) {
          this.$router.push(`/gym-management-app/edit-employee/${id}`);
      },
      async deleteEmployee(id) {
        if (confirm(`Are you sure you want to delete this employee?`)) {
            try {
                await apiClient.delete(`/employees/${id}`);
                this.fetchEmployees();
                alert(`This employee has been deleted.`);
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Failed to delete employee.");
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

.employee-table {
  width: 100%;
  border-collapse: collapse;
}

.employee-table th,
.employee-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.employee-table th {
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
  