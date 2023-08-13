// stores/counter.js
import { defineStore } from 'pinia'

export const useToastMessageStore = defineStore('toastMessage', {
    state: () => {
        return { text: '', visible: false }
    },
    actions: {
        setToastMessage(message: string) {
            this.text = message
        },
        setVisisbility(visibility: boolean) {
            this.visible = visibility
        },
    },
})