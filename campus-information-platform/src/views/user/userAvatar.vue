<template>
  <div class="user-info-head">
    <img :src="options.img" class="rounded-[50%] w-[120px] h-[120px]" />
  </div>
</template>

<script setup>
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
const { proxy } = getCurrentInstance();

//图片裁剪数据
const options = reactive({
  img: userStore.avatar, // 裁剪图片的地址
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 200, // 默认生成截图框宽度
  autoCropHeight: 200, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
  outputType: "png", // 默认生成截图为PNG格式
  filename: "avatar", // 文件名称
  previews: {}, //预览数据
});
</script>

<style lang="scss" scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}
</style>
