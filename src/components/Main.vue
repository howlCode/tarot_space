<template>
  <div class="container">
    <div v-if="loading" class="col-md8">Loading...</div>
    <transition appear enter-active-class="animated fadeIn">
    <div class="row card-container">
      <div class="col-md-6 col-sm-12">
        <h1 class="welcome">Welcome to Tarot Space</h1>
        <h1 v-if="error" class="text-center">{{ error }}</h1>
        <div class="row">
          <div class="col-md-12">
              <button @click="threeCardSpread" type="button" class="btn btn-lg main-btn">Three Card Spread</button>
          </div>
          <div class="col-md-12">
              <button @click="celticCrossSpread" type="button" class="btn btn-lg main-btn">Celtic Cross Spread</button>
          </div>
          <div class="col-md-12">
              <button @click="allCards" type="button" class="btn btn-lg main-btn">Explore The Cards</button>
          </div>
        </div>
      </div>
      <transition appear enter-active-class="animated fadeIn">
      <div class="col-md-6 col-sm-12">
        <img class="card-img hover-cursor" :src="currentCard.face_image_url" @click="showCard(currentCard)">
        <p class="keywords">{{ currentCard.upright }}</p>
      </div>
      </transition>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      cards: [],
      currentCard: [],
      loading: true,
      error: ""
    };
  },
  created() {
    this.getCards();
    setInterval(this.getRandomCard, 3000);
  },
  methods: {
    getCards() {
      this.$http.plain
        .get("/cards")
        .then(response => {
          this.cards = response.data;
          this.getRandomCard();
          this.loading = false;
        })
        .catch(error => this.setError(error, "The Server Did Not Respond"));
    },
    getRandomCard() {
      this.currentCard = this.cards[
        Math.floor(Math.random() * this.cards.length)
      ];
    },
    threeCardSpread() {
      this.$router.push("/spreads/three-card-spread");
    },
    celticCrossSpread() {
      this.$router.push("/spreads/celtic-cross-spread");
    },
    allCards() {
      this.$router.push("/spreads/all-cards");
    },
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    showCard(card) {
      this.$router.push(`/cards/${card.id}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
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
  font-family: "IM Fell English SC", serif;
}
.hover-cursor:hover {
  cursor: pointer;
}
.main-btn {
  width: 300px;
  margin: 20px;
  background-color: #95b9cf;
  color: #fff;
  font-family: "IM Fell English SC", serif;
  box-shadow: 5px 8px rgba(0, 0, 0, 0.2);
  font-size: 2rem;
}
.main-btn:hover {
  background-color: #6fa3c4;
}
</style>
