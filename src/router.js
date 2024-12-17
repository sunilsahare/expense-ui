import { useUserStore } from './stores/userStore';
import {createRouter, createWebHistory} from "vue-router";
import AuthLayout from "./layout/AuthLayout.vue";
import LoginView from "./view/LoginView.vue";
import RegisterView from "./view/RegisterView.vue";
import HomeLayout from "./layout/HomeLayout.vue";
import AddExpenseView from "./view/AddExpenseView.vue";
import ExpenseEditView from "./view/ExpenseEditView.vue";
import ExpenseListView from "./view/ExpenseListView.vue";
import HomeView from "./view/HomeView.vue";

function isLoggedIn() {
    const userStore = useUserStore()
    return userStore.isAuthenticated
}

const routes = [
    {
        path: "/login",
        component: AuthLayout,
        children: [{ path: "", component: LoginView }],
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next({ path: "/view" });
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        component: AuthLayout,
        children: [{ path: "", component: RegisterView }],
    },
    {
        path: "/",
        component: HomeLayout,
        children:
            [
                {
                    path: '/',
                    name: 'EmployeeList',
                    component: ExpenseListView,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/add',
                    name: 'ExpenseAdd',
                    component: AddExpenseView,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/edit/:id',
                    name: 'ExpenseEdit',
                    component: ExpenseEditView,
                    props: true,
                }
                ],
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/'
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next({ path: "/login" });
    } else {
        next();
    }
});

export default router