<template>
  <div class="vuecorpper">
    <div class="cropper-content">
      <div class="cropper">
        <vueCropper
          ref="cropper"
          :img="chooseimg"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
        ></vueCropper>
      </div>
      <!--  {'width':previews.w+'px','height':previews.h+'px','overflow':'hidden','margin':'5px'}-->
      <!-- previews.img = data.img 是上传的图片经过变大缩小后的尺寸 裁剪框就是在这个尺寸上面裁剪 -->
      <!-- previews.url 是blob img地址 -->
      <div class="show-preview">
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
    </div>
    <el-row style="margin-top:20px" type="flex" justify="center">
      <!--         <el-button style="margin-right:20px">
            <label class="btn" for="uploads">更换图片</label>
      </el-button>-->
      <input
        type="file"
        id="uploads"
        style="position:absolute; clip:rect(0 0 0 0);"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      />
      <el-button type="primary" icon="el-icon-zoom-in" circle @click="changeScale(1)"></el-button>
      <el-button type="primary" icon="el-icon-zoom-out" circle @click="changeScale(-1)"></el-button>
      <el-button type="primary" icon="el-icon-refresh-left" circle @click="rotateLeft"></el-button>
      <el-button type="primary" icon="el-icon-refresh-right" circle @click="rotateRight"></el-button>
      <el-button @click="down('blob')">下载图片</el-button>
    </el-row>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
export default {
  props: {
    chooseimg: String,
    imgname:String
  },
  components: {
    VueCropper
  },
  data() {
    return {
      previews: {},
      previewStyle1: {},
      option: {
        full: false, //输出原图比例截图 props名full
        canMove: true,
        canMoveBox: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        img:
          "http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    };
  },
  methods: {
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    changeScale(num) {
      this.$refs.cropper.changeScale(num);
    },
    uploadImg() {},
    realTime(data) {
      console.log(data);
      /**
       * data ={
          div, 裁剪框样式对象
          h,裁剪框高度
          html,  整体预览html
          img, 放大缩小后的图片,裁剪框在此图片上裁剪
          url, blob img地址
          w,裁剪框宽度
        }
       */
      this.previewStyle1 = {
        width: data.w + "px",
        height: data.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 1
      };
      this.previews = data;
    },
    down(type) {
        this.$refs.cropper.getCropBlob(data => {
        let formData = new FormData()
        formData.append("file", data, this.imgname);
        this.axios
          .post("http://www.rorscloud.top:4000/admin/upload", formData).then(res=>{
              let { rel_img,abs_img } =res.data
              this.$emit('after-upload',{rel_img,abs_img})
          })

      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cropper-content {
  display: flex;
  justify-content: flex-end;
  .cropper {
    width: 400px;
    height: 300px;
  }
  .show-preview {
    flex: 1;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    .preview {
      overflow: hidden;
      border: 2px solid #ff4406;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.footer-btn {
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  .scope-btn {
    width: 350px;
    display: flex;
    justify-content: space-between;
    .upload-btn {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    .btn {
      outline: none;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #67c23a;
      border-color: #67c23a;
    }
  }
}
</style>