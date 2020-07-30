<template>

  <li class="catalog__item" >
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colors" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
          :value="color" v-model="currentColor">
          <span class="colors__value" :style="{'background-color': color}">
          </span>
        </label>
      </li>
    </ul>
  </li>

</template>

<script>
export default {
  data() {
    return {
      currentColor: this.product.colorId[0],
    };
  },
  props: ['product'],
  computed: {
    colors() {
      return this.product.colorId;
    },
  },
};
</script>
