import { writable } from 'svelte/store'


export default class EventHandler
{
    private events = {
        change: [] as Function[],
        clearFilters: [] as Function[],
        clearSearch: [] as Function[]
    }
    public triggerChange = writable(0)     // legacy


    public add(event: keyof EventHandler['events'], callback: Function)
    {
        this.events[event].push(callback)
    }

    public trigger(event: keyof EventHandler['events'])
    {
        for (const callback of this.events[event]) {
            callback()
        }
        /* legacy: support for triggerChange store */
        if (event === 'change') {
            this.triggerChange.update((store) => { return store + 1 })
        }
    }
}