<template>
  <div>
    <v-container fluid v-for="pin in items">

      <v-row justify="center">

        <v-col

          :key="pin.id"
          :cols=6
        >

          <v-card class="purple lighten-3 ">
            <h2>
              <v-avatar
                color="purple"
                size="35"
              >
                <v-img
                  lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                  :src=pin.pro_pic
                  class="white--text align-center ma-4"
                  height=auto
                  width=auto
                ></v-img>
              </v-avatar>
              {{ pin.user_name }}
              <v-btn @click="unsave(pin)" class="ml-16"><v-icon>mdi-archive-remove-outline</v-icon></v-btn>

            </h2>
            <v-icon class="ma-1 ">
              mdi-eye-check-outline
            </v-icon>
            {{ pin.seens_count }}

            <v-img
              lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"

              :src=pin.image
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="auto"
              width="auto"
            >
            </v-img>
            <h2>{{ pin.title }}</h2>
            <h3>{{ pin.about_text }}</h3>
            <p>{{ pin.alt_text }}</p>

            <v-card-actions>

              <v-text-field
                v-model:light="cm"
                placeholder="comment"
                filled
                rounded
                dense
              ></v-text-field>


              <v-btn
                @click="cmPin(pin)"
                class="mx-2"
                fab
                dark
                small
                color="primary"
              >
                {{ pin.comments_count }}

                <v-icon dark>
                  mdi-send
                </v-icon>
              </v-btn>

              <v-btn
                @click="likePin(pin)"
                class="mx-2"
                fab
                dark
                small
                color="green"
              >
                {{ pin.likes_count }}

                <v-icon dark>
                  mdi-thumb-up
                </v-icon>
              </v-btn>

              <v-btn
                @click="disslikePin(pin)"
                class="mx-2"
                fab
                dark
                small
                color="red"
              >
                {{ pin.likes_count }}

                <v-icon dark>
                  mdi-thumb-down
                </v-icon>
              </v-btn>


              <v-btn
                @click="savePin(pin)"
                class="mx-2"
                fab
                dark
                small
                color="purple"
              >
                <v-icon dark>
                  mdi-archive
                </v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <nuxt-link
                :to="{ path: '/post/likes/' + $route.params.slug + '/?acid=' + $route.query.acid + '&' + 'pin=' + pin.id}">
                <v-btn
                  class="mx-2"
                  dark
                  small
                  color="purple"
                > see Likes
                </v-btn>
              </nuxt-link>
              <nuxt-link
                :to="{ path: '/post/comments/' + $route.params.slug + '/?acid=' + $route.query.acid + '&' + 'pin=' + pin.id}">
                <v-btn
                  class="mx-2"
                  dark
                  small
                  color="purple"
                >see Comments
                </v-btn>
              </nuxt-link>


            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    </v-card>


  </div>
</template>


<script>
export default {
  async asyncData({ $axios, params }) {
    const items = await $axios.$get("http://127.0.0.1:8000/api/account/saved/"+params.slug)
    console.log(items)
    return { items }
  },
  data() {
    return {
      newpins: '',
      oldpins: '',
      repcm: '',
      cm: '',
      slug: this.$route.params.slug,
      comments: null,
      likes: null,
      myid: this.$route.query.acid,
      replays: null,

    }
  },
  beforeMount() {
    this.$axios.$get('http://127.0.0.1:8000/api/newpin/' + this.slug)
      .then(response => {
        console.log(response)
        console.log('ok')
        this.newpins = response
      })
    this.$axios.$get('http://127.0.0.1:8000/api/oldpin/' + this.slug)
      .then(response => {
        console.log(response)
        console.log('ok')
        this.oldpins = response
      })

  },
  mounted() {
    this.$axios.$get('http://127.0.0.1:8000/api/seened/' + this.slug)
  },


  methods: {
    seen(pin) {
      this.$axios.$post('http://127.0.0.1:8000/api/seen', {
        account: parseInt(this.$route.query.acid),
        pin: pin.id,
      })
        .then(response => {
          console.log(response)
          console.log('ok')
        })
    },

    savePin(pin) {
      this.$axios.$post('http://127.0.0.1:8000/api/saved/', {
        account: this.$route.query.acid,
        pin: pin.id,
      })
        .then(response => {
          console.log(response)
          window.alert('pin saved')
        }).catch(response => {
        window.alert('you cant save a post twise!')
      })
    },
    likePin(pin) {
      this.$axios.$post('http://127.0.0.1:8000/api/like/', {
        account: this.$route.query.acid,
        pin: pin.id,
      })
        .then(response => {
          console.log(response)
          window.alert('pin like')
        }).catch(response => {
        window.alert('you cant like a post twise!')
      })
    },
    disslikePin(pin) {
      this.$axios.$delete('http://127.0.0.1:8000/api/dislike/' + pin.id + '/' + this.$route.query.acid + '/')
        .then(response => {
          console.log(response)
          window.alert('pin unlike')
        }).catch(response => {
        window.alert('you dont like this pin!')
      })
    },

    seecomments(pin) {
      this.$axios.$get('http://127.0.0.1:8000/api/pin/comments' + pin.id)
        .then(response => {
          console.log(response)
          this.comments = response
        })
    },

    deleteComment(comment) {
      this.$axios.$delete('http://127.0.0.1:8000/api/comment/' + comment.id)
        .then(response => {
          console.log(response)
          window.alert('comment deleted')
          window.location.href = "http://127.0.0.1:3000/" + this.slug + "?acid=" + this.myid;

        })
    },

    seelikes(pin) {
      this.$axios.$get('http://127.0.0.1:8000/api/pin/likes/' + pin.id)
        .then(response => {
          console.log(response)
          this.likes = response
        })
    },
    seerep(comment) {
      this.$axios.$get('http://127.0.0.1:8000/api/comment/replay/' + comment.id)
        .then(response => {
          console.log(response)
          this.replays = response
        })
    },


    cmPin(pin) {
      this.$axios.$post('http://127.0.0.1:8000/api/comment/', {
        account: this.$route.query.acid,
        pin: pin.id,
        comment_text: this.cm,
      })
        .then(response => {
          console.log(response)
          window.alert('comment sent')
        }).catch(response => {
        window.alert('you cant send blank comment')
      })
    },
    replayCm(comment) {
      this.$axios.$post('http://127.0.0.1:8000/api/comment/', {
        account: this.$route.query.acid,
        reply: comment.id,
      })
        .then(response => {
          console.log(this.replays)
          window.alert('comment sent')
        }).catch(response => {
        window.alert('you cant send blank comment')
      })
    },
    unsave(pin) {
      this.$axios.$delete('http://127.0.0.1:8000/api/unsave/' + pin.id + '/' + this.myid)
        .then(response => {
          console.log(response)
          window.alert('pin unsaved')
          window.location.href = "http://127.0.0.1:3000/profile/saved/" + this.slug + "?acid=" + this.myid;
        }).catch(response => {
        window.alert('you already saved this post!!')
      })
    }

  }
}

</script>
<style scoped>
h2 {
  padding: 10px;
  color: midnightblue;
}

h4 {
  padding: 10px;
  color: whitesmoke;
}

h3 {
  padding: 20px;
  color: #b8003d;
}

p {
  padding: 20px;
  color: darkslateblue;
}

</style>

