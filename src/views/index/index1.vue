<template>
    <div class="index1">
        <div class="conte">
            <table border="1">
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>学历</th>
                    <th>电话</th>
                    <th>毕业院校</th>
                </tr>
                <tr v-for="(item, index) in dataShow"  :key="index" :class="{ 'alt': index%2==1 }">
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.edu }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.school }}</td>
                </tr>
            </table>
      
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page= currentPage
                    :page-sizes="[5, 10, 1, 2]"
                    :page-size= pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total= listArray.length>
                </el-pagination>
            </div>
        </div>
          <div>
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name:'index',
    data(){
    return{
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
    listArray:[
        {
            'name':'赵11111111111*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        },{
            'name':'赵22222222*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        },{
            'name':'赵3333333333333*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        },{
            'name':'赵4444444444*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        },{
            'name':'赵555555555555555*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        },{
            'name':'赵6666666666*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        },{
            'name':'赵7777777777777*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        },{
            'name':'赵8888888888*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'钱*',
            'age':'22',
            'edu':'本科',
            'phone':'188****888888',
            'school':'郑州大学'
        },
        {
            'name':'王*',
            'age':'23',
            'edu':'大专',
            'phone':'188****888888',
            'school':'河南工业大学'
        },
        {
            'name':'张*',
            'age':'25',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南农业大学'
        },
        {
            'name':'刘22222222222*',
            'age':'21',
            'edu':'本科',
            'phone':'188****888888',
            'school':'河南理工大学'
        }
        ],
        pageSize:5,
        currentPage:1
    }
    },
    computed:{
        dataShow: function(){
            let start = (this.currentPage-1)*this.pageSize;
            let end = Math.min((this.currentPage)*this.pageSize, this.listArray.length)
            return this.listArray.slice(start, end)
        },
        pageNum: function(){
             return Math.round(this.listArray.length / this.pageSize) || 1 ;
        }
    },
    methods: {
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        console.log(this.pageSize);

    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
    }
    },

}
</script>
<style lang="scss" scoped>
.conte{
    border: 2px solid green;
    width: 60%;
    margin: auto;
    text-align: center;
}
table{
    width: 800px;
}
</style>