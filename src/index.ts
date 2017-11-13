import Vue from "vue";
import Vuex from "vuex";
import {createDeck, shuffleCards} from "./math";
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    cards: shuffleCards(createDeck(7)),
    selected: [],
  },
  mutations: {
    updateSelected: (state, id) => {
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter(card => card !== id)
      } else {
        if (state.selected.length < 2) {
          state.selected = [...state.selected, id]
        } else {
          state.selected = [id]
        }
      }
    }
  }
})

let v = new Vue({
  el: "#app",
  store,
  template: `
    <div>
      <div>
        Spot-it
      </div>
        <div class="container">
          <div v-for="card, idx in deck"
               class="card"
               :class="{'card--selected': selected.includes(idx)}"
               v-on:click="itemClicked(idx)">
            <span v-for="pic in card">
              <img :src="'http://joelgrus.com/experiments/pux-it/images/' + pic + '.svg'"
                   :class="{'image--common': selected.includes(idx) && commonImage === pic}"
                   class="image">
            </span>
           </div>
        </div>
    </div>`,
  computed: {
    commonImage() {
      if (this.selected.length === 2) {
        const [firstId, secondId] = this.selected
        return this.deck[firstId]
          .filter(pic => this.deck[secondId].includes(pic))[0]
      }
    },
    deck() {
      return store.state.cards
    },
    selected() {
      return store.state.selected
    }
  },
  methods: {
    itemClicked(id) {
      store.commit('updateSelected', id)
    }
  },
});