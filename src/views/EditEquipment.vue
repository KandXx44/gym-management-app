<template>
    <div class="edit-equipment">
      <h2>Edit Equipment</h2>
      <form @submit.prevent="editEquipment">
        <label for="id">Equipment ID:</label>
        <input type="text" v-model="equipment.equipment_id" disabled />

        <label for="name">Equipment Name:</label>
        <input type="text" v-model="equipment.name" id="name" required />
  
        <label for="category">Category:</label>
        <input type="text" v-model="equipment.category" id="category" required />
  
        <label for="quantity">Quantity:</label>
        <input type="number" v-model="equipment.quantity" id="quantity" required />
  
        <button type="submit" class="submit-button">Update Equipment</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'EditEquipmentPage',
    data() {
      return {
        equipment: {
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

        const id = this.$route.params.id;
        await apiClient.get(`/equipments/${id}`)
          .then(response => {
            this.equipment = response.data;
          })
          .catch(error => {
            console.error("Error fetching equipment data:", error);
            alert("Failed to load equipment data.");
          });
      } catch(err) {
        this.$router.push('/login');
      }
    },
    methods: {
      async editEquipment() {
        const id = this.$route.params.id;
        await apiClient.put(`/equipments/${id}`, this.equipment)
          .then(() => {
            alert('Equipment updated successfully!');
            this.$router.push('/equipment');
          })
          .catch(error => {
            console.error("Error updating equipment:", error);
            alert("Failed to update equipment.");
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-equipment {
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
  