import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {id: 1, title: "buy some milk", completed:true, isFav: false},
      {id: 2, title: "play Gloomhaven", completed:false, isFav: true}
    ]
  }),
  getters: {
    favs() {
      return this.tasks.filter(t => t.isFav)
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    addTask(task) {
      this.tasks.push(task)
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => {
        return t.id !== id
      })
    }, // added functionality for users to enable and disable completed status//
       // users may then remove all completed items at their leisure//
    deleteCompleted(){
      this.tasks = this.tasks.filter(t => {
        return t.completed !== true
      })
    },
    toggleFav(id) {
      const task = this.tasks.find(t => t.id === id)
      task.isFav = !task.isFav
    },
    toggleCompleted(id) {
      const task = this.tasks.find(t => t.id === id)
      task.completed = !task.completed
    }
  }
})