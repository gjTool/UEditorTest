<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      editor: null
    };
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted() {
    //创建编辑器
    this.createEditor();
  },
  methods: {
    // 获取UE对象
    getUE() {
      return UE;
    },
    // 获取UE实例编辑器对象
    getEditor() {
      return this.editor;
    },
    //创建编辑器
    createEditor() {
      const _this = this;
      this.editor = UE.getEditor("editor", this.config); // 初始化UE
      this.editor.addListener("ready", function() {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    //删除编辑器
    deleteEditor() {
      this.editor.destroy();
    },
    //隐藏编辑器
    hideEditor() {
      this.editor.setHide();
    },
    //显示编辑器
    showEditor() {
      this.editor.setShow();
    },
    //设置编辑器高度
    setEditorHeight(num) {
      this.editor.setHeight(num);
    }
  },
  destroyed() {
    //删除编辑器
    this.deleteEditor();
  }
};
</script>