import Vue from "vue";
import {createDeck} from "./helpers";

let v = new Vue({
  el: "#app",
  template: `
    <div>
        <div>
            Spot-it
        </div>
        <div v-for="card in cards">
            {{card.join(' ')}}
        </div>
    </div>`,
  data: {
    cards: createDeck(7),
  }
});