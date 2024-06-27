// 手势识别
const defaultOptions = {
  el: window,
  events: {},
  triggerNum: 40,
  config: {
    /**
     * 是否松开手指
     */
    isEnd: true,
    /**
     * 鼠标/手指按下的位置
     */
    startPosition: {
      offsetX: 0,
      offsetY: 0,
    },
    /**
     * 手指的个数
     */
    touchFinger: 1,
    /**
     * 两指按下时的距离
     */
    initialDistance: 0,
  },
};
// 检查是否包含移动设备的特征字符串
function isMobileBrowser() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default class GestureJs {
  constructor(options) {
    const opt = { ...defaultOptions, ...options };
    this.el = typeof opt.el === "string" ? document.querySelector(opt.el) : opt.el;
    this.events = opt.events;
    this.triggerNum = opt.triggerNum;
    this.config = opt.config;
    this.init();
  }
  setEvents(e) {
    this.events = { ...this.events, ...e };
  }
  init() {
    if (!Object.keys(this.events).length) {
      throw new Error("请传递手势事件");
    }
    if (isMobileBrowser()) {
      this.observeTouchGesture();
    } else {
      this.observeMouseGesture();
    }
  }

  uninstall() {
    if (isMobileBrowser()) {
      this.unObserveTouchGesture();
    } else {
      this.unObserveMouseGesture();
    }
  }
  unObserveMouseGesture() {}
  unObserveTouchGesture() {}

  /**
   * pc
   */
  observeMouseGesture() {
    this.el.addEventListener("mousedown", event => {
      if (!this.config.isEnd) {
        return;
      }
      this.config = {
        ...this.config,
        isEnd: false,
        startPosition: {
          offsetX: event.offsetX,
          offsetY: event.offsetY,
        },
      };
    });

    this.el.addEventListener("mouseup", event => {
      if (this.config.isEnd) {
        return;
      }
      const deltaX = Math.floor(event.offsetX - this.config.startPosition.offsetX);
      const deltaY = Math.floor(event.offsetY - this.config.startPosition.offsetY);
      this._detectSwipeDirection(deltaX, deltaY);
      this._resetConfig();
    });

    this.el.addEventListener("mouseleave", event => {
      this.config.isEnd = true;
    });

    this.el.addEventListener("wheel", event => {
      console.log("wheel====", event);
      // 鼠标滚轮事件
      if (event.deltaY > 0) {
        // 向下滚动
        this._downwardScroll();
      } else if (event.deltaY < 0) {
        // 向上滚动
        this._upwardScroll();
      }
    });
  }

  /**
   * 移动端
   */
  observeTouchGesture() {
    // 监听触摸事件
    this.el.addEventListener("touchstart", event => {
      if (!this.config.isEnd) {
        return;
      }
      this.config.touchFinger = event.touches.length;
      // 单指触摸
      if (event.touches.length === 1) {
        this.config = {
          ...this.config,
          isEnd: false,
          startPosition: {
            offsetX: event.touches[0].clientX,
            offsetY: event.touches[0].clientY,
          },
        };
        return;
      }
      // 两指触摸，可能进行放大缩小操作
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        this.config = {
          ...this.config,
          initialDistance: Math.sqrt(Math.pow(touch1.screenX - touch2.screenX, 2) + Math.pow(touch1.screenY - touch2.screenY, 2)),
        };
        return;
      }
    });
    /**
     * TODO: 添加防抖
     */
    this.el.addEventListener("touchmove", event => {
      if (this.config.isEnd || event.touches.length !== this.config.touchFinger) {
        return;
      }
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const currentDistance = Math.sqrt(Math.pow(touch1.screenX - touch2.screenX, 2) + Math.pow(touch1.screenY - touch2.screenY, 2));
        const deltaDistance = currentDistance - this.config.initialDistance;
        if (deltaDistance > 0) {
          // 缩放放大
          this._pinchZoom("enlarge");
        } else if (deltaDistance < 0) {
          // 缩放缩小
          this._pinchZoom("narrow");
        }
      }
    });

    this.el.addEventListener("touchend", event => {
      if (this.config.isEnd || event.touches.length !== this.config.touchFinger) {
        return;
      }
      if (event.touches.length === 1) {
        const deltaX = Math.floor(event.touches[0].clientX - this.config.startPosition.offsetX);
        const deltaY = Math.floor(event.touches[0].clientY - this.config.startPosition.offsetY);
        this._detectSwipeDirection(deltaX, deltaY);
      }
      this._resetConfig();
    });
  }

  /**
   * 向上滑动
   */
  _upwardSliding(offset) {
    this.events.upwardSliding && this.events.upwardSliding(offset);
  }

  /**
   * 向下滑动
   */
  _downwardSliding(offset) {
    this.events.downwardSliding && this.events.downwardSliding(offset);
  }

  /**
   * 向左滑动
   */
  _leftSliding(offset) {
    this.events.leftSliding && this.events.leftSliding(offset);
  }

  /**
   * 向右滑动
   */
  _rightSliding(offset) {
    this.events.rightSliding && this.events.rightSliding(offset);
  }

  _pinchZoom(zoomType) {
    this.events.pinchZoom && this.events.pinchZoom(zoomType);
  }

  /**
   * 鼠标滚动向上
   */
  _upwardScroll() {
    this.events.upwardScroll && this.events.upwardScroll();
  }

  /**
   * 鼠标滚动向下
   */
  _downwardScroll() {
    this.events.downwardScroll && this.events.downwardScroll();
  }

  /**
   * @param {*} deltaX x轴方向开始-结束的距离
   * @param {*} deltaY y轴方向开始-结束的距离
   * @returns
   */
  _detectSwipeDirection(deltaX, deltaY) {
    if (Math.abs(deltaX) < this.triggerNum && Math.abs(deltaY) < this.triggerNum) {
      console.log("移动的值不足以达到触发事件的条件!");
      return;
    }
    if (Math.abs(deltaX) - Math.abs(deltaY) > 0) {
      // 左右滑动
      if (deltaX > 0) {
        this._rightSliding(Math.abs(deltaX));
      } else {
        this._leftSliding(Math.abs(deltaX));
      }
    } else {
      // 上下滑动
      if (deltaY > 0) {
        this._downwardSliding(Math.abs(deltaY));
      } else {
        this._upwardSliding(Math.abs(deltaY));
      }
    }
  }

  _resetConfig() {
    this.config = { ...defaultOptions.config };
  }
}
