<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <div class="loader-breadcrumbs item1 bg-animate"></div>
        </li>
        <li class="breadcrumbs__item">
          <div class="loader-breadcrumbs item1 bg-animate"></div>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">

      </span>
    </div>

    <section class="cart">
      <div class="cart__form form">
        <div class="cart__field">
          <ul class="cart__list">
            <li class="cart__item product" v-for="item in 3" :key="item">
              <div class="product__pic">
                <div style="color: #000000;">
                  <div class="bg-animate" style="width: 120px; height: 120px;">
                  </div>
                </div>
              </div>
              <h3 class="product__title">
                <div style="color: #000000;">
                </div>
              </h3>
              <div class="product__info product__info--color" style="display: flex;
              align-items: center;">
                  Цвет:
                  <div class="bg-animate" style="width: 20px; height: 20px; border-radius: 20px;
                  margin: 0 20px;">
                  </div>

                  <div class="bg-animate" style="width: 100px; height: 20px; ">
                  </div>

              </div>
              <div class="product__code bg-animate" style="width: 80px; height: 20px;
              ">
              </div>

              <div class="product__counter form__counter bg-animate"
              style="width: 120px; height: 55px;">
              </div>

              <div class="product__price bg-animate"
              style="width: 100px; height: 20px; ">
              </div>

              <div class="product__del button-del bg-animate"
              style="width: 20px; height: 20px;">
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price bg-animate"
          style="width: 220px; height: 40px; "></p>

          <div class="bg-animate"
          style="width: 200px; height: 75px; ">
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
};
</script>

<style lang="css" scoped>

  .loader-breadcrumbs {
    height: 20px;
    border-radius: 3px;
  }
  .loader-breadcrumbs.item1 {
    width: 50px;
    height: 20px;
  }
  .loader-breadcrumbs.item2 {
    width: 100px;
    height: 20px;
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
