<template>
  <div>
    <v-row class="mt-md-8">
      <v-col
        cols="12"
        md="4"
        class="d-flex order-1 order-md-0 flex-row flex-md-column  justify-md-center align-right pr-8"
      >
      </v-col>
      <v-card class="elevation-3 pa-3" color=#732a40 height="1000px" width="700px">
        <v-sheet
          v-for="comment in comments"
          :rounded="rounded"
          class=" ma-2  pa-2 align-center justify-md-center"
          height="auto"
          color=#3b1c25
          width="670"

        >
          <h3>
            <v-avatar color="red">
              <v-img
                lazy-src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                :src=comment.pro_pic
                class="white--text align-center"
                height=auto
                width=auto
              ></v-img>
            </v-avatar>
            comment by
            {{ comment.user_name }}
            <v-btn
              v-if="id == comment.account"
              @click="deleteComment(comment)"
              elevation="1"
              class="ml-15 red"
              right
              icon
              dark
              small
              text
            >
              <v-icon small>mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-dialog
              v-model="dialog1"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="id == comment.account"
                  @click="setcmid(comment)"
                  elevation="1"
                  class="ml-2 red"
                  right
                  icon
                  dark
                  small
                  text
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">edit comment</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="edited"
                          label="comment"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*comment is required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog1 = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="editComment(comment)"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </h3>
          <p>{{ comment.comment_text }}</p>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="setcmid(comment)"
                text
                elevation="1"
                class="ml-2 "
                dark
                small
                v-bind="attrs"
                v-on="on"
              >
                replay
              </v-btn>

            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">replay</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="rep"
                        label="replay comment"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*comment is required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="replayCm(comment)"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <nuxt-link :to="{ path: '/post/comments/replays/' + $route.params.slug + '/?acid=' + $route.query.acid + '&com=' + comment.id}">
            <v-btn
              text
              elevation="1"
              class="ml-2 "
              dark
              small
            >
              see replays
            </v-btn>
          </nuxt-link>

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
      edited:'',
      comment:'',
      cmid: '',
      slug: this.$route.params.slug,
      id: this.$route.query.acid,
      dialog: false,
      dialog1: false,
      rep: '',
      comments: '',
      pin : this.$route.query.pin

    }
  },

  mounted() {
    console.log(this.id)
    this.$axios.$get('http://127.0.0.1:8000/api/pin/comments/' + this.pin)
      .then(response => {
        console.log(response)
        this.comments = response
      })
  },

  methods: {
    setcmid(comment) {
      this.cmid = comment.id;
      console.log(this.cmid)
    },

    editComment(comment) {
      this.$axios.put('http://127.0.0.1:8000/api/comment/' + this.cmid + '/', {
        account: this.id,
        pin: comment.pin,
        comment_text: this.edited,
      })
        .then(response => {
          console.log(response)
          window.alert('comment edited')
          window.location.href = "http://127.0.0.1:3000/post/comments/" + this.slug + "?acid=" + this.id + '&pin=' + this.pin;
        })
    },

    deleteComment(comment) {
      this.$axios.$delete('http://127.0.0.1:8000/api/comment/' + comment.id)
        .then(response => {
          console.log(comment.id)
          console.log(response)
          window.alert('comment deleted')
          window.location.href = "http://127.0.0.1:3000/post/comments/" + this.slug + "?acid=" + this.id + '&pin=' + this.pin;

        })
    },

    replayCm(comment) {
      this.$axios.$post('http://127.0.0.1:8000/api/comment/', {
        account: this.$route.query.acid,
        reply: this.cmid,
        comment_text: this.rep
      })
        .then(response => {
          console.log(this.replays)
          window.alert('replay sent')
        }).catch(response => {
        window.alert('you cant send blank comment')
      })
    }
  }

}


</script>
<style scoped>
h3 {
  color: #ff2b39;
  margin-left: 10px;
}

p {
  color: seashell;
  padding-left: 60px;
}


</style>
