<template>
  <v-card
    class="indigo lighten-1 mt-5 overflow-hidden justify-center"
    color=#59886B
    dark
    height="1000px"
    width="auto"
  >

    <v-toolbar
      flat
      color=#23228c
    >
      <v-toolbar-title class=" font-weight-light">
        Post a pin
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        v-model = "title"
        color="white"
        label="title"
      ></v-text-field>
    </v-card-text>

    <v-card-text>
      profile pic :
      <input id="image-upload" type="file" ref="file" @change="uploadFile" />
    </v-card-text>

    <v-card-text>
      <v-file-input
        v-model:light="video"
        label="video"
        filled
        prepend-icon="mdi-camera"
      ></v-file-input>
    </v-card-text>

    <v-card-text>
      <v-textarea
        v-model="about_text"
        filled
        auto-grow
        label="about text"
        rows="4"
        row-height="20"
        shaped
      ></v-textarea>
    </v-card-text>

    <v-card-text>
      <v-text-field
        v-model = "alt_text"
        color="white"
        label="alt text"
      ></v-text-field>
    </v-card-text>

    <v-card-text>
      <v-text-field
        v-model = "destination_link"
        color="white"
        label="destination link"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <NuxtLink :to="{ path: '/profile/' + this.slug}">
        <v-btn
          class="ma-2"
          color="red"
        >
          discard
        </v-btn>
      </NuxtLink>

      <v-btn
        color=#59981A
        @click="createPost"
      >
        post
      </v-btn>
    </v-card-actions>
  </v-card>

</template>


<script>
export default {
  name: 'signPage',
  data () {
    return {
      data : '',
      slug : this.$route.params.slug,
      title: '',
      file: null,
      video: null,
      about_text: '',
      alt_text: '',
      destination_link: '',
    }
  },
  mounted() {
    console.log(this.slug);
    console.log(this.$route.query.acid);

  },

  methods: {
    uploadFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file)
      console.log(this.$refs.file.files[0])
    },

    createPost() {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append("title", this.title);
      formData.append("account", this.$route.query.acid);
      formData.append("image", this.file);
      formData.append("about_text", this.about_text);
      formData.append("alt_text", this.alt_text);
      this.data = formData
      this.$axios.$post('http://127.0.0.1:8000/api/pin/', this.data)
        .then(response => {
          console.log(response)
          window.alert('post created')
          window.location.href = "http://127.0.0.1:3000/profile/" + this.$route.params.slug + '/?acid=' + this.$route.query.acid
        }).catch(response => { window.alert('pick a image for post')})
    },
  }



}

</script>
<style scoped>
#app {
  text-align: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {

}
</style>
