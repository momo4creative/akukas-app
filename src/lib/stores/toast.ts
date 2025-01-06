import { writable } from "svelte/store"

type Toast = {
    id: string
    type: 'load' | 'error' | 'success'
    message: string
}

export const toast = function () {
    const { subscribe, set, update } = writable<Toast[]>([])
    return {
        subscribe,

        load(message: string = "Loading.."): string {
            const id = crypto.randomUUID()
            update(n => ([{ id, type: 'load', message }, ...n]))
            return id
        },

        add(type: 'error' | 'success', message: string) {
            // setTimeout(() => {
            //     update(n => n.filter(d => d.type != 'load'))
            // }, 500);
            const id = crypto.randomUUID()
            update(n => ([{ id, type, message }, ...n]))
            setTimeout(() => {
                this.delete(id)
            }, 4000);
        },

        delete(id: string) {
            setTimeout(() => {
                update(n => n.filter(d => d.id != id))
            }, 500);
        }

    }
}()