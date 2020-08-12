<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'cart'}" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }} </span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
            <!-- <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li> -->
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in products" :key="product.id">
              <h3>{{ product.title }}, {{ product.amount }} шт.</h3>
              <b>{{ product.price * product.amount | numberFormat }} ₽</b>
              <span>Артикул: {{ product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <!-- <p>Доставка: <b>500 ₽</b></p> -->
            <p>Итого: <b>{{ products.length | productsNumber }}</b>
            на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import productsNumber from '@/helpers/productsNumber';

export default {
  filters: { numberFormat, productsNumber },
  methods: {
    ...mapActions(['loadOrderInfo']),
  },
  computed: {
    ...mapState({ order: 'orderInfo' }),
    products() {
      return this.order.basket.items.map((prod) => (
        {
          ...prod.product,
          amount: prod.quantity,
        }
      ));
    },
    totalPrice() {
      return this.products.reduce((acc, item) => (
        (item.price * item.amount) + acc), 0);
    },
  },
  created() {
    if (this.order && this.order.id === this.$route.params.id) {
      return;
    }
    this.loadOrderInfo(this.$route.params.id);
  },
};
</script>
