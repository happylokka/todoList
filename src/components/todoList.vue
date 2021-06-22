<template>
  <div>
    <el-container>
      <el-header>
        <div class="timeBox">
          <p class="date">{{date}}</p>
          <p class="time" @dblclick="change" v-show="flag">{{time}}</p>
        </div>
        <div class="timeBox" @dblclick="change" v-show="!flag"><p>{{week}}</p></div>  
        <div class="hello">
          <p>{{text}}&nbsp;&nbsp;</p>
          <input type="text" :class="{active:name}" @keyup.13="named" v-model="name" ref="name">
        </div>
      </el-header>
      <el-main>
          <div class="taskBox" v-if="todolist.length == 0 || show">
            <p class="title">今天想要完成的目标是 ？</p>
            <input type="text" class="form-control" @blur="add" @keyup.13="add" v-model="newtodo.content">
          </div>
          <div class="targetBox" v-else>
            <i class="el-icon-plus" @click="addTopic"></i>
            <p>进行中：{{todolist.length}}</p> <p>已完成：{{donenum}}</p>
            <ul class="list-group">
              <li class="list-group-item" v-for="(todo,index) in todolist" :key="index">
                <el-checkbox size="mini" v-model="todo.done"></el-checkbox>
                <!-- <input type="text" v-model="todo.content"> -->
                <p :class="{done: todolist[index].done}"  @dblclick="isDone(index)">{{`${index + 1}. ${todo.content}`}}</p>
                <i class="el-icon-close" @click="del(index)"></i>
              </li>
            </ul>
          </div>  
      </el-main>
      <el-footer></el-footer>
    </el-container>
    <p class="author">CREATED BY LOKKA</p>
  </div>
</template>

<script>
export default {
  name: 'todoList',
  data(){
    return{
      date: null,
      time: null,
      week: null,
      flag: true,
      show: false,
      name:"",
      newtodo: {
        content: '',
        done: false
      },
      tt:10,
      todolist: []
    }
  },
  created(){

    this.nowTime();
    this.getWeek(new Date());

    // 如果localstorage中有就用有的 没有就用this.todolist
    this.name = JSON.parse(localStorage.getItem("name")) || this.name;
    this.todolist = JSON.parse(localStorage.getItem("data")) || this.todolist;

  },
  mounted(){
    
    setInterval(() => {
      this.nowTime();
    },1000);

  },
  methods:{
    formatDateTime(time){    
      let year = new Date(time).getFullYear();
      let month =new Date(time).getMonth() + 1 < 10? "0" + (new Date(time).getMonth() + 1): new Date(time).getMonth() + 1;
      let day =new Date(time).getDate() < 10? "0" + new Date(time).getDate(): new Date(time).getDate();
      let hh =new Date(time).getHours() < 10? "0" + new Date(time).getHours(): new Date(time).getHours();
      let mm =new Date(time).getMinutes() < 10? "0" + new Date(time).getMinutes(): new Date(time).getMinutes();
      let ss =new Date(time).getSeconds() < 10? "0" + new Date(time).getSeconds(): new Date(time).getSeconds();
      this.date =  year + "-" + month + "-" + day;
      this.time =  hh+":"+mm+":"+ss;
    },
    getWeek(date){ 
      let week; 
      if(date.getDay() == 0) week = "星期日" 
      if(date.getDay() == 1) week = "星期一" 
      if(date.getDay() == 2) week = "星期二" 
      if(date.getDay() == 3) week = "星期三" 
      if(date.getDay() == 4) week = "星期四" 
      if(date.getDay() == 5) week = "星期五" 
      if(date.getDay() == 6) week = "星期六" 
      this.week = week; 
    },     
    nowTime(){
      this.formatDateTime(new Date());
    },
    change(){
      this.flag = !this.flag;
    },
    empty(){
      alert(1);
    },
    add(){
      if(this.newtodo.content){
        this.todolist.push(this.newtodo);
        this.show = false;
        this.newtodo = {content: '',done: false}
      }
    },
    named(){
      this.$refs.name.blur();
    },
    del(index){
      // console.log(index)
      this.todolist.splice(index, 1)
      // 也可以 不如splice好
      // this.todolist = this.todolist.filter(item=>item!==todo) // 删就是取反 返回新数组
    },
    isDone(index){
      this.todolist[index].done = !this.todolist[index].done;
    },
    addTopic(){
      this.show = !this.show;
    }
  },
  computed:{
    text:function () {
      let hello = '';
      if(9.5 < new Date().getHours() && new Date().getHours() < 10){
        hello = '上班啦,又是元气满满的一天！'
      }else if(new Date().getHours() == 12) {
        hello = '干饭啦！'
      }else if(new Date().getHours() == 20) {
        hello = '下班啦！！！下班啦！！！下班啦！！！'
      }else if(new Date().getHours() < 12) {
        hello = '上午好'
      }else{
        hello = '下午好'
      }
      return hello;
    },
    donenum:function () {
      return this.todolist.filter(item => item.done).length
    }
  },
  watch:{
    todolist:{ // watch默认只监控一层的数据变化，深度监控
        handler(){ // 默认写成函数 就相当于默认写了个handler
            localStorage.setItem("data",JSON.stringify(this.todolist))
            if(this.todolist.length == 0){
              this.show = true;
            }
        },
        deep:true
    },
    name:function () {
      localStorage.setItem("name",JSON.stringify(this.name))
    }
  },
}
</script>

