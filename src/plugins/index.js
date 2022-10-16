// vant组件
import Vue from 'vue'
import { Button, NavBar, Form, Field, Toast, CountDown } from 'vant'
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Grid, GridItem } from 'vant';
import { Cell, CellGroup } from 'vant';


// 使用组件
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(VanImage);
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);