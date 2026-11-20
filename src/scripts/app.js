import { createApp } from "vue";
import ContentGallery from "./components/ContentGallery";
import AccordionItem from "./components/AccordionItem";
import ApartmentGallery from "./components/ApartmentGallery";
import VueEasyLightbox from "vue-easy-lightbox";
import Navigation from "./components/Navigation";
import initMatterport from "./matterport";
import initMap from "./map";

const app = createApp({
  // root instance definition
});
app.use(VueEasyLightbox);

app.component('AccordionItem', AccordionItem);
app.component('ApartmentGallery', ApartmentGallery);
app.component('ContentGallery', ContentGallery);
app.component('Navigation', Navigation);

app.mount("#app");

let matterports = document.getElementsByClassName('matterport')

if (matterports.length >= 1) {
  for (let i = 0; i < matterports.length; i++) {
    initMatterport(matterports[i].querySelector('iframe'), matterports[i].querySelector('.matterport-toggle'), matterports[i].querySelector('.hint') )
  }
}

let maps = document.getElementsByClassName('map')

if (maps.length >= 1) {
  for (let i = 0; i < maps.length; i++) {
    initMap(maps[i].querySelector('iframe'), maps[i].querySelector('.map-toggle'), maps[i].querySelector('.hint') )
  }
}
