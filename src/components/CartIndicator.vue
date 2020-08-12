<template>
  <router-link class="header__cart" aria-label="Корзина с товарами"
  :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <div class=" header__ring-loader" aria-label="Количество товаров"
    v-if="cartLoading">
    </div>
    <span v-else class="header__count" aria-label="Количество товаров">
      {{ cartProducts.length }}
    </span>
  </router-link>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({ cartProducts: 'cartProducts', cartLoading: 'cartLoading' }),
  },
};
</script>
<style media="screen">
.header__ring-loader,
.header__ring-loader:after {
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
.header__ring-loader {
  position: absolute;
  top: -5px;
  right: -3px;
  font-size: 7px;
  text-indent: -9999em;
  border-top: 2px solid rgba(70,255,46, 0.2);
  border-right: 2px solid rgba(70,255,46, 0.2);
  border-bottom: 2px solid rgba(70,255,46, 0.2);
  border-left: 2px solid #9eff00;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
