<template>
    <div>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="部门管理" name="first"><DepManage></DepManage></el-tab-pane>
            <el-tab-pane label="职位管理" name="second"><PosManage></PosManage></el-tab-pane>
            <el-tab-pane label="职称管理" name="third"><TitleManage></TitleManage></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="fourth"><RePuRule></RePuRule></el-tab-pane>
            <el-tab-pane label="权限组" name="fifth"><PermissionSet></PermissionSet></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepManage from "../../components/sys/basic/DepManage";
    import PosManage from "../../components/sys/basic/PosManage";
    import TitleManage from "../../components/sys/basic/TitleManage";
    import RePuRule from "../../components/sys/basic/RePuRule";
    import PermissionSet from "../../components/sys/basic/PermissionSet";

    export default {
        name: "SysBasic",
        data() {
            return {
                activeName: 'second',
            }
        },
        components: {
            DepManage,
            PosManage,
            TitleManage,
            RePuRule,
            PermissionSet
        }
    }
</script>

<style>

</style>
