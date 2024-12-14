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
        <h2>Equipment Management</h2>
        <button @click="addEquipment" class="add-button">Add Equipment</button>

        <table class="equipment-table">
            <thead>
                <tr>
                <th>Equipment ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="equipment in equipments" :key="equipment.id">
                <td>{{ equipment.equipment_id }}</td>
                <td>{{ equipment.name }}</td>
                <td>{{ equipment.category }}</td>
                <td>{{ equipment.quantity }}</td>
                <td>
                    <button @click="editEquipment(equipment.id)" class="edit-button">Edit</button>
                    <button @click="deleteEquipment(equipment.id)" class="delete-button">Delete</button>
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
    name: 'Equipment',
    data() {
      return {
          equipments: [],
        };
    },
    mounted() {
        this.fetchEquipments();
    },
    methods: {
      async fetchEquipments() {
        try {
          const response = await apiClient.get('/equipments');
          this.equipments = response.data;
        } catch (error) {
          console.error("Error fetching equipments:", error);
          alert("Failed to load equipments.");
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
      addEquipment() {
        this.$router.push('/gym-management-app/add-equipment');
      },
      editEquipment(id) {
        this.$router.push(`/gym-management-app/edit-equipment/${id}`);
      },
      async deleteEquipment(id) {
        if (confirm(`Are you sure you want to delete this equipment?`)) {
            try {
                await apiClient.delete(`/equipments/${id}`);
                this.fetchEquipments();
                alert(`This equipment has been deleted.`);
            } catch (error) {
                console.error("Error deleting equipment:", error);
                alert("Failed to delete equipment.");
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

.equipment-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.equipment-table th, .equipment-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.equipment-table th {
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
  