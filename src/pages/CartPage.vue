<template>
  <CartPageLoader v-if="cartLoading" />
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartProducts.length | productsNumber }}
      </span>
    </div>

    <section v-if="cartProducts.length === 0" class="cart">
      <h2>Товаров в корзине нет</h2>
    </section>

    <section v-else class="cart">
      <form class="cart__form form">
        <div class="cart__field">
          <ul class="cart__list">

            <CartItem v-for="product in cartProducts" :key="product.id" :product="product"/>

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span> {{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}"
          class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import productsNumber from '@/helpers/productsNumber';
import CartItem from '@/components/CartItem.vue';
import CartPageLoader from '@/components/CartPageLoader.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    CartItem,
    CartPageLoader,
  },
  filters: {
    numberFormat,
    productsNumber,
  },
  computed: {
    ...mapGetters({ cartProducts: 'cartDetailProducts', cartTotalPrice: 'cartTotalPrice' }),
    ...mapState({ cartLoading: 'cartLoading' }),
  },
};
</script>
