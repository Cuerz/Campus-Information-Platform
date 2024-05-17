<template>
  <div
    class="bg-[url('@/assets/images/main-bg.jpg')] bg-cover bg-center bg-no-repeat min-h-[80vh] px-[200px] py-10"
  >
    <el-row>
      <el-col :span="20">
        <h3 class="font-sans font-bold text-[36px] text-white">二手交易中心</h3>
      </el-col>
      <el-col :span="4">
        <el-button
          v-if="user.roleId <= 2"
          type="primary"
          plain
          @click="handleAdd"
          >我要发布</el-button
        >
      </el-col>
    </el-row>

    <div class="mt-14 mx-14 grid grid-cols-4 gap-[20px]">
      <div
        class="w-[15vw] bg-white"
        :key="id"
        v-for="(item, id) in oldStuffList"
      >
        <el-image
          class="w-[15vw] h-[25vh] object-cover block"
          :src="item.oldStuffPic"
          :preview-src-list="[item.oldStuffPic]"
          preview-teleported
        ></el-image>
        <div class="px-1">
          <div class="flex justify-between">
            <h3 class="text-[24px] font-bold font-sans text-gray-600">
              {{ item.oldStuffName }}
            </h3>
            <el-button type="primary" link @click="getPhone(item.contactNumber)"
              >联系方式</el-button
            >
          </div>
          <p class="mt-1">
            <el-button
              style="font-size: 20px"
              type="warning"
              link
              @click="getDescription(item.description)"
              >获取详细信息</el-button
            >
          </p>
        </div>
      </div>
    </div>

    <!-- 添加二手物品对话框 -->
    <el-dialog v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" ref="oldRef" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="物品名称" prop="oldStuffName">
              <el-input
                v-model="form.oldStuffName"
                placeholder="请输入二手物品名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="contactNumber">
              <el-input
                v-model="form.contactNumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物品图片" prop="oldStuffPic">
              <el-upload
                class="img-uploader"
                v-loading="imgLoading"
                action="http://localhost:8080/api/upload"
                name="imgFile"
                :on-success="handleUploadSuccess"
                :show-file-list="false"
                :before-upload="(file) => beforeImgUpload(file)"
              >
                <img
                  v-if="form.oldStuffPic"
                  :src="form.oldStuffPic"
                  class="img"
                />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
              <div class="el-upload__tip">
                请上传 大小不超过 <b style="color: #f56c6c">5MB</b><br />
                格式为 <b style="color: #f56c6c">png/jpg/jpeg</b>
                的文件
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细信息" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import { listOldStuff, addStuff } from "@/api/old";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();

const { proxy } = getCurrentInstance();

const oldStuffList = ref([]);
const open = ref(false);
const imgLoading = ref(false);

const data = reactive({
  user: {
    roleId: userStore.roleId,
  },
  form: {},
  rules: {
    oldStuffName: [
      { required: true, message: "物品名称不能为空", trigger: "blur" },
    ],
    description: [
      { required: true, message: "详细信息不能为空", trigger: "blur" },
    ],
    contactNumber: [
      { required: true, message: "联系方式不能为空", trigger: "blur" },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur",
      },
    ],
    oldStuffPic: [{ required: true, message: "图片不能为空", trigger: "blur" }],
  },
});

const { user, form, rules } = toRefs(data);

/** 查询列表 */
function getList() {
  listOldStuff().then((res) => {
    oldStuffList.value = res.data;
  });
}

/** 查询联系方式 */
function getPhone(contactNumber) {
  ElMessageBox.confirm("联系方式为：" + contactNumber, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "success",
  });
}

/** 查询联系方式 */
function getDescription(description) {
  ElMessageBox.confirm(description, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  });
}

/** 发布按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["oldRef"].validate((valid) => {
    if (valid) {
      addStuff(form.value).then((response) => {
        ElMessage.success("提交成功，请等待管理员审核");
        open.value = false;
        getList();
      });
    }
  });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

/** 重置操作表单 */
function reset() {
  form.value = {
    oldStuffName: undefined,
    contactNumber: undefined,
    oldStuffPic: undefined,
    description: undefined,
  };
  proxy.resetForm("oldRef");
}

/** 上传前图片验证 */
function beforeImgUpload(file) {
  imgLoading.value = true;
  const isJPG =
    file.type === "image/jpeg" ||
    file.type === "image/gif" ||
    file.type === "image/png";
  const isLt4M = file.size / 1024 / 1024 / 1024 / 1024 < 4;
  if (!isJPG) {
    proxy.$modal.msgError("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt4M) {
    proxy.$modal.msgError("上传头像图片大小不能超过 4MB!");
  }
  return isJPG && isLt4M;
}

/** 上传成功处理逻辑 */
function handleUploadSuccess(res) {
  form.value.oldStuffPic = res.data;
  imgLoading.value = false;
}

getList();
</script>

<style>
.img-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.img-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<style scoped>
.img-uploader .img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

