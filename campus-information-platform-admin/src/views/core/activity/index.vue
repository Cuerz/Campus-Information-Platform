<template>
	<div class="app-container">
		<el-row :gutter="20">
			<!--活动数据-->
			<el-col :span="20" :xs="24" :offset="2">
				<el-form
					:model="queryParams"
					ref="queryRef"
					:inline="true"
					v-show="showSearch"
					label-width="68px"
				>
					<el-form-item label="活动名称" prop="activityTitle">
						<el-input
							v-model="queryParams.activityTitle"
							placeholder="请输入活动名称"
							clearable
							style="width: 240px"
							@keyup.enter="handleQuery"
						/>
					</el-form-item>
					<el-form-item label="活动标签" prop="activityLabel">
						<el-select
							v-model="queryParams.activityLabel"
							placeholder="活动标签"
							clearable
							style="width: 240px"
						>
							<el-option label="体育" value="体育" />
							<el-option label="志愿者" value="志愿者" />
						</el-select>
					</el-form-item>
					<el-form-item label="审核状态" prop="examine">
						<el-select
							v-model="queryParams.examine"
							placeholder="是否审核"
							clearable
							style="width: 240px"
						>
							<el-option label="已审核" value="true" />
							<el-option label="未审核" value="false" />
						</el-select>
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
					:data="activityList"
					border
					fit
					highlight-current-row
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="50" align="center" />
					<el-table-column
						label="编号"
						align="center"
						key="activityId"
						prop="activityId"
						v-if="columns[0].visible"
					/>
					<el-table-column
						label="发布者昵称"
						align="center"
						key="nickName"
						prop="nickName"
						v-if="columns[1].visible"
						:show-overflow-tooltip="true"
					/>
					<el-table-column
						label="活动名称"
						align="center"
						key="activityTitle"
						prop="activityTitle"
						v-if="columns[2].visible"
						:show-overflow-tooltip="true"
					/>
					<el-table-column
						label="活动标签"
						align="center"
						v-if="columns[3].visible"
						:show-overflow-tooltip="true"
					>
						<template #default="scope">
							<el-tag type="success">{{ scope.row.activityLabel }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column
						label="活动地点"
						align="center"
						key="activityLocale"
						prop="activityLocale"
						v-if="columns[4].visible"
						width="120"
					/>
					<el-table-column
						label="活动详情"
						key="activityDescription"
						prop="activityDescription"
						v-if="columns[5].visible"
					/>
					<el-table-column
						label="审核状态"
						align="center"
						v-if="columns[6].visible"
					>
						<template #default="scope">
							<el-switch
								v-model="scope.row.examine"
								@change="handleExamineChange(scope.row)"
							></el-switch>
						</template>
					</el-table-column>

					<el-table-column
						label="创建时间"
						align="center"
						prop="createTime"
						v-if="columns[7].visible"
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
						v-if="columns[8].visible"
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
				ref="activityRef"
				label-width="80px"
			>
				<el-row>
					<el-col :span="12">
						<el-form-item label="活动名称" prop="activityTitle">
							<el-input
								v-model="form.activityTitle"
								placeholder="请输入活动名称"
								maxlength="30"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="活动标签" prop="activityLabel">
							<el-select
								v-model="form.activityLabel"
								placeholder="请选择活动类型"
								clearable
								style="width: 240px"
							>
								<el-option label="体育" value="体育" />
								<el-option label="志愿者" value="志愿者" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="活动地点" prop="activityLocale">
							<el-input
								v-model="form.activityLocale"
								placeholder="请输入活动地点"
								maxlength="30"
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="详细信息" prop="activityDescription">
							<el-input
								v-model="form.activityDescription"
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

<script setup name="Activity">
import {
	listActivity,
	delActivity,
	changeActivityExamine,
	addActivity,
} from "@/api/core/activity"
const { proxy } = getCurrentInstance()

const activityList = ref([])
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
	{ key: 1, label: `发布者昵称`, visible: true },
	{ key: 2, label: `活动名称`, visible: true },
	{ key: 3, label: `活动标签`, visible: true },
	{ key: 4, label: `活动地点`, visible: true },
	{ key: 5, label: `活动详情`, visible: true },
	{ key: 6, label: `审核状态`, visible: true },
	{ key: 7, label: `创建时间`, visible: true },
	{ key: 8, label: `更新时间`, visible: true },
])

const data = reactive({
	form: {},
	queryParams: {
		pageNum: 1,
		pageSize: 10,
		activityTitle: undefined,
		activityLabel: undefined,
		examine: undefined,
	},
	rules: {
		activityTitle: [
			{ required: true, message: "活动名称不能为空", trigger: "blur" },
		],
		activityDescription: [
			{ required: true, message: "活动名称详细信息不能为空", trigger: "blur" },
		],
		activityLabel: [
			{ required: true, message: "活动类型不能为空", trigger: "blur" },
		],
		activityLocale: [
			{ required: true, message: "活动地点不能为空", trigger: "blur" },
		],
	},
})

const { queryParams, form, rules } = toRefs(data)

/** 选择条数  */
function handleSelectionChange(selection) {
	single.value = selection.length != 1
	idSelect.value = selection.map((item) => item.activityId)
}

/** 查询失物列表 */
function getList() {
	loading.value = true
	listActivity(queryParams.value).then((res) => {
		activityList.value = res.data.list
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
		activityTitle: undefined,
		activityDescription: undefined,
		activityLabel: undefined,
		activityLocale: undefined,
	}
	proxy.resetForm("activityRef")
}

/** 审核状态修改  */
function handleExamineChange(row) {
	let text = row.examine === true ? "通过" : "不通过"
	proxy.$modal
		.confirm(
			'确认审核"' + text + '"' + '编号为"' + row.activityId + '"的记录吗?'
		)
		.then(function () {
			return changeActivityExamine(row.activityId, row.examine)
		})
		.then(() => {
			proxy.$modal.msgSuccess(text + "成功")
		})
		.catch(function () {
			row.examine = row.examine === true ? false : true
		})
}

/** 新增按钮操作 */
function handleAdd() {
	reset()
	open.value = true
}

/** 删除按钮操作 */
function handleDelete(row) {
	const activityId = row.activityId || idSelect.value[0]
	proxy.$modal
		.confirm('是否确认删除编号为"' + activityId + '"的记录？')
		.then(function () {
			return delActivity(activityId)
		})
		.then(() => {
			getList()
			proxy.$modal.msgSuccess("删除成功")
		})
		.catch(() => {})
}

/** 提交按钮 */
function submitForm() {
	proxy.$refs["activityRef"].validate((valid) => {
		if (valid) {
			addActivity(form.value).then((response) => {
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
