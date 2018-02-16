import Vue from 'vue'
import App from './App'
import router from './router'

import AWSAppSyncClient from "aws-appsync"
import VueApollo from 'vue-apollo'

import appSyncConfig from './AppSync'

const client = new AWSAppSyncClient({
  // disableOffline: true,
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  }
}, {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

const appsyncProvider = new VueApollo({
  defaultClient: client
})

Vue.config.productionTip = false

Vue.use(VueApollo)

new Vue({
  el: '#app',
  router,
  components: { App },
  provide: appsyncProvider.provide(),
  template: '<App/>'
})