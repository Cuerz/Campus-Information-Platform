<template>
  <div>
    <div class="bg-gray-800 w-full h-auto">
      <div class="relative h-auto">
        <div class="py-[5px] px-0 flex mx-auto w-[80%] justify-between">
          <div>
            <span class="text-white text-[35px]">NUIST</span>
            <span class="text-gray-400 text-[12px] relative top-2"
              >NUIST信息交流平台</span
            >
          </div>
          <div>
            <ul class="w-auto m-0 flex h-[100%]">
              <router-link
                to="/"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >首页</a
                  >
                </li>
              </router-link>
              <router-link
                to="/home"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >问答</a
                  >
                </li>
              </router-link>
              <router-link
                to="/home"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >活动</a
                  >
                </li>
              </router-link>
              <router-link
                to="/home"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >招聘信息</a
                  >
                </li>
              </router-link>
              <router-link
                to="/home"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >二手信息</a
                  >
                </li>
              </router-link>
              <router-link
                to="/home"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >文章/新闻</a
                  >
                </li>
              </router-link>
              <li v-if="avatar == ''" class="px-[14px] py-4">
                <a @click="closein">登录/注册</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[url('@/assets/images/main-bg.jpg')] bg-cover bg-center bg-no-repeat min-h-[279px] h-auto ">
      <div class="py-[50px] mx-auto w-[80%]">
        <h3 class="font-sans font-bold text-[36px] text-white text-center">OOOOOOOOOOOO</h3>
        <!-- <button class="header-btn">发布信息</button> -->
        <p class="mt-[50px] font-serif italic text-base leading-7 text-white text-center">
          Information sharing and communication platform of OOOOOOOOOOOO University
          , Makes information transfer easier
        </p>

        <form class="mt-10 text-center" @submit.prevent="onSubmit">
          <input
            class="required inline-block text-[14px] border-none leading-6 p-3 w-[72%] text-gray-600 mr-[10px] focus:outline-none"
            type="text"
            v-model="search"
            placeholder="Type your search terms here"
          />
          <input class="bg-btn-green hover:bg-btn-hover-green text-white text-[14px] font-semibold leading-5 py-[14px] px-[30px]" type="submit" @click="searchbtn" value="搜索" />
          <div id="search-error-container"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>
