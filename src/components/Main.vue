<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-12" v-for="card in cards" :key="card.id">
        <img class="img-thumbnail" :src="card.face_image_url" @click="showCard(card)">
        <p>{{ card.upright.toUpperCase() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      cards: [],
      error: ""
    };
  },
  created() {
    this.getThreeRandomCards();
  },
  methods: {
    getThreeRandomCards() {
      this.$http.plain
        .get("/spreads/three_cards")
        .then(response => {
          this.cards = response.data;
        })
        .catch(error => this.setError(error, "The Server Did Not Respond"));
    },
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    showCard(card) {
      this.$router.push(`/card/${card.id}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
