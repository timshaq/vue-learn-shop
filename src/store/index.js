import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],

    orderInfo: null,

    cartLoading: false,
  },
  mutations: {
    setCartsLoadnigStatus(state, value) {
      state.cartLoading = value;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((it) => it.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProduct = state.cartProduct.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accesskey) {
      state.userAccessKey = accesskey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const prod = state
          .cartProductsData.find((p) => p.product.id === item.productId).product;

        return {
          ...item,
          ...prod,
          image: prod.image.file.url,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (
        (item.price * item.amount) + acc), 0);
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((res) => {
          context.commit('updateOrderInfo', res.data);
        });
    },
    loadCart(context) {
      context.commit('setCartsLoadnigStatus', true);
      axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
          context.commit('setCartsLoadnigStatus', false);
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((res) => {
            context.commit('updateCartProductsData', res.data.items);
            context.commit('syncCartProducts');
          }));
    },
    deleteCartProduct(context, { productId }) {
      axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((res) => {
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return;
      }
      // eslint-disable-next-line
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
