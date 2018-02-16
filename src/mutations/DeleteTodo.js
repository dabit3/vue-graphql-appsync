import gql from 'graphql-tag'

export default gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`