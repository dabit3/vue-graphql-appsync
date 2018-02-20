import gql from 'graphql-tag'

export default gql`
  mutation updateTask($id: ID!, $name: String!, $completed: Boolean!) {
    updateTask(
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