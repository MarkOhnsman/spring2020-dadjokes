<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to Your Vue.js App</h1>
    <form v-if="$auth.isAuthenticated" @submit.prevent="addJoke">
      <input type="text" name="joke" v-model="joke.body" />
      <button class="btn btn-info" type="submit">HAHA!</button>
    </form>
    <div v-for="j in jokes" :key="j.id">
      <div class="card">
        <div class="card-header d-flex">
          <h4>Joke</h4>
          <button
            class="btn btn-warning"
            @click="editJoke(j)"
            v-if="j.creator.id == profile.id"
          >
            Edit
          </button>
          <button
            class="btn btn-danger"
            @click="deleteJoke(j)"
            v-if="j.creator.id == profile.id"
          >
            DELETE
          </button>
        </div>
        <div class="card-body">
          <form v-if="editing && j.id == jokeToEdit.id">
            <input type="text" name="joke" v-model="jokeToEdit.body" />
            <button class="btn btn-info" type="submit">HAHA!</button>
          </form>
          <blockquote v-else class="blockquote mb-0">
            <p>
              {{ j.body }}
            </p>
            <footer class="blockquote-footer">
              <cite title="Source Title">{{ j.creator.name }}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getJokes");
  },
  data() {
    return {
      joke: {
        body: ""
      },
      editing: false,
      jokeToEdit: {}
    };
  },
  computed: {
    jokes() {
      return this.$store.state.jokes;
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    addJoke() {
      this.$store.dispatch("addJoke", this.joke);
    },
    editJoke(joke) {
      this.editing = true;
      this.jokeToEdit = joke;
    },
    deleteJoke(joke) {}
  }
};
</script>
