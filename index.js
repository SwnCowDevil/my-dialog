module.exports = function (store) {
  return {
    name: 'my-dialog',
    prop: {
      data () {
        return {
          zoomX: 0,
          zoomY: 0,

          dragTargetWidth: 0,
          dragTargetHeight: 0,
          dragTargetTop: 220,
          dragTargetLeft: 220,

          isHeightAuto: true,
          dialogOpacity: 0,
          isMoving: false,

          startMoveY: 0, // define 'isbuffer'‘s startPosition and endPosition
          startMoveX: 0,
          endMoveX: 0,
          endMoveY: 0,

          BUFFER_RANGE: 3,
          HEADER_HEIGHT: 54,
 
          BORDER_WIDTH: 10,
          transformStatusLock: false,
          dragStatusLock: false,

          customDialogSizeLock: false,
          CLOSE_BTN_RIGHT_NUM: 0,

        }
      },
      template: `<div>
      							<div 
      								class="dialog-layer-mask" 
      								:style="{width: useModal ? screenWidth + 'px' : 'px', height: useModal ? getScreenHeight + 'px' : '0px'}">
      							</div>
										<div 
											class="dialog-border border-common-radius box-common-shadow pr"

											:style="{width: dragTargetWidth + 'px', height: isHeightAuto ? 'auto' : dragTargetHeight + 'px', left: dragTargetLeft + 'px', top: dragTargetTop + 'px'}"
											
											>
											
											<div 
									 			class="dilog-container"
									 			:style="{opacity: dialogOpacity, margin: BORDER_WIDTH + 'px', overflow: overFlow, paddingBottom: padBottom}">
												
												<div 
                        class="dialog-title no-selcet pr"
                        :style="{padding: titlePadding, height: titleHeight}">
                          <div @click="close">
                            <span class="close no-select el-icon-close"></span>
                          </div>

													<slot name="title"></slot>
												</div>

                        <div 
                          class="dialog-drag selectable-box ps"
                          :style="{width: dragTargetWidth - 2 * BORDER_WIDTH - CLOSE_BTN_RIGHT_NUM + 'px', top: BORDER_WIDTH + 'px', left: BORDER_WIDTH + 'px', cursor: enableDrag ? 'move' : 'default'}" 
                          @mousemove="dragEvent($event)"
                          @mousedown="selectBorder($event)"
                          @mouseleave="stopMoveEvent($event)"
                          @mouseup="cancleSelect($event)">
                        </div>

												<div 
													class="dialog-content">
													<slot name="content"></slot>
												</div>
												
									 		</div>

                      <div 
                        class="seleted-div-container"
                        @mousedown="selectBorder($event)"
                        @mouseup="cancleSelect($event)">
                        <div 
                          class="dialog-top selectable-box ps"
                          :style="{height: BORDER_WIDTH + 'px',width: dragTargetWidth - 2 * BORDER_WIDTH + 'px', left: BORDER_WIDTH + 'px', cursor: enableTransform ? 'n-resize' : 'default'}"
                          @mousemove="topEvent($event)">
                        </div>

                        <div 
                          class="dialog-bottom selectable-box ps" 
                          :style="{height: BORDER_WIDTH + 'px',width: dragTargetWidth - 2 * BORDER_WIDTH + 'px', left: BORDER_WIDTH + 'px', cursor: enableTransform ? 's-resize' : 'default'}"
                          @mousemove="bottomEvent($event)">
                        </div>

                        <div 
                          class="dialog-left selectable-box ps"
                          :style="{width: BORDER_WIDTH + 'px',height: dragTargetHeight - 2 * BORDER_WIDTH + 'px', top: BORDER_WIDTH + 'px', cursor: enableTransform ? 'w-resize' : 'default'}" 
                          @mousemove="leftEvent($event)">
                        </div>

                        <div 
                          class="dialog-right selectable-box ps" 
                          :style="{width: BORDER_WIDTH + 'px',height: dragTargetHeight - 2 * BORDER_WIDTH + 'px', top: BORDER_WIDTH + 'px', cursor: enableTransform ? 'e-resize' : 'default'}"
                          @mousemove="rightEvent($event)">
                        </div>

                        <div 
                          class="dialog-top-left selectable-box ps" 
                          :style="{width: BORDER_WIDTH + 'px',height: BORDER_WIDTH + 'px', cursor: enableTransform ? 'nw-resize' : 'default'}"
                          @mousemove="topLeftEvent($event)">
                        </div>

                        <div 
                          class="dialog-top-right selectable-box ps"
                          :style="{width: BORDER_WIDTH + 'px',height: BORDER_WIDTH + 'px', cursor: enableTransform ? 'ne-resize' : 'default'}"
                          @mousemove="topRightEvent($event)">
                        </div>

                        <div 
                          class="dialog-bottom-left selectable-box ps"
                          :style="{width: BORDER_WIDTH + 'px',height: BORDER_WIDTH + 'px', cursor: enableTransform ? 'sw-resize' : 'default'}" 
                          @mousemove="bottomLeftEvent($event)">
                        </div>

                        <div 
                          class="dialog-bottom-right selectable-box ps"
                          :style="{width: BORDER_WIDTH + 'px',height: BORDER_WIDTH + 'px', cursor: enableTransform ? 'se-resize' : 'default'}" 
                          @mousemove="bottomRightEvent($event)">
                        </div>
                      </div>

										</div>
      					 </div>`,
      props: {
        width: {
          type: String,
          default: '700'
        },
        height: {
          type: String,
          default: 'auto'
        },
        overFlow: {
          type: String,
          default: 'hidden'
        },
        titlePadding: {
          type: String,
          default: '30px 0 20px 20px'
        },
        useModal: {
          type: Boolean,
          default: true
        },
        enableTransform: {
          type: Boolean,
          default: true
        },
        enableDrag: {
          type: Boolean,
          default: true
        },
        isMediaScreen: {
          type: Boolean,
          default: false
        },
        isBufferDrag:{
          type: Boolean,
          default: false
        },
        titleHeight: {
          type: String,
          default: '20px'
        },
        padBottom: {
          type: String,
          default: ''
        },
        hotSpotsHeight: {
          type: Number,
          default: 47
        },
      },
      computed: {
        menuWidth: ()=> {
          if (store) {
            return store.getters.menuWidth

          } else {
            return 132
          }
        },
        screenWidth: ()=> {
          if (store) {
            return store.getters.screenWidth

          } else {
            return document.documentElement.clientWidth || document.body.clientWidth
          }
        },
        getScreenHeight: ()=> {
          if (store) {
            return store.getters.getScreenHeight

          } else {
            return document.documentElement.clientHeight || document.body.clientHeight
          }
        },
      },
      mounted: function mounted() {
        this.container = this.$el.children[1]
        
        this.isHeightAuto = false

        this.CLOSE_BTN_RIGHT_NUM = 30
        this.CAN_WHOLE_MOVE_RANGE = 60

        this.defineDialogSize()
        
        if (this.isMediaScreen) {
          this.handleMediaScreen(this.screenWidth)
        }
      },

      methods: {
        defineDialogSize(){
          if (!this.customDialogSizeLock) {
            this.dragTargetWidth = Number(this.width)
            this.dragTargetHeight = Number(this.height)
            this.firstLoadCenter()
          } else {
            this.dragTargetWidth = Number(this.width)
            this.dragTargetHeight = Number(this.height)
            this.customFirstLoadCenter()
          }
        },
        firstLoadCenter(){
          this.getHeightTimer = setTimeout(()=> {
            if (this.container.clientHeight > 0) {

              if (this.container.clientHeight >= this.getScreenHeight - this.HEADER_HEIGHT) {
                this.dialogOpacity = 1
                this.dragTargetLeft = (this.screenWidth - this.width + this.menuWidth) / 2 
                this.dragTargetTop = this.HEADER_HEIGHT
                this.dragTargetHeight = this.container.clientHeight
              } else{
                this.dialogOpacity = 1
                this.dragTargetLeft = (this.screenWidth - this.width + this.menuWidth) / 2 
                this.dragTargetTop = (this.getScreenHeight - this.container.clientHeight) / 2 + this.HEADER_HEIGHT / 2
                this.dragTargetHeight = this.container.clientHeight
              }

            } else {
              this.firstLoadCenter()
            }
          }, 10)

        },
        customFirstLoadCenter(){
          this.getHeightTimer = setTimeout(()=> {
            if (this.container.clientHeight > 0) {

              if (this.container.clientHeight >= this.getScreenHeight - this.HEADER_HEIGHT) {
                this.dialogOpacity = 1
                this.dragTargetLeft = (this.screenWidth - this.width + this.menuWidth) / 2 
                this.dragTargetTop = this.HEADER_HEIGHT
              } else{
                this.dialogOpacity = 1
                this.dragTargetLeft = (this.screenWidth - this.width + this.menuWidth) / 2 
                this.dragTargetTop = (this.getScreenHeight - this.container.clientHeight) / 2 + this.HEADER_HEIGHT / 2
              }

            } else {
              this.customFirstLoadCenter()
            }
          }, 10)
        },
        stopDialogOutPages(top){
          if (top < this.HEADER_HEIGHT) {
            this.dragTargetTop = this.HEADER_HEIGHT
          }
        },
        close() {
          this.$emit('close')
        },
        selectBorder(event){
        	if (this.enableTransform) {
        		this.transformStatusLock = true
        	}
        	if (this.enableDrag) {
        		this.dragStatusLock = true

            if (this.isBufferDrag) {
              this.startMoveX = event.clientX
              this.startMoveY = event.clientY
            }

        	}

        	this.zoomX = event.clientX
          this.zoomY = event.clientY

          event.target.classList.add("active-selectable-box")

        },
        cancleSelect(event){
        	this.transformStatusLock = false
        	this.dragStatusLock = false
          this.isMoving = false
        	event.target.classList.remove("active-selectable-box")
        },
        dragEvent(event){
        	if (this.dragStatusLock) {

            if (this.isBufferDrag) {

              if (this.horJudgeBufferRange(event) && this.verJudegBufferRange(event)) {
                return
              } else {
                this.isMoving = true
                this.doMove(event)
                this.stopDialogOutPages(this.dragTargetTop)
              }

            } else {
              this.isMoving = true
              this.doMove(event)
              this.stopDialogOutPages(this.dragTargetTop)
            }

        	}
        },
        stopMoveEvent(event){
          this.dragStatusLock = false
        },
        doMove(event){
          var reLeft = event.clientX - this.zoomX;
          var reTop = event.clientY - this.zoomY;

          this.zoomX = event.clientX;
          this.zoomY = event.clientY;
          var containerLeft = this.container.offsetLeft
          var containerTop = this.container.offsetTop
          this.dragTargetTop = containerTop + reTop
          this.dragTargetLeft = containerLeft + reLeft
        },
        topEvent(event){

        	if (this.transformStatusLock) {
            this.isMoving = true

        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	          this.dragTargetHeight = this.dragTargetHeight - reTop
	          this.dragTargetTop = containerTop + reTop
        	}
        },
        bottomEvent(event){
        	if (this.transformStatusLock) {
            this.isMoving = true

        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	         	this.dragTargetHeight += reTop
        	}
        },
        leftEvent(event){
        	if (this.transformStatusLock) {
            this.isMoving = true

        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	          this.dragTargetWidth = this.dragTargetWidth - reLeft
            this.dragTargetLeft = containerLeft + reLeft
        	}
        },
        rightEvent(event){
        	if (this.transformStatusLock) {
            this.isMoving = true
        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	          this.dragTargetWidth += reLeft
        	}
        },
        topLeftEvent(event){
        	if (this.transformStatusLock) {
            this.isMoving = true

        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	          this.dragTargetWidth = this.dragTargetWidth - reLeft
            this.dragTargetLeft = containerLeft + reLeft

            this.dragTargetHeight = this.dragTargetHeight - reTop
            this.dragTargetTop = containerTop + reTop
        	}
        },
        topRightEvent(event){
        	if (this.transformStatusLock) {
            this.isMoving = true

        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	          this.dragTargetWidth += reLeft
            this.dragTargetHeight = this.dragTargetHeight - reTop
            this.dragTargetTop = containerTop + reTop
        	}
        },
        bottomLeftEvent(event){
        	if (this.transformStatusLock) {
            this.isMoving = true

        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	          this.dragTargetWidth = this.dragTargetWidth - reLeft
            this.dragTargetLeft = containerLeft + reLeft

            this.dragTargetHeight += reTop

        	}
        },
        bottomRightEvent(event){
        	if (this.transformStatusLock) {
            this.isMoving = true

        		var reLeft = event.clientX - this.zoomX;
	          var reTop = event.clientY - this.zoomY;

	          this.zoomX = event.clientX;
	          this.zoomY = event.clientY;
	          var containerLeft = this.container.offsetLeft
	          var containerTop = this.container.offsetTop

	          this.dragTargetWidth += reLeft
            this.dragTargetHeight += reTop
        	}
        },
        
        getCurrentHeight(){
          var currentHeight = this.container.clientHeight
          this.isHeightAuto = false
          this.dragTargetHeight = currentHeight
        },

        horJudgeBufferRange(event){
          return event.clientX - this.startMoveX < this.BUFFER_RANGE && event.clientX - this.startMoveX > -this.BUFFER_RANGE
        },
        verJudegBufferRange(event){
          return event.clientY - this.startMoveY < this.BUFFER_RANGE && event.clientY - this.startMoveY > -this.BUFFER_RANGE
        },
        
        handleMediaScreen(screenWidth){
          if (screenWidth >=800 && screenWidth <1280) {
            this.dragTargetWidth = 530
            this.dragTargetHeight = 390
          }else if (screenWidth >=1280 && screenWidth <1440) {
            this.dragTargetWidth = 680
            this.dragTargetHeight = 450
          }else if (screenWidth >=1440 && screenWidth <1920) {
            this.dragTargetWidth = 810
            this.dragTargetHeight = 600
          }
        }
      },
      watch: {
        screenWidth(change){
          if (this.isMediaScreen) {
            this.handleMediaScreen(change)
          }
        },
        getScreenHeight(change){
          if (this.isMediaScreen) {
            this.handleMediaScreen(change)
          }
        },
        dragTargetWidth(change){
          if (change) {
            this.$emit('dialogTransform',{width: this.dragTargetWidth, height: this.dragTargetHeight})
          }
        },
        dragTargetHeight(change){
          if (change) {
            this.$emit('dialogTransform',{width: this.dragTargetWidth, height: this.dragTargetHeight})
          }
        },
        dragTargetTop(change){
          if (change) {
            this.$emit('getDialogTop',change)
          }
        },
        dragTargetLeft(change){
          if (change) {
            this.$emit('getDialogLeft',change)
          }
        },
        isMoving(move){
          this.$emit('isMoving',move)
        },
        width(width) {
          if (width) {
            this.customDialogSizeLock = true
          }
        },
        height(height) {
          if (height) {
            this.customDialogSizeLock = true
          }
        }
      }
    }
  };
};