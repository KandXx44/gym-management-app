<template>
  <div class="login-container">
    <h2>User Login</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Account</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          required
          placeholder="Enter username"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          placeholder="Enter password"
        />
      </div>

      <button type="submit" class="login-button">Login</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import apiClient from '../api.js';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await apiClient.post('/login', {
          id: this.username,
          password: this.password
        });

        if (response.data.success) {
          const { user_id, user_role } = response.data;
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('user_role', user_role);

          if (response.data.isAdmin) {
            this.$router.push(`/gym-management-app/admin`);
          } else {
            this.$router.push(`/gym-management-app/user`);
          }
        } else {
          this.errorMessage = response.data.message || 'Invalid username or password';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #36a372;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
