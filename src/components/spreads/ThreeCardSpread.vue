<template>
  <div class="container">
    <h1 v-if="error" class="text-center">{{ error }}</h1>
    <transition appear enter-active-class="animated fadeIn">
    <div class="row">
      <div v-if="showQueryContainer" class="col-md-12">
        <transition appear enter-active-class="animated fadeIn" after-enter-class="animated fadeOut">
          <h1 class="query text-center">Consider Your Query for A Moment</h1>
        </transition>
      </div>
      <div v-if="showQueryContainer" class="ready-button-container">
        <transition appear enter-active-class="animated fadeIn" after-enter-class="animated fadeOut">
          <button @click="revealCards" class="btn btn-large btn-ready">Click Here When Ready</button>
        </transition>
      </div>
      <div v-if="cards" class="col-md-4 col-sm-12 card-container" v-for="card in cards" :key="card.id">
        <img :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name">
        <p class="keywords">{{ keywords(card) }}</p>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ThreeCardSpread",
  data() {
    return {
      cards: "",
      error: "",
      showQueryContainer: true
    };
  },
  methods: {
    revealCards() {
      this.$http.plain
        .get("/spreads/three_cards")
        .then(response => {
          this.cards = response.data;
          this.cards.map(card => {
            let alignment = ["upright", "reversed"];
            card.align =
              alignment[Math.floor(Math.random() * alignment.length)];
          });
        })
        .catch(error => this.setError(error, "The Server Did Not Respond"));
      this.showQueryContainer = false;
    },
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    imgAlign(card) {
      if (card.align === "upright") {
        return "card-img";
      } else {
        return "card-img-reverse";
      }
    },
    keywords(card) {
      if (card.align === "upright") {
        return `${card.upright}`;
      } else {
        return `${card.reversed}`;
      }
    }
  }
};
</script>

<style scoped>
* {
  color: #fff;
  font-family: "IM Fell English SC", serif;
}
.query {
  margin-top: 60px;
}
.fadeIn {
  animation-duration: 3s;
}
.ready-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
.btn-ready {
  width: 400px;
  margin: 10px;
  margin-top: 50px;
  background-color: #95b9cf;
  color: #fff;
  box-shadow: 5px 8px rgba(0, 0, 0, 0.2);
  font-size: 2rem;
}
.card-container {
  margin-top: 80px;
}
.card-img {
  height: 500px;
  width: 300px;
  margin: 0 10px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
}
.card-img-reverse {
  height: 500px;
  width: 300px;
  margin: 0 10px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
  transform: rotate(180deg);
}
.keywords {
  margin-top: 10px;
  font-size: 1.7rem;
  text-transform: capitalize;
  color: #fff;
  text-shadow: 3px 5px rgba(100, 39, 39, 0.2);
}
</style>
