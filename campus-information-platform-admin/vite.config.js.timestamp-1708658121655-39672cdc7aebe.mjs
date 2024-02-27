// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/admin/Desktop/ruoyi/RuoYi-Vue3-master/node_modules/.pnpm/vite@5.0.4_sass@1.69.5/node_modules/vite/dist/node/index.js";
import path2 from "path";

// vite/plugins/index.js
import vue from "file:///C:/Users/admin/Desktop/ruoyi/RuoYi-Vue3-master/node_modules/.pnpm/@vitejs+plugin-vue@4.5.0_vite@5.0.4_vue@3.3.9/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/auto-import.js
import autoImport from "file:///C:/Users/admin/Desktop/ruoyi/RuoYi-Vue3-master/node_modules/.pnpm/unplugin-auto-import@0.17.1_@vueuse+core@10.6.1/node_modules/unplugin-auto-import/dist/vite.js";
function createAutoImport() {
  return autoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia"
    ],
    dts: false
  });
}

// vite/plugins/svg-icon.js
import { createSvgIconsPlugin } from "file:///C:/Users/admin/Desktop/ruoyi/RuoYi-Vue3-master/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/compression.js
import compression from "file:///C:/Users/admin/Desktop/ruoyi/RuoYi-Vue3-master/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.0.4/node_modules/vite-plugin-compression/dist/index.mjs";
function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
}

// vite/plugins/setup-extend.js
import setupExtend from "file:///C:/Users/admin/Desktop/ruoyi/RuoYi-Vue3-master/node_modules/.pnpm/unplugin-vue-setup-extend-plus@1.0.0/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
function createSetupExtend() {
  return setupExtend({});
}

// vite/plugins/index.js
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}

