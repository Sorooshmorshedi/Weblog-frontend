<template>
  <div>
    <v-card
      class="indigo lighten-3 mx-auto ma-4 pa-1 "
      rounded
      max-width="800"
    >

      <v-card
        dark
        flat
      >
        <nuxt-link :to="{ path: '/post/' + this.slug + '?acid='+ items[0].id}">
          <v-btn
            absolute
            large
            dark
            bottom
            color='blue darken-4'
            right
            fab
          >
            <v-icon>mdi-folder-plus-outline</v-icon>
          </v-btn>
        </nuxt-link>
        <v-card-title class=" blue darken-4 ">
          <v-col>
            <nuxt-link :to="{ path: '/setprofile/' + this.slug + '?acid=' + myid}">
              <v-btn
                fab
                color="red darken-2"
              >
                <v-icon>mdi-account-edit-outline</v-icon>
              </v-btn>
            </nuxt-link>
            <v-btn
              color="red darken-4"
              fab
              dark
              @click.stop="dialog = true"
            >
              <v-icon>mdi-account-remove-outline</v-icon>
            </v-btn>

            <v-dialog
              v-model="dialog"
              max-width="290"
            >
              <v-card color="red lighten-3">
                <v-card-title class="text-h5">
                  Delete this account?
                </v-card-title>

                <v-card-text>
                  all your pins and information will be lost but
                  your user will not be deleted and you can come back any time, login and create another profile
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                  >
                    cancell
                  </v-btn>

                  <v-btn
                    color="red darken-1"
                    text
                    @click="dialog = false , deleteAcc(items[0])"
                  >
                    delete account
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </v-col>
          <h2>{{ items[0].first_name }} {{ items[0].last_name }}</h2>
          <v-avatar
            color="green"
            size="50"
          >
            <v-img
              lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"

              :src=items[0].profile_picture
              class="white--text align-center ma-4"
              height=auto
              width=auto
            >
            </v-img>
          </v-avatar>
        </v-card-title>
        <v-img
          lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYEG2AZWFMEjpExDUQUtJXaX175rgJi-5Ji-kSVO_wTHlBNr1AGAtaGz4P7j0qarq_Gg&usqp=CAUjpg"
          :src=items[0].profile_picture
          class="white--text align-center"
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
            color="indigo lighten-1"
            small
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>info</strong>
              </v-col>
              <v-col>
                <h2>{{ items[0].first_name }} {{ items[0].last_name }}</h2>
                <h3>{{ items[0].short_bio }}</h3>

                <div class="text-caption">
                  {{ items[0].Pronouns }}
                </div>
                <div class="text-caption">
                  {{ items[0].country }}
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item
            color="indigo darken-1"
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
            color="indigo darken-3"
            small
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>follow</strong>
              </v-col>
              <v-col>
                <nuxt-link :to="{ path: '/profile/follow/'  + items[0].token + '/?acid=' + $route.query.acid}">
                  <strong>Follower</strong>
                </nuxt-link>
                <div class="text-caption">
                  <nuxt-link :to="{ path: '/profile/follow/'  + items[0].token + '/?acid=' + $route.query.acid}">
                    <v-btn
                      fab
                      dark
                      color="indigo"
                    >
                      {{ items[0].followers }}
                    </v-btn>
                  </nuxt-link>
                </div>
                <nuxt-link :to="{ path: '/profile/following/' + items[0].token + '/?acid=' + $route.query.acid}">
                  <strong>Following</strong>
                </nuxt-link>
                <div class="text-caption">
                  <nuxt-link :to="{ path: '/profile/following/' + items[0].token + '/?acid=' + $route.query.acid}">
                    <v-btn
                      fab
                      dark
                      color="indigo darken-1"
                    >
                      {{ items[0].following }}
                    </v-btn>
                  </nuxt-link>
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
  data() {
    return {
      dialog: false,
      slug: this.$route.params.slug,
      myid: this.$route.query.acid
    }
  },

  mounted() {
    console.log(this.slug);
    console.log(this.$route);

  },

  async asyncData({$axios, params}) {
    const items = await $axios.$get('http://127.0.0.1:8000/api/account/' + params.slug)
    console.log(items);
    return {items}
  },


  methods: {
    deleteAcc(items) {
      this.$axios.$delete('http://127.0.0.1:8000/api/account/' + items.token)
        .then(response => {
          console.log(response)
          window.alert('account deleted')
          window.location.href = 'http://127.0.0.1:3000'
        })
    }
  }
}


</script>
<style scoped>
h3 {
  color: #d1155a;
  padding-top: 10px;
}

</style>
