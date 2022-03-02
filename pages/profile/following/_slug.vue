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
        <v-card class="elevation-3" color=#4a1928 height="auto">
          <v-img
            class="rounded"
            contain
            src="https://www.ddesignerr.com/wp-content/uploads/2014/09/C-fox-Logo2.png"
          > <h1 class="imagetitle">following</h1></v-img>
          <v-card
            class='ma-2'
            v-for="followig in followings"
            color=#5c2134
          >

            <h3>
              <v-avatar color="#5c2134" class="">
                <v-img
                  lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                  :src=followig.following_pic
                  class="white--text "
                  height=auto
                  width=auto
                ></v-img>
              </v-avatar>
              following {{ followig.following_user }}
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
    const followings = await $axios.$get('http://127.0.0.1:8000/api/profile/following/' + params.slug)
    console.log(followings);
    return {followings}
  }
}


</script>
<style scoped>
h2 {
  padding: 10px;
  color: whitesmoke;
}

h3 {
  padding: 15px 50px 15px;
  color: whitesmoke;
}

p {
  padding: 20px;
  color: darkslategrey;
}
h1.imagetitle{
  color: darkorange;
  padding: 10px;
}
</style>
