<template>
  <transition name="modal">
    <div class="modal-mask">
    <img class="card-upright" :src="card.face_image_url" alt="">
      <div class="modal-wrapper">    
        <div class="modal-container">
          <div>
            <h5 class="modal-title">{{ card.name }}</h5>
            <button class="close" @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
            <h5 class="modal-title"><span style="color: #95b9cf;">{{ card.position }}</span></h5>
          </div>
          <div class="container">
            <div class="modal-body">
              <p><em>Summary:</em> {{ card.summary }}</p>
              <p><em>Detailed Info:</em> {{ card.full_meaning }}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  name: "CardModal",
  props: ["card"]
};
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 55%;
  max-height: calc(100vh - 200px);
  margin: 0 auto;
  margin-right: 200px;
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  border-radius: 2%;
  overflow-y: overlay;
}
.card-upright {
  position: absolute;
  top: 130px;
  left: 150px;
  width: 300px;
  height: 500px;
  opacity: 0.8;
  transition: all 0.5s ease;
}
.card-upright:hover {
  transform: rotate(180deg);
}
.modal-title {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
#position {
  font-family: "IM Fell English", serif;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

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
::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #95b9cf;
}

@media (max-width: 1320px) {
  .card-upright {
    left: 30px;
  }
}
@media (max-width: 1060px) {
  .card-upright {
    display: none;
  }
  .modal-container {
    width: 100%;
    margin: 0;
  }
}
</style>