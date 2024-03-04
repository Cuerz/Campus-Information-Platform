<template>
	<div class="app-container">
		<el-row :gutter="20">
			<!--公告数据-->
			<el-col :span="20" :xs="24" :offset="2">
				<el-form
					:model="queryParams"
					ref="queryRef"
					:inline="true"
					v-show="showSearch"
					label-width="68px"
				>
					<el-form-item label="标题" prop="announcementTitle">
						<el-input
							v-model="queryParams.announcementTitle"
							placeholder="请输入标题"
							clearable
							style="width: 240px"
							@keyup.enter="handleQuery"
						/>
					</el-form-item>
					<el-form-item label="内容" prop="announcementContent">
						<el-input
							v-model="queryParams.announcementContent"
							placeholder="请输入内容"
							clearable
							style="width: 240px"
							@keyup.enter="handleQuery"
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="Search" @click="handleQuery"
							>搜索</el-button
						>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-form-item>
				</el-form>

				<el-row :gutter="10" class="mb8">
					<el-col :span="1.5">
						<el-button type="primary" plain icon="Plus" @click="handleAdd"
							>新增</el-button
						>
					</el-col>
					<el-col :span="1.5">
						<el-button
							type="danger"
							plain
							icon="Delete"
							:disabled="single"
							@click="handleDelete"
							>删除</el-button
						>
					</el-col>
					<right-toolbar
						v-model:showSearch="showSearch"
						@queryTable="getList"
						:columns="columns"
					></right-toolbar>
				</el-row>

				<el-table
					v-loading="loading"
					:data="announcementList"
					border
					fit
					highlight-current-row
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="50" align="center" />
					<el-table-column
						label="编号"
						align="center"
						key="announcementId"
						prop="announcementId"
						v-if="columns[0].visible"
					/>
					<el-table-column
						label="公告标题"
						align="center"
						key="announcementTitle"
						prop="announcementTitle"
						v-if="columns[1].visible"
						:show-overflow-tooltip="true"
					/>
					<el-table-column
						label="公告内容"
						align="center"
						key="announcementContent"
						prop="announcementContent"
						v-if="columns[2].visible"
						:show-overflow-tooltip="true"
					/>
					<el-table-column
						label="创建时间"
						align="center"
						prop="createTime"
						v-if="columns[3].visible"
						width="160"
					>
						<template #default="scope">
							<span>{{ parseTime(scope.row.createTime) }}</span>
						</template>
					</el-table-column>

					<el-table-column
						label="更新时间"
						align="center"
						prop="updateTime"
						v-if="columns[4].visible"
						width="160"
					>
						<template #default="scope">
							<span>{{ parseTime(scope.row.updateTime) }}</span>
						</template>
					</el-table-column>

					<el-table-column
						label="操作"
						align="center"
						width="150"
						class-name="small-padding fixed-width"
					>
						<template #default="scope">
							<el-tooltip content="删除" placement="top">
								<el-button
									link
									type="primary"
									icon="Delete"
									@click="handleDelete(scope.row)"
								></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
				<pagination
					v-show="total > 0"
					:total="total"
					v-model:page="queryParams.pageNum"
					v-model:limit="queryParams.pageSize"
					@pagination="getList"
				/>
			</el-col>
		</el-row>

		<!-- 添加活动对话框 -->
		<el-dialog :title="title" v-model="open" width="600px" append-to-body>
			<el-form
				:model="form"
				:rules="rules"
				ref="announcenmentRef"
				label-width="80px"
			>
				<el-row>
					<el-col :span="12">
						<el-form-item label="标题" prop="announcementTitle">
							<el-input
								v-model="form.announcementTitle"
								placeholder="请输入公告标题"
								maxlength="30"
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="内容" prop="announcementContent">
							<el-input
								v-model="form.announcementContent"
								type="textarea"
								placeholder="请输入公告内容"
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

<script setup name="Announcement">
import {
	listAnnouncement,
	delAnnouncement,
	addAnnouncement,
} from "@/api/core/announcement"
const { proxy } = getCurrentInstance()

const announcementList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const single = ref(true)
const total = ref(0)
const title = ref("")
const idSelect = ref([])

// 列显隐信息
const columns = ref([
	{ key: 0, label: `编号`, visible: true },
	{ key: 1, label: `公告标题`, visible: true },
	{ key: 2, label: `公告内容`, visible: true },
	{ key: 3, label: `创建时间`, visible: true },
	{ key: 4, label: `更新时间`, visible: true },
])

const data = reactive({
	form: {},
	queryParams: {
		pageNum: 1,
		pageSize: 10,
		announcementTitle: undefined,
		announcementContent: undefined,
	},
	rules: {
		announcementTitle: [
			{ required: true, message: "标题不能为空", trigger: "blur" },
		],
		announcementContent: [
			{ required: true, message: "内容不能为空", trigger: "blur" },
		],
	},
})

const { queryParams, form, rules } = toRefs(data)

/** 选择条数  */
function handleSelectionChange(selection) {
	single.value = selection.length != 1
	idSelect.value = selection.map((item) => item.announcementId)
}

/** 查询失物列表 */
function getList() {
	loading.value = true
	listAnnouncement(queryParams.value).then((res) => {
		announcementList.value = res.data.list
		total.value = res.data.total
		loading.value = false
	})
}

/** 搜索按钮操作 */
function handleQuery() {
	queryParams.value.pageNum = 1
	getList()
}
/** 重置按钮操作 */
function resetQuery() {
	proxy.resetForm("queryRef")
	handleQuery()
}

/** 重置操作表单 */
function reset() {
	form.value = {
		announcementTitle: undefined,
		announcementContent: undefined,
	}
	proxy.resetForm("announcenmentRef")
}

/** 新增按钮操作 */
function handleAdd() {
	reset()
	open.value = true
}

/** 删除按钮操作 */
function handleDelete(row) {
	const announcementId = row.announcementId || idSelect.value[0]
	proxy.$modal
		.confirm('是否确认删除编号为"' + announcementId + '"的记录？')
		.then(function () {
			return delAnnouncement(announcementId)
		})
		.then(() => {
			getList()
			proxy.$modal.msgSuccess("删除成功")
		})
		.catch(() => {})
}

/** 提交按钮 */
function submitForm() {
	proxy.$refs["announcenmentRef"].validate((valid) => {
		if (valid) {
			addAnnouncement(form.value).then((response) => {
				proxy.$modal.msgSuccess("新增成功")
				open.value = false
				getList()
			})
		}
	})
}

/** 取消按钮 */
function cancel() {
	open.value = false
	reset()
}

getList()
</script>
