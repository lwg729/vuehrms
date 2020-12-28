<template>
    <div style="width: 500px">
        <el-input
                placeholder="输入关键字进行过滤"
                prefix-icon="el-icon-search"
                v-model="filterText">
        </el-input>

        <el-tree style="margin-top: 10px"
                class="filter-tree"
                :data="deps"
                :props="defaultProps"
                :filter-node-method="filterNode"
                ref="tree">
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: "DepManager",
        data() {
            return {
                filterText: '',
                deps: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
            }
        },
        mounted() {
            this.initDeps();
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            initDeps() {
                this.getRequest("/system/basic/department/").then(resp => {
                    if (resp) {
                        this.deps = resp;
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        }
    }
</script>

<style>

</style>
