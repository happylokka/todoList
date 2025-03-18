<template>
  <div>
    <div class="containerBox">
      <div class="headerBox">
        <div class="timeBox">
          <p class="date">{{ date }}</p>
          <p class="time" @dblclick="change" v-show="flag">{{ time }}</p>
        </div>
        <div class="timeBox" @dblclick="change" v-show="!flag">
          <p>{{ week }}</p>
        </div>
        <div class="hello">
          <p>{{ text }}&nbsp;&nbsp;</p>
          <input type="text" :class="{ active: name }" @keyup.13="named" v-model="name" ref="name">
        </div>
      </div>
      <div class="mainBox">
        <div class="taskBox" v-if="todolist.length == 0 || show">
          <p class="title">今天想要完成的目标是 ？</p>
          <input ref="inputRef" type="text" class="form-control" @keyup.13="add" v-model="content">
        </div>
        <div class="targetBox" v-else>
          <i class="plusBtn" @click="addTopic">＋</i>
          <div class="statusBox">
            <p>进行中：{{ todolist.length }}</p>
            <p>已完成：{{ donenum }}</p>
          </div>
          <transition-group tag="ul" name="list" class="list-group">
            <li :class="['list-group-item', { 'is-dragover': index === newIndex }]" v-for="(todo, index) in todolist"
              :key="todo.id" :id="todo.id" draggable="true" @dragstart="dragStart(todo, index)"
              @dragover.prevent="dragOver(index)" @dragend="dragEnd($event, index)">
              <div class="checkboxBtn">
                <input @change="isDone(index)" :checked="todo.done" class="inp-cbx" :id="'cbx-' + todo.id"
                  type="checkbox" style="display: none;" />
                <label class="cbx" :for="'cbx-' + todo.id">
                  <span>
                    <svg width="12px" height="9px" viewbox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                  </span>
                </label>
              </div>
              <p :class="{ done: todolist[index].done }" @dblclick="isDone(index)">{{ `${index + 1}. ${todo.content}` }}
              </p>
              <i class="closeBtn" @click="del(index)">×</i>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
    <p class="author">CREATED BY ALOKKA</p>
  </div>
</template>

<script>
export default {
  name: 'todoList',
  data () {
    return {
      date: null,
      time: null,
      week: null,
      flag: true,
      show: false,
      name: "",
      id: 0,
      content: '',
      todolist: [],
      oldIndex: '',
      oldData: '',
      newIndex: ''
    }
  },
  computed: {
    text: function () {
      let hello = '';
      if (new Date().getHours() == 9) {
        hello = '上班啦,又是元气满满的一天！'
      } else if (new Date().getHours() == 12) {
        hello = '干饭啦！'
      } else if (new Date().getHours() == 18) {
        hello = '下班啦！！！下班啦！！！下班啦！！！'
      } else if (new Date().getHours() < 12) {
        hello = '上午好'
      } else {
        hello = '下午好'
      }
      return hello;
    },
    donenum: function () {
      return this.todolist.filter(item => item && item.done).length
    }
  },
  watch: {
    todolist: { // watch默认只监控一层的数据变化，深度监控
      handler () { // 默认写成函数 就相当于默认写了个handler
        localStorage.setItem("data", JSON.stringify(this.todolist))
        if (this.todolist.length == 0) {
          this.show = true;
          this.blurInput();
        }
      },
      deep: true
    },
    name: function () {
      localStorage.setItem("name", JSON.stringify(this.name))
    },
    id: function () {
      localStorage.setItem("id", JSON.stringify(this.id))
    },
  },
  created () {

    this.nowTime();
    this.getWeek(new Date());

    // 如果localstorage中有就用有的 没有就用this.todolist
    this.name = JSON.parse(localStorage.getItem("name")) || this.name;
    this.id = JSON.parse(localStorage.getItem("id")) || this.id;
    this.todolist = JSON.parse(localStorage.getItem("data")) || this.todolist;

  },
  mounted () {

    setInterval(() => {
      this.nowTime();
    }, 300);

    this.blurInput();

  },
  methods: {
    dragStart (val, i) {
      this.oldIndex = i
      this.oldData = val
    },
    dragOver (i) {
      this.newIndex = i
    },
    dragEnd () {
      let newItems = [...this.todolist]
      // 删除老的节点
      newItems.splice(this.oldIndex, 1)
      // 在列表中目标位置增加新的节点
      newItems.splice(this.newIndex, 0, this.oldData)
      this.todolist = [...newItems]
      this.newIndex = ''
    },
    formatDateTime (time) {
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1 < 10 ? "0" + (new Date(time).getMonth() + 1) : new Date(time).getMonth() + 1;
      let day = new Date(time).getDate() < 10 ? "0" + new Date(time).getDate() : new Date(time).getDate();
      let hh = new Date(time).getHours() < 10 ? "0" + new Date(time).getHours() : new Date(time).getHours();
      let mm = new Date(time).getMinutes() < 10 ? "0" + new Date(time).getMinutes() : new Date(time).getMinutes();
      let ss = new Date(time).getSeconds() < 10 ? "0" + new Date(time).getSeconds() : new Date(time).getSeconds();
      this.date = year + "-" + month + "-" + day;
      this.time = hh + ":" + mm + ":" + ss;
    },
    getWeek (date) {
      let week;
      if (date.getDay() == 0) week = "星期日"
      if (date.getDay() == 1) week = "星期一"
      if (date.getDay() == 2) week = "星期二"
      if (date.getDay() == 3) week = "星期三"
      if (date.getDay() == 4) week = "星期四"
      if (date.getDay() == 5) week = "星期五"
      if (date.getDay() == 6) week = "星期六"
      this.week = week;
    },
    nowTime () {
      this.formatDateTime(new Date());
    },
    change () {
      this.flag = !this.flag;
    },
    empty () {
      alert(1);
    },
    add () {
      this.id++
      this.todolist.push({ id: this.id, content: this.content, done: false });
      this.show = false;
      this.content = ''
    },
    named () {
      this.$refs.name.blur();
    },
    del (index) {
      // console.log(index)
      this.todolist.splice(index, 1)
      // 也可以 不如splice好
      // this.todolist = this.todolist.filter(item=>item!==todo) // 删就是取反 返回新数组
    },
    isDone (index) {
      this.todolist[index].done = !this.todolist[index].done;
    },
    blurInput() {
      this.$nextTick(() => {
        if (this.$refs.inputRef) {
          this.$refs.inputRef.focus();
        }
      });
    },
    addTopic () {
      this.show = !this.show;
      this.blurInput();
    }
  }
}
</script>

