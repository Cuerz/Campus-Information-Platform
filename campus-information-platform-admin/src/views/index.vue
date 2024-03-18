<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>校园信息公开平台后台管理系统</h2>
        <p></p>
        <p>
          <b>当前版本:</b>
          <span>
            <el-tag type="danger">v{{ version }}</el-tag>
          </span>
        </p>
        <p>
          <el-button
            type="primary"
            icon="Cloudy"
            plain
            @click="
              goTarget('https://github.com/Cuerz/Campus-Information-Platform')
            "
            >访问GitHub</el-button
          >
          <el-button
            icon="HomeFilled"
            plain
            @click="goTarget('https://github.com/Cuerz')"
            >访问作者主页</el-button
          >
          <el-button
            type="success"
            icon="LocationInformation"
            plain
            @click="goTarget('http://localhost:5173/')"
            >访问前台</el-button
          >
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>Welcome, admin</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><h2>欢迎回来</h2></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>用户增长趋势</span>
            </div>
          </template>
          <div ref="userChartDom" style="width: 800px; height: 400px" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>角色分布</span>
            </div>
          </template>
          <div ref="roleChartDom" style="width: 800px; height: 400px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
import * as echarts from 'echarts';
import { listUser } from '@/api/system/user';

const { proxy } = getCurrentInstance();

const version = ref('1.0.0');

const userChart = shallowRef(null);
const roleChart = shallowRef(null);
const data = reactive({
  userOption: {
    title: {
      text: '用户增长趋势',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
  },
  roleOption: {
    title: {
      text: '角色分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      left: 'center',
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: '角色：',
        type: 'pie',
        radius: [20, 140],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5,
        },
        data: [],
      },
    ],
  },
});

const { userOption, roleOption } = toRefs(data);

function setUserOption(xlist, ylist) {
  userOption.value.xAxis.data = xlist;
  userOption.value.series[0].data = ylist;
  userOption && userChart.value.setOption(userOption.value);
}

function setRoleOption(series) {
  roleOption.value.series[0].data = series;
  roleOption && roleChart.value.setOption(roleOption.value);
}

async function initchart() {
  userChart.value = echarts.init(proxy.$refs.userChartDom, 'customed', {
    renderer: 'svg',
  });
  roleChart.value = echarts.init(proxy.$refs.roleChartDom, 'customed', {
    renderer: 'svg',
  });
  const res = await listUser();

  const createTime = res.data.map((item) => {
    return proxy.parseTime(item.createTime, '{y}-{m}-{d}');
  });
  createTime.sort();
  const roleDescription = res.data.map((item) => {
    return item.sysRole.description;
  });

  var xlist = [];
  var ylist = [];
  var series = [];
  var userCounts = {};
  var roleCounts = {};
  createTime.forEach((item) => {
    userCounts[item] = (userCounts[item] || 0) + 1;
  });
  roleDescription.forEach((item) => {
    roleCounts[item] = (roleCounts[item] || 0) + 1;
  });
  series = Object.keys(roleCounts).map((item) => {
    return { name: item, value: roleCounts[item] };
  });

  xlist = Object.keys(userCounts);
  ylist = xlist.map((item) => userCounts[item]);
  setUserOption(xlist, ylist);
  setRoleOption(series);
}

function goTarget(url) {
  window.open(url, '__blank');
}

onMounted(() => {
  initchart();
});
</script>

<style scoped lang="scss">
.home {
  .col-item {
    margin-bottom: 20px;
  }

  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  // font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }
}
</style>
