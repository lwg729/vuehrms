<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPos"
                    placeholder="添加职位.."
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="pos.name">
            </el-input>
            <el-button type="primary" round size="small"
                       style="display: block" @click="addPosition()">添加
            </el-button>
        </div>
        <div class="posManMain">
            <el-table
                    :data="positions"
                    border
                    @selection-change="handleSelectionChange"
                    size="small"
                    stripe
                    style="width: 80%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        width="150"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button style="margin-top: 10px; float: left" type="danger" size="small"
                       :disabled="multipleSelection.length===0" @click="deleteMany">批量删除
            </el-button>
        </div>
        <el-dialog
                title="修改职位"
                :visible.sync="dialogVisible"
                width="29%">
            <div>
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
                </div>
               <div style="margin-top: 5px;margin-right: 30px">
                   <el-tag>是否启用</el-tag>
                   <el-switch
                           v-model="updatePos.enabled"
                           active-text="启用"
                           inactive-text="禁用" style="margin-left: 10px;">
                   </el-switch>
               </div>
            </div>
            <div align="center" style="margin-top: 40px">
                 <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="doUpdate()">确 定</el-button>
                 </span>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PosManager",
        data() {
            return {
                pos: {
                    name: ''
                },
                multipleSelection: [],
                dialogVisible: false,
                updatePos: {
                    name: '',
                    enabled: false,
                },
                positions: []
            }
        },
        mounted() {
            this.initPositions();
        },
        methods: {
            /*确认选了几条数据*/
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /*批量删除的方法*/
            deleteMany() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest("/system/basic/pos/" + ids).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initPositions() {
                this.getRequest("/system/basic/pos/").then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },
            addPosition() {
                if (this.pos.name) {
                    this.postRequest("/system/basic/pos/", this.pos).then(resp => {
                        if (resp) {
                            this.initPositions();
                            this.pos.name = '';
                        }
                    })
                } else {
                    this.$message.error('职位名称不能为空')
                }
            },
            //编辑方法
            showEditView(index, data) {
                Object.assign(this.updatePos, data);
                this.dialogVisible = true;
            },
            //删除方法
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除[' + data.name + ']职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/" + data.id).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doUpdate() {
                this.putRequest("/system/basic/pos/", this.updatePos).then(resp => {
                    if (resp) {
                        this.initPositions();
                        this.updatePos.name = '';
                        this.dialogVisible = false;
                    }
                })
            }
        }
    }
</script>

<style>
    .updatePosInput {
        width: 150px;
        margin-left: 8px;
    }

    .addPos {
        width: 300px;
        margin-right: 10px;
        float: left;
    }

    .posManMain {
        margin-top: 10px;

    }
</style>
