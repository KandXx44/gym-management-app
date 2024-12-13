<template>
    <div class="add-equipment">
      <h2>Add New Equipment</h2>
      <form @submit.prevent="addEquipment">
        <label for="id">Equipment ID:</label>
        <input type="text" v-model="newEquipment.id" id="id" required />

        <label for="name">Name:</label>
        <input type="text" v-model="newEquipment.name" id="name" required />
  
        <label for="category">Category:</label>
        <input type="text" v-model="newEquipment.category" id="category" required />
  
        <label for="quantity">Quantity:</label>
        <input type="number" v-model="newEquipment.quantity" id="quantity" required />
  
        <button type="submit" class="submit-button">Add Equipment</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'AddEquipmentPage',
    data() {
      return {
        newEquipment: {
          id: '',
          name: '',
          category: '',
          quantity: 0
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
      async addEquipment() {
        try {
          await apiClient.post('/equipments', this.newEquipment);
          alert(`Equipment ${this.newEquipment.name} added successfully!`);
          this.$router.push('/equipment');
        } catch (error) {
          console.error('Error adding equipment:', error);
          alert('Failed to add equipment. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-equipment {
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
  
  input {
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
  