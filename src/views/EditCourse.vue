<template>
  <div class="edit-course">
    <h2>Edit Course</h2>
    <form @submit.prevent="editCourse">
      <label for="id">Course ID:</label>
      <input type="text" v-model="course.course_id" id="id" disabled />

      <label for="course_date">Name:</label>
      <input type="text" v-model="course.name" id="course_name" required />

      <label for="course_date">Date:</label>
      <input type="date" v-model="course.course_date" id="course_date" required />

      <label for="course_time">Time:</label>
      <input type="time" v-model="course.course_time" id="course_time" required />
    
      <label for="duration">Duration:</label>
      <input type="text" v-model="course.duration" id="duration" required />

      <label for="coach">Coach:</label>
      <input type="text" v-model="course.coach" id="coach" required />
    
      <button type="submit" class="submit-button">Update Course</button>
    </form>
  </div>
</template>
  
  <script>
  import apiClient from '../api.js';

  export default {
    name: 'EditCoursePage',
    data() {
      return {
        course: {
          name: '',
          course_date: '',
          course_time: '',
          duration: '',
          coach: '',
        }
      };
    },
    async mounted() {
      const id = this.$route.params.id;

      const response = await apiClient.get(`/courses/${id}`);
      const courseData = response.data;

      this.course = {
        name: courseData.name,
        course_id: courseData.course_id,
        course_date: courseData.course_date.split('T')[0],
        course_time: courseData.course_time.slice(0, 5),
        duration: courseData.duration,
        coach: courseData.coach,
      };
    },
    methods: {
      async editCourse() {
        const id = this.$route.params.id;
        await apiClient.put(`/courses/${id}`, this.course)
          .then(() => {
            alert('Course updated successfully!');
            this.$router.push('/gym-management-app/course');
          })
          .catch(error => {
            console.error("Error updating course:", error);
            alert("Failed to update course.");
          });
      },
      formatDate(date) {
        return date.split('T')[0];
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-course {
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
  