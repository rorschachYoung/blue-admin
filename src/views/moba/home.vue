<template>
  <div class="home">
    <el-row style="margin-bottom:20px;">
      <el-col :span="8" class="flex-center">
        <el-card class="box-card" style="width:96%;">
          <div slot="header" class="flex-center">快捷入口</div>
          <div class="card">
            <el-row :gutter="20" class="font">
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/hero_list')">
                  <i class="el-icon-edit-outline"></i>
                  英雄列表
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/article_list')">
                  <i class="el-icon-edit-outline"></i>
                  文章列表
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/ads_list')">
                  <i class="el-icon-edit-outline"></i>
                  广告列表
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/item_list')">
                  <i class="el-icon-edit-outline"></i>
                  物品管理
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/category_list')">
                  <i class="el-icon-edit-outline"></i>
                  分类管理
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/adminuser_list')">
                  <i class="el-icon-edit-outline"></i>
                  用户管理
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="flex-center">
        <el-card class="box-card" style="width:96%;">
          <div slot="header" class="flex-center">数据统计</div>
          <div class="card">
            <el-row :gutter="20" class="font">
              <el-col :span="12">
                <el-card class="navcard" >
                  新增英雄 /
                  <i class="colorfont">12</i>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="navcard">
                  新增文章 /
                  <i class="colorfont">12</i>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="navcard">
                  新增广告 /
                  <i class="colorfont">12</i>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="navcard">
                  新增物品 /
                  <i class="colorfont">12</i>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="flex-center">
        <el-card class="box-card" style="width:96%;">
          <div slot="header" class="flex-center">快捷入口</div>
          <div class="card">
            <el-row :gutter="20" class="font">
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/hero_list')">
                  <i class="el-icon-edit-outline"></i>
                  英雄列表
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/article_list')">
                  <i class="el-icon-edit-outline"></i>
                  文章列表
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/ads_list')">
                  <i class="el-icon-edit-outline"></i>
                  广告列表
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/item_list')">
                  <i class="el-icon-edit-outline"></i>
                  物品管理
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/category_list')">
                  <i class="el-icon-edit-outline"></i>
                  分类管理
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="navcard" @click.native="$router.push('/moba/adminuser_list')">
                  <i class="el-icon-edit-outline"></i>
                  用户管理
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" class="flex-center">
        <el-card class="box-card" style="width:96%;">
          <div slot="header" class="flex-center">英雄统计</div>
          <div class="chart1" id="chart1" ref="chart1"></div>
        </el-card>
      </el-col>
      <el-col :span="8" class="flex-center">
        <el-card class="box-card" style="width:96%;">
          <div slot="header" class="flex-center">文章统计</div>
          <div id="chart2" class="chart2" ref="chart2"></div>
        </el-card>
      </el-col>
      <el-col :span="8" class="flex-center">
        <el-card class="box-card" style="width:96%;">
          <div slot="header" class="flex-center">物品统计</div>
          <div class="chart3" id="chart3" ref="chart3"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      mychart1: null,
      mychart2: null,
      mychart3: null,
      option1: {
        tooltip: {},
        xAxis: {
          data: ["刺客", "辅助", "战士", "法师", "射手", "坦克"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["文章数量", "广告数量", "英雄数量", "分类数量", "物品数量"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "文章数量" },
              { value: 310, name: "广告数量" },
              { value: 234, name: "英雄数量" },
              { value: 135, name: "分类数量" },
              { value: 1548, name: "物品数量" }
            ]
          }
        ]
      },
      option3: {
        xAxis: {
          type: "category",
          data: ["文章数量", "广告数量", "英雄数量", "分类数量", "物品数量", ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290],
            type: "line"
          }
        ]
      }
    };
  },
  mounted() {
    this.myChart1 = echarts.init(this.$refs.chart1);
    this.myChart1.setOption(this.option1);
    this.myChart2 = echarts.init(this.$refs.chart2);
    this.myChart2.setOption(this.option2);
    this.myChart3 = echarts.init(this.$refs.chart3);
    this.myChart3.setOption(this.option3);
  }
};
</script>
<style lang="scss" scoped>
.chart1,
.chart2,
.chart3 {
  width: 400px;
  height: 200px;
}

.flex-center {
  display: flex;
  justify-content: center;
}
.font {
  font-size: 14px;
}
.card {
  height: 200px;
}
.navcard {
  margin-bottom: 40px;
  width: 96%;
  text-align: center;
}
.navcard:hover {
  background: #fde2e2;
}
.navcard {
  /deep/ .el-card__body {
    padding-left: 2px;
    padding-right: 2px;
  }
}
.item {
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.colorfont {
  padding: 0 10px;
  font-size: 24px;
  color: #f56c6c;
}
</style>
<style>
</style>