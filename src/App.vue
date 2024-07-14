<template>
  <div id="app">
    <todoList></todoList>
  </div>
</template>

<script>
import todoList from "./components/todoList.vue"

export default {
  name: "app",
  components: {
    todoList,
  }
};
</script>

<style lang="less" scoped>
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  background: url("https://bing.img.run/uhd.php") 100% 100% no-repeat;
  background-size: cover;
  z-index: -1;
}
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
