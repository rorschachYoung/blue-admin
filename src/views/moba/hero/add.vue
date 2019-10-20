<template>
  <div class="add">
    <h1 v-if="!id">添加英雄</h1>
    <h1 v-if="id">修改英雄</h1>
    <el-form class="form" label-width="80px" @submit.native.prevent="submit">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="英雄名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="英雄介绍">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="称号">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="分类">
                <el-select v-model="form.categories" multiple>
                  <el-option
                    v-for="(item,i) in categories"
                    :key="i"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="难度值">
                <el-rate :max="9" show-score v-model="form.scores.difficult"></el-rate>
              </el-form-item>
              <el-form-item label="技能值">
                <el-rate :max="9" show-score v-model="form.scores.skills"></el-rate>
              </el-form-item>
              <el-form-item label="攻击值">
                <el-rate :max="9" show-score v-model="form.scores.attack"></el-rate>
              </el-form-item>
              <el-form-item label="生存值">
                <el-rate :max="9" show-score v-model="form.scores.survive"></el-rate>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
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
            </el-col>
            <el-col :span="12">
              <el-form-item label="顺风出装">
                <el-select v-model="form.win_items" multiple>
                  <el-option
                    v-for="(item,i) in items"
                    :key="i"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逆风出装">
                <el-select v-model="form.lose_items" multiple>
                  <el-option
                    v-for="(item,i) in items"
                    :key="i"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用技巧">
                <el-input type="textarea" v-model="form.useage_tips"></el-input>
              </el-form-item>
              <el-form-item label="对战技巧">
                <el-input type="textarea" v-model="form.battle_tips"></el-input>
              </el-form-item>
              <el-form-item label="团战技巧">
                <el-input type="textarea" v-model="form.team_tips"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-for="(item,i) in form.skills" :key="i" :label="`技能${i+1}`">
          <el-row>
            <el-col :span="12">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  action="http://www.rorscloud.top:4000/admin/upload"
                  list-type="picture-card"
                  :show-file-list="false"
                  :headers="getAuthHeader()"
                  :on-success="res=>afterSkillUpload(res,item)"
                >
                  <i v-if="!item.abs_img" class="el-icon-plus"></i>
                  <img v-else :src="item.abs_img" class="avatar" width="100%" height="100%" />
                </el-upload>
              </el-form-item>
              <el-form-item label="介绍">
                <el-input type="textarea" v-model="item.desc"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="6" :offset="9" style="padding-top:20px;">
          <el-button type="primary" native-type="submit">{{id?'确认修改':'立即创建'}}</el-button>
          <el-button @click="clear">取消</el-button>
        </el-col>
      </el-row>
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
      categories: [],
      items: [],
      form: {
        name: "",
        title: "",
        rel_img: "",
        abs_img: "",
        categories: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        win_items: [],
        lose_items: [],
        team_tips: "",
        battle_tips: "",
        useage_tips: "",
        skills: [{}, {}, {}, {}, {}, {}]
      }
    };
  },
  async created() {
    if (this.id) {
      let data = await this.axios.get(`/admin/hero/${this.id}`);
      console.log(data);
      Object.assign(this.form, data.data);
      console.log(this.form);
    }

    let [data1, data2] = await Promise.all([
      this.axios.get(`/admin/category`),
      this.axios.get(`/admin/item`)
    ]);
    console.log(data1, data2);
    this.categories = data1.data.data;
    this.items = data2.data.data;
    this.fixSkillTab();
  },
  methods: {
    fixSkillTab() {
      new Array(6 - this.form.skills.length)
        .fill(0)
        .forEach(() => this.form.skills.push({}));
    },
    afterSkillUpload(res, item) {
        console.log(item)
      this.$set(item,'abs_img',res.abs_img);
      this.$set(item,'abs_img', res.abs_img);
    //   item.abs_img = res.abs_img;
    //   item.rel_img = res.rel_img; 
    },
    afterUpload(res) {
      console.log(res);
      this.form.abs_img = res.abs_img;
      this.form.rel_img = res.rel_img;
    },
    async submit() /* 表单提交 */ {
      try {
        let data;
        if (this.id) {
          data = await this.axios.put(`/admin/hero/${this.id}`, this.form);
        } else {
          data = await this.axios.post("/admin/hero", this.form);
        }
        console.log(data);
        this.$router.push({ name: "hero_list" });
      } catch (err) {
        this.$message.error("出了问题");
      }
    },
    clear() {
      if (this.id) {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add {
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    padding-left: 10px;
  }
  .form {
    margin-top: 10px;
  }
}
</style>