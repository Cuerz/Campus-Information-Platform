import { useDynamicTitle } from "@/utils/dynamicTitle";

const useSettingsStore = defineStore("settings", {
  state: () => ({
    title: "",
  }),
  actions: {
    // 设置网页标题
    setTitle(title) {
      this.title = title;
      useDynamicTitle();
    },
  },
});

export default useSettingsStore;
