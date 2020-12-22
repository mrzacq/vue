import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from 'sweetalert2'
const url = "https://reqres.in/api"
Vue.use(Vuex)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    fetchUsers (state, data){
      state.users = data
    }
  },
  actions: {
    login (context, obj){
      axios({
        url: `${url}/login`,
        method: 'post',
        data: {
          email: obj.email, password: obj.password
        }
      }).then(({data}) => {
        if(data.token){
          Toast.fire({
            icon: 'success',
            title: 'Login success'
          })
          localStorage.setItem('token', data.token)
          router.push('/')
        }
      }).catch(err => {
        Toast.fire({
          icon: 'error',
          title: err.response.data.error
        })
      })
    },
    register(context, obj){
      axios({
        url: `${url}/register`,
        method: 'post',
        data: {
          email: obj.email,password: obj.password
        }
      }).then(({data}) => {
        if(data.token){
          Toast.fire({
            icon: 'success',
            title: 'Register success'
          })
          router.push('/login')
        }
      }).catch(err => {
        Toast.fire({
          icon: 'error',
          title: err.response.data.error
        })
      })
    },
    updateUser (context, user){
      axios({
        url: `${url}/users/${user.id}`,
        method: 'put',
        data: {
          name: user.first_name + " " + user.last_name,
          job: 'random',
          email: user.email
        }
      }).then(({data}) => {
        console.log(data)
        Toast.fire({
          icon: 'success',
          title: `Success update ${user.first_name + " " + user.last_name}`
        })
        context.dispatch('fetchUsers')
        router.push('/')
      }).catch(err => {
        console.log(err)
      })
    },
    hapus(context, obj){
      axios({
        url: `${url}/users/${obj.id}`,
        method: 'delete'
      }).then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Successfully delete ' + obj.name + ' but the API cannot handle it'
        })
        context.dispatch('fetchUsers')
      }).catch(err => {
        console.log(err)
      })
    },
    fetchUsers (context) {
      axios({
        url: `${url}/users`,
        method: 'get'
      }).then(({data}) => {
        context.commit('fetchUsers', data.data)
      }).catch(err => {
        console.log(err, 'ini error store')
      })
    },
    postUser (context, user){
      axios({
        url: `${url}/users`,
        method: 'post',
        data: {
          name: user.name,
          job: user.job
        }
      }).then(newuser => {
        Toast.fire({
          icon: 'success',
          title: `Success create ${newuser.data.name}`
        })
        context.dispatch('fetchUsers')
        router.push('/')
      }).catch(err => {
        console.log(err)
      })
    },
    getUserById(context, id){
      return axios({
        url: `${url}/users/${id}`,
        method: 'get'
      })
    }
  },
  modules: {
  }
})
