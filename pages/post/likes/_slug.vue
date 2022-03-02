<template>
  <div>
    <v-row class="mt-md-8">
      <v-col
        cols="12"
        md="4"
        class="d-flex order-1 order-md-0 flex-row flex-md-column  justify-md-center align-right pr-8"
      >
      </v-col>
      <v-card class="elevation-3 pa-3" color=#732a40 height="1000px" width="350px">
        <v-sheet
          v-for="like in likess"
          :rounded="rounded"
          class="-column pa-1  pl-6 align-center justify-md-center"
          height="60"
          color=#3b1c25
          width="320"
        >
          <h3>
            <v-avatar color="red">
              <v-img
                lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                :src=like.pro_pic
                class="white--text align-center ma-4"
                height=auto
                width=auto
              ></v-img>
            </v-avatar>
            liked by
            {{ like.user_name }}
          </h3>
        </v-sheet>

      </v-card>
      </v-col>
    </v-row>

  </div>
</template>


<script>
export default {
  data() {
    return {
      slug: this.$route.params.slug,
      id: this.$route.query.acid,
      pin: this.$route.query.pin,
      likess: ''
    }
  },


  mounted() {
    console.log(this.id)
    console.log(this.pin)

    this.$axios.$get('http://127.0.0.1:8000/api/pin/likes/' + this.pin)
      .then(response => {
        console.log(response)
        console.log('ok')
        this.likess = response
      })
  }
}

</script>
<style scoped>
h3 {
  color: #ff2b39;
  margin-left: 10px;

}
</style>
