<template>
  <div class="list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="编号" ></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="parent.name" label="父级分类"></el-table-column>
      <el-table-column prop="desc" label="分类介绍"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
      count:0,
      tableData:[]
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
        let data = await this.axios.get("/admin/category", {
          params: {
            page: this.page,
            pagesize: this.pagesize
          }
        });
        console.log(this.count)

        this.count = data.data.count 
        this.tableData = data.data.data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async del(id){
      try {
        let data = await this.axios.delete(`/admin/category/${id}`)
        if(data.data&&data.data.deletedCount){
          this.count-=1
          if(this.page*this.pagesize>= this.count){/* 删除最后一页最后一个时页数问题 */
            this.page = Math.ceil(this.count/this.pagesize)
            console.log( this.page )
          }
          this.getList()
          this.$message.success('删除成功')
        }
        
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    edit(id){
      this.$router.push(`/moba/category_edit/${id}`)
    },
  }
};
</script>

<style>
</style>