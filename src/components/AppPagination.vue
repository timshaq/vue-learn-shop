<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
      :class="{'pagination__link--disabled': isClickablePrev}" href="#"
      aria-label="Предыдущая страница"
      @click.prevent="prevPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link"
      :class="{'pagination__link--current': pageNumber === page}"
      @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
      :class="{'pagination__link--disabled': isClickableNext}" href="#"
      aria-label="Следующая страница" @click.prevent="nextPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    isClickablePrev() {
      return this.page === 1;
    },
    isClickableNext() {
      return this.page === this.pages;
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    prevPage() {
      if (!this.isClickablePrev) {
        this.$emit('paginate', this.page - 1);
      }
    },
    nextPage() {
      if (!this.isClickableNext) {
        this.$emit('paginate', this.page + 1);
      }
    },
  },
};
</script>
