<template>
    <div class="edit-profile-page">
      <h2>Edit Profile</h2>
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="id">Member ID:</label>
          <input type="text" v-model="user.member_id" disabled />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" id="age" v-model="user.age" required />
        </div>
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select id="gender" v-model="user.gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="contact">Contact:</label>
          <input type="text" id="contact" v-model="user.contact" required />
        </div>
        <div class="form-group">
          <label for="height">Height (cm):</label>
          <input type="number" id="height" v-model="user.height" required />
        </div>
        <div class="form-group">
          <label for="weight">Weight (kg):</label>
          <input type="number" id="weight" v-model="user.weight" required />
        </div>
        <div class="form-group">
          <label for="weight">Password:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <button type="submit" class="save-button">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'EditProfilePage',
    data() {
      return {
        user: {
          name: '',
          age: '',
          gender: 'Male',
          contact: '',
          height: '',
          weight: '',
          password: ''
        }
      };
    },
    async mounted() {
      try {
        const sessionResponse = await apiClient.get('/login/session');
        const userId = sessionResponse.data.userId;
        const userRole = sessionResponse.data.userRole;

        if (!userId || userRole !== 'member') {
          alert('Unauthorized access. Please log in as a member.');
          this.$router.push('/login');
          return;
        }

        const id = this.$route.params.id;
        await apiClient.get(`/user/${id}`)
          .then(response => {
            this.user = response.data;
            this.user.password = '';
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
            alert("Failed to load user data.");
          });
      } catch(err) {
        this.$router.push('/login');
      }
      
    },
    methods: {
      async saveProfile() {
        const id = this.$route.params.id;
        await apiClient.put(`/user/${id}`, this.user)
          .then(() => {
            alert('User profile updated successfully!');
            this.$router.push(`/user/profile`);
          })
          .catch(error => {
            console.error("Error updating user profile:", error);
            alert("Failed to update user profile.");
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-profile-page {
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .save-button {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-button:hover {
    background-color: #2980b9;
  }
  </style>
  