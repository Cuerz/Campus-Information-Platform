<template>
  <div>
    <section class="min-h-[80vh] px-[200px] py-10">
      <el-row>
        <el-col>
          <h3 class="font-sans font-bold text-[36px]">公告区</h3>
        </el-col>
      </el-row>
      <ul class="w-[50%] mx-auto mt-4">
        <li
          class="border-gray-200 border-b-[1px] py-2"
          v-for="(item, id) in announcementList"
          :key="id"
        >
          <div class="flex justify-between">
            <h4 class="text-[20px] font-bold flex items-center">
              <el-icon size="100%"><Edit /></el-icon>
              <span>{{ item.announcementTitle }}</span>
            </h4>
            <h4 class="text-[16px]">
              <el-icon><Timer /></el-icon>
              <el-tag type="primary">{{ parseTime(item.createTime) }}</el-tag>
            </h4>
          </div>
          <p class="">
            {{ item.announcementContent }}
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { listAnnouncement } from "@/api/announcement";
import { Edit, Timer } from "@element-plus/icons-vue";

const announcementList = ref([]);

/** 查询列表 */
function getList() {
  listAnnouncement().then((res) => {
    announcementList.value = res.data;
  });
}

getList();
</script>
