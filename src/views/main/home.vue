<template>
  <div class="home">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="标题" ></el-table-column>
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="tel" label="电话" ></el-table-column>
      <el-table-column prop="time" label="时间"  :formatter="formatTime"></el-table-column>
      <el-table-column label="内容" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :page-size="pagesize" class="page" layout="prev, pager, next" @current-change="changePage" :total="count"></el-pagination>
  </div>
</template>

<script>
import { formatTime } from "@/util";
export default {
  data() {
    return {
      tableData: [],
      count:0,
      page:1,
      pagesize:10,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    changePage(page){
      this.page=page
      this.getList()
    },
    formatTime(row, column, cellValue, index) {
      console.log(cellValue);
      return formatTime(new Date(cellValue));
    },
    getList() {
      fetch(`http://www.rorscloud.top:4000/?page=${this.page}&pagesize=${this.pagesize}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.tableData = res.data;
          this.count = res.count
        })
        .catch(err => console.log(err));
    },
    async del(id) {
      let data = await this.axios.get(`/del/${id}`);
      this.$message.success("删除");
    },
    edit(id) {
      this.$message.success("编辑");
    }
  }
};
</script>
<style lang="scss" scoped>
.home{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
}
.page{
  margin-top: 20px;
}
</style>