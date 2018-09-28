<template>
    <div class="container single-card-view">
      <h1 v-if="error" class="text-center">{{ error }}</h1>
      <transition appear enter-active-class="animated fadeIn">
      <div class="row">
        <div class="col-md-12 cross-section"></div>
        <div class="col-md-5 col-sm-12 text-center">
          <img class="img-responsive" :src="card.face_image_url" alt="">
          <p class="keywords"><em>Upright: </em>{{ card.upright }}</p>
        </div>
        <div class="col-md-2 col-sm-12 text-center">
          <p class="card-name">{{ card.name }}</p>
        </div>
        <div class="col-md-5 col-sm-12 text-center">
          <img class="img-responsive reversed" :src="card.face_image_url">
          <p class="keywords"><em>Reversed: </em>{{ card.reversed }}</p>
        </div>
        <div class="col-md-12 text-box"></div>
        <div class="col-md-12 descriptions">
          <p><em>Summary:</em> {{ card.summary }}</p>
          <p><em>Detailed Info:</em> {{ card.full_meaning }}</p>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      card: [],
      error: ""
    };
  },
  created() {
    this.$http.plain
      .get(`/cards/${this.$route.params.id}`)
      .then(response => {
        this.card = response.data;
      })
      .catch(error => {
        setError(error, "Server Did Not respond.");
      });
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    }
  }
};
</script>

<style scoped>
* {
  color: #fff;
}
img {
  border-radius: 5%;
}
p {
  font-size: 1.2rem;
  font-family: "Roboto", sans-serif;
}
.single-card-view {
  margin-top: 60px;
}
.cross-section {
  position: absolute;
  top: 50px;
  height: 60%;
  border-radius: 2%;
  width: 80%;
  background-color: #69b578;
  opacity: 0.2;
  z-index: -1;
  transform: rotate(-15deg);
}
.card-name {
  margin-top: 80px;
  font-size: 4rem;
  font-family: "IM Fell English SC", serif;
  margin-right: 50%;
  margin-left: -25%;
  text-shadow: 5px 10px rgba(100, 39, 39, 0.2);
}
.reversed {
  transform: rotate(180deg);
}
.text-box {
  position: absolute;
  background-color: #69b578;
  border-radius: 2%;
  margin-top: 30px;
  opacity: 0.2;
  top: 520px;
  width: 80%;
  height: 60%;
  transform: rotate(-15deg);
}
.descriptions {
  margin-top: 50px;
}
.keywords {
  margin-top: 10px;
  font-size: 1.7rem;
  text-transform: capitalize;
  color: #fff;
  text-shadow: 3px 5px rgba(100, 39, 39, 0.2);
  font-family: "IM Fell English SC", serif;
}
</style>