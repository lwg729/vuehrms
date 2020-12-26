<template>
    <div>
        <div class="permissionSetInput">
            <el-input placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input placeholder="请输入角色中文名" v-model="role.nameZh"></el-input>
            <el-button type="primary" round icon="el-icon-plus" size="small">添加</el-button>
        </div>
        <div class="permissionSetMain">
            <el-collapse accordion @change="change">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card" align="left">
                        <div slot="header">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: #ff6f25" icon="el-icon-delete"
                                       type="text"></el-button>
                            <el-tree
                                    show-checkbox
                                    :data="allMenus" :props="defaultProps"></el-tree>
                        </div>
                        <div>

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
                roles: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                allMenus:[],
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
            initAllMenus(){
              this.getRequest("/system/basic/perSet/menus").then(resp=>{
                  if (resp){
                      this.allMenus=resp;
                  }
              })
            },
            change(name){
                if (name){
                    this.initAllMenus();
                }
            }
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
