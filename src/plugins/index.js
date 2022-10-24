// vant组件
import Vue from 'vue'
import { Button, NavBar, Form, Field, Toast, CountDown } from 'vant'
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Grid, GridItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Search } from 'vant';
import { Tab, Tabs } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { Popup } from 'vant';
import { Icon } from 'vant';
import { Loading } from 'vant';
import { Divider } from 'vant';
import { Picker } from 'vant';
import { DatetimePicker } from 'vant';
// 使用组件



Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(Divider);
Vue.use(Loading);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
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