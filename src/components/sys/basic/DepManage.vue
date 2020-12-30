<template>
    <div style="width: 500px">
        <el-input
                placeholder="请输入部门名称搜索部门..."
                prefix-icon="el-icon-search"
                v-model="filterText">
        </el-input>

        <el-tree style="margin-top: 10px"
                 class="filter-tree"
                 :expand-on-click-node="false"
                 :data="deps"
                 :props="defaultProps"
                 :filter-node-method="filterNode"
                 ref="tree">
            <span class="custom-tree-node" style="display: flex;justify-content: space-between;width: 100%"
                  slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                    <span>
                      <el-button
                              type="primary"
                              size="mini"
                              class="depBtn"
                              @click="() => doAddDep(data)">
                        添加部门
                      </el-button>
                      <el-button
                              type="danger"
                              size="mini"
                              class="depBtn"
                              @click="() => doDeleteDep(data)">
                        删除部门
                      </el-button>
                    </span>
             </span>
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
                return data.name.indexOf(value) !== -1;
            },
            doAddDep(data){
                console.log(data)
            },
            doDeleteDep(data){
                console.log(data)
            }
        }
    }
</script>

<style>
    .depBtn {
        padding: 5px;
    }
</style>
