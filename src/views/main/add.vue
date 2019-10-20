<template>
  <el-col class="add" :span="12">
    <el-form ref="form" :model="form" label-width="80px" width="400px">
      <el-form-item label="姓名">
        <el-input type="textarea" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input type="textarea" v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="记录时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      form: {
        date:'',
        time:"",
        name: "",
        tel:'',
        createtime: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      this.form.date = new Date(this.form.date)
      this.form.date.setHours(this.form.date.getHours()+8)
      console.log(this.form.date)
      let data = await this.axios.post('/add',this.form)
      console.log(data)
    }
  }
};
</script>

<style>
</style>