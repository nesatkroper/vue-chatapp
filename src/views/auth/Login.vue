<script setup lang="ts">
import { ref } from "vue";
import type { Auth } from "@/types/Auth";
import { useRouter } from "vue-router";
import axios from "@/config/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const router = useRouter();
const auth: any = ref<Auth[]>([]);
const showPass = ref(false);

const navigateToRegister = () => {
  router.push("/register");
};

function isShowPass() {
  showPass.value = !showPass.value;
}

const clear = () => {
  auth.value.email = null;
  auth.value.password = null;
};

const handleLogin = async () => {
  if (auth.value.email == undefined || auth.value.password == undefined) {
    alert("Error: Please enter a valid email and password");
  } else {
    try {
      const response = await axios.post("/login", {
        email: auth.value.email,
        password: auth.value.password,
      });
      localStorage.setItem("auth_token", response.data.access_token);
      router.push("/");
    } catch (err: any) {
      alert("Error: " + err);
      clear();
    }
  }
};
</script>

<template>
  <div class="flex justify-center m-auto">
    <div class="text-center w-full md:w-[30rem]">
      <Card class="shadow-none md:shadow-2xl">
        <CardHeader>
          <CardTitle>Login an account</CardTitle>
          <CardDescription class="hidden md:block"
            >Enter your email below to login your account</CardDescription
          >
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleLogin">
            <div class="grid w-full items-start gap-1.5 text-start my-4">
              <Label>Email</Label>
              <Input v-model="auth.email" type="email" placeholder="Email" />
            </div>
            <div class="grid w-full items-start gap-1.5 text-start my-4">
              <Label>Password</Label>
              <Input
                v-model="auth.password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Password"
              />
              <div class="flex items-center space-x-2">
                <Checkbox id="terms" @update:checked="isShowPass" />
                <label
                  for="terms"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show Password
                </label>
              </div>
            </div>

            <div class="grid w-full items-start gap-1.5 text-start my-4">
              <Button type="submit">Login</Button>
            </div>
          </form>
          <span class="text-muted-foreground px-0"> DON'T HAVE ACCOUNT </span>
          <div class="grid w-full items-start gap-1.5 text-start my-4">
            <Button @click="navigateToRegister"> Register </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
