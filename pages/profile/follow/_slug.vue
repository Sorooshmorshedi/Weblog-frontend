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
        <nuxt-link :to="{ path: '/post/' + this.slug, query: { acid: items[0].id }} ">
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
            <nuxt-link :to="{ path: '/setprofile/' + this.slug}">
              <v-btn
                depressed
                color="red"
              >
                Edit profile
              </v-btn>
            </nuxt-link>
            <NuxtLink :to="{ path: '/' + this.slug +'?acid='+ items[0].id}">
              <v-btn
                class="ma-2"
                color="green"
              >
                back to home
              </v-btn>
            </NuxtLink>
          </v-col>
          <h2>{{ items[0].first_name }} {{ items[0].last_name }}</h2>
          <v-avatar
            color="green"
            size="35"
          >
            <v-img
              lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"

              :src= items[0].profile_picture
              class="white--text align-center"
              gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
              height=auto
              width=auto
            >
            </v-img>
          </v-avatar>
        </v-card-title>
        <v-img
          lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYEG2AZWFMEjpExDUQUtJXaX175rgJi-5Ji-kSVO_wTHlBNr1AGAtaGz4P7j0qarq_Gg&usqp=CAUjpg"
          :src= items[0].profile_picture
          class="white--text align-center"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
          height=auto
          width=auto
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
                <strong>{{ items[0].first_name }} {{ items[0].last_name }}</strong>
                <div class="text-caption">
                  {{ items[0].country }}
                </div>
                <div class="text-caption">
                  {{ items[0].Pronouns }}
                </div>

                <div class="text-caption">
                  {{ items[0].short_bio }}
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
                <strong>{{ items[0].user_name }}</strong>
                <div class="text-caption">
                  {{ items[0].website }}
                </div>
                <div class="text-caption">
                  {{ items[0].email }}
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
                  {{ items[0].followers }}
                </div>
                <strong>Following</strong>
                <div class="text-caption">
                  {{ items[0].following }}

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
                <nuxt-link :to="{ path: '/profile/pins/' + this.slug +'?acid='+ items[0].id}">
                  <v-btn
                    depressed
                    color="primary"
                  >
                    see pins
                  </v-btn>
                </nuxt-link>
                <nuxt-link :to="{ path: '/profile/saved/' + this.slug +'?acid='+ items[0].id}">
                  <v-btn
                    depressed
                    color="purple"
                  >
                    saved pins
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
      slug : this.$route.params.slug
    }
  },

  mounted() {
    console.log(this.slug);
    console.log(this.$route);

  },

  async asyncData({ $axios, params }) {
    const items = await $axios.$get('http://127.0.0.1:8000/api/account/'+params.slug)
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
