<template>
  <div class="tasks">
    <h1>Task Manager</h1>
    <input v-model="taskname" placeholder="Task Name" class="input">
    <button @click="createTask()" class="taskButton">Create Task</button>
    <ul>
      <li
        class="task"
        v-for="(task, index) in tasks" :key="index"
      >
        <p class="text">{{ task.name }}</p>
        <p @click="toggleComplete(task)" class="text button">{{ task.completed ? 'completed' : 'not completed' }}</p>
        <p @click="deleteTask(task)" class="text button delete">Delete task</p>
      </li>
    </ul>
  </div>
</template>

<script>
import ListTasks from '../queries/ListTasks'
import CreateTask from '../mutations/CreateTask'
import DeleteTask from '../mutations/DeleteTask'
import UpdateTask from '../mutations/UpdateTask'
import uuidV4 from 'uuid/v4'
export default {
  name: 'Tasks',
  methods: {
    toggleComplete(task) {
      const updatedTask = {
        ...task,
        completed: !task.completed
      }
      this.$apollo.mutate({
        mutation: UpdateTask,
        variables: updatedTask,
        update: (store, { data: { updateTask } }) => {
          const data = store.readQuery({ query: ListTasks })
          const index = data.listTasks.items.findIndex(item => item.id === updateTask.id)
          data.listTasks.items[index] = updateTask
          store.writeQuery({ query: ListTasks, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTask: {
            __typename: 'Task',
            ...updatedTask
          }
        },
      })
      .then(data => console.log(data))
      .catch(error => console.error(error))
    },
    deleteTask(task) {
      this.$apollo.mutate({
        mutation: DeleteTask,
        variables: {
          id: task.id
        },
        update: (store, { data: { deleteTask } }) => {
          const data = store.readQuery({ query: ListTasks })
          data.listTasks.items = data.listTasks.items.filter(task => task.id !== deleteTask.id)
          store.writeQuery({ query: ListTasks, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteTask: {
            __typename: 'Task',
            ...task
          }
        },
      })
      .then(data => console.log(data))
      .catch(error => console.error(error))
    },
    createTask() {
      const taskname = this.taskname
      if ((taskname) === '') {
        alert('please create a task')
        return
      }
      this.taskname = ''
      const id = uuidV4()
      const task = {
        name: taskname,
        id,
        completed: false
      }
      this.$apollo.mutate({
        mutation: CreateTask,
        variables: task,
        update: (store, { data: { createTask } }) => {
          const data = store.readQuery({ query: ListTasks })
          data.listTasks.items.push(createTask)
          store.writeQuery({ query: ListTasks, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createTask: {
            __typename: 'Task',
            ...task
          }
        },
      })
      .then(data => console.log(data))
      .catch(error => console.error("error!!!: ", error))
    },
  },
  data () {
    return {
      taskname: '',
      tasks: []
    }
  },
  apollo: {
    tasks: {
      query: () => ListTasks,
      update: data => data.listTasks.items
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.taskButton {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #2196F3;
  border: none;
  color: white;
  outline: none;
}
.input {
  width: 100%;
  padding: 8px;
  font-size: 18px;
  border: none;
  border-bottom: 2px solid #2196F3;
  outline: none;
}
.button {
  cursor: pointer;
}
.button:hover {
  opacity: 0.5
}
.text {
  margin-top: 4px;
  margin-bottom: 0px;
}
.delete {
  color: #2196F3;
}
.task {
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  padding-top: 8px;
  padding-bottom: 9px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
