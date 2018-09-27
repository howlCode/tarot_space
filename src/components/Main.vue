<template>
  <div class="container">
    <div class="row card-container">
      <div class="col-md-12 cross-section-1"></div>
      <div class="col-md-12 cross-section-2"></div>
      <div class="col-md-12 cross-section-3"></div>
      <div class="col-md-4 col-sm-12">
        <h1 class="welcome">Welcome to Tarot Space</h1>
      </div>
      <div class="col-md-8 col-sm-12" v-for="card in cards" :key="card.id">
        <img class="card-img" :src="card.face_image_url" @click="showCard(card)">
        <p class="keywords">{{ card.upright }}</p>
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
    this.getRandomCard();
    setInterval(this.getRandomCard, 3000);
  },
  methods: {
    getRandomCard() {
      this.$http.plain
        .get("/spreads/random_card")
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
.card-container {
  margin-top: 80px;
}
.welcome {
  font-family: "IM Fell English SC", serif;
  font-size: 4rem;
  color: #fff;
  margin-bottom: 50px;
  text-shadow: 5px 10px rgba(100, 39, 39, 0.2);
}
.img-thumbnail {
  border-radius: 5%;
}
.card-img {
  height: 500px;
  width: 300px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
}
.keywords {
  margin-top: 10px;
  font-size: 2rem;
  text-transform: capitalize;
  color: #fff;
  text-shadow: 3px 5px rgba(100, 39, 39, 0.2);
}
.cross-section-1 {
  position: absolute;
  top: 100px;
  height: 340px;
  width: 80%;
  background-color: #69b578;
  z-index: -1;
  transform: rotate(-5deg);
}

.cross-section-2 {
  position: absolute;
  top: 540px;
  height: 340px;
  width: 80%;
  background-color: #69b578;
  z-index: -1;
  transform: rotate(5deg);
}

.cross-section-3 {
  position: absolute;
  top: 980px;
  height: 340px;
  width: 80%;
  background-color: #69b578;
  z-index: -1;
  transform: rotate(-5deg);
}
</style>