// vite.config.js
var __vite_injected_original_dirname = "C:\\Users\\admin\\Desktop\\ruoyi\\RuoYi-Vue3-master";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path2.resolve(__vite_injected_original_dirname, "./"),
        // 设置别名
        "@": path2.resolve(__vite_injected_original_dirname, "./src")
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    // vite 相关配置
    server: {
      port: 80,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/dev-api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, "")
        }
      }
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAidml0ZS9wbHVnaW5zL2luZGV4LmpzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC5qcyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24uanMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLmpzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXHJ1b3lpXFxcXFJ1b1lpLVZ1ZTMtbWFzdGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXHJ1b3lpXFxcXFJ1b1lpLVZ1ZTMtbWFzdGVyXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZG1pbi9EZXNrdG9wL3J1b3lpL1J1b1lpLVZ1ZTMtbWFzdGVyL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGNyZWF0ZVZpdGVQbHVnaW5zIGZyb20gJy4vdml0ZS9wbHVnaW5zJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICBjb25zdCB7IFZJVEVfQVBQX0VOViB9ID0gZW52XHJcbiAgcmV0dXJuIHtcclxuICAgIC8vIFx1OTBFOFx1N0Y3Mlx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NTQ4Q1x1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NEUwQlx1NzY4NFVSTFx1MzAwMlxyXG4gICAgLy8gXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDdml0ZSBcdTRGMUFcdTUwNDdcdThCQkVcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTY2MkZcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjhcdTRFMDBcdTRFMkFcdTU3REZcdTU0MERcdTc2ODRcdTY4MzlcdThERUZcdTVGODRcdTRFMEFcclxuICAgIC8vIFx1NEY4Qlx1NTk4MiBodHRwczovL3d3dy5ydW95aS52aXAvXHUzMDAyXHU1OTgyXHU2NzlDXHU1RTk0XHU3NTI4XHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1QjUwXHU4REVGXHU1Rjg0XHU0RTBBXHVGRjBDXHU0RjYwXHU1QzMxXHU5NzAwXHU4OTgxXHU3NTI4XHU4RkQ5XHU0RTJBXHU5MDA5XHU5ODc5XHU2MzA3XHU1QjlBXHU4RkQ5XHU0RTJBXHU1QjUwXHU4REVGXHU1Rjg0XHUzMDAyXHU0RjhCXHU1OTgyXHVGRjBDXHU1OTgyXHU2NzlDXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4IGh0dHBzOi8vd3d3LnJ1b3lpLnZpcC9hZG1pbi9cdUZGMENcdTUyMTlcdThCQkVcdTdGNkUgYmFzZVVybCBcdTRFM0EgL2FkbWluL1x1MzAwMlxyXG4gICAgYmFzZTogVklURV9BUFBfRU5WID09PSAncHJvZHVjdGlvbicgPyAnLycgOiAnLycsXHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAvLyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNyZXNvbHZlLWFsaWFzXHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgLy8gXHU4QkJFXHU3RjZFXHU4REVGXHU1Rjg0XHJcbiAgICAgICAgJ34nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi8nKSxcclxuICAgICAgICAvLyBcdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3Jlc29sdmUtZXh0ZW5zaW9uc1xyXG4gICAgICBleHRlbnNpb25zOiBbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nLCAnLnZ1ZSddXHJcbiAgICB9LFxyXG4gICAgLy8gdml0ZSBcdTc2RjhcdTUxNzNcdTkxNERcdTdGNkVcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiA4MCxcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAvLyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNzZXJ2ZXItcHJveHlcclxuICAgICAgICAnL2Rldi1hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHApID0+IHAucmVwbGFjZSgvXlxcL2Rldi1hcGkvLCAnJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL2ZpeDplcnJvcjpzdGRpbj46NzM1NjoxOiB3YXJuaW5nOiBcIkBjaGFyc2V0XCIgbXVzdCBiZSB0aGUgZmlyc3QgcnVsZSBpbiB0aGUgZmlsZVxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvc3Rjc3NQbHVnaW46ICdpbnRlcm5hbDpjaGFyc2V0LXJlbW92YWwnLFxyXG4gICAgICAgICAgICBBdFJ1bGU6IHtcclxuICAgICAgICAgICAgICBjaGFyc2V0OiAoYXRSdWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXRSdWxlLm5hbWUgPT09ICdjaGFyc2V0Jykge1xyXG4gICAgICAgICAgICAgICAgICBhdFJ1bGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERlc2t0b3BcXFxccnVveWlcXFxcUnVvWWktVnVlMy1tYXN0ZXJcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXHJ1b3lpXFxcXFJ1b1lpLVZ1ZTMtbWFzdGVyXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWRtaW4vRGVza3RvcC9ydW95aS9SdW9ZaS1WdWUzLW1hc3Rlci92aXRlL3BsdWdpbnMvaW5kZXguanNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuXHJcbmltcG9ydCBjcmVhdGVBdXRvSW1wb3J0IGZyb20gJy4vYXV0by1pbXBvcnQnXHJcbmltcG9ydCBjcmVhdGVTdmdJY29uIGZyb20gJy4vc3ZnLWljb24nXHJcbmltcG9ydCBjcmVhdGVDb21wcmVzc2lvbiBmcm9tICcuL2NvbXByZXNzaW9uJ1xyXG5pbXBvcnQgY3JlYXRlU2V0dXBFeHRlbmQgZnJvbSAnLi9zZXR1cC1leHRlbmQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52LCBpc0J1aWxkID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IHZpdGVQbHVnaW5zID0gW3Z1ZSgpXVxyXG4gICAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVBdXRvSW1wb3J0KCkpXHJcblx0dml0ZVBsdWdpbnMucHVzaChjcmVhdGVTZXR1cEV4dGVuZCgpKVxyXG4gICAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVTdmdJY29uKGlzQnVpbGQpKVxyXG5cdGlzQnVpbGQgJiYgdml0ZVBsdWdpbnMucHVzaCguLi5jcmVhdGVDb21wcmVzc2lvbih2aXRlRW52KSlcclxuICAgIHJldHVybiB2aXRlUGx1Z2luc1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYWRtaW5cXFxcRGVza3RvcFxcXFxydW95aVxcXFxSdW9ZaS1WdWUzLW1hc3RlclxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERlc2t0b3BcXFxccnVveWlcXFxcUnVvWWktVnVlMy1tYXN0ZXJcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGF1dG8taW1wb3J0LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZG1pbi9EZXNrdG9wL3J1b3lpL1J1b1lpLVZ1ZTMtbWFzdGVyL3ZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC5qc1wiO2ltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBdXRvSW1wb3J0KCkge1xyXG4gICAgcmV0dXJuIGF1dG9JbXBvcnQoe1xyXG4gICAgICAgIGltcG9ydHM6IFtcclxuICAgICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAgICd2dWUtcm91dGVyJyxcclxuICAgICAgICAgICAgJ3BpbmlhJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZHRzOiBmYWxzZVxyXG4gICAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERlc2t0b3BcXFxccnVveWlcXFxcUnVvWWktVnVlMy1tYXN0ZXJcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXHJ1b3lpXFxcXFJ1b1lpLVZ1ZTMtbWFzdGVyXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzdmctaWNvbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWRtaW4vRGVza3RvcC9ydW95aS9SdW9ZaS1WdWUzLW1hc3Rlci92aXRlL3BsdWdpbnMvc3ZnLWljb24uanNcIjtpbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuXHRcdGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zL3N2ZycpXSxcclxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgICAgICBzdmdvT3B0aW9uczogaXNCdWlsZFxyXG4gICAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERlc2t0b3BcXFxccnVveWlcXFxcUnVvWWktVnVlMy1tYXN0ZXJcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXHJ1b3lpXFxcXFJ1b1lpLVZ1ZTMtbWFzdGVyXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWRtaW4vRGVza3RvcC9ydW95aS9SdW9ZaS1WdWUzLW1hc3Rlci92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24uanNcIjtpbXBvcnQgY29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wcmVzc2lvbihlbnYpIHtcclxuICAgIGNvbnN0IHsgVklURV9CVUlMRF9DT01QUkVTUyB9ID0gZW52XHJcbiAgICBjb25zdCBwbHVnaW4gPSBbXVxyXG4gICAgaWYgKFZJVEVfQlVJTERfQ09NUFJFU1MpIHtcclxuICAgICAgICBjb25zdCBjb21wcmVzc0xpc3QgPSBWSVRFX0JVSUxEX0NPTVBSRVNTLnNwbGl0KCcsJylcclxuICAgICAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcclxuICAgICAgICAgICAgLy8gaHR0cDovL2RvYy5ydW95aS52aXAvcnVveWktdnVlL290aGVyL2ZhcS5odG1sI1x1NEY3Rlx1NzUyOGd6aXBcdTg5RTNcdTUzOEJcdTdGMjlcdTk3NTlcdTYwMDFcdTY1ODdcdTRFRjZcclxuICAgICAgICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgICAgICAgICBjb21wcmVzc2lvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0OiAnLmd6JyxcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xyXG4gICAgICAgICAgICBwbHVnaW4ucHVzaChcclxuICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBleHQ6ICcuYnInLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwbHVnaW5cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERlc2t0b3BcXFxccnVveWlcXFxcUnVvWWktVnVlMy1tYXN0ZXJcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXHJ1b3lpXFxcXFJ1b1lpLVZ1ZTMtbWFzdGVyXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzZXR1cC1leHRlbmQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FkbWluL0Rlc2t0b3AvcnVveWkvUnVvWWktVnVlMy1tYXN0ZXIvdml0ZS9wbHVnaW5zL3NldHVwLWV4dGVuZC5qc1wiO2ltcG9ydCBzZXR1cEV4dGVuZCBmcm9tICd1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXMvdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNldHVwRXh0ZW5kKCkge1xyXG4gICAgcmV0dXJuIHNldHVwRXh0ZW5kKHt9KVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1UsU0FBUyxjQUFjLGVBQWU7QUFDOVcsT0FBT0EsV0FBVTs7O0FDRHNWLE9BQU8sU0FBUzs7O0FDQUosT0FBTyxnQkFBZ0I7QUFFM1gsU0FBUixtQkFBb0M7QUFDdkMsU0FBTyxXQUFXO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLElBQ0EsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUNMOzs7QUNYNlcsU0FBUyw0QkFBNEI7QUFDbFosT0FBTyxVQUFVO0FBRUYsU0FBUixjQUErQixTQUFTO0FBQzNDLFNBQU8scUJBQXFCO0FBQUEsSUFDOUIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxzQkFBc0IsQ0FBQztBQUFBLElBQ3hELFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxFQUNqQixDQUFDO0FBQ0w7OztBQ1RtWCxPQUFPLGlCQUFpQjtBQUU1WCxTQUFSLGtCQUFtQyxLQUFLO0FBQzNDLFFBQU0sRUFBRSxvQkFBb0IsSUFBSTtBQUNoQyxRQUFNLFNBQVMsQ0FBQztBQUNoQixNQUFJLHFCQUFxQjtBQUNyQixVQUFNLGVBQWUsb0JBQW9CLE1BQU0sR0FBRztBQUNsRCxRQUFJLGFBQWEsU0FBUyxNQUFNLEdBQUc7QUFFL0IsYUFBTztBQUFBLFFBQ0gsWUFBWTtBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0wsa0JBQWtCO0FBQUEsUUFDdEIsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQ0EsUUFBSSxhQUFhLFNBQVMsUUFBUSxHQUFHO0FBQ2pDLGFBQU87QUFBQSxRQUNILFlBQVk7QUFBQSxVQUNSLEtBQUs7QUFBQSxVQUNMLFdBQVc7QUFBQSxVQUNYLGtCQUFrQjtBQUFBLFFBQ3RCLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDQSxTQUFPO0FBQ1g7OztBQzNCcVgsT0FBTyxpQkFBaUI7QUFFOVgsU0FBUixvQkFBcUM7QUFDeEMsU0FBTyxZQUFZLENBQUMsQ0FBQztBQUN6Qjs7O0FKR2UsU0FBUixrQkFBbUMsU0FBUyxVQUFVLE9BQU87QUFDaEUsUUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDO0FBQzFCLGNBQVksS0FBSyxpQkFBaUIsQ0FBQztBQUN0QyxjQUFZLEtBQUssa0JBQWtCLENBQUM7QUFDakMsY0FBWSxLQUFLLGNBQWMsT0FBTyxDQUFDO0FBQzFDLGFBQVcsWUFBWSxLQUFLLEdBQUcsa0JBQWtCLE9BQU8sQ0FBQztBQUN0RCxTQUFPO0FBQ1g7OztBRGRBLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsTUFBTSxRQUFRLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxRQUFNLEVBQUUsYUFBYSxJQUFJO0FBQ3pCLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlMLE1BQU0saUJBQWlCLGVBQWUsTUFBTTtBQUFBLElBQzVDLFNBQVMsa0JBQWtCLEtBQUssWUFBWSxPQUFPO0FBQUEsSUFDbkQsU0FBUztBQUFBO0FBQUEsTUFFUCxPQUFPO0FBQUE7QUFBQSxRQUVMLEtBQUtDLE1BQUssUUFBUSxrQ0FBVyxJQUFJO0FBQUE7QUFBQSxRQUVqQyxLQUFLQSxNQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUE7QUFBQSxNQUVBLFlBQVksQ0FBQyxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsU0FBUyxNQUFNO0FBQUEsSUFDcEU7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBO0FBQUEsUUFFTCxZQUFZO0FBQUEsVUFDVixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsY0FBYyxFQUFFO0FBQUEsUUFDNUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsZUFBZTtBQUFBLFlBQ2YsUUFBUTtBQUFBLGNBQ04sU0FBUyxDQUFDLFdBQVc7QUFDbkIsb0JBQUksT0FBTyxTQUFTLFdBQVc7QUFDN0IseUJBQU8sT0FBTztBQUFBLGdCQUNoQjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInBhdGgiXQp9Cg==
