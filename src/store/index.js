import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    //定义变量的
    state:{
        //这是路由数组,从服务器上加载的菜单项都放置在这个数组里
        routes: []
    },

    //修改变量的方法 相当于java中的setter方法
    mutations:{
        //通过方法  state:要通过state才可以访问到上面的state变量里面的routes数组,
        //data: 传进来的参数, 等下调用只需传data参数即可
        initRoutes(state,data){
            state.routes=data;
        }

    },
    actions: {

    }
})


