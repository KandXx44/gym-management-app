<template>
    <div class="edit-employee-page">
      <h2>Edit Employee</h2>
      <form @submit.prevent="editEmployee">
        <label for="id">Employee ID:</label>
        <input type="text" v-model="employee.employee_id" disabled />
        
        <label for="name">Name:</label>
        <input type="text" v-model="employee.name" required />
        
        <label for="position">Position:</label>
        <input type="text" v-model="employee.position" required />
        
        <label for="contact">Contact:</label>
        <input type="text" v-model="employee.contact" required />

        <label for="is_admin">Admin:</label>
        <select v-model="employee.is_admin" required>
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>

        <label for="password">Password:</label>
        <input type="password" v-model="employee.password" required />
        
        <button type="submit" class="submit-button">Update Employee</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'EditEmployeePage',
    data() {
      return {
        employee: {
          name: '',
          position: '',
          contact: '',
          is_admin: false,
          password: ''
        }
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

        const id = this.$route.params.id;
        await apiClient.get(`/employees/${id}`)
          .then(response => {
            this.employee = response.data;
            this.employee.password = '';

            if (this.employee.is_admin === 0) {
              this.employee.is_admin = false;
            } else {
              this.employee.is_admin = true;
            }
          })
          .catch(error => {
            console.error("Error fetching employee data:", error);
            alert("Failed to load employee data.");
          });
      } catch(err) {
        this.$router.push('/login');
      }
    },
    methods: {
      async editEmployee() {
        const id = this.$route.params.id;
        await apiClient.put(`/employees/${id}`, this.employee)
          .then(() => {
            alert('Employee updated successfully!');
            this.$router.push('/employee');
          })
          .catch(error => {
            console.error("Error updating employee:", error);
            alert("Failed to update employee.");
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-employee-page {
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input, select {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .submit-button {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #2980b9;
  }
  </style>
  