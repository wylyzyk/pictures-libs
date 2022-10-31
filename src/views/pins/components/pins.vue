<script setup>
import {} from "vue";

defineProps({
  id: { type: String, required: true }
});
</script>

<template>
  <div class="fixed top-0 left-0 w-screen h-screen text-xl bg-slate-200 z-20">
    {{ id }}
  </div>
</template>
