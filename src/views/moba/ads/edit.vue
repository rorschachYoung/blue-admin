<template>
  <div class="add">
    <h1>广告管理</h1>
    <el-tabs type="border-card" class="tabs" >
      <el-tab-pane :label="'广告位'+(i+1)" v-for="(item,i) in ads" :key="i">
        <el-form
          ref="form"
          class="form"
          :model="item"
          label-width="80px"
          @submit.native.prevent="submit(item)"
        >
          <el-form-item label="广告标题">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="广告备注">
            <el-input v-model="item.desc"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="uploadimg"
              action="http://www.rorscloud.top:4000/admin/upload"
              list-type="picture-card"
              :headers="getAuthHeader()"
              :show-file-list="false"
              :on-success=" res => afterUpload(res,item)"
            >
              <i v-if="!item.abs_img" class="el-icon-plus"></i>
              <img v-else :src="item.abs_img" class="avatar" width="100%" height="100%" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">确认修改</el-button>
            <el-button @click="clear">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      ads: [],
      editableTabsValue:0,
      editableTabs:[]
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
    afterUpload(res, item) {
      console.log(res);
      this.$set(item, "abs_img", res.abs_img);
      this.$set(item, "abs_img", res.abs_img);
    },
    async submit(item) /* 表单提交 */ {
      try {
        let data = await this.axios.put(`/admin/ads/${item._id}`, item);
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
    margin-top: 10px;
    width: 400px;
  }
}
</style>