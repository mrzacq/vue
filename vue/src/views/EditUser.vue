<template>
  <div>
    <Navbar></Navbar>
    <div class="container" style="margin-top: 20px;">
      <h1>Edit User</h1>
      <form @submit.prevent="updateUser">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >First Name</span
            >
          </div>
          <input
            required
            v-model="first_name"
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Last Name</span
            >
          </div>
          <input
            required
            v-model="last_name"
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Email</span
            >
          </div>
          <input
            required
            v-model="email"
            type="email"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Avatar</span
            >
          </div>
          <input
            required
            v-model="avatar"
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="submit">Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "EditUser",
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      first_name: "",
      last_name: "",
      avatar: ""
    };
  },
  created() {
    this.getUserById();
  },

  methods: {
    getUserById() {
      const id = this.$route.params.id;
      this.$store
        .dispatch("getUserById", +id)
        .then(({data}) => {
          console.log(data.data)
          this.email = data.data.email;
          this.first_name = data.data.first_name;
          this.last_name = data.data.last_name
          this.avatar = data.data.avatar
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateUser() {
      this.$store.dispatch('updateUser', {
        id: +this.$route.params.id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        avatar: this.avatar
      })
    }
  },
};
</script>

<style></style>
