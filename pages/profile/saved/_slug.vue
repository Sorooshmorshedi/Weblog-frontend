<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="800"
    >
      <v-card
        dark
        flat
      >
        <nuxt-link to="/post">
          <v-btn
            absolute
            bottom
            color=#86b300
            right
            fab
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </nuxt-link>
        <v-card-title class="pa-2 #86b300 ">
          <v-col>
            <nuxt-link to="/setprofile">
              <v-btn
                depressed
                color="red"
              >
                edit profile
              </v-btn>
            </nuxt-link>
          </v-col>
          <h3 class="text-h6 font-weight-light text-center grow">
            Profile          </h3>
          <v-avatar>
            <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
          </v-avatar>
        </v-card-title>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        >

        </v-img>
      </v-card>
      <v-card-text class="py-0">
        <v-timeline
          align-top
          dense
        >
          <v-timeline-item
            color="yellow"
            small
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>info</strong>
              </v-col>
              <v-col>
                <strong>{{ items.first_name }} {{ items.last_name }}</strong>
                <div class="text-caption">
                  {{ items.country }}
                </div>
                <div class="text-caption">
                  {{ items.short_bio }}
                </div>

              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            color="green"
            small
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>account</strong>
              </v-col>
              <v-col>
                <strong>{{ items.user_name }}</strong>
                <div class="text-caption">
                  {{ items.website }}
                </div>
                <div class="text-caption">
                  {{ items.email }}
                </div>

              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            color="red"
            small
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>follow</strong>
              </v-col>
              <v-col>
                <strong>Follower</strong>
                <div class="text-caption">
                  {{ items.followers }}
                </div>
                <strong>Following</strong>
                <div class="text-caption">
                  {{ items.following }}

                </div>

              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            color="blue"
            medium
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>pins</strong>
              </v-col>
              <v-col>
                <nuxt-link to="/">
                  <v-btn
                    depressed
                    color="primary"
                  >
                    see pins
                  </v-btn>
                </nuxt-link>
              </v-col>

            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
export default {
  data () {
    return {

    }
  },

  mounted() {
    console.log(this.$route.params.slug);
  },

  async asyncData({ $axios }) {
    const items = await $axios.$get(`http://127.0.0.1:8000/api/account/7`)
    console.log(items);

    return { items }
  }
}


</script>
<style scoped>
h2{
  padding: 10px;
  color: whitesmoke;
}
h3{
  padding: 10px;
  color: whitesmoke;
}

p{
  padding: 20px;
  color: darkslategrey;
}

</style>
