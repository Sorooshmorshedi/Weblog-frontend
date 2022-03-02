<template>
  <v-card
    class="indigo lighten-1 justify-center ma-5"
    dark
  >
    <v-toolbar
      flat
      color=#23228c
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        Profile Setting
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <input id="image-upload" type="file" ref="file" @change="uploadFile" />
    </v-card-text>


    <v-card-text>
      <v-text-field
        v-model = "user_name"
        color="black"
        label="profile name"
      ></v-text-field>
    </v-card-text>


    <v-card-text>
      <v-text-field
        v-model = "f_name"
        color="white"
        label="First name"
      ></v-text-field>
    </v-card-text>
    <v-card-text>

      <v-text-field
        v-model = "l_name"
        color="white"
        label="Last name"
      ></v-text-field>
    </v-card-text>

    <v-card-text>
      <v-text-field
        v-model = "country"
        color="white"
        label="country"
      ></v-text-field>
    </v-card-text>


    <v-card-text>
      <v-text-field
        v-model = "website"
        color="white"
        label="website"
      ></v-text-field>
    </v-card-text>

    <v-card-text>
      <v-textarea
        v-model="short_bio"
        filled
        auto-grow
        label="short bio"
        rows="4"
        row-height="40"
        shaped
      ></v-textarea>
    </v-card-text>

    <v-card-text>
      <v-radio-group
        v-model="Pronouns"
        row
      > Pronouns
        <v-spacer></v-spacer>
        <v-radio
          label="he/him"
          value="he"
        ></v-radio>
        <v-radio
          label="she/her"
          value="hr"
        ></v-radio>
        <v-radio
          label="they/them"
          value="ty"
        ></v-radio>
      </v-radio-group>
    </v-card-text>

    <v-card-text>
      <v-checkbox
        v-model="business_account"
        label="business account"
        required
      ></v-checkbox>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color=#59981A
        @click="editAcc"
      >
        create account
      </v-btn>
    </v-card-actions>
  </v-card>

</template>


<script>
export default {
  name: 'create account',
  data () {
    return {
      user: this.$route.query.acid,
      business_account: false,
      user_name: '',
      f_name: '',
      l_name: '',
      country: '',
      website: '',
      Pronouns: '',
      pic: null,
      short_bio: '',
      data: '',
      file: null,


    }
  },
  methods: {
    uploadFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file)
      console.log(this.$refs.file.files[0])
    },

    editAcc() {
      const formData = new FormData()
      formData.append("user", this.user);
      formData.append("user_name", this.user_name);
      formData.append("country", this.country);
      formData.append("first_name", this.f_name);
      formData.append("last_name", this.l_name);
      formData.append('profile_picture', this.file)
      formData.append("short_bio", this.short_bio);
      formData.append("username", this.user);
      formData.append("website", this.website);
      this.data = formData
      console.log(this.data)
      this.$axios.$post('http://127.0.0.1:8000/api/account' , this.data)
        .then(response => {
          console.log(response)
          window.alert('account edited')
          window.location.href = "http://127.0.0.1:3000/profile/"+response.token + "?acid=" + response.id;
        }).catch(response => { window.alert('pick a image for your profile')})
    }
  }
}
</script>
<style>

</style>
