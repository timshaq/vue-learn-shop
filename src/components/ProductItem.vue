<template>

  <li class="catalog__item" >
    <router-link class="catalog__pic" :to="{name: 'product',
    params: {id: product.id} }">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
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
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      currentColor: this.product.colors[0].code,
    };
  },
  props: ['product'],
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return this.product.colors.map((color) => color.code);
    },
  },
  methods: {
    gotoPage,
  },
};
</script>
