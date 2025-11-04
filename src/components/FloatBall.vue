<template>
  <div class="float-ball" @mousedown="startDrag" @click.stop="copyCheckedValues">
  </div>
</template>

<script>
export default {
  name: 'FloatBall',
  data() {
    return {
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      dragMoved: false // 新增标志位
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.dragMoved = false; // 新增标志位
      const ball = this.$el;
      const rect = ball.getBoundingClientRect();
      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(event) {
      if (!this.isDragging) return;
      this.dragMoved = true; // 标记为已移动
      const ball = this.$el;
      const parentRect = ball.parentElement.getBoundingClientRect();
      const newX = event.clientX - this.offsetX;
      const newY = event.clientY - this.offsetY;

      // 限制漂浮球在窗口范围内移动
      const minX = parentRect.left;
      const minY = parentRect.top;
      const maxX = parentRect.right - ball.offsetWidth;
      const maxY = parentRect.bottom - ball.offsetHeight;

      ball.style.left = `${Math.min(Math.max(newX, minX), maxX)}px`;
      ball.style.top = `${Math.min(Math.max(newY, minY), maxY)}px`;
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    copyCheckedValues(event) {
      if (this.dragMoved) return; // 如果拖动过则不执行点击逻辑
      const checkedInputs = document.querySelectorAll('input[type="checkbox"]:checked');
      const values = Array.from(checkedInputs).map((input, index) => `${index + 1}. ${input.closest('li').querySelector('p').textContent.trim()}`);
      if (values.length > 0) {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'array') {
          navigator.clipboard.writeText(values.join('\n')).then(() => {
            this.showMessage(`复制成功！`);
          }).catch(err => {
          console.error('Clipboard API 复制失败', err);
          this.fallbackCopy(values.join('\n')); // 失败时降级
          });
        } else {
          // 不支持 Clipboard API 时直接降级
          this.fallbackCopy(values.join('\n'));
        }
      } else {
        this.showMessage('没有选中的项！');
      }
    },
    fallbackCopy(text) {
      // 创建临时文本框
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed'; // 避免滚动到视图外
      document.body.appendChild(textarea);
      textarea.select(); // 选中文本
      textarea.setSelectionRange(0, text.length); // 兼容移动设备

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          this.showMessage(`复制成功！`);
        }
      } catch (err) {
        console.error('复制失败', err);
      } finally {
        document.body.removeChild(textarea); // 清理临时元素
      }
    },
    showMessage(msg, type = 'success') {
      const messageContainer = document.createElement('div');
      messageContainer.className = `message-box ${type}`;
      messageContainer.textContent = msg;

      // 添加到 body
      document.body.appendChild(messageContainer);

      // 强制触发重绘以应用动画
      getComputedStyle(messageContainer).top;
      messageContainer.classList.add('show');

      // 定时移除消息
      setTimeout(() => {
        messageContainer.classList.remove('show');
        messageContainer.addEventListener('transitionend', () => {
          messageContainer.remove();
        });
      }, 3000);
    }
  }
};
</script>

<style scoped>
.float-ball {
  position: fixed;
  right: 600px;
  bottom: 200px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.5); /* 添加透明边框 */
  backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.float-ball:hover {
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
}
.totalBtn {
  font-size: 32px;
  color: #506EEC;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style>
.message-box {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px); /* 初始状态 */
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
}
.message-box.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0); /* 目标状态 */
}
.message-box.success {
  background: #67c23a;
}
.message-box.error {
  background: #f56c6c;
}
.message-box.info {
  background: #909399;
}
.message-box.warning {
  background: #e6a23c;
}
</style>
