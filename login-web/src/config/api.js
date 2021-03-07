import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

console.log(process.env.VUE_APP_API_HOST)
const api = Vue.axios.create({
    baseURL: process.env.VUE_APP_API_HOST
})

export default api