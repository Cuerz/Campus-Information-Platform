import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      routes: [],
      addRoutes: [],
      defaultRoutes:  [
        {
            "path": "/redirect",
            "component": " Layout",
            "hidden": true,
            "children": [
                {
                    "path": "/redirect/:path(.*)"
                }
            ]
        },
        {
            "path": "/login",
            "hidden": true
        },
        {
            "path": "/register",
            "hidden": true
        },
        {
            "path": "/:pathMatch(.*)*",
            "hidden": true
        },
        {
            "path": "/401",
            "hidden": true
        },
        {
            "path": "",
            "component": " Layout",
            "redirect": "/index",
            "children": [
                {
                    "path": "/index",
                    "name": "Index",
                    "meta": {
                        "title": "首页",
                        "icon": "dashboard",
                        "affix": true
                    }
                }
            ]
        },
        {
            "path": "/user",
            "component": " Layout",
            "hidden": true,
            "redirect": "noredirect",
            "children": [
                {
                    "path": "profile",
                    "name": "Profile",
                    "meta": {
                        "title": "个人中心",
                        "icon": "user"
                    }
                }
            ]
        },
        {
            "name": "System",
            "path": "/system",
            "hidden": false,
            "redirect": "noRedirect",
            "component": " Layout",
            "alwaysShow": true,
            "meta": {
                "title": "系统管理",
                "icon": "system",
                "noCache": false,
                "link": null
            },
            "children": [
                {
                    "name": "User",
                    "path": "user",
                    "hidden": false,
                    "meta": {
                        "title": "用户管理",
                        "icon": "user",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Role",
                    "path": "role",
                    "hidden": false,
                    "meta": {
                        "title": "角色管理",
                        "icon": "peoples",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Menu",
                    "path": "menu",
                    "hidden": false,
                    "meta": {
                        "title": "菜单管理",
                        "icon": "tree-table",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Dept",
                    "path": "dept",
                    "hidden": false,
                    "meta": {
                        "title": "部门管理",
                        "icon": "tree",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Post",
                    "path": "post",
                    "hidden": false,
                    "meta": {
                        "title": "岗位管理",
                        "icon": "post",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Dict",
                    "path": "dict",
                    "hidden": false,
                    "meta": {
                        "title": "字典管理",
                        "icon": "dict",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Config",
                    "path": "config",
                    "hidden": false,
                    "meta": {
                        "title": "参数设置",
                        "icon": "edit",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Notice",
                    "path": "notice",
                    "hidden": false,
                    "meta": {
                        "title": "通知公告",
                        "icon": "message",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Log",
                    "path": "log",
                    "hidden": false,
                    "redirect": "noRedirect",
                    "component": " Layout",
                    "alwaysShow": true,
                    "meta": {
                        "title": "日志管理",
                        "icon": "log",
                        "noCache": false,
                        "link": null
                    },
                    "children": [
                        {
                            "name": "Operlog",
                            "path": "operlog",
                            "hidden": false,
                            "meta": {
                                "title": "操作日志",
                                "icon": "form",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Logininfor",
                            "path": "logininfor",
                            "hidden": false,
                            "meta": {
                                "title": "登录日志",
                                "icon": "logininfor",
                                "noCache": false,
                                "link": null
                            }
                        }
                    ]
                }
            ]
        },
        {
            "name": "Core",
            "path": "/core",
            "hidden": false,
            "redirect": "noRedirect",
            "component": " Layout",
            "alwaysShow": true,
            "meta": {
                "title": "核心业务",
                "icon": "monitor",
                "noCache": false,
                "link": null
            },
            "children": [
                {
                    "name": "Lost",
                    "path": "lost",
                    "hidden": false,
                    "meta": {
                        "title": "失物认领",
                        "icon": "online",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Old",
                    "path": "old",
                    "hidden": false,
                    "meta": {
                        "title": "二手交易",
                        "icon": "job",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Activity",
                    "path": "activity",
                    "hidden": false,
                    "meta": {
                        "title": "校园活动",
                        "icon": "druid",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Server",
                    "path": "server",
                    "hidden": false,
                    "meta": {
                        "title": "服务监控",
                        "icon": "server",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Cache",
                    "path": "cache",
                    "hidden": false,
                    "meta": {
                        "title": "缓存监控",
                        "icon": "redis",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "CacheList",
                    "path": "cacheList",
                    "hidden": false,
                    "meta": {
                        "title": "缓存列表",
                        "icon": "redis-list",
                        "noCache": false,
                        "link": null
                    }
                }
            ]
        },
        {
            "name": "Tool",
            "path": "/tool",
            "hidden": false,
            "redirect": "noRedirect",
           "component": " Layout",
            "alwaysShow": true,
            "meta": {
                "title": "系统工具",
                "icon": "tool",
                "noCache": false,
                "link": null
            },
            "children": [
                {
                    "name": "Build",
                    "path": "build",
                    "hidden": false,
                    "meta": {
                        "title": "表单构建",
                        "icon": "build",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Gen",
                    "path": "gen",
                    "hidden": false,
                    "meta": {
                        "title": "代码生成",
                        "icon": "code",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Swagger",
                    "path": "swagger",
                    "hidden": false,
                    "meta": {
                        "title": "系统接口",
                        "icon": "swagger",
                        "noCache": false,
                        "link": null
                    }
                }
            ]
        },
        {
            "name": "Http://ruoyi.vip",
            "path": "http://ruoyi.vip",
            "hidden": false,
            "component": " Layout",
            "meta": {
                "title": "若依官网",
                "icon": "guide",
                "noCache": false,
                "link": "http://ruoyi.vip"
            }
        }
    ],
      topbarRouters: [],
      sidebarRouters: [
        {
            "path": "/redirect",
            "component": " Layout",
            "hidden": true,
            "children": [
                {
                    "path": "/redirect/:path(.*)"
                }
            ]
        },
        {
            "path": "/login",
            "hidden": true
        },
        {
            "path": "/register",
            "hidden": true
        },
        {
            "path": "/:pathMatch(.*)*",
            "hidden": true
        },
        {
            "path": "/401",
            "hidden": true
        },
        {
            "path": "",
            "component": " Layout",
            "redirect": "/index",
            "children": [
                {
                    "path": "/index",
                    "name": "Index",
                    "meta": {
                        "title": "首页",
                        "icon": "dashboard",
                        "affix": true
                    }
                }
            ]
        },
        {
            "path": "/user",
            "component": " Layout",
            "hidden": true,
            "redirect": "noredirect",
            "children": [
                {
                    "path": "profile",
                    "name": "Profile",
                    "meta": {
                        "title": "个人中心",
                        "icon": "user"
                    }
                }
            ]
        },
        {
            "name": "System",
            "path": "/system",
            "hidden": false,
            "redirect": "noRedirect",
            "component": " Layout",
            "alwaysShow": true,
            "meta": {
                "title": "系统管理",
                "icon": "system",
                "noCache": false,
                "link": null
            },
            "children": [
                {
                    "name": "User",
                    "path": "user",
                    "hidden": false,
                    "meta": {
                        "title": "用户管理",
                        "icon": "user",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Role",
                    "path": "role",
                    "hidden": false,
                    "meta": {
                        "title": "角色管理",
                        "icon": "peoples",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Menu",
                    "path": "menu",
                    "hidden": false,
                    "meta": {
                        "title": "菜单管理",
                        "icon": "tree-table",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Dept",
                    "path": "dept",
                    "hidden": false,
                    "meta": {
                        "title": "部门管理",
                        "icon": "tree",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Post",
                    "path": "post",
                    "hidden": false,
                    "meta": {
                        "title": "岗位管理",
                        "icon": "post",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Dict",
                    "path": "dict",
                    "hidden": false,
                    "meta": {
                        "title": "字典管理",
                        "icon": "dict",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Config",
                    "path": "config",
                    "hidden": false,
                    "meta": {
                        "title": "参数设置",
                        "icon": "edit",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Notice",
                    "path": "notice",
                    "hidden": false,
                    "meta": {
                        "title": "通知公告",
                        "icon": "message",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Log",
                    "path": "log",
                    "hidden": false,
                    "redirect": "noRedirect",
                    "component": " Layout",
                    "alwaysShow": true,
                    "meta": {
                        "title": "日志管理",
                        "icon": "log",
                        "noCache": false,
                        "link": null
                    },
                    "children": [
                        {
                            "name": "Operlog",
                            "path": "operlog",
                            "hidden": false,
                            "meta": {
                                "title": "操作日志",
                                "icon": "form",
                                "noCache": false,
                                "link": null
                            }
                        },
                        {
                            "name": "Logininfor",
                            "path": "logininfor",
                            "hidden": false,
                            "meta": {
                                "title": "登录日志",
                                "icon": "logininfor",
                                "noCache": false,
                                "link": null
                            }
                        }
                    ]
                }
            ]
        },
        {
            "name": "Core",
            "path": "/core",
            "hidden": false,
            "redirect": "noRedirect",
            "component": " Layout",
            "alwaysShow": true,
            "meta": {
                "title": "核心业务",
                "icon": "monitor",
                "noCache": false,
                "link": null
            },
            "children": [
                {
                    "name": "Lost",
                    "path": "lost",
                    "hidden": false,
                    "meta": {
                        "title": "失物认领",
                        "icon": "online",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Old",
                    "path": "old",
                    "hidden": false,
                    "meta": {
                        "title": "二手交易",
                        "icon": "job",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Activity",
                    "path": "activity",
                    "hidden": false,
                    "meta": {
                        "title": "校园活动",
                        "icon": "druid",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Server",
                    "path": "server",
                    "hidden": false,
                    "meta": {
                        "title": "服务监控",
                        "icon": "server",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Cache",
                    "path": "cache",
                    "hidden": false,
                    "meta": {
                        "title": "缓存监控",
                        "icon": "redis",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "CacheList",
                    "path": "cacheList",
                    "hidden": false,
                    "meta": {
                        "title": "缓存列表",
                        "icon": "redis-list",
                        "noCache": false,
                        "link": null
                    }
                }
            ]
        },
        {
            "name": "Tool",
            "path": "/tool",
            "hidden": false,
            "redirect": "noRedirect",
           "component": " Layout",
            "alwaysShow": true,
            "meta": {
                "title": "系统工具",
                "icon": "tool",
                "noCache": false,
                "link": null
            },
            "children": [
                {
                    "name": "Build",
                    "path": "build",
                    "hidden": false,
                    "meta": {
                        "title": "表单构建",
                        "icon": "build",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Gen",
                    "path": "gen",
                    "hidden": false,
                    "meta": {
                        "title": "代码生成",
                        "icon": "code",
                        "noCache": false,
                        "link": null
                    }
                },
                {
                    "name": "Swagger",
                    "path": "swagger",
                    "hidden": false,
                    "meta": {
                        "title": "系统接口",
                        "icon": "swagger",
                        "noCache": false,
                        "link": null
                    }
                }
            ]
        },
        {
            "name": "Http://ruoyi.vip",
            "path": "http://ruoyi.vip",
            "hidden": false,
            "component": " Layout",
            "meta": {
                "title": "若依官网",
                "icon": "guide",
                "noCache": false,
                "link": "http://ruoyi.vip"
            }
        }
    ]
    }),
    actions: {
      setRoutes(routes) {
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)
      },
      setDefaultRoutes(routes) {
        this.defaultRoutes = constantRoutes.concat(routes)
      },
      setTopbarRoutes(routes) {
        this.topbarRouters = routes
      },
      setSidebarRouters(routes) {
        this.sidebarRouters = routes
      },
      // generateRoutes(roles) {
      //   return new Promise(resolve => {
      //     // 向后端请求路由数据
      //     getRouters().then(res => {
      //       const sdata = JSON.parse(JSON.stringify(res.data))
      //       const rdata = JSON.parse(JSON.stringify(res.data))
      //       const defaultData = JSON.parse(JSON.stringify(res.data))
      //       const sidebarRoutes = filterAsyncRouter(sdata)
      //       const rewriteRoutes = filterAsyncRouter(rdata, false, true)
      //       const defaultRoutes = filterAsyncRouter(defaultData)
      //       const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
      //       asyncRoutes.forEach(route => { router.addRoute(route) })
      //       this.setRoutes(rewriteRoutes)
      //       this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
      //       this.setDefaultRoutes(sidebarRoutes)
      //       this.setTopbarRoutes(defaultRoutes)
      //       resolve(rewriteRoutes)
      //     })
      //   })
      // }
    }
  })

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el))
        return
      }
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore
