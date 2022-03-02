<template>
  <v-row class="mt-md-8" >
    <v-col
      cols="12"
      md="4"
      class="d-flex order-1 order-md-0 flex-row flex-md-column justify-space-around justify-md-center align-right pr-8"
    >
    </v-col>
    <v-col cols="12" md="4" class="pt-0">
      <v-card class="deep-purple darken-3 pa-2 ma-4 elevation-3"  rounded >
        <v-img
          class="deep-purple darken-3 align-end"
          width="900px"
          height="1000px"
          src="https://i.pinimg.com/originals/13/a7/a0/13a7a0e8954f38958fa6413df5f3d0f2.jpg"
        ></v-img>
        <v-card-actions class="pb-3 flex-row flex-md-row ma-4">
          <v-spacer></v-spacer>
          <v-btn @click="Sign()" darkclass="purple darken-4 mr-2">sign in
          </v-btn>
          <v-btn @click="Login()" fab dark class="purple darken-1 mr-2"><v-icon
          >mdi-login</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      slug: this.$route.params.slug,

    }
  },

  methods: {
    Login() {
      window.location.href = "http://127.0.0.1:8000/account/login"
    },
    Sign() {
      window.location.href = "http://127.0.0.1:8000/account/signup"
    }



  }
  }


</script>
<style scoped>
body{
  background-color: #333399;
}
h2{
  padding: 10px;
  color: darkorange;
}
h3{
  padding: 5px;
  color: darkorange;
}

p{
  padding: 20px;
  color: darkslategrey;
}

</style>
