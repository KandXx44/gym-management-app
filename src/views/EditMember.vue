<template>
    <div class="edit-member-page">
      <h2>Edit Member</h2>
      <form @submit.prevent="editMember">
        <label for="id">Member ID:</label>
        <input type="text" v-model="member.member_id" disabled />
        
        <label for="name">Name:</label>
        <input type="text" v-model="member.name" required />
        
        <label for="age">Age:</label>
        <input type="number" v-model="member.age" required />
        
        <label for="gender">Gender:</label>
        <select v-model="member.gender" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        
        <label for="contact">Contact:</label>
        <input type="text" v-model="member.contact" required />

        <label for="height">Height:</label>
        <input type="number" v-model="member.height" required />

        <label for="weight">Weight:</label>
        <input type="number" v-model="member.weight" required />

        <label for="password">Password:</label>
        <input type="password" v-model="member.password" required />
        
        <button type="submit" class="submit-button">Update Member</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'EditMemberPage',
    data() {
      return {
        member: {
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

        if (!userId || userRole !== 'admin') {
          alert('Unauthorized access. Please log in as a admin.');
          this.$router.push('/login');
          return;
        }

        const id = this.$route.params.id;
        await apiClient.get(`/members/${id}`)
          .then(response => {
            this.member = response.data;
            this.member.password = '';
          })
          .catch(error => {
            console.error("Error fetching member data:", error);
            alert("Failed to load member data.");
          });
      } catch(err) {
        this.$router.push('/login');
      }
    },
    methods: {
      async editMember() {
        const id = this.$route.params.id;
        await apiClient.put(`/members/${id}`, this.member)
          .then(() => {
            alert('Member updated successfully!');
            this.$router.push('/member');
          })
          .catch(error => {
            console.error("Error updating member:", error);
            alert("Failed to update member.");
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-member-page {
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
  