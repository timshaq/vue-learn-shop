<template>
  <ProductPageLoader v-if="productLoading" />
  <main v-else-if="!productData">Error!</main>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">
            {{ product.title }}
          </span>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" :src="product.image"
              :alt="product.title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in colors" :key="color">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item"
                    :value="color">
                    <span class="colors__value" :style="{'background-color': color}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                    checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                @click.prevent="minusProductAmount">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="number" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар"
                @click.prevent="plusProductAmount">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit"
              :disabled="productAddSendingToCart">
                В корзину
              </button>
            </div>
            <div v-show="productAddedToCart"
            style="margin: 10px 0; display: flex;">
              <div style="font-size: 20px; color: rgb(70,255,46);
              margin: 0px 20px 0 5px; line-height: 16px;">
                ✓
              </div>
              Товар добавлен в корзину
            </div>
            <div v-show="productAddSendingToCart"
            style="margin: 10px 0; display: flex;">
              <div class="ring-loader"></div>
              Добавляем товар в корзину...
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Краткая характеристика для {{ product.title }}
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Прродающий текст описывающий {{ product.title }}
          </p>

          <h3>Дизайн</h3>

          <p>
            Красочное описание дизайна для  {{ product.title }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductPageLoader from '@/components/ProductPageLoader.vue';

export default {
  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAddedToCart: false,
      productAddSendingToCart: false,
    };
  },
  components: { ProductPageLoader },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData
        ? { ...this.productData, image: this.productData.image.file.url }
        : [];
    },
    category() {
      return this.productData.category;
    },
    colors() {
      return this.product.colors.map((color) => color.code);
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart() {
      this.productAddedToCart = false;
      this.productAddSendingToCart = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAddedToCart = true;
          this.productAddSendingToCart = false;
        });
    },
    minusProductAmount() {
      if (this.productAmount > 1) {
        this.productAmount -= 1;
      }
    },
    plusProductAmount() {
      this.productAmount += 1;
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      this.productAddedToCart = false;
      this.productAddSendingToCart = false;
      this.productAmount = 1;
      axios.get(`${API_BASE_URL}/api/products/${+this.$route.params.id}`)
        .then((res) => { this.productData = res.data; })
        .catch(() => { this.productLoadingFailed = true; })
        .then(() => { this.productLoading = false; });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
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

</style>
