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
                {{card.join(' ')}}
             </div>
        </div>
    </div>`,
  data: {
    cards: createDeck(7),
    selected: [],
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
    }
});