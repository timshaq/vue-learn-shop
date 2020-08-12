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
        Оформление заказа
      </h1>
      <div v-if="cartLoading" class="bg-animate" style="width: 150px; height: 20px;"></div>
      <span v-else class="content__info">
        {{ products.length | productsNumber}}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name"
            placeholder="Введите ваше полное имя" />

            <BaseFormText v-model="formData.address" title="Адрес доставки"
            :error="formError.address"
            placeholder="Введите ваш адрес" />

            <BaseFormText v-model="formData.phone" title="Телефон"
            :error="formError.phone" type="tel"
            placeholder="Введите ваш телефон" />

            <BaseFormText v-model="formData.email" title="Email"
            :error="formError.email" type="email"
            placeholder="Введите ваш Email" />

            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу"
            :error="formError.comment"
            placeholder="Ваши пожелания" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                  v-model.number="deliveryFinalPrice">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item" v-for="delivery in deliveryPrice" :key="delivery.id">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery"
                  :value="delivery.price"
                  v-model.number="deliveryFinalPrice">
                  <span class="options__value">
                    {{ delivery.method }} <b>{{ delivery.price | numberFormat}} ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="cartLoading" class="cart__block">

             <ul class="cart__orders">
               <li class="cart__order" v-for="product in 3" :key="product">
                  <div>
                    <div class="bg-animate" style="width: 200px; height: 60px;"></div>
                  </div>
                 <div class="bg-animate" style="width: 90px; height: 20px;"></div>
                 <div class="bg-animate" style="width: 100px; height: 20px;"></div>
               </li>
             </ul>

             <div class="cart__button button bg-animate" style="height: 70px">
             </div>
        </div>

        <div v-else-if="products.length === 0" class="cart__block">

          <ul class="cart__orders">
            <li class="cart__order" >
              <h3>Корзина пуста</h3>
            </li>
          </ul>

          <router-link tag="button" :to="{name: 'main'}"
          class="cart__button button button--primery">
            Перейти в каталог
          </router-link>
        </div>

        <div v-else class="cart__block">
          <ul class="cart__orders">

            <li class="cart__order" v-for="product in products" :key="product.id">
              <h3>{{ product.title }}, {{ product.amount }} шт.</h3>
              <b>{{ product.price * product.amount | numberFormat }} ₽</b>
              <span>Артикул: {{ product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Всего: <b>{{ products.length | productsNumber }}</b> на сумму
            <b>{{ totalPrice | numberFormat }} ₽</b></p>
            <p v-if="!deliveryFinalPrice">Доставка: <b>бесплатно</b></p>
            <p v-else>Доставка: <b>{{ deliveryFinalPrice | numberFormat }} ₽</b></p>
            <br>
            <p>К оплате: <b>{{ deliveryFinalPrice + totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit"
          :disabled="orderSending">
            Оформить заказ
          </button>

          <div v-show="orderSending"
          style="margin: 20px 0 0 0; display: flex;">
            <div class="ring-loader"></div>
            Отправка заказа, подождите...
          </div>

        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapGetters, mapState } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import productsNumber from '@/helpers/productsNumber';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',

      deliveryPrice: [
        { id: 'pochtarf', method: 'Курьером Почты России 🐌', price: 500 },
        { id: 'sdek', method: 'Курьером СДЭК', price: 1700 },
        { id: 'dhl', method: 'Курьером DHL', price: 2300 },
      ],
      deliveryFinalPrice: 0,

      orderSending: false,
    };
  },
  filters: { numberFormat, productsNumber },
  components: { BaseFormText, BaseFormTextarea },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderSending = true;
      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((res) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', res.data);
          this.$router.push({ name: 'orderInfo', params: { id: res.data.id } });
        })
        .catch((err) => {
          this.formError = err.response.data.error.request || {};
          this.formErrorMessage = err.response.data.error.message;
          this.orderSending = false;
        });
    },
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
    ...mapState({ cartLoading: 'cartLoading' }),
  },
};
</script>
<style media="screen">
.ring-loader,
.ring-loader:after {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.ring-loader {
  margin: 0 20px 0 0;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 2px solid rgba(70,255,46, 0.2);
  border-right: 2px solid rgba(70,255,46, 0.2);
  border-bottom: 2px solid rgba(70,255,46, 0.2);
  border-left: 2px solid #46ff2e;
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
