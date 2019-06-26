<template>
  <div>
    <div class="exam-container" v-if="loaded">
      <el-form ref="form" label-width="120px">
        <el-form-item label="题目类别" v-if="childQuestionIndex === -2" v-show="showClassfiy">
          <paper-classfiy
            @change="handleCategoryidChange"
            :parentid-path="parentidPath"
            :visible.sync="showClassfiy"
          />
        </el-form-item>

        <el-form-item label="题目信息">
          <el-input v-model="stem" ref="stem">
            <template slot="prepend">题干</template>
          </el-input>
          <div
            class="ktj-tips ktj-color-warning ktj-fz14 ktj-mt10"
            v-if="typeValue == 5"
          >提示：填空用连续三个下划线"_"表示，若一个空有多个参考答案，请添加同义词，学员答案匹配任意一个都算正确。</div>
          <div class="exam-container__el-row ktj-mt10">
            <el-button size="small" type="primary" @click="uploadAudio">音频上传</el-button>
            <div class="file_name" v-if="tkinfo.audio_file_name">{{tkinfo.audio_file_name}}</div>
            <div class="ktj-tips">请注意您只能上传MP3、WMA格式的音频文件，文件最多可上传20M</div>
          </div>
          <div class="exam-container__el-row">
            <el-input v-model="tkinfo.analysis">
              <template slot="prepend">解析</template>
            </el-input>
          </div>
          <div v-if="typeValue == 5">
            <el-checkbox v-model="tkinfo.ignore_order">答案不分顺序</el-checkbox>
            <el-checkbox v-model="tkinfo.ignore_case">忽略大小写</el-checkbox>
          </div>
        </el-form-item>

        <!--单选、多选-->
        <el-form-item v-if="typeValue == 2 || typeValue == 3">
          <el-row>
            <el-col :span="12">
              <div class="exam__tm_tit">选项内容</div>
            </el-col>
            <el-col :span="4">
              <div class="exam__tm_tit">答案</div>
            </el-col>
            <el-col :span="8">
              <div class="exam__tm_tit">操作</div>
            </el-col>
          </el-row>
          <el-row
            class="exam-container__el-row"
            v-for="(item,i) in tkinfo.content"
            :key="item.optionLeter"
          >
            <el-col :span="12">
              <el-input v-model="item.optionName">
                <template slot="prepend">{{item.optionLeter}}</template>
              </el-input>
            </el-col>
            <el-col :span="4" align="center">
              <el-radio v-model="tkinfo.answer" :label="item.optionLeter" v-if="typeValue==2">&nbsp;</el-radio>

              <el-checkbox v-model="tkinfo.answer" :label="item.optionLeter" v-else>&nbsp;</el-checkbox>
            </el-col>
            <el-col :span="8">
              <div class="exam-item">
                <el-col :span="6" class="exam-item__el-col">
                  <el-button
                    icon="el-icon-plus"
                    type="danger"
                    size="small"
                    circle
                    @click="addOptions()"
                  ></el-button>
                </el-col>
                <el-col :span="6" class="exam-item__el-col">
                  <el-button
                    icon="el-icon-minus"
                    type="danger"
                    size="small"
                    circle
                    @click="delOption()"
                  ></el-button>
                </el-col>
                <el-col :span="6" class="exam-item__el-col">
                  <el-button
                    type="primary"
                    size="small"
                    :disabled="i === 0"
                    icon="el-icon-arrow-up"
                    circle
                    @click="upFieldOrder(i,tkinfo.content)"
                  ></el-button>
                </el-col>
                <el-col :span="6" class="exam-item__el-col">
                  <el-button
                    type="primary"
                    size="small"
                    :disabled="i === tkinfo.content.length - 1"
                    icon="el-icon-arrow-down"
                    circle
                    @click="downFieldOrder(i,tkinfo.content)"
                  ></el-button>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-else-if="typeValue == 5">
          <div v-for="(item,i) in tkinfo.answer" :key="i">
            <div class="exam-container__addon">{{item.optname}}</div>
            <div class="exam-container__edir">
              <el-tag
                :key="index"
                v-for="(tag,index) in item.dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleTagClose(item.dynamicTags,index)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="item.inputVisible"
                :ref="'tag'+i"
                v-model="item.inputValue"
                size="small"
                @blur="handleTagConfirm(item)"
              ></el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showTagInput(item,i)"
              >+ 同义词</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="答案" v-else-if="typeValue == 4">
          <el-radio-group v-model="tkinfo.answer">
            <el-radio :label="1">正确</el-radio>
            <el-radio :label="0">错误</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度系数">
          <el-radio-group v-model="level">
            <el-radio label="低">低</el-radio>
            <el-radio label="中">中</el-radio>
            <el-radio label="高">高</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div align="center">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <div class="exam-container__loading" v-else>
      <ktj-loading/>
    </div>
  </div>
