import Vue from "vue";
import Vuex from "vuex";
import {Card, createDeck, Deck, Image, shuffleCards} from "./math";
Vue.use(Vuex)

type State = {
  cards: Deck,
  selected: Card,
}

const state: State = {
  cards: shuffleCards(createDeck(7)),
  selected: [],
}

const store = new Vuex.Store({
  state,
  mutations: {
    updateSelected: (state: State, id: number): void => {
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter((card: Image): boolean => card !== id)
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
    commonImage(): Image {
      if (this.selected.length === 2) {
        const [firstId, secondId] = this.selected
        return this.deck[firstId]
          .filter(pic => this.deck[secondId].includes(pic))[0]
      }
    },
    deck(): Deck {
      return store.state.cards
    },
    selected(): Card {
      return store.state.selected
    }
  },
  methods: {
    itemClicked(id: number): void {
      store.commit('updateSelected', id)
    }
  },
});