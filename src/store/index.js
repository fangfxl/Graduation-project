import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      search:' ',
  },
  mutations: {

  },
  actions: {
    getSearch(state,str){
      this.state.search = str;
    }
  },
  modules: {

  }
})
