import { createWebHistory, createRouter } from "vue-router"
/* Layout */
import Layout from "@/layout"

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
	{
		path: "/redirect",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "/redirect/:path(.*)",
				component: () => import("@/views/redirect/index.vue"),
			},
		],
	},
	{
		path: "/login",
		component: () => import("@/views/login"),
		hidden: true,
	},
	{
		path: "/register",
		component: () => import("@/views/register"),
		hidden: true,
	},
	{
		path: "/:pathMatch(.*)*",
		component: () => import("@/views/error/404"),
		hidden: true,
	},
	{
		path: "/401",
		component: () => import("@/views/error/401"),
		hidden: true,
	},
	{
		path: "",
		component: Layout,
		redirect: "/index",
		children: [
			{
				path: "/index",
				component: () => import("@/views/index"),
				name: "Index",
				meta: { title: "首页", icon: "dashboard", affix: true },
			},
		],
	},
	{
		path: "/user",
		component: Layout,
		hidden: true,
		redirect: "noredirect",
		children: [
			{
				path: "profile",
				component: () => import("@/views/system/user/profile/index"),
				name: "Profile",
				meta: { title: "个人中心", icon: "user" },
			},
		],
	},
	{
		path: "/system/user-auth",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "role/:userId(\\d+)",
				component: () => import("@/views/system/user/authRole"),
				name: "AuthRole",
				meta: { title: "分配角色", activeMenu: "/system/user" },
			},
		],
	},
	{
		path: "/system/role-auth",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "user/:roleId(\\d+)",
				component: () => import("@/views/system/role/authUser"),
				name: "AuthUser",
				meta: { title: "分配用户", activeMenu: "/system/role" },
			},
		],
	},
	{
		path: "/system/dict-data",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "index/:dictId(\\d+)",
				component: () => import("@/views/system/dict/data"),
				name: "Data",
				meta: { title: "字典数据", activeMenu: "/system/dict" },
			},
		],
	},
	{
		path: "/monitor/job-log",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "index/:jobId(\\d+)",
				component: () => import("@/views/core/old/log"),
				name: "JobLog",
				meta: { title: "调度日志", activeMenu: "/monitor/job" },
			},
		],
	},
	{
		path: "/tool/gen-edit",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "index/:tableId(\\d+)",
				component: () => import("@/views/tool/gen/editTable"),
				name: "GenEdit",
				meta: { title: "修改生成配置", activeMenu: "/tool/gen" },
			},
		],
	},

	{
		name: "System",
		path: "/system",
		component: Layout,
		hidden: false,
		redirect: "noRedirect",
		alwaysShow: true,
		meta: {
			title: "系统管理",
			icon: "system",
			noCache: false,
			link: null,
		},
		children: [
			{
				name: "User",
				path: "user",
				component: () => import("@/views/system/user/index"),
				hidden: false,
				meta: {
					title: "用户管理",
					icon: "user",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Role",
				path: "role",
				component: () => import("@/views/system/role/index"),
				hidden: false,
				meta: {
					title: "角色管理",
					icon: "peoples",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Menu",
				path: "menu",
				component: () => import("@/views/system/menu/index"),
				hidden: false,
				meta: {
					title: "菜单管理",
					icon: "tree-table",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Dept",
				path: "dept",
				component: () => import("@/views/system/dept/index"),
				hidden: false,
				meta: {
					title: "部门管理",
					icon: "tree",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Post",
				path: "post",
				component: () => import("@/views/system/post/index"),
				hidden: false,
				meta: {
					title: "岗位管理",
					icon: "post",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Dict",
				path: "dict",
				component: () => import("@/views/system/dict/index"),
				hidden: false,
				meta: {
					title: "字典管理",
					icon: "dict",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Config",
				path: "config",
				component: () => import("@/views/system/config/index"),
				hidden: false,
				meta: {
					title: "参数设置",
					icon: "edit",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Notice",
				path: "notice",
				component: () => import("@/views/system/notice/index"),
				hidden: false,
				meta: {
					title: "通知公告",
					icon: "message",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Log",
				path: "log",
				hidden: false,
				redirect: "noRedirect",
				alwaysShow: true,
				meta: {
					title: "日志管理",
					icon: "log",
					noCache: false,
					link: null,
				},
				children: [
					{
						name: "Operlog",
						path: "operlog",
						component: () => import("@/views/core/operlog/index"),
						hidden: false,
						meta: {
							title: "操作日志",
							icon: "form",
							noCache: false,
							link: null,
						},
					},
					{
						name: "Logininfor",
						path: "logininfor",
						component: () => import("@/views/core/logininfor/index"),
						hidden: false,
						meta: {
							title: "登录日志",
							icon: "logininfor",
							noCache: false,
							link: null,
						},
					},
				],
			},
		],
	},
	{
		name: "Core",
		path: "/core",
		component: Layout,
		hidden: false,
		redirect: "noRedirect",
		alwaysShow: true,
		meta: {
			title: "核心业务",
			icon: "monitor",
			noCache: false,
			link: null,
		},
		children: [
			{
				name: "Lost",
				path: "lost",
				component: () => import("@/views/core/lost/index"),
				hidden: false,
				meta: {
					title: "失物认领",
					icon: "online",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Old",
				path: "old",
				component: () => import("@/views/core/old/index"),
				hidden: false,
				meta: {
					title: "二手交易",
					icon: "job",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Activity",
				path: "activity",
				component: () => import("@/views/core/activity/index"),
				hidden: false,
				meta: {
					title: "校园活动",
					icon: "druid",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Announcement",
				path: "announcement",
				component: () => import("@/views/core/announcement/index"),
				hidden: false,
				meta: {
					title: "公告管理",
					icon: "server",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Cache",
				path: "cache",
				component: () => import("@/views/core/cache/index"),
				hidden: false,
				meta: {
					title: "缓存监控",
					icon: "redis",
					noCache: false,
					link: null,
				},
			},
			{
				name: "CacheList",
				path: "cacheList",
				component: () => import("@/views/core/cache/list"),
				hidden: false,
				meta: {
					title: "缓存列表",
					icon: "redis-list",
					noCache: false,
					link: null,
				},
			},
		],
	},
	{
		name: "Tool",
		path: "/tool",
		component: Layout,
		hidden: false,
		redirect: "noRedirect",
		alwaysShow: true,
		meta: {
			title: "系统工具",
			icon: "tool",
			noCache: false,
			link: null,
		},
		children: [
			{
				name: "Gen",
				path: "gen",
				component: () => import("@/views/tool/gen/index"),
				hidden: false,
				meta: {
					title: "代码生成",
					icon: "code",
					noCache: false,
					link: null,
				},
			},
			{
				name: "Swagger",
				path: "swagger",
				component: () => import("@/views/tool/swagger/index"),
				hidden: false,
				meta: {
					title: "系统接口",
					icon: "swagger",
					noCache: false,
					link: null,
				},
			},
		],
	},
	// {
	//     "name": "Http://ruoyi.vip",
	//     "path": "http://ruoyi.vip",
	//     "hidden": false,
	//     "meta": {
	//         "title": "若依官网",
	//         "icon": "guide",
	//         "noCache": false,
	//         "link": "http://ruoyi.vip"
	//     }
	// }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = []

const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},
})

export default router
