<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        Всего {{ countProducts | productsNumber }},
        {{ products.length }} на странице
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
      :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" />

      <section class="catalog">

        <ul class="catalog__list loader" v-if="productsLoading">
          <ProductListLoader v-for="product in productsPerPage" :key="product"/>
        </ul>

        <div v-else-if="productsLoadingFailed">
          Error!
          <button @click.prevent="loadProducts">Try again</button>
        </div>

        <ProductList v-else v-show="!productsLoading" :products="products" />

        <AppPagination v-model='page' :count='countProducts' :per-page='productsPerPage'/>

      </section>

    </div>

  </main>

</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ProductList from '@/components/ProductList.vue';
import AppPagination from '@/components/AppPagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import ProductListLoader from '@/components/ProductListLoader.vue';
import productsNumber from '@/helpers/productsNumber';

export default {
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
    ProductListLoader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 6,

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  filters: {
    productsNumber,
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`,
          {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorId,
            },
          }, 0)
          .then((res) => { this.productsData = res.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      });
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
