<template>
  <div>
    <tc-vod-uploader
      :wx-id="$store.state.info.wxid"
      ref="tcVodComponent"
      @change="vodChange"
      @progress="vodProgress"
      @uploaded="vodUploaded"
    />
    <el-dialog
      width="400px"
      :title="vod.progress < 100 ? '正在上传' : '上传成功'"
      :visible.sync="vod.visible"
      v-if="vod.visible"
      :show-close="false"
    >
      <div class="vod__file_name">上传文件：{{vod.fileName}}</div>
      <el-progress :percentage="vod.progress" v-if="vod.progress < 100"></el-progress>
      <el-progress :percentage="vod.progress" status="success" v-else></el-progress>
    </el-dialog>
  </div>
</template>
<script>
/**
 * 此文件用于旧版home端视频上传
 */
let callbackStorege = {};
let id = 0;
import TcVodUploader from "@/plugins/tcvod";
export default {
  name: "UploadVod",
  data() {
    return {
      id: 0,
      vod: {
        fileName: "",
        progress: 0,
        visible: false
      }
    };
  },
  methods: {
    /**
     * 上传视频文件
     */
    uploadVideoFile() {
      this.$refs.tcVodComponent.start();
    },
    /**
     * 上传视频，文件进入
     */
    vodChange(file) {
      this.vod.fileName = file.name;
      this.vod.progress = 0;
      this.vod.visible = true;
    },
    /**
     * 上传视频，进度变化
     */
    vodProgress(progress) {
      this.vod.progress = progress;
    },
    vodUploaded(res) {
      this.vod.visible = false;
      this.callback(this.vod.fileName, res.fileId);
    },
    callback(fileName, fileId) {
      //...
    }
  },
  mounted() {
    window.KTJ_UploadVideoFile = callback => {
      if (typeof callback === "function") {
        this.callback = callback;
      }
      this.uploadVideoFile();
    };
  },
  components: {
    TcVodUploader
  }
};
</script>
<style scoped>
.vod__file_name {
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
</style>

