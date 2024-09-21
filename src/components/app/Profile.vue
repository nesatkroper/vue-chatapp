<template>
  <div>
    <h2>Profile</h2>
    <p v-if="user">Welcome, {{ user.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from "../../config/axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/user");
      this.user = response.data.data;
    } catch (err) {
      this.$router.push("/login");
    }
  },
  methods: {
    async logout() {
      await axios.post("/logout");
      localStorage.removeItem("auth_token");
      this.$router.push("/login");
    },
  },
};
</script>