<style lang="less" scoped>
.el-container{
    width: 72%;
    height: auto;
    margin: 0.5rem auto;
    height: auto;
    background-color: rgba(0,0,0,.3);
  .el-header{
    text-align: center;
    height: auto !important;
    .timeBox{
      p{ 
        display: block;
        line-height: 1rem;
        user-select: none;
        font-size: 1rem;
        color: #fff;
      }
      .date{
        font-size: 0.3rem;
      }
    }
    .hello{    
      margin-top: 0.5rem;    
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1rem;
      line-height: 1rem;
      p{
        display: inline;
        user-select: none;
        font-size: 0.3rem;
        color: #fff;    
        vertical-align: text-bottom;
      }
      input{
        width: 1.2rem;
        height: auto;
        overflow: hidden;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        background: 0;
        border: 0;
        border-bottom: 2px solid #fff;
        border-radius: 0;
        white-space: nowrap;
        &.active{
          border-bottom: none;
        }
      }
    }
  }
  .el-main{
    text-align: center;
    width: 100%;
    height: auto;
    padding: 0;
    margin-top: 0.5rem;
    overflow: hidden;
    .taskBox{ 
      text-align: center;   
      font-size: 0.3rem;
      color: #fff;
      .title{
        line-height: 0.5rem;
      }
      .form-control{    
        text-align: center;
        padding-top: 15px;
        width: 50%;
        height: 0.5rem;
        font-size: 0.3rem;
        color: #fff;    
        background: 0;
        border: 0;
        border-bottom: 2px solid #fff;
        border-radius: 0;
      }
    }
    .targetBox{    
      width: 6rem;
      margin: 0 auto;
      .el-icon-plus{
        width: 0.3rem;
        height: 0.3rem;
        margin:  0 auto;
        display: block;
        font-size: 0.3rem;
        padding-bottom: 20px;
        cursor: pointer;
      }
      p{
        text-align: center;
        display: inline-block;
        padding: 0.2rem 0;
        font-size: 0.2rem;
        &:nth-child(2){
          margin-right: 20px;
        }
      }
      .list-group{
        .list-group-item{
          padding-top: 15px;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.28rem;
          display: flex;    
          align-items: center;
          .el-checkbox{
            margin: 0 0.2rem;
          }
          p{
            display: inline-block;   
            background: 0;       
            height: 0.5rem;
            font-size: 0.3rem;
            color: #fff;  
            flex: 1;
            user-select: none;
            &.done{
                color: #cccccc!important;
                text-decoration: line-through;
            }
          }
          .el-icon-close{
            margin: 0 0.2rem;
            cursor: pointer;
            &:hover{
              color: #ef5f65;
            }
          }
        }
      }
    }
  }
}
.author{
  display: inline-block;
  position: fixed;
  bottom: 0.5rem;
  right: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


@media screen and (max-width: 768px) {
    .targetBox {
        width: 100%;
    }
}


</style>
