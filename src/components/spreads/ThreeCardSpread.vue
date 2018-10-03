<template>
  <div class="container">
    <h1 v-if="error" class="text-center">{{ error }}</h1>
    <transition appear enter-active-class="animated fadeIn">
    <div class="row card-container">
      <div class="col-md-12 cross-section-1"></div>
      <div v-if="showQueryContainer" class="col-md-12">
        <transition appear enter-active-class="animated fadeIn" after-enter-class="animated fadeOut">
          <h1 class="query text-center">Consider Your Query for A Moment</h1>
        </transition>
      </div>
      <div v-if="showQueryContainer" class="col-md-12 ready-button-container">
        <transition appear enter-active-class="animated fadeIn" after-enter-class="animated fadeOut">
          <button @click="revealCards" class="btn btn-large btn-ready">Click Here When You Are Ready</button>
        </transition>
      </div>
      
      <div v-if="shuffling" class="col-md-12"><p>Shuffling the deck...</p></div>
        <div v-if="cards" class="col-md-4 col-sm-12" v-for="card in cards" :key="card.id">
          <div class="col-md-12">
            <p class="position">{{ card.position }}</p>
          </div>
          <transition appear enter-active-class="animated rollIn" after-enter-class="animated fadeOut">
            <img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name">
          </transition>
          <transition appear enter-active-class="animated fadeIn" after-enter-class="animated fadeOut">
            <div class="col-md-12">
              <p class="keywords">{{ keywords(card) }}</p>
            </div>
          </transition>
      </div>

      <CardModal :card="cardInModal" v-if="showModal" @close="showModal = false">

      </CardModal>
    </div>
    </transition>
  </div>
</template>

<script>
import CardModal from "@/components/CardModal";
export default {
  name: "ThreeCardSpread",
  data() {
    return {
      cards: [],
      error: "",
      showQueryContainer: true,
      shuffling: false,
      showCards: false,
      cardInModal: "",
      showModal: false
    };
  },
  methods: {
    revealCards() {
      this.$http.plain
        .get("/spreads/three_cards")
        .then(response => {
          this.cards = response.data;
          this.setUpCards();
        })
        .catch(error => this.setError(error, "The Server Did Not Respond"));
      this.showQueryContainer = false;
      this.shuffling = true;
    },
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    setUpCards() {
      this.cards.map(card => {
        let alignment = ["upright", "reversed"];
        card.align = alignment[Math.floor(Math.random() * alignment.length)];
      });
      let positions = ["The Past", "The Present", "The Future"];
      this.cards[0].position = positions[0];
      this.cards[1].position = positions[1];
      this.cards[2].position = positions[2];
      this.shuffling = false;
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
.query {
  margin-top: 190px;
}
.ready-button-container {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
.btn-ready {
  width: 365px;
  margin-top: 50px;
  background-color: #95b9cf;
  color: #fff;
  box-shadow: 5px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
}
.btn-ready:hover {
  background-color: #6fa3c4;
}
.card-container {
  margin-top: 40px;
}
.position {
  width: 100%;
  text-align: left;
  margin: 0 auto;
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.3rem;
}
.card-img {
  height: 500px;
  width: 300px;
  margin: 0 10px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
}
.card-img:hover {
  cursor: pointer;
}
.card-img-reverse {
  height: 500px;
  width: 300px;
  margin: 0 10px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
  transform: rotate(180deg);
}
.card-img-reverse:hover {
  cursor: pointer;
}
.keywords {
  margin-top: 10px;
  font-size: 1.7rem;
  text-transform: capitalize;
  color: #fff;
  text-shadow: 3px 5px rgba(100, 39, 39, 0.2);
}
.cross-section-1 {
  position: absolute;
  top: 140px;
  height: 340px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: -1;
  transform: rotate(-5deg);
}
</style>