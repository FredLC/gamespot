<template>
  <div>
    <router-link
      v-if="type === 'link'"
      :to="linkTo"
      :class="['button_default', ...addClass]"
    >
      <slot />
    </router-link>

    <div v-if="type === 'btn'">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['linkTo', 'type', 'addClass'],
};
</script>
