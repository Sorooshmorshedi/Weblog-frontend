<template>
  <v-card
    class="indigo lighten-1 justify-center ma-5"
    dark
    height="1000px"
  >
    <v-toolbar
      flat
      color=#23228c
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        Create account
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        v-model = "user"
        color="white"
        label="user name"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model = "f_name"
        color="white"
        label="First name"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model = "l_name"
        color="white"
        label="Last name"
      ></v-text-field>
    </v-card-text>

    <v-card-text>
      <v-text-field
        v-model = "password"
        type="password"
        color="white"
        label="Password"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <NuxtLink to="/login">
        <v-btn
          class="ma-2"
          color="blue"
        >
          you have account?
        </v-btn>
      </NuxtLink>

      <v-btn
        color=#59981A
        @click="createAcc"
      >
        Create account
      </v-btn>
    </v-card-actions>
  </v-card>

</template>


<script>
export default {
  name: 'signPage',
  data () {
    return {
      user: '',
      f_name: '',
      l_name: '',
      password: '',
    }
  },
  methods: {
    createAcc() {
      this.$axios.$post('http://127.0.0.1:8000/api/account', {
        first_name: this.f_name,
        last_name: this.l_name,
        password: this.password,
        username: this.user,

      })
        .then(response => {
          console.log(response.id)
          window.alert('account created')
          window.location.href = "http://127.0.0.1:3000/setprofile/"+response.token+"?acid="+response.id;
        })
    }
  }

}
</script>
<style>

</style>
