<script setup>
//
</script>

<template>
  <!-- top level router export -->
  <div class="h-screen w-screen fixed top-0 left-0">
    <TransitionRouterView :routerType="$store.getters.routerType" mainComponentName="home" />
  </div>
</template>
