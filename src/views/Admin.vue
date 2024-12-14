<template>
    <div class="admin-page">
      <!-- Aside Box (Navigation) -->
      <aside class="admin-aside">
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
  
      <!-- Main Content -->
      <main class="admin-main">
        <h1>Gym</h1>
        <div class="gym-list">
          <div class="event">
            <p><strong>Total Members:</strong> {{ totals.memberCount }}</p>
          </div>

          <div class="event">
            <p><strong>Total Employees:</strong> {{ totals.employeeCount }}</p>
          </div>

          <div class="event">
            <p><strong>Total Equipments:</strong> {{ totals.equipmentCount }}</p>
          </div>

          <div class="event">
            <p><strong>Total Courses:</strong> {{ totals.courseCount }}</p>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <h2>Profile</h2>
          <button @click="editEmployee(admin.id)" class="edit-button">Edit</button>
        </div>

        <table class="user-info-table">
          <tbody>
            <tr>
              <td>Employee ID</td>
              <td>{{ admin.employee_id }}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{{ admin.name }}</td>
            </tr>
            <tr>
              <td>Position</td>
              <td>{{ admin.position }}</td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>{{ admin.contact }}</td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <h2>Quick Actions</h2>
          <div class="gym-list">
            <button @click="createMember" class="action-button">Create Member</button>
            <button @click="createEmployee" class="action-button">Create Employee</button>
            <button @click="createEquipment" class="action-button">Create Equipment</button>
            <button @click="createCourse" class="action-button">Create Course</button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'Admin',
    data() {
      return {
        totals: {
          memberCount: 0,
          employeeCount: 0,
          equipmentCount: 0,
          courseCount: 0,
        },
        admin: {
          name: '',
          position: '',
          contact: '',
        },
      };
    },
    async mounted() {
      const userId = localStorage.getItem('user_id');

      try {
        await apiClient.get(`/user/admin/${userId}`)
        .then(response => {
          this.admin = response.data;
        })
        .catch(error => {
          console.error("Error fetching admin data:", error);
          alert("Failed to load admin data.");
        });

        this.fetchTotals();
      } catch (error) {
        this.$router.push('/gym-management-app');
      }
    },
    methods: {
      async fetchTotals() {
        try {
          const response = await apiClient.get('/admin/totals');
          this.totals = response.data;
        } catch (error) {
          console.error('Error fetching totals:', error);
          alert('Failed to load totals.');
        }
      },
      goToPage(page) {
        this.$router.push(`/gym-management-app/${page}`);
      },
      createMember() {
        this.$router.push('/gym-management-app/add-member');
      },
      createEmployee() {
        this.$router.push('/gym-management-app/add-employee');
      },
      createEquipment() {
        this.$router.push('/gym-management-app/add-equipment');
      },
      createCourse() {
        this.$router.push('/gym-management-app/add-course');
      },
      editEmployee(id) {
        this.$router.push(`/gym-management-app/edit-employee/${id}`);
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
    }
  };
  </script>
  
  <style scoped>
  .admin-page {
    display: flex;
    height: 100vh;
  }
  
  .admin-aside {
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
  
  .admin-main {
    flex: 1;
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .gym-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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

  .action-button {
    margin-right: 10px;
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
  
  