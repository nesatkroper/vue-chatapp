<script setup lang="ts">
//@ts-ignore
import Profile from "@/components/app/Profile.vue";
import Layout from "../../components/app/Layout.vue";
</script>

<template>
  <Profile />
  <div>hello from home</div>
  <Layout layout>
    <h1>this props</h1>
  </Layout>
</template>
