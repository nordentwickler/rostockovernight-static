<template>
  <div class="" >
    <h3 class="mb-0 w-full block border-b  py-2 lg:py-4" :class="colorClass">
      <button
        :id="id + '-header'"
        class="flex justify-between items-center w-full lg:py-1 focus:outline-none text-left ml-0"
        :aria-controls="id + '-panel'"
        @click="this.toggle">
        {{ title }}

        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 fill-current flex-shrink-0 ml-2" viewBox="0 0 24 24" :class="{'transform rotate-180': this.isExpanded }">
          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/>
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>
        </svg>
      </button>
    </h3>
    <transition
      name="fade-height"
      v-on:before-enter="beforeEnter" v-on:enter="enter"
      v-on:before-leave="beforeLeave" v-on:leave="leave"
    >
      <section
        class="overflow-hidden transition ease-in-out"
        :id="id + '-panel'"
        v-show="this.isExpanded"
        :aria-labelledby="id + '-header'">
        <div class="pt-8 pb-12 text">
          <slot></slot>
        </div>
      </section>
    </transition>
  </div>
</template>
<script>

export default {
  name: "AccordionItem",
  props: {
    id: {
      type: String
    },
    colorClass: {
      type: String
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
    beforeEnter: function (el) {
      el.style.height = '0';
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function (el) {
      el.style.height = '0';
    }
  }
};
</script>

<style>

.fade-height-enter-active,
.fade-height-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-height-enter-from,
.fade-height-leave-to {

}

</style>
