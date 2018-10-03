import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main";
import Card from "@/components/Card";

import ThreeCardSpread from "@/components/spreads/ThreeCardSpread";
import CelticCrossSpread from "@/components/spreads/CelticCrossSpread";
import AllCards from "@/components/spreads/AllCards";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main
    },
    {
      path: "/cards/:id",
      name: "Card",
      component: Card
    },
    {
      path: "/spreads/three-card-spread",
      name: "ThreeCardSpread",
      component: ThreeCardSpread
    },
    {
      path: "/spreads/celtic-cross-spread",
      name: "CelticCrossSpread",
      component: CelticCrossSpread
    },
    {
      path: "/spreads/all-cards",
      name: "AllCards",
      component: AllCards
    }
  ]
});
