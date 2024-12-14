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
import apiClient from '../api.js'; // Assuming you have an Axios instance for API requests

const routes = [
  { path: '/gym-management-app', redirect: '/gym-management-app/login' },
  { path: '/gym-management-app/login', component: Login },
  { path: '/gym-management-app/admin', component: Admin, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/user', component: User, meta: { requiresAuth: true, role: 'user' } },
  { path: '/gym-management-app/user/profile', component: ProfilePage, meta: { requiresAuth: true, role: 'user' } },
  { path: '/gym-management-app/edit-profile/:id', component: EditProfilePage, meta: { requiresAuth: true, role: 'user' } },
  { path: '/gym-management-app/user/sign-up', component: SignUpPage, meta: { requiresAuth: true, role: 'user' } },
  { path: '/gym-management-app/user/my-course', component: MyCoursePage, meta: { requiresAuth: true, role: 'user' } },
  { path: '/gym-management-app/quick-search', component: QuickSearch, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/member', component: Member, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/add-member', component: AddMember, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/edit-member/:id', component: EditMember, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/employee', component: Employee, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/add-employee', component: AddEmployee, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/edit-employee/:id', component: EditEmployee, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/equipment', component: Equipment, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/add-equipment', component: AddEquipment, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/edit-equipment/:id', component: EditEquipment, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/course', component: Course, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/add-course', component: AddCourse, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/gym-management-app/edit-course/:id', component: EditCourse, meta: { requiresAuth: true, role: 'admin' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware-like functionality
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const requiredRole = to.meta.role;

  if (requiresAuth) {
    const userId = localStorage.getItem('user_id');
    const userRole = localStorage.getItem('user_role');

    if (!userId || !userRole) {
      alert('Unauthorized access. Please log in.');
      next('/gym-management-app/login');
      return;
    }

    // Optional: Validate user existence in the database
    try {
      const response = await apiClient.get(`/login/check/${userId}`);
      
      if (!response.data.loggedIn || (requiredRole && userRole !== requiredRole)) {
        alert('Access denied. Please log in with proper credentials.');
        next('/gym-management-app/login');
        return;
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
      next('/gym-management-app/login');
      return;
    }
  }

  next(); // Proceed to the route
});

export default router;
