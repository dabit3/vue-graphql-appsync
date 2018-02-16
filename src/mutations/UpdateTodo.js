import gql from 'graphql-tag'

export default gql`
  mutation updateTodo($id: ID!, $name: String!, $completed: Boolean!) {
    updateTodo(
      input: {
        id: $id
        name: $name
        completed: $completed
      }
    ) {
      id
      name
      completed
    }
  }
`