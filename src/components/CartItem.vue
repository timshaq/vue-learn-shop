<template>
  <li class="cart__item product">
    <div class="product__pic">
      <router-link :to="{ name: 'product', params: {id: product.id} }" style="color: #000000;">
        <img :src="product.image" width="120" height="120"
        :alt="product.title">
      </router-link>
    </div>
    <h3 class="product__title">
      <router-link :to="{ name: 'product', params: {id: product.id} }" style="color: #000000;">
        {{ product.title }}
      </router-link>
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i style="background-color: #73B6EA"></i>
        Нежно-голубой
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ product.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар"
      @click.prevent="minusProductAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" name="count" v-model.number="amount">

      <button type="button" aria-label="Добавить один товар"
      @click.prevent="plusProductAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ productPrice | numberFormat }}₽
    </b>

    <div v-if="deleting" class="delete-proccess product__del button-del"></div>
    <button v-else class="product__del button-del" type="button"
    aria-label="Удалить товар из корзины"
    @click.prevent="deleteProduct">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      deleting: false,
    };
  },
  props: ['product'],
  filters: {
    numberFormat,
  },
  computed: {
    productPrice() {
      return this.product.price * this.product.amount;
    },
    amount: {
      get() {
        return this.product.amount;
      },
      set(value) {
        this.updateCartProductAmount({ productId: this.product.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),
    minusProductAmount() {
      if (this.product.amount > 1) {
        this.updateCartProductAmount({
          productId: this.product.productId,
          amount: this.product.amount - 1,
        });
      }
    },
    plusProductAmount() {
      this.updateCartProductAmount({
        productId: this.product.productId,
        amount: this.product.amount + 1,
      });
    },
    deleteProduct() {
      this.deleting = true;
      this.deleteCartProduct({ productId: this.product.productId });
    },
  },
};
</script>

<style media="screen">
.delete-proccess,
.delete-proccess:after {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.delete-proccess {
  top: -5px;
  right: -3px;
  font-size: 7px;
  text-indent: -9999em;
  border-top: 2px solid rgba(157, 157, 157, 0.2);
  border-right: 2px solid rgba(157, 157, 157, 0.2);
  border-bottom: 2px solid rgba(157, 157, 157, 0.2);
  border-left: 2px solid rgb(157, 157, 157);
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
