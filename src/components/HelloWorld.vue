<template>
  <div class="components-container">
    <div class="editor-container">
      <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
    </div>
    <div id="btns">
      <button @click="getAllHtml()">获得整个html的内容</button>
      <button @click="getContent()">获得内容</button>
      <button @click="setContent()">写入内容</button>
      <button @click="setContent(true)">追加内容</button>
      <button @click="getContentTxt()">获得纯文本</button>
      <button @click="getPlainTxt()">获得带格式的纯文本</button>
      <button @click="hasContent()">判断是否有内容</button>
      <button @click="setFocus()">使编辑器获得焦点</button>
      <button @click="isFocus($event)">编辑器是否获得焦点</button>
      <button @click="setblur($event)">编辑器失去焦点</button>
      <button @click="getText()">获得当前选中的文本</button>
      <button @click="insertHtml()">插入给定的内容</button>
      <button id="enable" @click="setEnabled()">可以编辑</button>
      <button @click="setDisabled()">不可编辑</button>
      <button @click=" hide()">隐藏编辑器</button>
      <button @click=" show()">显示编辑器</button>
      <button @click=" setHeight(300)">设置高度为300默认关闭了自动长高</button>
      <button @click="getLocalData()">获取草稿箱内容</button>
      <button @click="clearLocalData()">清空草稿箱</button>
      <!-- <button @click="createEditor()" id="createUe">创建编辑器</button>
      <button @click="deleteEditor()">删除编辑器</button> -->
    </div>
  </div>
</template>
<style>
.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
}
</style>
<script>
//注意引入路径
import UE from "./ue/ue.vue";
export default {
  components: { UE },
  data() {
    return {
      defaultMsg: "这里是UE测试",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      UEcompent: null,
      UE: null,
      editor: null
    };
  },
  mounted() {
    // 获取UE对象
    this.UEcompent = this.$refs.ue;
    // 获取UE对象
    this.UE = this.UEcompent.getUE();
    // 获取UE实例编辑对象
    this.editor = this.UEcompent.getEditor();
  },
  methods: {
    getUeFn() {
      // 获取UE对象
      this.UEcompent = this.$refs.ue;
      // 获取UE对象
      this.UE = this.UEcompent.getUE();
      // 获取UE实例编辑对象
      this.editor = this.UEcompent.getEditor();
    },
    isFocus(e) {
      alert(this.editor.isFocus());
      this.UE.dom.domUtils.preventDefault(e);
    },
    setblur(e) {
      this.editor.blur();
      this.UE.dom.domUtils.preventDefault(e);
    },
    insertHtml() {
      var value = prompt("插入html代码", "");
      this.editor.execCommand("insertHtml", value);
    },
    // createEditor() {
    //   this.enableBtn();
    //   this.UEcompent.createEditor();
    //   this.getUeFn();
    // },
    getAllHtml() {
      alert(this.editor.getAllHtml());
    },
    getContent() {
      var arr = [];
      arr.push("使用editor.getContent()方法可以获得编辑器的内容");
      arr.push("内容为：");
      arr.push(this.editor.getContent());
      alert(arr.join("\n"));
    },
    getPlainTxt() {
      var arr = [];
      arr.push(
        "使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容"
      );
      arr.push("内容为：");
      arr.push(this.editor.getPlainTxt());
      alert(arr.join("\n"));
    },
    setContent(isAppendTo) {
      var arr = [];
      arr.push(
        "使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容"
      );
      this.editor.setContent("欢迎使用ueditor", isAppendTo);
      alert(arr.join("\n"));
    },
    setDisabled() {
      this.editor.setDisabled("fullscreen");
      this.disableBtn("enable");
    },
    setEnabled() {
      this.editor.setEnabled();
      this.enableBtn();
    },
    getText() {
      //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
      var range = this.editor.selection.getRange();
      range.select();
      var txt = this.editor.selection.getText();
      alert(txt);
    },
    getContentTxt() {
      var arr = [];
      arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
      arr.push("编辑器的纯文本内容为：");
      arr.push(this.editor.getContentTxt());
      alert(arr.join("\n"));
    },
    hasContent() {
      var arr = [];
      arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
      arr.push("判断结果为：");
      arr.push(this.editor.hasContents());
      alert(arr.join("\n"));
    },
    setFocus() {
      this.editor.focus();
    },
    // deleteEditor() {
    //   this.disableBtn();
    //   this.UEcompent.deleteEditor();
    //   document.getElementById("createUe").removeAttribute("disabled");
    // },
    disableBtn(str) {
      var div = document.getElementById("btns");
      var btns = this.UE.dom.domUtils.getElementsByTagName(div, "button");
      for (var i = 0, btn; (btn = btns[i++]); ) {
        if (btn.id == str) {
          this.UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        } else {
          btn.setAttribute("disabled", "true");
        }
      }
    },
    enableBtn() {
      var div = document.getElementById("btns");
      var btns = this.UE.dom.domUtils.getElementsByTagName(div, "button");
      for (var i = 0, btn; (btn = btns[i++]); ) {
        this.UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
      }
    },
    getLocalData() {
      alert(this.editor.execCommand("getlocaldata"));
    },

    clearLocalData() {
      //清空功能无效
      this.editor.execCommand("clearlocaldata");
      alert("已清空草稿箱");
    },
    //隐藏编辑器
    hide() {
      this.UEcompent.hideEditor();
    },
    //显示编辑器
    show() {
      this.UEcompent.showEditor();
    },
    //设置编辑器高度
    setHeight(num) {
      this.UEcompent.setEditorHeight(num);
    }
  }
};
</script>