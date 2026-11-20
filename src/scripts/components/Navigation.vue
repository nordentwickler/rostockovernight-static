<template>
  <div>
    <transition name="fade">
      <div class="sidebar-backdrop z-30" @click="toggle" v-if="open"></div>
    </transition>

    <button @click="toggle"
            class="flex items-center md:hidden relative z-50 ml-auto"
            :aria-expanded="open"
            aria-label="Mobile Navigation Button"
            :aria-controls="controls"
    >

      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="fill-current stroke-current h-6 w-6">
        <title>Toggle Navigation Button</title>

        <g v-if="!open">
          <path d="M30,15H2c-0.6,0-1,0.4-1,1s0.4,1,1,1h28c0.6,0,1-0.4,1-1S30.6,15,30,15z"></path>
          <path d="M30,6H2C1.4,6,1,6.4,1,7s0.4,1,1,1h28c0.6,0,1-0.4,1-1S30.6,6,30,6z"></path>
          <path d="M30,24H2c-0.6,0-1,0.4-1,1s0.4,1,1,1h28c0.6,0,1-0.4,1-1S30.6,24,30,24z"></path
          >
        </g>

        <g v-if="open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="none" >
          <line x1="27" y1="5" x2="5" y2="27"></line> <line x1="27" y1="27" x2="5" y2="5"></line>
        </g>
      </svg>
    </button>

    <div :class="open ? 'translate-x-0': 'translate-x-full'"
         class="bg-white min-h-screen w-2/3 z-40 fixed overflow-y-auto right-0 top-0 transform transition transition-transform ease-in duration-300 md:min-h-0 md:relative md:w-full md:flex md:w-auto md:translate-x-0 md:bg-transparent">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "Navigation",
  props: {
    controls:{
      type: String
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
};
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.sidebar-backdrop {
  @apply md:hidden;
  background-color: rgba(0, 0, 0, .5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>