<style>
.checkboxBtn {
  width: 10%;
}

.checkboxBtn .cbx {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}

.checkboxBtn .cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}

.checkboxBtn .cbx span:first-child {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: scale(1);
  vertical-align: middle;
  border: 2px solid #fff;
  transition: all 0.2s ease;
}

.checkboxBtn .cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 6px;
  left: 4px;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}

.checkboxBtn .cbx span:first-child:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #506EEC;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}

.checkboxBtn .cbx:hover span:first-child {
  border-color: #3c53c7;
}

.checkboxBtn .inp-cbx:checked+.cbx span:first-child {
  border-color: #3c53c7;
  background: #3c53c7;
  animation: check-15 0.6s ease;
}

.checkboxBtn .inp-cbx:checked+.cbx span:first-child svg {
  stroke-dashoffset: 0;
}

.checkboxBtn .inp-cbx:checked+.cbx span:first-child:before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}

@keyframes check-15 {
  50% {
    transform: scale(1.2);
  }
}
</style>


<style lang="less" scoped>
.containerBox {
  width: 70%;
  max-width: 1500px;
  height: auto;
  margin: 0.5rem auto;
  height: auto;
  background-color: rgba(0, 0, 0, .3);
  // backdrop-filter: blur(10px);
  border-radius: 25px;

  .headerBox {
    text-align: center;
    height: auto !important;

    .timeBox {
      p {
        display: block;
        line-height: 1rem;
        user-select: none;
        font-size: 1rem;
        color: #fff;
      }

      .date {
        font-size: 0.3rem;
      }
    }

    .hello {
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1rem;
      line-height: 1rem;

      p {
        display: inline;
        user-select: none;
        font-size: 0.26rem;
        color: #fff;
        vertical-align: text-bottom;
      }

      input {
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

        &.active {
          border-bottom: none;
        }
      }
    }
  }

  .mainBox {
    text-align: center;
    padding: 0.3rem 0 0.5rem;
    width: 100%;
    height: auto;
    overflow: hidden;

    .taskBox {
      text-align: center;
      font-size: 0.3rem;
      color: #fff;

      .title {
        line-height: 0.5rem;
      }

      .form-control {
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

    .targetBox {
      width: 70%;
      margin: 0.5rem auto;

      .plusBtn {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
        display: block;
        font-size: 0.4rem;
        padding-bottom: 20px;
        cursor: pointer;
      }

      .statusBox {
        p {
          display: inline-block;
          padding: 0.2rem 0;
          font-size: 0.2rem;

          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }

      .list-group {
        .list-group-item {
          padding: 5px;
          margin-bottom: 10px;
          background-color: rgba(0, 0, 0, .1);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          height: auto;
          line-height: 0.5rem;
          font-size: 0.28rem;
          display: flex;
          align-items: center;

          .el-checkbox {
            width: 10%;
          }

          p {
            width: 80%;
            display: inline-block;
            background: 0;
            font-size: 0.26rem;
            color: #fff;
            flex: 1;
            user-select: none;

            &.done {
              color: #cccccc !important;
              text-decoration: line-through;
            }
          }

          .closeBtn {
            font-size: 0.4rem;
            width: 10%;
            cursor: pointer;

            &:hover {
              color: #ef5f65;
            }
          }
        }
      }
    }
  }
}

.author {
  opacity: 0.2;
  display: inline-block;
  position: fixed;
  bottom: 0.5rem;
  right: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .targetBox {
    width: 100%;
  }
}

.list-move {
  transition: transform .3s;
}

.list-group-item {

  position: relative;
}

.list-group-item.is-dragover::before {
  content: "";

  position: absolute;

  bottom: -4px;
  left: 0;
  width: 100%;
  height: 4px;

  background-color: #0c6bc9;
}

.list-group-item.is-dragover::after {
  content: "";

  position: absolute;
  bottom: -8px;
  left: -6px;
  border: 3px solid #0c6bc9;
  border-radius: 50%;
  width: 6px;
  height: 6px;

  background-color: #fff;
}
</style>
