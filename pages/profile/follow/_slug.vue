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
        <v-card class="elevation-3" color=#2e136e height="auto">
          <v-img
            contain
            src="https://digitalsynopsis.com/wp-content/uploads/2019/04/beautiful-gradient-logo-designs-21.jpg"
          >
            <h1 class="imagetitle">followers</h1></v-img>

          </v-img>
          <v-card class='pa-1 ma-1'
                  v-for="follower in followers"
                  color=#5325c2

          >

            <h3>
              <v-avatar color="#5c2134">
                <v-img
                  lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                  :src=follower.follower_pic
                  class="white--text align-center"
                  height=auto
                  width=auto
                ></v-img>
              </v-avatar>
              followed by {{ follower.follower_user }}
            </h3>
          </v-card>

        </v-card>
      </v-col>
    </v-row>

  </div>
</template>


<script>
export default {
  data() {
    return {
      slug: this.$route.params.slug
    }
  },

  mounted() {
    console.log(this.slug);
    console.log(this.$route);

  },

  async asyncData({$axios, params}) {
    const followers = await $axios.$get('http://127.0.0.1:8000/api/profile/follower/' + params.slug)
    console.log(followers);
    return {followers}
  }
}


</script>
<style scoped>
h2 {
  padding: 10px;
  color: whitesmoke;
}

h3 {
  padding: 10px 40px 10px;
  color: whitesmoke;
}

p {
  padding: 20px;
  color: darkslategrey;
}
h1.imagetitle {
  color: palegreen;
  padding: 10px;

}
</style>
