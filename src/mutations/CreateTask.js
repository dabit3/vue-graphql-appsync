import gql from 'graphql-tag'

export default gql`
  mutation createTask($id: ID!, $name: String!, $completed: Boolean!) {
    createTask(
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