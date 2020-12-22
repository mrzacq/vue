<template>
  <div>
    <Navbar></Navbar>
    <div class="container" style="margin-top: 20px;">
      <div class="row">
        <div
          class="card col-sm"
          style="width: 20rem; padding: 10px; margin: 10px 10px 10px 10px;"
          v-for="(user, index) in users"
          :key="index"
        >
          <img
            class="card-img-top"
            v-bind:src="user.avatar"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ index + 1 }}. {{ user.first_name }} {{ user.last_name }}
            </h5>
            <p class="card-text">
              {{ user.email }}
            </p>
            <div class="form-group form-button" style="display: flex; justify-content: center; margin: auto;">
            <button
              class="btn btn-outline-primary"
              @click.prevent="toEdit(user.id)"
              style="margin-right: 3px;"
            >
              Edit
            </button>
            <button class="btn btn-outline-danger" @click="hapus(user.id, user.first_name)">Delete</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Home",
  components: {
    Navbar,
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch("fetchUsers");
    },
    toEdit(id) {
      this.$router.push(`/edit-user/${id}`);
    },
    hapus(id, name){
      const obj = {id, name}
      this.$store.dispatch('hapus', obj)
    }
  },
};
</script>

<style></style>
