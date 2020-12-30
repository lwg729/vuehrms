<template>
    <div>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="部门管理" name="depmanage"><DepManage></DepManage></el-tab-pane>
            <el-tab-pane label="职位管理" name="posmanage"><PosManage></PosManage></el-tab-pane>
            <el-tab-pane label="职称管理" name="joblevelmanage"><JoblevelManage></JoblevelManage></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="repurule"><RePuRule></RePuRule></el-tab-pane>
            <el-tab-pane label="权限组" name="permissionset"><PermissionSet></PermissionSet></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepManage from "../../components/sys/basic/DepManage";
    import PosManage from "../../components/sys/basic/PosManage";
    import JoblevelManage from "../../components/sys/basic/JobLevelManage";
    import RePuRule from "../../components/sys/basic/RePuRule";
    import PermissionSet from "../../components/sys/basic/PermissionSet";

    export default {
        name: "SysBasic",
        data() {
            return {
                activeName: 'depmanage',
            }
        },
        components: {
            DepManage,
            PosManage,
            JoblevelManage,
            RePuRule,
            PermissionSet
        }
    }
</script>

<style>

</style>
