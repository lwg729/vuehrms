<template>
    <div>
        <div class="permissionSetInput">
            <el-input placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input placeholder="请输入角色中文名" v-model="role.nameZh" @keydown.enter.native="doAddRole"></el-input>
            <el-button type="primary" round icon="el-icon-plus" size="small" @click="doAddRole">添加角色</el-button>
        </div>
        <div class="permissionSetMain">
            <el-collapse accordion @change="change"
                         v-model="activeName">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card" align="left">
                        <div slot="header">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: #ff6f25" icon="el-icon-delete"
                                       type="text" @click="doDeleteRole(r)"></el-button>
                            <el-tree
                                    show-checkbox
                                    node-key="id"
                                    ref="tree"
                                    :key="index"
                                    :default-checked-keys="selectMenusByRid"
                                    :data="allMenus" :props="defaultProps"></el-tree>

                            <div style="display: flex;justify-content: flex-end">
                                <el-button type="primary" round @click="cancelDoUpdate">取消修改</el-button>
                                <el-button type="primary" round @click="doUpdate(r.id,index)">确定修改</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissionSet",
        data() {
            return {
                role: {
                    name: '',
                    nameZh: ''
                },
                activeName: -1,
                roles: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                allMenus: [],
                selectMenusByRid: []
            }
        },
        mounted() {
            this.initRoles();
        },
        methods: {
            initRoles() {
                this.getRequest("/system/basic/perSet/").then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            },
            initAllMenus() {
                this.getRequest("/system/basic/perSet/menus").then(resp => {
                    if (resp) {
                        this.allMenus = resp;
                    }
                })
            },
            initSelMidByRid(rid) {
                this.getRequest("/system/basic/perSet/mids/" + rid).then(resp => {
                    if (resp) {
                        this.selectMenusByRid = resp;
                    }
                })
            },
            /*用来局部刷新每个角色中的菜单*/
            change(rid) {
                if (rid) {
                    this.initAllMenus();
                    this.initSelMidByRid(rid)
                }
            },
            doUpdate(rid, index) {
                let tree = this.$refs.tree[index];
                let selectKeys = tree.getCheckedKeys(true); /*只选择叶子节点*/
                let url = '/system/basic/perSet/?rid=' + rid;
                selectKeys.forEach(key => {
                    url += '&mids=' + key;
                })
                this.putRequest(url).then(resp => {
                    if (resp) {
                        this.activeName = -1;
                    }
                })
            },
            cancelDoUpdate() {
                this.activeName = -1;
            },
            doAddRole() {
                if (this.role.name && this.role.nameZh) {
                    this.postRequest("/system/basic/perSet/role", this.role).then(resp => {
                        if (resp) {
                            this.name = '';
                            this.nameZh = '';
                            this.initRoles();
                        }
                    })
                } else {
                    this.$message.error("添加的数据不能为空");
                }

            },
            doDeleteRole(role) {
                this.$confirm('此操作将永久删除【' + role.nameZh + '】角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/perSet/role/" + role.id).then(resp => {
                        if (resp) {
                            this.initRoles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    }
</script>

<style>
    .permissionSetInput {
        display: flex;
    }

    .permissionSetInput .el-input {
        width: 300px;
        margin-right: 10px;
    }

    .permissionSetMain {
        margin-top: 10px;
        width: 700px
    }


</style>
