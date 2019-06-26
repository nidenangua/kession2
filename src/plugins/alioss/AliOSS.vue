<template>
  <div>
    <input type="file" id="oss-selectfile" ref="selectfile" @change="fileChange" v-if="show">
    <el-dialog
      width="400px"
      :title="uploadInfo.progress < 100 ? '正在上传' : '上传成功'"
      :visible.sync="uploadInfo.visible"
      v-if="uploadInfo.visible"
      :show-close="false"
    >
      <div class="uploadInfo__file_name">上传文件：{{uploadInfo.fileName}}</div>
      <el-progress :percentage="uploadInfo.progress" v-if="uploadInfo.progress < 100"></el-progress>
      <el-progress :percentage="uploadInfo.progress" status="success" v-else></el-progress>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
let par = {};
export default {
  name: "AliOSS",
  data() {
    return {
      show: true,
      uploadInfo: {
        fileName: "",
        progress: 0,
        visible: false
      }
    };
  },
  methods: {
    /**
     * 获取文件格式
     */
    getSuffix(filename) {
      let pos = filename.lastIndexOf(".");
      let suffix = "";
      if (pos != -1) {
        suffix = filename.substring(pos);
      }
      return suffix;
    },
    /**
     * 文件进入
     */
    fileChange(e) {
      let file = e.target.files[0];

      let suffix = this.getSuffix(file.name);
      /**
       * par.type  1图片 2视频 3音频 4文档 5资料
       * 资料不限制格式
       */
      if (par.type === "data") {
        this.setUploadParam(file);
      } else if (par.type === "audio" || par.type === "examAudio") {
        if (file.size / 1024 > 20 * 1024) {
          this.$msg("您选择的文件过大，请上传20mb以内的音频");
          return false;
        }
        let reg = /^(\.mp3|\.wma)$/i;
        if (suffix && !reg.test(suffix)) {
          this.$msg("您选择的文件后缀不对");
          return false;
        }

        this.setUploadParam(file);
      } else {
        if (file.size / 1024 > 2 * 1024) {
          this.$msg("您选择的文件过大，请上传2mb以内的图片");
          return false;
        }
        /**
         * 默认为图片上传
         */
        let reg = /^(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
        if (suffix && !reg.test(suffix)) {
          this.$msg("您选择的文件后缀不对");
          return false;
        }

        this.setUploadParam(file);
      }
    },
    /**
     * 配置上传参数
     */
    setUploadParam(_file) {
      this.uploadInfo.fileName = _file.name;
      this.uploadInfo.visible = true;
      /**
       * 获取阿里直传签名
       */
      let _params = {
        wxid: par.wxid,
        filename: _file.name
      };
      if (par.type) {
        switch (par.type) {
          case "audio":
            _params.type = 3;
            break;
          case "data":
            _params.type = 5;
            break;
          case "examAudio":
            _params.type = 6;
            break;
        }
      }
      axios
        .get("/Plus/Kesion.ajax.php?act=uploadAliBos", {
          params: _params
        })
        .then(obj => {
          obj = obj.data;
          let formData = new FormData();
          formData.append("key", obj.dir);
          formData.append("policy", obj.policy);
          formData.append("OSSAccessKeyId", obj.accessid);
          formData.append("success_action_status", "200");
          formData.append("callback", obj.callback);
          formData.append("signature", obj.signature);
          formData.append("file", _file);

          /**
           * 开始上传
           */
          axios
            .post(obj.host, formData, {
              onUploadProgress: progressEvent => {
                let complete =
                  ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                this.uploadInfo.progress = complete;
              }
            })
            .then(res => {
              /**
               * 重新加载上传节点（解决重复文件无法上传问题）
               */
              this.show = false;
              this.$nextTick(() => {
                this.show = true;
              });

              this.callback("uploaded", {
                defaultpic: obj.host + "/" + obj.dir,
                path: obj.host + "/" + obj.dir,
                file: _file
              });
              this.uploadInfo.visible = false;
            });
        });
    },

    /**
     * 回调
     */
    callback(key, res) {
      typeof par[key] === "function" && par[key](res);
    },
    /**
     * 运行
     */
    start(params) {
      par = params;
      this.$refs.selectfile.click();
    }
  }
};
</script>
<style scoped>
#oss-selectfile {
  display: none;
}
</style>

