<template>
  <div class="add-member-page">
    <h2>Add New Member</h2>
    <form @submit.prevent="addMember">
      <label for="id">Member ID:</label>
      <input type="text" v-model="newMember.id" required />

      <label for="name">Name:</label>
      <input type="text" v-model="newMember.name" required />

      <label for="age">Age:</label>
      <input type="number" v-model="newMember.age" min="1" required />

      <label for="gender">Gender:</label>
      <select v-model="newMember.gender" required>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label for="contact">Contact:</label>
      <input type="text" v-model="newMember.contact" required />

      <label for="height">Height (cm):</label>
      <input type="number" v-model="newMember.height" min="1" required />

      <label for="weight">Weight (kg):</label>
      <input type="number" v-model="newMember.weight" min="1" required />

      <label for="password">Password:</label>
      <input type="password" v-model="newMember.password" required />

      <button type="submit" class="submit-button">Add Member</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../api.js';

export default {
  name: 'AddMemberPage',
  data() {
    return {
      newMember: {
        id: '',
        name: '',
        age: '',
        gender: 'Male',
        contact: '',
        height: '',
        weight: '',
        password: '',
      },
    };
  },
  methods: {
    async addMember() {
      try {
        const response = await apiClient.post('/members', this.newMember);
        alert(`Member ${this.newMember.name} added successfully!`);
        this.$router.push('/gym-management-app/member');
      } catch (error) {
        console.error('Error adding member:', error.response?.data || error);
        alert('Failed to add member. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
.add-member-page {
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

input,
select {
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
