<script setup lang="ts"></script>

<template>
  <router-link to="/">Home</router-link>|
  <router-link to="/login">Login</router-link>|
  <router-link to="/register">Register</router-link>
  <div>
    <router-view />
  </div>
</template>
