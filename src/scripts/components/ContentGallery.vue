<template>

  <div class="flex flex-wrap justify-between -mx-4 lg:-mx-8">
    <button
      v-for="(img, i) in items"
      :key="i"
      class="mb-8 lg:mb-16 px-4 lg:px-8"
      :class="img.size"
      @click="() => showImg(i)"
    >
      <picture>
        <source type="image/webp" :srcset="img.mobileWebp">
        <source :srcset="img.mobile">
        <img loading="lazy" :src="img.src" :alt="img.title" class="rounded-lg">
      </picture>
    </button>
  </div>

  <vue-easy-lightbox
    :visible="visible"
    :imgs="items"
    :index="index"
    moveDisabled
    scrollDisabled
    @hide="handleHide"
  ></vue-easy-lightbox>

</template>

<script>

export default {
  name: "ContentGallery",
  props: {
    items: Object,
    classes: String
  },
  data() {
    return {
      visible: false,
      index: 0, // default: 0
    }
  },
  methods: {
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  }
}
</script>

<style>
.toolbar-btn__rotate {
  display: none;
}
</style>
