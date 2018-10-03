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
      <div v-if="showQueryContainer" class="ready-button-container">
        <transition appear enter-active-class="animated fadeIn" after-enter-class="animated fadeOut">
          <button @click="revealCards" class="btn btn-large btn-ready">Click Here When You Are Ready</button>
        </transition>
      </div>
      <div v-if="shuffling" class="col-md-12"><p>Shuffling the deck...</p></div>
      <div v-if="cards" class="col-md-2 col-sm-12" v-for="card in cards" :key="card.id">
        <transition appear enter-active-class="animated zoomIn" after-enter-class="animated fadeOut">
          <p v-if="card.position === 'Represents You'" class="card-position-one"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name">{{ card.position }}</p>
          <p v-if="card.position === 'Your Obstacle'" class="card-position-two"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'Influences'" class="card-position-three"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'The Root of The Query'" class="card-position-four"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'The Past'" class="card-position-five"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'Near Future'" class="card-position-six"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'Best Approach to Query'" class="card-position-seven"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'The Environment Around the Query'" class="card-position-eight"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'Your Hopes and Fears'" class="card-position-nine"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
          <p v-if="card.position === 'Ultimate Potential Outcome'" class="card-position-ten"><img id="show-modal" @click="setCardModal(card)" :class="imgAlign(card)" :src="card.face_image_url" :alt="card.name"></p>
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
  name: "CelticCrossSpread",
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
        .get("/spreads/celtic_cross")
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
      let positions = [
        "Represents You",
        "Your Obstacle",
        "Influences",
        "The Root of The Query",
        "The Past",
        "Near Future",
        "Best Approach to Query",
        "The Environment Around the Query",
        "Your Hopes and Fears",
        "Ultimate Potential Outcome"
      ];
      this.cards[0].position = positions[0];
      this.cards[1].position = positions[1];
      this.cards[2].position = positions[2];
      this.cards[3].position = positions[3];
      this.cards[4].position = positions[4];
      this.cards[5].position = positions[5];
      this.cards[6].position = positions[6];
      this.cards[7].position = positions[7];
      this.cards[8].position = positions[8];
      this.cards[9].position = positions[9];
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
.card-img {
  height: 220px;
  width: 150px;
  margin: 0 10px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
}
.card-img:hover {
  cursor: pointer;
}
.card-img-reverse {
  height: 220px;
  width: 150px;
  margin: 0 10px;
  box-shadow: 5px 10px rgba(0, 0, 0, 0.2);
  transform: rotate(180deg);
}
.card-img-reverse:hover {
  cursor: pointer;
}
.position {
  width: 100%;
  text-align: left;
  margin: 0 auto;
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.3rem;
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
/* Card Positions */
.card-position-one {
  position: absolute;
  top: 200px;
  right: -300px;
}
.card-position-two {
  position: absolute;
  top: 200px;
  right: -110px;
  transform: rotate(90deg);
}
.card-position-three {
  position: absolute;
  top: 430px;
  right: 80px;
}
.card-position-four {
  position: absolute;
  right: 500px;
  top: 200px;
}
.card-position-five {
  position: absolute;
  right: 460px;
  top: -25px;
}
.card-position-six {
  position: absolute;
  right: 440px;
  top: 200px;
}
.card-position-seven {
  position: absolute;
  top: 390px;
  right: -710px;
}
.card-position-eight {
  position: absolute;
  top: 160px;
  right: -520px;
}
.card-position-nine {
  position: absolute;
  top: -70px;
  right: -330px;
}
.card-position-ten {
  position: absolute;
  top: -70px;
  right: -430px;
}
</style>