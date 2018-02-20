# Vue + [AWS AppSync](https://aws.amazon.com/appsync/) + GraphQL App

Task Manager Application built using [Vue](https://vuejs.org/), [AWS AppSync](https://aws.amazon.com/appsync/), and [Vue Apollo](https://github.com/Akryum/vue-apollo)  
This application goes along with the medium blog [Full Stack Vue with GraphQL & AWS AppSync](https://medium.com/@dabit3/full-stack-vue-with-graphql-aws-appsync-adc5af474dc9)

![](https://i.imgur.com/9TdyOOi.jpg)    


## Getting started    

1. clone project    

```
git clone https://github.com/dabit3/vue-graphql-appsync.git
```

2. cd into directory    

```
cd vue-graphql-appsync
```

3. install dependencies using npm or yarn    

```
yarn || npm install
```

4. create a new AppSync Project with the following schema:    

[Video walkthrough](https://www.youtube.com/watch?v=0Xbt7VqkJNc) (replace Todo with Task, and fetchTodos with fetchTasks), or go to [AWS AppSync](https://aws.amazon.com/appsync/) if you already are familiar with how to create the correct schema.

```
input CreateTaskInput {
 id: ID!
 name: String!
 completed: Boolean!
}
input DeleteTaskInput {
 id: ID!
}
type Mutation {
 createTask(input: CreateTaskInput!): Task
 updateTask(input: UpdateTaskInput!): Task
 deleteTask(input: DeleteTaskInput!): Task
}
type Query {
 getTask(id: ID!): Task
 listTasks(first: Int, after: String): TaskConnection
}
type Subscription {
 onCreateTask(id: ID, name: String, completed: Boolean): Task
  @aws_subscribe(mutations: ["createTask"])
 onUpdateTask(id: ID, name: String, completed: Boolean): Task
  @aws_subscribe(mutations: ["updateTask"])
 onDeleteTask(id: ID, name: String, completed: Boolean): Task
  @aws_subscribe(mutations: ["deleteTask"])
}
type Task {
 id: ID!
 name: String!
 completed: Boolean!
}
type TaskConnection {
 items: [Task]
 nextToken: String
}
input UpdateTaskInput {
 id: ID!
 name: String
 completed: Boolean
}
schema {
 query: Query
 mutation: Mutation
 subscription: Subscription
}
```

5. update your credentials in `src/AppSync.js`    
