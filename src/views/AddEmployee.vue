<template>
    <div class="add-employee-page">
      <h2>Add New Employee</h2>
      <form @submit.prevent="addEmployee">
        <label for="id">Employee ID:</label>
        <input type="text" v-model="newEmployee.id" required />
        
        <label for="name">Name:</label>
        <input type="text" v-model="newEmployee.name" required />
        
        <label for="position">Position:</label>
        <input type="text" v-model="newEmployee.position" required />
        
        <label for="contact">Contact:</label>
        <input type="text" v-model="newEmployee.contact" required />

        <label for="is_admin">Admin:</label>
        <select v-model="newEmployee.is_admin" required>
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>

        <label for="password">Password:</label>
        <input type="password" v-model="newEmployee.password" required />
        
        <button type="submit" class="submit-button">Add Employee</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'AddEmployeePage',
    data() {
      return {
        newEmployee: {
          id: '',
          name: '',
          position: '',
          contact: '',
          is_admin: false,
          password: ''
        }
      };
    },
    async mounted() {
      try{
        const sessionResponse = await apiClient.get('/login/session');
        const userId = sessionResponse.data.userId;
        const userRole = sessionResponse.data.userRole;

        if (!userId || userRole !== 'admin') {
          alert('Unauthorized access. Please log in as a admin.');
          this.$router.push('/login');
          return;
        }
      } catch (err) {
        this.$router.push('/login');
      }
    },
    methods: {
      async addEmployee() {
        try {
          await apiClient.post('/employees', this.newEmployee);
          alert(`Employee ${this.newEmployee.name} added successfully!`);
          this.$router.push('/employee');
        } catch (error) {
          console.error('Error adding employee:', error);
          alert('Failed to add employee. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-employee-page {
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
  