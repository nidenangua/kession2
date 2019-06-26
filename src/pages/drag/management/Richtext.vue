<template>
  <div>
    <div id="richtext"></div>
  </div>
</template>
<script>
let richtextEditor;
import { domap } from "@/utils";
export default {
  name: "Richtext",
  props: ["managementData"],
  data() {
    return {
      loadedLength: 0,
      jsArr: [
        {
          src: "/Public/ueditor/ueditor.config.js",
          id: "ueditorConfig"
        },
        {
          src: "/Public/ueditor/ueditor.all.min.js",
          id: "ueditorAllMin"
        }
      ]
    };
  },
  methods: {
    loadJs() {
      domap(this.jsArr, js => {
        if (!document.getElementById(js.id)) {
          let script = document.createElement("script");
          script.src = js.src;
          script.id = js.id;
          document.body.appendChild(script);
          script.addEventListener("load", () => {
            this.loadedLength++;
          });
        } else {
          this.loadedLength++;
        }
      });
      this.getIsLoaded();
    },
    getIsLoaded() {
      if (this.loadedLength === this.jsArr.length) {
        this.createEditor();
      } else {
        setTimeout(() => {
          this.getIsLoaded();
        }, 100);
      }
    },
    createEditor() {
      if (richtextEditor) {
        richtextEditor.destroy();
      }
      richtextEditor = UE.getEditor("richtext", {
        initialFrameWidth: "100%",
        initialFrameHeight: "500",
        toolbars: [
          [
            "fullscreen",
            "myinsertimage",
            "undo",
            "redo",
            "|",
            "fontsize",
            "forecolor",
            "bold",
            "italic",
            "underline",
            "fontborder",
            "strikethrough",
            "|",
            "justifyleft",
            "justifycenter",
            "justifyright",
            "|",
            "removeformat",
            "formatmatch",
            "autotypeset",
            "pasteplain",
            "|",
            "backcolor"
          ]
        ]
      });
      richtextEditor.commands["myinsertimage"] = {
        execCommand: function() {
          top.addTypeChange(
            "/home.html/home/Index/imageslist?appid-6,courseType-4,name-richtext,type-top,chektype-0",
            "930px",
            "610px",
            { title: "选择图片", type: "top" }
          );
          return true;
        },
        queryCommandState: function() {}
      };

      richtextEditor.addListener("ready", e => {
        richtextEditor.setContent(this.managementData.code);
      });
      richtextEditor.addListener("contentChange", e => {
        this.managementData.code = richtextEditor.getContent();
      });
    }
  },
  mounted() {
    this.loadJs();
  }
};
</script>

