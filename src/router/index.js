import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue'; // Admin page component
import User from '../views/User.vue';
import ProfilePage from '../views/Profile.vue';
import EditProfilePage from '../views/EditProfile.vue';
import SignUpPage from '../views/SignUp.vue';
import MyCoursePage from '../views/MyCourse.vue';
import QuickSearch from '../views/QuickSearch.vue';
import Member from '../views/Member.vue';
import AddMember from '../views/AddMember.vue';
import EditMember from '../views/EditMember.vue';
import Employee from '../views/Employee.vue';
import AddEmployee from '../views/AddEmployee.vue';
import EditEmployee from '../views/EditEmployee.vue';
import Equipment from '../views/Equipment.vue';
import AddEquipment from '../views/AddEquipment.vue';
import EditEquipment from '../views/EditEquipment.vue';
import Course from '../views/Course.vue';
import AddCourse from '../views/AddCourse.vue';
import EditCourse from '../views/EditCourse.vue';

const routes = [
  { path: '/', redirect: '/login' },    // Redirect root to login
  { path: '/login', component: Login }, // Login page route
  { path: '/admin', component: Admin }, // Admin page route
  { path: '/user', component: User },   // User page route
  { path: '/user/profile', component: ProfilePage },   // Profile page
  { path: '/edit-profile/:id', component: EditProfilePage },   // Edit Profile page
  { path: '/user/sign-up', component: SignUpPage },    // Sign Up page
  { path: '/user/my-course', component: MyCoursePage }, // My Courses page
  { path: '/quick-search', component: QuickSearch }, // QuickSearch page 
  { path: '/member', component: Member }, // Member page 
  { path: '/add-member', component: AddMember }, // Add Member page 
  { path: '/edit-member/:id', component: EditMember }, // Edit Member page
  { path: '/employee', component: Employee }, // Employee page
  { path: '/add-employee', component: AddEmployee }, // Add Employee page
  { path: '/edit-employee/:id', component: EditEmployee }, // Edit Employee page
  { path: '/equipment', component: Equipment }, // Equipment page
  { path: '/add-equipment', component: AddEquipment }, // Add Equipment page
  { path: '/edit-equipment/:id', component: EditEquipment }, // Edit Equipment page
  { path: '/course', component: Course }, // Course page
  { path: '/add-course', component: AddCourse }, // Add Course page
  { path: '/edit-course/:id', component: EditCourse }, // Edit Course page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
