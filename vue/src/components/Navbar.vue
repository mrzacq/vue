<template>
  <div>
    <nav class="navbar navbar-light bg-light navbar-default navbar-fixed-top">
      <a class="navbar-brand" role="button" @click="toHome()">CRUD</a>
      <div class="row">
      <button class="btn btn-primary" style="margin-right: 10px;" @click="toAddUser()">Create User</button>
      <button class="btn btn-danger" style="margin-right: 10px;" @click="logout()">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
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
export default {
  name: "Navbar",
  methods: {
    logout: function() {
      localStorage.clear();
      Toast.fire({
        icon: 'success',
        title: 'Success logout'
      })
      this.$router.push('/login')
    },
    toAddUser(){
      this.$router.push('/add-user')
    },
    toHome(){
      this.$router.push('/')
    }
  }
};
</script>

<style></style>
