<template>

  <li class="catalog__item" >
    <a class="catalog__pic" href="#"
    @click.prevent="gotoPage('product', {id: product.id, colors: colors,
      colorId: currentColor})">
      <img :src="product.image[0]" :alt="product.title">
    </a>

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
      currentColor: this.product.colorId[0],
    };
  },
  props: ['product'],
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return this.product.colorId;
    },
  },
  methods: {
    gotoPage,
  },
};
</script>
