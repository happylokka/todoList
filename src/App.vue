<template>
  <div id="app">
    <todoList></todoList>
  </div>
</template>

<script>
import todoList from "./components/todoList.vue"

export default {
  name: "app",
  data() {
    return {
      imgUrl: "",
    };
  },
  components: {
    todoList,
  }
};
</script>

<style lang="less" scoped>
#app::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
#app::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
</style>
