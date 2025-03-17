<template>
  <div id="app" :style="{ backgroundImage: 'url(' + imgUrl + ')' }">
    <todoList></todoList>
  </div>
</template>

<script>
import axios from 'axios';
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
  },
  created() {
    // this.$jsonp("https://bing.biturl.top/?resolution=UHD&format=json&index=0&mkt=zh-CN").then((res) => {
    //   this.imgUrl = res.data.url;
    // });
    axios.get('https://bing.biturl.top/?resolution=UHD&format=json&index=0&mkt=zh-CN')
        .then(res => {
          // 假设API返回的是图片URL字符串
          this.imgUrl = res.data.url;
        })
        .catch(error => {
          console.error('Error fetching Bing wallpaper:', error);
        })
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
