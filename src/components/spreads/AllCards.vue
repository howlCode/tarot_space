<template>
  <div class="container">
    <div class="row card-container">
      <h1 v-if="error" class="text-center">{{ error }}</h1>
        <div v-if="loading" class="col-md-12"><p>Loading the deck...</p></div>
        <div v-if="cards" class="col-md-2 col-sm-4" v-for="card in cards" :key="card.id">
          <transition appear enter-active-class="animated zoomIn" after-enter-class="animated fadeOut">
            <img id="show-modal" @click="setCardModal(card)" class="card-img" :src="card.face_image_url" :alt="card.name">
          </transition>
        </div>
      </div>
      <CardModal :card="cardInModal" v-if="showModal" @close="showModal = false">

      </CardModal>
    </div>
</template>

<script>
import CardModal from "@/components/CardModal";
export default {
  name: "AllCards",
  data() {
    return {
      cards: [],
      error: "",
      loading: true,
      cardInModal: "",
      showModal: false
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
    setCardModal(card) {
      this.cardInModal = card;
      this.showModal = true;
    }
  },
  components: {
    CardModal
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
</style>