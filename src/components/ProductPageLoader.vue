<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <div class="loader-breadcrumbs item1 bg-animate"></div>
        </li>
        <li class="breadcrumbs__item">
          <div class="loader-breadcrumbs item2 bg-animate"></div>
        </li>
        <li class="breadcrumbs__item">
          <div class="loader-breadcrumbs item3 bg-animate"></div>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper bg-animate" style="width: 570px; height: 570px;
        border-radius: 4px;">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
              <div class="bg-animate" style="width: 98px; height: 98px; border-radius: 4px;">

              </div>
          </li>
          <li class="pics__item">
              <div class="bg-animate" style="width: 98px; height: 98px; border-radius: 4px;">

              </div>
          </li>
          <li class="pics__item">
              <div class="bg-animate" style="width: 98px; height: 98px; border-radius: 4px;">

              </div>
          </li>
          <li class="pics__item">
              <div class="bg-animate" style="width: 98px; height: 98px; border-radius: 4px;">

              </div>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <div class="item__code bg-animate" style="width: 100px; height: 20px;
        border-radius: 4px;"></div>
        <h2 class="item__title bg-animate" style="width: 100%; height: 50px; border-radius: 4px;">
        </h2>
        <div class="item__form">
          <div class="form">
            <b class="item__price bg-animate" style="width: 220px;
            height: 50px; border-radius: 4px;"></b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item">
                  <div class="bg-animate" style="width: 20px; height: 20px; border-radius: 20px;">

                  </div>
                </li>
                <li class="colors__item">
                  <div class="bg-animate" style="width: 20px; height: 20px; border-radius: 20px;">

                  </div>
                </li>
                <li class="colors__item">
                  <div class="bg-animate" style="width: 20px; height: 20px; border-radius: 20px;">

                  </div>
                </li>
                <li class="colors__item">
                  <div class="bg-animate" style="width: 20px; height: 20px; border-radius: 20px;">

                  </div>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                    <div class="sizes__value bg-animate" style="width: 50px; height: 20px;
                    border-radius: 4px;">
                    </div>
                </li>
                <li class="sizes__item">
                    <div class="sizes__value bg-animate" style="width: 50px; height: 20px;
                    border-radius: 4px;">
                    </div>
                </li>
                <li class="sizes__item">
                    <div class="sizes__value bg-animate" style="width: 50px; height: 20px;
                    border-radius: 4px;">
                    </div>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="bg-animate"
              disabled="" style="width: 120px; height: 75px;">
              </div>

              <div class="bg-animate"
              disabled="" style="width: 200px; height: 75px;">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <span class="tabs__link tabs__link--current">
              Описание
            </span>
          </li>
          <li class="tabs__item">
            <span class="tabs__link" href="#">
              Характеристики
            </span>
          </li>
          <li class="tabs__item">
            <span class="tabs__link" href="#">
              Гарантия
            </span>
          </li>
          <li class="tabs__item">
            <span class="tabs__link" href="#">
              Оплата и доставка
            </span>
          </li>
        </ul>

        <div class="item__content">
          <p class="item__description item1 bg-animate"></p>
          <p class="item__description item2 bg-animate"></p>
          <p class="item__description item3 bg-animate"></p>

          <h3>Что это?</h3>

          <p class="item__description item1 bg-animate"></p>
          <p class="item__description item2 bg-animate"></p>
          <p class="item__description item3 bg-animate"></p>

          <h3>Дизайн</h3>

          <p class="item__description item1 bg-animate"></p>
          <p class="item__description item2 bg-animate"></p>
          <p class="item__description item3 bg-animate"></p>
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
  .loader-breadcrumbs.item3 {
    width: 170px;
    height: 20px;
  }

  .item__description {
    height: 20px;
    border-radius: 3px;
  }
  .item__description.item1 {
    width: 90px;
  }
  .item__description.item2 {
    width: 190px;
  }
  .item__description.item3 {
    width: 290px;
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
