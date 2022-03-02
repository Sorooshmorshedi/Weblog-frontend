<template>
  <div>
    <div class="search">
      <v-toolbar
        color=#e2baff
        dense
        rounded
        floating
      >
        <v-text-field
          v-model="searched"
          hide-details
          prepend-icon="mdi-account"
          single-line
        ></v-text-field>
        <NuxtLink
          :to="{ path: '/accounts/search/' + this.slug + '/?acid=' + $route.query.acid + '&' + 'search=' + this.searched}">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </NuxtLink>
      </v-toolbar>
    </div>

    <v-card
      v-for="item in items"
      md=4
      class="indigo lighten-3 mx-auto mt-3"
      max-width="800"
    >
      <v-card-title class="blue darken-4 white--text">
        <nuxt-link :to="{ path: '/profile/pins/' + item.token +'?acid='+ $route.query.acid}">
          <v-btn
            depressed
            color="primary"
          >
            see pins
          </v-btn>
        </nuxt-link>
        <v-spacer></v-spacer>
        <h1>{{ item.first_name }} {{ item.last_name }}</h1>
        <v-avatar
          color="indigo accent-1"
          size="60"
        >
          <v-img
            lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
            :src=item.profile_picture
            class="white--text align-center"
            height=auto
            width=auto
          >
          </v-img>
        </v-avatar>
      </v-card-title>
      <v-img
        lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYEG2AZWFMEjpExDUQUtJXaX175rgJi-5Ji-kSVO_wTHlBNr1AGAtaGz4P7j0qarq_Gg&usqp=CAUjpg"
        :src=item.profile_picture
        class="white--text align-center"
        height=auto
        width=auto
      >
        <v-btn
          class="mt-10 ml-3"
          v-if="item.id != id"
          @click="followacc(item)"
          absolute
          top
          color=blue
          fab
        >
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </v-img>
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
                <h2>{{ item.first_name }} {{ item.last_name }}</h2>
                <h3>{{ item.short_bio }}</h3>

                <div class="text-caption">
                  {{ item.Pronouns }}
                </div>
                <div class="text-caption">
                  {{ item.country }}
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
                <strong>{{ item.user_name }}</strong>
                <div class="text-caption">
                  {{ item.website }}
                </div>
                <div class="text-caption">
                  {{ item.email }}
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
                <nuxt-link :to="{ path: '/profile/follow/'  + item.token + '/?acid=' + $route.query.acid}">
                  <strong>Follower</strong>
                </nuxt-link>
                <div class="text-caption">
                  <nuxt-link :to="{ path: '/profile/follow/'  + item.token + '/?acid=' + $route.query.acid}">
                    <v-btn
                      fab
                      dark
                      color="indigo"
                    >
                      {{ item.followers }}
                    </v-btn>
                  </nuxt-link>
                </div>
                <nuxt-link :to="{ path: '/profile/following/' + item.token + '/?acid=' + $route.query.acid}">
                  <strong>Following</strong>
                </nuxt-link>
                <div class="text-caption">
                  <nuxt-link :to="{ path: '/profile/following/' + item.token + '/?acid=' + $route.query.acid}">
                    <v-btn
                      fab
                      dark
                      color="indigo darken-1"
                    >
                      {{ item.following }}
                    </v-btn>
                  </nuxt-link>
                </div>
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
      slug: this.$route.params.slug,
      id: this.$route.query.acid,
      searched: ' ',

    }
  },

  mounted() {
    console.log(this.slug);
    console.log(this.$route);

  },

  async asyncData({$axios, params}) {
    const items = await $axios.$get('http://127.0.0.1:8000/api/account')
    console.log(items);
    return {items}
  },
  methods: {
    followacc(item) {
      this.$axios.$post('http://127.0.0.1:8000/api/follow/', {
        following_account: item.id,
        follower_account: this.$route.query.acid,
      })
        .then(response => {
          console.log(response)
          window.alert('follow')
        }).catch(response => {
        this.unfollowacc(item)
      })
    },
    unfollowacc(item) {
      this.$axios.delete('http://127.0.0.1:8000/api/unfollow/' + this.id + '/' + item.id)
        .then(response => {
          console.log(response)
          window.alert('unfollow')
        }).catch(response => {
        this.followacc(item)
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

div.search {
  padding: 10px;
  margin: 10px;

}
</style>
