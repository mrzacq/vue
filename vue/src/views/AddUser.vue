<template>
  <div>
    <Navbar></Navbar>
    <div class="container" style="margin-top: 20px;">
      <h1>Create User</h1>
      <form @submit.prevent="postUser">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Name</span
            >
          </div>
          <input
          required
            v-model="name"
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Job</span
            >
          </div>
          <input
          required
            v-model="job"
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="submit">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "AddUser",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      job: "",
    };
  },
  methods: {
    postUser() {
      this.$store.dispatch("postUser", {
        name: this.name,
        job: this.job,
      });
    },
  },
};
</script>

<style></style>
