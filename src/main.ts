import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
// import MenuList from './components/MenuList.vue'

createApp(App)
// .component('MenuList', MenuList)
.use(store)
.use(router)
.mount('#app')
// const app = createApp(App);
// app.use(router).mount('#app')