<template>
    <div class="add-course">
      <h2>Add New Course</h2>
      <form @submit.prevent="addCourse">
        <label for="id">Course ID:</label>
        <input type="text" v-model="newCourse.id" id="id" required />

        <label for="name">Name:</label>
        <input type="text" v-model="newCourse.name" id="name" required />
  
        <label for="course_date">Date:</label>
        <input type="date" v-model="newCourse.course_date" id="course_date" required />

        <label for="course_time">Time:</label>
        <input type="time" v-model="newCourse.course_time" id="course_time" required />
  
        <label for="duration">Duration:</label>
        <input type="number" v-model="newCourse.duration" id="duration" required />

        <label for="coach">Coach:</label>
        <input type="text" v-model="newCourse.coach" id="coach" required />
  
        <button type="submit" class="submit-button">Add Course</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'AddCoursePage',
    data() {
      return {
        newCourse: {
          id: '',
          name: '',
          course_date: '',
          course_time: '',
          duration: '',
          coach: '',
        }
      };
    },
    methods: {
      async addCourse() {
        try {
          await apiClient.post('/courses', this.newCourse);
          alert(`Course ${this.newCourse.name} added successfully!`);
          this.$router.push('/gym-management-app/course');
        } catch (error) {
          console.error('Error adding course:', error);
          alert('Failed to add course. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-course {
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
  