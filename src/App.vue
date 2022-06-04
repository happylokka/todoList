<template>
  <div id="app" :style="{ backgroundImage: 'url(' + imgUrl + ')' }">
    <todoList></todoList>
  </div>
</template>

<script>
<<<<<<< HEAD
import axios from 'axios'
import todoList from "./components/todoList.vue"
=======
import todoList from "./components/todoList.vue";
>>>>>>> bc7d2a81012cf7ddcbf5d7c3e7b22defac341af5

export default {
  name: "app",
  data() {
    return {
      imgUrl: "",
    };
  },
  components: {
    todoList,
  },
  created() {
    this.$jsonp("https://bing.ioliu.cn/v1").then((res) => {
      this.imgUrl = res.data.url;
    });
  },
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
  background: url("./assets/images/bg.jpg") 100% 100% no-repeat;
  background-size: cover;
  z-index: -1;
  // -webkit-filter: blur(5px);
  // filter: blur(15px);
  // transform: scale(1.2);
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
