<script setup>
import { ref } from "vue";
import Search from "@/libs/search/index.vue";
import Hint from "./hint.vue";
import History from "./history.vue";
import { useStore } from "vuex";
import Theme from "./theme.vue";

const store = useStore();
const inputValue = ref("");

const onSearchHandler = (val) => {
  inputValue.value = val;
  if (val) {
    store.commit("search/addHistory", val);
    // 触发searchText
    store.commit("app/changeSearchText", val);
  }
};
</script>

<template>
  <div class="w-full">
    <Search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- search hint -->
          <Hint
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onSearchHandler"
          />
          <!--          recent search-->
          <History v-show="!inputValue" @itemClick="onSearchHandler" />
          <!--theme-->
          <Theme />
        </div>
      </template>
    </Search>
  </div>
</template>

<style lang="scss" scoped></style>
