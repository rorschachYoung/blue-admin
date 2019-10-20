<template>
  <div class="flex flex-space-between flex-down " :style="{height:'100%'}">
    <el-row :style="{background:'#fff',padding:'20px'}">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">活动管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row><el-button type="primary">主要按钮</el-button></el-row>
    <el-row :style="{background:'#fff',padding:'20px 20px'}">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="_id" label="编号"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="img" label="海报">
          <template v-slot="scope">
            <img :src="scope.row.img" alt width="60px" height="80px" />
          </template>
        </el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="address" label="地质"></el-table-column>
        <el-table-column prop="artiset" label="艺人"></el-table-column>
        <el-table-column prop="showtime" label="时间" :formatter="formatTime"></el-table-column>
        <el-table-column prop="state" label="状态" :formatter="formatType"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-button  icon="el-icon-zoom-in" size="mini" circle @click="clickInfoButton(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="clickEditButton(scope.row._id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="clickDeleteButton(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination class="flex-self-center" background layout="prev, pager, next" :total="total" @current-change="pageChange">
  </el-pagination>
    <!-- 详细信息 -->
    <el-dialog title="详细信息" center :visible.sync="dialogVisible" width="50%" min-width="500px" :before-close="handleClose" 
        class="" >
        <div class="flex-col-center flex-down " :style="{height:'500px'}">
                    <h1 class="text-center">{{gridData.title}}</h1>
        <el-image style="width: 100px; height: 160px; margin-top:20px;" :src="gridData.img" :preview-src-list="[gridData.img]">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        </div>
    </el-dialog>
    <!-- 添加 -->
  </div>
</template>

<script>
import { formatTime } from "@/util";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      gridData:{},
      total:5,
      page:1,
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      this.axios.get("/api/piao").then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total
      });
    },
    formatTime(row, column, cellValue, index) {
      return formatTime(new Date(cellValue));
    },
    formatType(row, column, cellValue, index) {
      switch (cellValue) {
        case 0:
          return "开售";
          break;
        case 1:
          return "即将开售";
          break;
        case 0:
          return "售罄";
          break;
        default:
          return "出问题了";
          break;
      }
    },
    clickInfoButton(row){
        this.dialogVisible=true
        this.gridData = row
    },
    clickEditButton() {},
    clickDeleteButton(id) {
      this.$confirm("确认删除骂?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`/api/piao/delete/${id}`)
            .then(res => {
              if (res.data.n) {
                this.$message.success("删除成功");
                this.tableData = this.tableData.filter(
                  item => item._id !== id
                );
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch(err => {
              this.$message.error("网络异常");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    pageChange(page){
      console.log(page)
      this.axios.get("/api/piao",{
        params:{ page }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>