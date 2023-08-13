// stores/counter.js
import { defineStore } from 'pinia'

export type MyObject = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
};

export const useUserStore = defineStore('users', {
    state: () => {
        return { users: [] as MyObject[] }
    },
    actions: {
        storeUsers(userList: []) {
            this.users = userList
        },
        deleteUser(userId: number) {
            console.log('delete')
            this.users = this.users.filter(obj => obj.id !== userId);
        },
        addUser(user: MyObject) {
            console.log('add')
            this.users.push(user)
        }
    },
})