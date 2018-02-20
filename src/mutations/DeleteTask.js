import gql from 'graphql-tag'

export default gql`
  mutation deleteTask($id: ID!) {
    deleteTask(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`