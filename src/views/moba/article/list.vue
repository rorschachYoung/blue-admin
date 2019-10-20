<template>
  <div class="list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="文章名称"></el-table-column>
      <el-table-column prop="title" label="文章名称"></el-table-column>
      <el-table-column label="文章分类" >
        <template slot-scope="scope">
          <span v-for="(item,i) in scope.row.categories" :key="i" >{{i===scope.row.categories.length-1?item.name:item.name+','}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="edit(scope.row._id)">详情</el-button>
          <el-button size="medium" type="primary" @click="edit(scope.row._id)">编辑</el-button>
          <el-button size="medium" type="danger" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="padding-top:20px;">
        <el-pagination background @current-change="changePage" layout="prev, pager, next" :total="count"></el-pagination>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      page: 1,
      pagesize: 10,
      tableData: [],
      count:0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async changePage(page){
      this.page = page ;
      this.getList()
    },
    async getList() {
      try {
        let data = await this.axios.get("/admin/article", {
          params: {
            page: this.page,
            pagesize: this.pagesize
          }
        });
        this.count = data.data.count 
        this.tableData = data.data.data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async del(id) {
      try {
        let data = await this.axios.delete(`/admin/article/${id}`);
        if (data.data && data.data.deletedCount) {
          this.tableData = this.tableData.filter(article => article._id !== id);
          this.$message.success("删除成功");
        }

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    edit(id) {
      this.$router.push(`/moba/article_edit/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>