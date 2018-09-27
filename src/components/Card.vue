<template>
    <div class="container single-card-view">
      <div class="row">
        <div class="col-md-12 cross-section"></div>
        <div class="col-md-5 col-sm-12 text-center">
          <img class="img-responsive" :src="card.face_image_url" alt="">
          <p><em>Upright: </em>{{ card.upright }}</p>
        </div>
        <div class="col-md-2 col-sm-12 text-center">
          <p class="card-name">{{ card.name }}</p>
        </div>
        <div class="col-md-5 col-sm-12 text-center">
          <img class="img-responsive reversed" :src="card.face_image_url">
          <p><em>Reversed: </em>{{ card.reversed }}</p>
        </div>
        <div class="col-md-12 text-justify">
          <p><em>Summary:</em> {{ card.summary }}</p>
          <p><em>Detailed Info:</em> {{ card.full_meaning }}</p>
        </div>
      </div>
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

<style>
* {
  color: #fff;
}
img {
  border-radius: 5%;
}
p {
  font-size: 1.2rem;
}

.single-card-view {
  margin-top: 60px;
}

.cross-section {
  position: absolute;
  top: 100px;
  height: 340px;
  width: 80%;
  background-color: #69b578;
  z-index: -1;
  transform: rotate(-5deg);
  border-radius: 50%;
}

.card-name {
  margin-top: 80px;
  font-size: 2.5rem;
}

.reversed {
  transform: rotate(180deg);
}
</style>