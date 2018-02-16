import gql from 'graphql-tag'

export default gql`
  mutation addTodo($id: ID!, $name: String!, $completed: Boolean!) {
    createTodo(
      input: {
        id: $id, name: $name, completed: $completed
      }
      
    ) {
      id
      name
      completed
    }
  }
`