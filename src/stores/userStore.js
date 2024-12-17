import { defineStore } from 'pinia';
import { computed } from 'vue';

import { ref } from 'vue';

const usePrivateState = defineStore('secret-store', () => {
    const username = ref(null)
    const authToken = ref(null)
    return { username, authToken }
})

export const useUserStore = defineStore('userStore', () => {

    const privateState = usePrivateState()

    const load = (userForm) => {
        const un = localStorage.getItem("username")
        console.log("username:" + un)
        if (un) {
            privateState.username = un;
        }
    }

    const token = (token) => {
        if (token) {
            localStorage.setItem("token", token);
            privateState.authToken = token;
        } else {
            throw "Error: UN is null"
        }
    }

    const user = (user) => {
        if (user) {
            localStorage.setItem("user", user);
            // privateState.username = userForm.username;
        } else {
            throw "Error: UN is null"
        }
    }

    const login = (userForm) => {
        if (userForm.username) {
            localStorage.setItem("username", userForm.username);
            privateState.username = userForm.username;
        } else {
            throw "Error: UN is null"
        }
    }

    const logout = () => {
        privateState.username = null;
        localStorage.removeItem("username")
    }
    const isAuthenticated = computed(() => {
        const result = !!privateState.username
        return result
    })

    const username = computed(() => privateState.username)
    const authToken = computed(() => privateState.authToken)

    return { token, user,load, login, logout, isAuthenticated, username, authToken }
});

