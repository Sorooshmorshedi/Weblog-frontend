<template>
  <v-card
    class="indigo lighten-1 overflow-hidden"
    dark
    height="1000px"
  >
    <v-toolbar
      flat
      color=#23228c

    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        Log in
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        v-model = "username"
        color="white"
        label="username"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model = "password"
        color="white"
        type="password"
        label="Password"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <NuxtLink to="/sign">
        <v-btn
          class="ma-2"
          color="blue"
        >
          dont have account?
        </v-btn>
      </NuxtLink>

      <v-btn
        color=#59981A
        @click="Login"
      >Log in
      </v-btn>
    </v-card-actions>
  </v-card>

</template>


<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    Login() {
      this.$axios.$get('http://127.0.0.1:8000/api/myauth/?username='+this.username+'&pass='+this.password)
        .then(response => {
          console.log(response)
          window.alert('login success')
          window.location.href = "http://127.0.0.1:3000/"+response.token+"?acid="+response.id;

        })
    },
  }


}
</script>
<style>

</style>
