<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">人事管理系统</div>
                <el-dropdown class="userInfo" @command="commandHandler"><!--@command="commandHandler" 点击菜单项触发的事件回调-->
                    <span class="el-dropdown-link">
            {{ user.name }}<i><img :src="user.userface" alt=""></i>
          </span>
                    <el-dropdown-menu slot="dropdown" size="medium">
                        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                        <!--disabled:禁用的    divided:有分隔线-->
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b" router unique-opened>
                        <!--active-text-color="#ffd04b" @select="menuClick">-->
                        <el-submenu :index="index+''" v-for="(item,index) in router"
                                    v-if="!item.hidden" :key="index">  <!--这个是遍历取出index.js中的路由地址数组-->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{ item.name }}</span>
                            </template>
                            <el-menu-item :index="child.path" v-for="(child,index) in item.children" :key="index">
                                {{child.name }}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right"
                                   v-if="this.$router.currentRoute.path!=='/home'">
                        <div class="brand">
                            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>{{this.$router.currentRoute.name}}
                            </el-breadcrumb-item>
                        </div>

                    </el-breadcrumb>

                    <div v-if="this.$router.currentRoute.path==='/home'" class="homePage">
                        欢迎来到人事管理系统 !
                    </div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed: {
            router() {
                return this.$store.state.routes;
            }
        },
        methods: {
            /* menuClick(index) {
               /!*console.log(index);
               console.log(indexPath);*!/
               this.$router.push(index)
             },*/
            commandHandler(cmd) {
                if (cmd === 'logout') {
                    this.$confirm('此操作注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user")
                        this.$store.commit("initRoutes", []);
                        this.$router.push("/")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        }

    }
</script>


<style>
    .brand {
        font-size: 20px;
        font-family: 华文楷体;
    }

    .homePage {
        font-size: 50px;
        font-family: 华文楷体;
        color: black;
        padding-top: 100px;
    }

    .homeHeader {
        background-color: #2c3e50;
        display: flex; /*是字体居中*/
        align-items: center; /*竖轴上居中*/
        justify-content: space-between; /*空白的地方在中间*/
        padding: 0 15px;
        box-sizing: border-box;
    }

    .title {
        padding: 3px;
        text-align: left;
        font-size: 30px;
        font-family: 华文行楷;
        color: lightblue;
    }

    .userInfo {
        text-align: right;
        cursor: pointer; /*改变手势*/
    }


    .el-dropdown-link {
        cursor: pointer;
        color: darkturquoise;
        font-size: 19px;
        font-family: 华文楷体;
        display: flex;
        align-items: center;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
</style>
