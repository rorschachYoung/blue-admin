(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e648c"],{"97a9":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"name",label:"英雄名称"}}),a("el-table-column",{attrs:{prop:"title",label:"英雄称号"}}),a("el-table-column",{attrs:{prop:"desc",label:"介绍"}}),a("el-table-column",{attrs:{prop:"rel_img",label:"图片地址"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.abs_img,alt:"",wdith:"40px",height:"40px"}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(a){return t.edit(e.row._id)}}},[t._v("详情")]),a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(a){return t.edit(e.row._id)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"medium",type:"danger"},on:{click:function(a){return t.del(e.row._id)}}},[t._v("删除")])]}}])})],1),a("el-row",{staticStyle:{"padding-top":"20px"},attrs:{type:"flex",justify:"center"}},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.count},on:{"current-change":t.changePage}})],1)],1)},r=[],i=(a("96cf"),a("3b8d")),s={data:function(){return{page:1,pagesize:10,count:0,tableData:[]}},mounted:function(){this.getList()},methods:{changePage:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.page=e,this.getList();case 2:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),getList:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.axios.get("/admin/hero",{params:{page:this.page,pagesize:this.pagesize}});case 3:e=t.sent,this.count=e.data.count,this.tableData=e.data.data,console.log(e),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,this,[[0,9]])})));function e(){return t.apply(this,arguments)}return e}(),del:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.axios.delete("/admin/hero/".concat(e));case 3:a=t.sent,a.data&&a.data.deletedCount&&(this.tableData=this.tableData.filter((function(t){return t._id!==e})),this.$message.success("删除成功")),console.log(a),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(e){return t.apply(this,arguments)}return e}(),edit:function(t){this.$router.push("/moba/hero_edit/".concat(t))}}},o=s,c=a("2877"),u=Object(c["a"])(o,n,r,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0e648c.8ec9f6af.js.map