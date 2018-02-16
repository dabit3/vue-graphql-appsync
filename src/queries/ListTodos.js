import gql from 'graphql-tag'

export default gql`
  query listTodos {
    listTodos {
      items {
        id
        name
        completed
      }
    }
  }
`