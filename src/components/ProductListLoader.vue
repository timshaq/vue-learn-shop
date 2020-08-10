<template>
<li class="list-item">

  <div class="photo bg-animate"></div>

  <div class="title bg-animate"></div>

  <div class="title subtitle bg-animate"></div>
  <div class="price bg-animate"></div>

  <div class="colors">
    <div class="color-item bg-animate"></div>
    <div class="color-item bg-animate"></div>
    <div class="color-item bg-animate"></div>
    <div class="color-item bg-animate"></div>
    <div class="color-item bg-animate"></div>
  </div>

</li>
</template>

<script>
export default {
};
</script>

<style lang="css" scoped>
.list-item {
  width: 270px;
  height: 484px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 10px 0;
  overflow: hidden;
  background: #e9e9e9;
  position: relative;
  opacity: .4;
}

.photo {
  height: 350px;
}

.title {
  height: 20px;
  margin: 0 10px;
  color: hsla(0,0%,0%,0);
  text-shadow: #fff 0 0 6px;
  padding: 0 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.subtitle {
  height: 20px;
  width: 30%;
}

.price {
  height: 20px;
  width: 20%;
  margin: 0 10px;
  color: hsla(0,0%,0%,0);
  text-shadow: #fff 0 0 6px;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
}

.colors {
  height: 26px;
  width: 50%;
  margin: 0 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.color-item {
  height: 20px;
  width: 20px;
  border-radius: 10px;
}

.bg-animate {
  background: linear-gradient(to right, #808080, #949494, #a9a9a9, #bdbebd, #e9e9e9);
  animation: slide 2s infinite linear;
}

@keyframes slide {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .1;
  }
  100% {
    opacity: 1;
  }
}
</style>
