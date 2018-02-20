import gql from 'graphql-tag'

export default gql`
  query listTasks {
    listTasks {
      items {
        id
        name
        completed
      }
    }
  }
`