# my-dialog
a public dialog for everyone is based on vue and vuex
## API

#### 描述

> 可改变大小、位置的对话框

#### 版本

### **V1.0.0** (用于演示版)

- 新增 改变dialog大小、位置 功能

#### Demo
```javascript
<my-dialog
  width="470"
  height="347"
  :padBottom="'0px'"
  :titleHeight="'auto'"
  :titlePadding="'15px 8px 15px 16px'"
  :useModal="false"
  :enableTransform="true"
  :isMediaScreen="true"
  @close="closeMe"
  @dialogTransform="dialogTransform"
  @getDialogTop="getDialogTop"
  @getDialogLeft="getDialogLeft">
</my-dialog>
```
#### Props
| Props          | 说明                                            | type    | default            |
| -------------- | ----------------------------------------------- | ------ | ------------------ |
| width          | Dialog的宽度                                     | String  | '700'             |
| height         | Dialog的高度                                     | String | 'auto'             |
| overFolw       | Dialog过大出现的溢出部分的处理                      | String | 'hidden'           |
| titleHeight    | Dialog标题部分的高度                               | String | '20px'             |
| titlePadding   | Dialog标题部分的内边距                             | String | '30px 0 20px 20px' |
| padBottom      | Dialog底部内边距                                  | String | ''                 | 
| useModal       | 是否使用黑色遮罩层                                  | Boolean| true               |
| enableTransform| 是否使用自由拉伸Dialog功能以及拖拽dialog                          | Boolean | false             |
| isMediaScreenn | 是否使用响应式功能                                  | Boolean  | false            |
| isBufferDrag   | 是否添加缓冲功能 (拖拽dilog距离大于3px时才能拖动dialog)| Boolean | false             |
#### Events
| Events | 说明                           | 返回值 |
| ------ | ----------------------------- | ------|
| close | Dialog关闭的回调 |      --   |
| isMoving | Dialog的状态（移动中／静止）| Boolean  |
| dialogTransform | 获取dialog的大小  返回值为对象  |{width: (Number) , height: (Number)}|
| getDialogTop | 获取Dialog当前的top值 | Number |
| getDialogLeft | 获取Dialog当前的Left值 | Number |
