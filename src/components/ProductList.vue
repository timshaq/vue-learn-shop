<template>
  <div v-if="products.length === 0">
    Товары по указанным критериям не найдены. Попробуйте изменить параметры поиска.
  </div>
  <ul v-else class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
