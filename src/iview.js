import Vue from 'vue';
// import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css'; // 组件样式文件
 // index.vue布局中用到的iview组件
import { Layout, Header, Menu, MenuItem, Sider , Submenu, Icon ,Breadcrumb, BreadcrumbItem   } from 'view-design';
// QueryList.vue用到的iview组件
import { Collapse, Panel, Input, Row,Button,Select,Option } from 'view-design';
// TabList.vue用到的iview组件
import { Table,Modal  } from 'view-design';
//	表单组件
import { Form,FormItem,Tree } from 'view-design';

Vue.prototype.$Modal = Modal
// Vue.use(ViewUI);

Vue.component('Layout', Layout);  
Vue.component('Header', Header);  
Vue.component('Menu', Menu);  
Vue.component('MenuItem', MenuItem);  
Vue.component('Sider', Sider);  
Vue.component('Submenu', Submenu); 
Vue.component('Icon', Icon);
Vue.component('Breadcrumb', Breadcrumb); 
Vue.component('BreadcrumbItem', BreadcrumbItem);


Vue.component('Collapse', Collapse); 
Vue.component('Panel', Panel);
Vue.component('Input', Input);
Vue.component('Row', Row);
Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.component('Option', Option);

Vue.component('Table', Table);
Vue.component('Modal', Modal);

Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Tree', Tree);