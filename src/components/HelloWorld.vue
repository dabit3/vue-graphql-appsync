<template>
  <div class="hello">
    <input v-model="todoname" placeholder="Todo Name">
    <button @click="addTodo()">Add Todo</button>
    <ul>
      <li
        class="todo"
        v-for="(todo, index) in todos" :key="index"
      >
        <p class="text">{{ todo.name }}</p>
        <p @click="toggleComplete(todo)" class="text button">{{ todo.completed ? 'completed' : 'not completed' }}</p>
        <p @click="deleteTodo(todo)" class="text button">Delete todo</p>
      </li>
    </ul>
  </div>
</template>

<script>
import ListTodos from '../queries/ListTodos'
import AddTodo from '../mutations/AddTodo'
import DeleteTodo from '../mutations/DeleteTodo'
import UpdateTodo from '../mutations/UpdateTodo'
import uuidV4 from 'uuid/v4'
export default {
  name: 'HelloWorld',
  methods: {
    toggleComplete(todo) {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed
      }
      this.$apollo.mutate({
        mutation: UpdateTodo,
        variables: updatedTodo
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
    },
    deleteTodo(todo) {
      this.$apollo.mutate({
        mutation: DeleteTodo,
        variables: {
          id: todo.id
        },
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
    },
    addTodo() {
      const todoname = this.todoname
      this.todoname = ''
      const id = uuidV4()
      const todo = {
        name: todoname,
        id,
        completed: false
      }
      this.$apollo.mutate({
        mutation: AddTodo,
        variables: todo,
        update: (store, { data: { createTodo } }) => {
          const data = store.readQuery({ query: ListTodos })
          data.listTodos.items.push(createTodo)
          store.writeQuery({ query: ListTodos, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createTodo: {
            __typename: 'Todo',
            ...todo
          }
        },
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error("error!!!: ", error)
      })
    },
  },
  data () {
    return {
      todoname: '',
      todos: []
    }
  },
  apollo: {
    todos: {
      query: ListTodos,
      update: data => {
        console.log('data: ', data)
        return data.listTodos.items
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.todo {
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
