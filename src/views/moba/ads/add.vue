<template>
  <div class="add">
    <h1>广告管理</h1>
        <el-form
          ref="form"
          class="form"
          :model="form"
          label-width="80px"
          @submit.native.prevent="submit"
        >
          <el-form-item label="广告标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="广告备注">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="图标">
          <!--       <el-form-item label="图标">
        <el-upload
          action="http://www.rorscloud.top:4000/admin/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="afterUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>-->
            <el-upload
              class="uploadimg"
              action="http://www.rorscloud.top:4000/admin/upload"
              list-type="picture-card"
              :headers="getAuthHeader()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <i v-if="!form.abs_img" class="el-icon-plus"></i>
              <img v-else :src="form.abs_img" class="avatar" width="100%" height="100%" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">确认提交</el-button>
            <el-button @click="clear">取消</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      form:{
          title:'',
          abs_img:'',
          rel_img:"",
          desc:'',
          url:"",
      },
    };
  },
  async created() {
    try {
      let data = await this.axios.get(`/admin/ads`);
      this.ads = data.data.data;
      console.log(data)
    } catch (err) {
      console.log(err)
      this.$message.error('出错了')
    }
  },
  methods: {
    afterUpload(res) {
      console.log(res);
      this.form.abs_img = res.abs_img;
      this.form.rel_img = res.rel_img;
    },
    async submit(item) /* 表单提交 */ {
      try {
        let data = await this.axios.post(`/admin/ads`,this.form);
        this.$message.success('修改成功')
      } catch (err) {
        this.$message.error("出了问题");
      }
    },
    clear() {
      if (this.id) {
        this.$router.go(-1);
      }
    },
  }
}

</script>

<style lang="scss" scoped>
.uploadimg{
  /deep/ .el-upload--picture-card {
     width: 100% !important;
  }
  .el-tabs__new-tab {
    margin-right: 20px;
  }
}

.add {
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    padding-left: 10px;
  }
  .tabs {
    margin-top: 20px;
  }
  .form {
    margin-top: 40px;
    width: 400px;
  }
}
</style>