</template>
<script>
import { isArrayOrObject, cloneData } from "@/utils";
import { addTk, getTkdetail, saveCombination } from "@/api/exam";
import PaperClassfiy from "./PaperClassfiy";
export default {
  name: "PaperAdd",
  props: {
    /**要编辑的题目信息 */
    questionInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    /**默认分类联动关系 */
    defaultParentidPath: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 子题index （用于组合题）
     * 当值为-2时，表示添加普通题目，
     * 当值为-1时，表示添加【组合题】的小题，
     * 当值为 >=0 时，表示编辑【组合题】对应的小题
     */
    childQuestionIndex: {
      type: Number,
      default: -2
    },
    /**题目类型 */
    typeValue: [String, Number]
  },
  data() {
    return {
      /**接口加载状态 */
      loaded: false,
      /**分类显示开关 */
      showClassfiy: true,
      /**当前分类id */
      categoryid: "0",
      /**当前分类联动关系 */
      parentidPath: [],
      /**题干 */
      stem: "",
      /**难度等级 */
      level: "中",
      /**
       * 题目信息，包括选项内容，答案，解析，音频文件等
       */
      tkinfo: {},
      /**
       * 组合题小题列表
       */
      childQuestions: []
    };
  },
  watch: {
    "questionInfo.tkid"() {
      this.updateData();
    },
    childQuestionIndex() {
      this.updateData();
    },
    typeValue() {
      this.updateData();
    },
    stem(newValue, oldValue) {
      if (this.typeValue == 5) {
        this.updateStemTags();
      }
    }
  },
  methods: {
    /**
     * 【填空题】删除关键词
     */
    handleTagClose(array, index) {
      array.splice(index, 1);
    },
    /**
     * 【填空题】显示关键词输入框
     */
    showTagInput(item, i) {
      item.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs["tag" + i][0].$refs.input.focus();
      });
    },
    /**
     * 【填空题】添加关键词
     */

    handleTagConfirm(item) {
      if (item.inputValue) {
        item.dynamicTags.push(item.inputValue);
        (item.inputValue = ""), (item.inputVisible = false);
      }
    },

    /**
     * 【填空题】输入题干监听下划线
     */
    updateStemTags() {
      if (this.stem) {
        let arr = this.stem.match(/_{3,}/g) || [];
        let tags = [];
        arr.map((str, index) => {
          if (this.tkinfo.answer[index]) {
            tags.push(this.tkinfo.answer[index]);
          } else {
            tags.push({
              optname: `第${index + 1}空答案`,
              dynamicTags: [],
              inputValue: "",
              inputVisible: false
            });
          }
        });
        this.tkinfo.answer = tags;
      }
    },
    /**
     * 【单选、多选题】添加选项
     */
    addOptions() {
      this.tkinfo.content.push({
        optionName: "选项" + (this.tkinfo.content.length + 1),
        optionLeter: this.getEN(this.tkinfo.content.length)
      });
    },
    /**
     * 【单选、多选题】删除选项
     */
    delOption() {
      if (this.tkinfo.content.length > 2) {
        this.tkinfo.content.pop();
      } else {
        this.$message({
          message: "选项不能小于两个，不能删除了",
          type: "warning"
        });
      }
    },
    /**
     * 获取字母
     */
    getEN(index) {
      var arr = [];
      for (var i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i));
      }
      return arr[index];
    },
    /**
     * 上传音频
     */
    uploadAudio() {
      this.$store.ready(state => {
        this.$aliUpload({
          wxid: state.info.wxid,
          type: "examAudio",
          uploaded: info => {
            this.tkinfo.audio_file = info.path;
            this.tkinfo.audio_file_name = info.file.name;
          }
        });
      });
    },
    /**
     * 保存
     */
    save() {
      if (this.stem == "") {
        this.$msg("请填写题干");
        this.$refs.stem.focus();
        return false;
      }
      let _tkinfo = this.getTkInfo();
      if (
        _tkinfo.answer == "" &&
        this.typeValue != 3 &&
        this.typeValue != 4 &&
        this.typeValue != 5
      ) {
        /**
         * [] == ''  true
         */
        this.$msg("请填写答案");
        return false;
      }
      let _tkid = this.questionInfo.tkid || 0;
      /**
       * 添加、编辑题目
       */
      if (this.childQuestionIndex === -2) {
        addTk({
          categoryid: this.categoryid,
          title: this.stem,
          tktype: this.typeValue,
          tkid: _tkid,
          level: this.getLevelValue(this.level),
          tkinfo: _tkinfo
        }).then(res => {
          if (res.result == "success") {
            if (this._tkid) {
              this.$msg("修改成功", "success");
              this.$emit("saved", {
                action: "editQuestion"
              });
            } else {
              this.$msg("添加成功", "success");
              this.$emit("saved");
            }
            this.dataInit();
          } else {
            this.$msg(res.msg);
          }
        });
      } else if (this.childQuestionIndex >= -1) {
        /**
         * 添加组合小题
         */
        let _tklist = cloneData(this.childQuestions);
        let _tkinfo = this.getTkInfo();
        let questionInfo = {
          title: this.stem,
          tktype: this.typeValue,
          level: this.level,
          tkinfo: _tkinfo
        };
        let msg = "添加成功";
        if (this.childQuestionIndex === -1) {
          _tklist.push(questionInfo);
        } else {
          _tklist.splice(this.childQuestionIndex, 1, questionInfo);
          msg = "修改成功";
        }

        saveCombination({
          tkid: _tkid,
          tklist: _tklist
        }).then(res => {
          if (res.result === "success") {
            this.$msg(msg, "success");
            this.$emit("saved", {
              action: "addChildQuestion",
              tkid: _tkid,
              childtk: _tklist
            });
          }
        });
      }
    },
    /**
     * 获取难度等级值
     */
    getLevelValue(label) {
      let difficults = ["低", "中", "高"];
      return difficults.indexOf(label) + 1;
    },
    /**
     * 获取保存使用的题目信息
     */
    getTkInfo() {
      let info = cloneData(this.tkinfo);
      if (this.typeValue == 2 || this.typeValue == 3) {
        /**
         * 单选、多选
         */
        let _content = [];
        info.content.map(item => {
          _content.push(item.optionName);
        });
        info.content = _content;
      } else if (this.typeValue == 5) {
        /**
         * 填空题
         */
        let tags = [];
        this.tkinfo.answer.map((item, index) => {
          if (item.dynamicTags) {
            tags.push(item.dynamicTags);
          }
        });
        info.answer = tags;
      }
      return info;
    },
    /**
     * 数据初始化
     */
    dataInit(data = {}) {
      let defaultTitle = "";
      if (this.typeValue == 5) {
        defaultTitle = "无意若争春，___________。__________,只有香如故。";
      }
      this.loaded = false;
      this.$nextTick(() => {
        this.stem = data.title || defaultTitle;
        this.level = data.level || "中";
        this.categoryid =
          data.categoryid ||
          this.defaultParentidPath[this.defaultParentidPath.length - 1] ||
          "0";
        let tkinfo = data.tkinfo || {};
        let _tkinfo = {};

        /**
         * 处理tkinfo返回数据
         */
        if (this.typeValue == 2 || this.typeValue == 3) {
          /**
           * 单选、多选题
           * content 为数组
           */
          let options = [];
          if (
            isArrayOrObject(tkinfo.content) === "Array" &&
            tkinfo.content.length
          ) {
            tkinfo.content.map((str, index) => {
              options.push({
                optionName: str,
                optionLeter: this.getEN(index)
              });
            });
          } else {
            for (let i = 0; i < 4; i++) {
              options.push({
                optionName: `选项${i + 1}`,
                optionLeter: this.getEN(i)
              });
            }
          }
          _tkinfo.content = options;
          if (this.typeValue == 3) {
            _tkinfo.answer = tkinfo.answer || ["A"];
          } else {
            _tkinfo.answer = tkinfo.answer || "A";
          }
        } else if (this.typeValue == 5) {
          //填空题
          _tkinfo.ignore_order = tkinfo.ignore_order || false;
          _tkinfo.ignore_case = tkinfo.ignore_case || false;
          let _answer = tkinfo.answer || [];
          if (_answer.length) {
            let tags = [];
            _answer.map((item, index) => {
              tags.push({
                optname: `第${index + 1}空答案`,
                dynamicTags: item,
                inputValue: "",
                inputVisible: false
              });
            });
            _tkinfo.answer = tags;
          } else {
            _tkinfo.answer = [
              {
                optname: `第1空答案`,
                dynamicTags: ["一任群芳妒"],
                inputValue: "",
                inputVisible: false
              },
              {
                optname: `第2空答案`,
                dynamicTags: ["零落成泥碾作尘"],
                inputValue: "",
                inputVisible: false
              }
            ];
          }
        } else if (this.typeValue == 4) {
          //判断题
          _tkinfo.answer = tkinfo.answer || 0;
        }
        _tkinfo.analysis = tkinfo.analysis || "";
        _tkinfo.audio_file_name = tkinfo.audio_file_name || "";
        _tkinfo.audio_file = tkinfo.audio_file || "";
        this.tkinfo = _tkinfo;
        this.parentidPath = data.parentidpath || this.defaultParentidPath;

        this.loaded = true;
      });
    },
    /**
     * 数据更新
     */
    updateData() {
      if (this.childQuestionIndex === -2) {
        /**
         * 添加、编辑题目，更新题目信息
         */
        this.dataInit(this.questionInfo);
      } else if (this.childQuestionIndex === -1) {
        /**
         * 添加组合小题，更新当前组合题的小题列表
         */
        this.dataInit();
        this.childQuestions = this.questionInfo.tkinfo.childtk || [];
      } else if (this.childQuestionIndex >= 0) {
        /**
         * 编辑组合小题，更新组合小题信息
         */
        this.childQuestions = this.questionInfo.tkinfo.childtk;
        this.dataInit(
          this.questionInfo.tkinfo.childtk[this.childQuestionIndex]
        );
      }
    },
    /**
     * 改变分类id
     */
    handleCategoryidChange(id) {
      this.categoryid = id;
    },
    /**单行向上移动 */
    upFieldOrder(index, row) {
      let temp = row[index - 1];
      this.$set(row, index - 1, row[index]);
      this.$set(row, index, temp);
      this.tkinfo.content.map((item, i) => {
        item.optionLeter = this.getEN(i);
      });
    },
    /**单行向下移动 */
    downFieldOrder(index, row) {
      let i = row[index + 1];
      this.$set(row, index + 1, row[index]);
      this.$set(row, index, i);
      this.tkinfo.content.map((item, i) => {
        item.optionLeter = this.getEN(i);
      });
    }
  },
  created() {
    this.updateData();
  },
  components: {
    PaperClassfiy
  }
};
</script>
<style scoped>
.exam-container__el-row {
  padding-bottom: 20px;
}

.exam-item__el-col {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.exam__tm_tit {
  text-align: center;
}
.exam-container__loading {
  min-height: 100px;
}
.input-new-tag {
  width: auto;
}
.exam-container__edir .el-tag {
  margin-right: 10px;
}
</style>




