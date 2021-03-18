<template>
  <div>
    <form v-if="form.name">
      <div class="form-group">
        <label>ユーザ名</label>
        <input v-model="form.name" type="text" class="form-control" readonly>
      </div>
      <div class="form-group">
        <textarea v-model="form.message" rows="3" class="form-control" />
      </div>
      <button @click.prevent="submit" type="submit" class="btn btn-primary">投稿</button>
    </form>
    <div>
      <a @click="logout">ユーザの切り替え</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: null,
          message: "",
        },
      }
    },
    mounted() {
      this.$fb.auth().onAuthStateChanged((user) => {
        if(user){
          this.form.name = user.displayName
        }
      })
    },
    methods: {
      async submit() {
        await this.$fb.firestore().collection("messages").add(this.form)
        this.$router.push("/")
      },
      async logout() {
        await this.$fb.auth().signOut()
        this.$router.push("/login")
      }
    }
  }
</script>

<style>
</style>
