import Vue from "vue";
import {createDeck} from "./math";

let v = new Vue({
  el: "#app",
  template: `
    <div>
      <div>
        Spot-it
      </div>
        <div v-for="card, idx in cards">
          <div class="card"
               :class="{'card--selected': selected.includes(idx)}"
               v-on:click="itemClicked(idx)">
            <span v-for="pic in card"
                  :class="{'image--common': selected.includes(idx) && commonImage === pic}">
              {{pic}}
            </span>
           </div>
        </div>
    </div>`,
  data: {
    cards: createDeck(7),
    selected: [],
  },
  computed: {
    commonImage() {
      if (this.selected.length === 2) {
        const [firstId, secondId] = this.selected
        return this.cards[firstId]
          .filter(pic => this.cards[secondId].includes(pic))[0]
      }
    }
  },
  methods: {
    itemClicked(id) {
      if (this.selected.includes(id)) {
        this.selected = this.selected.filter(card => card !== id)
      } else {
        if (this.selected.length < 2) {
          this.selected = [...this.selected, id]
        } else {
          this.selected = [id]
        }
      }
    }
  },
});