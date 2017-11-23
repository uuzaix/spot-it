import Vue from "vue";
import Vuex from "vuex";
import {intersection, contains} from 'ramda'
import {Card, createDeck, Deck, Image, shuffleCards} from "./math";
Vue.use(Vuex)

type State = {
  cards: Deck,
  selected: number[],
}

const state: State = {
  cards: shuffleCards(createDeck(7)),
  selected: [],
}

const store = new Vuex.Store({
  state,
  mutations: {
    updateSelected: (state: State, id: number): void => {
      if (contains(id, state.selected)) {
        state.selected = state.selected.filter((cardId: number): boolean => cardId !== id)
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
               :class="{'card--selected': selected[0] === idx || selected[1] === idx}"
               v-on:click="itemClicked(idx)">
            <span v-for="pic in card">
              <img :src="'http://joelgrus.com/experiments/pux-it/images/' + pic.id + '.svg'"
                   :class="{'image--common': (selected[0] === idx || selected[1] === idx) && commonImage === pic.id}"
                   class="image">
            </span>
           </div>
        </div>
    </div>`,
  computed: {
    commonImage(): number {
      if (this.selected.length === 2) {
        const [firstId, secondId]: number[] = this.selected
        const deck: Deck = this.deck
        return intersection(deck[firstId], deck[secondId])[0].id
      }
    },
    deck(): Deck {
      return store.state.cards
    },
    selected(): number[] {
      return store.state.selected
    }
  },
  methods: {
    itemClicked(id: number): void {
      store.commit('updateSelected', id)
    }
  },
});