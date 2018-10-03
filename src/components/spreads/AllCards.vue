<template>
  <div class="container">
    <div class="row card-container">
      <h1 v-if="error" class="text-center">{{ error }}</h1>
        <div v-if="loading" class="col-md-12"><p>Loading the deck...</p></div>
        <div class="col-md-12"><button @click="mainPage()" class="btn-back">Back</button></div>
        <div v-if="cards" class="col-lg-2 col-md-3 col-sm-6 col-xs-12" v-for="card in cards" :key="card.id">
          <transition appear enter-active-class="animated zoomIn" after-enter-class="animated fadeOut">
            <img @click="showCard(card)" class="card-img" :src="card.face_image_url" :alt="card.name">
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "AllCards",
  data() {
    return {
      cards: [],
      error: "",
      loading: true
    };
  },
  created() {
    this.$http.plain
      .get("/cards")
      .then(response => {
        this.cards = response.data;
      })
      .catch(error => this.setError(error, "The Server Did Not Respond"));
    this.loading = false;
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    mainPage() {
      this.$router.push("/");
    },
    showCard(card) {
      this.$router.push(`/cards/${card.id}`);
    }
  }
};
</script>

<style scoped>
* {
  color: #fff;
  font-family: "IM Fell English SC", serif;
}
.card-container {
  margin-top: 20px;
}
.card-img {
  height: 300px;
  width: 175px;
  margin: 10px 10px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s ease;
}
.card-img:hover {
  cursor: pointer;
  opacity: 0.8;
  transform: scale(1.05, 1.05);
}
.btn-back {
  background-color: #95b9cf;
  color: #fff;
  box-shadow: 5px 8px rgba(0, 0, 0, 0.2);
}
.btn-back:hover {
  cursor: pointer;
  background-color: #6fa3c4;
}
.col-md-3 {
  margin: 10px;
}
@media (max-width: 768px) {
  .card-container {
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }
  .btn-back {
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }
}
</style>