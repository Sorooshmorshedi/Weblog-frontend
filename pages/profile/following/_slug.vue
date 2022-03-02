<template>
  <div>
    <v-row class="mt-md-8">
      <v-col
        cols="12"
        md="4"
        class="d-flex order-1 order-md-0 flex-row flex-md-column justify-space-around justify-md-center align-right pr-8"
      >

      </v-col>
      <v-col cols="6" md="4" class="pt-5">
        <v-card class="elevation-3" color="orange">
          <v-img
            :height="isXs?'150px':'200px'"
            contain
            src="https://goldfollower.com/en/wp-content/uploads/2020/01/instagram-follower.png"
          ></v-img>
          <v-card class='d-flex order-1 order-md-0 flex-row flex-md-column justify-space-around justify-md-center align-right pr-8'
                  v-for="follower in followers"
                  color="green"
          >

            <h3>id >>{{follower.following_account}} name >>{{follower.follower_user }} followed you</h3>
          </v-card>

        </v-card>
      </v-col>
    </v-row>

  </div>
</template>


<script>
export default {
  data () {
    return {
      slug : this.$route.params.slug
    }
  },

  mounted() {
    console.log(this.slug);
    console.log(this.$route);

  },

  async asyncData({ $axios, params }) {
    const followers = await $axios.$get('http://127.0.0.1:8000/api/profile/follower/'+params.slug)
    console.log(followers);
    return { followers }
  }
}


</script>
<style scoped>
h2{
  padding: 10px;
  color: whitesmoke;
}
h3{
  padding: 15px 50px 15px;
  color: whitesmoke;
}

p{
  padding: 20px;
  color: darkslategrey;
}

</style>
