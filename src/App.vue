<template>
  <div _flex="~" _h="100vh" _bg="[#191c20]" _text="white">
    <!-- 左侧 -->
    <div _flex="~ col" _h="full" _p="20px">
      <div _border="~ [#303030]">
        <div _w="225px" _bg="[#1c1d1f]">
          <!-- 用户信息 -->
          <div
            _flex="~"
            _w="full"
            _h="100px"
            _border="1.5px rounded-sm [#303030]"
          >
            <div _flex="~" _w="full" _p="15px">
              <img
                :src="avatar"
                _w="60px"
                _h="60px"
                _border="rounded"
                @click="isLoginDialogShow = true"
              />

              <div
                _flex="~ col justify-between"
                _h="60px"
                _m="l-15px"
                _text="13px"
              >
                <div _font="bold">{{ username }}</div>
                <div>Player</div>
                <div
                  _p="y-4px x-3px"
                  _bg="white/10"
                  _text="12px white/50"
                  _border="rounded"
                >
                  昵称:{{ nickname }}
                </div>
              </div>
            </div>

            <div
              title="退出登录"
              class="fa-solid fa-angles-right"
              _p="x-2px"
              _h="full"
              _flex="~ items-center"
              _bg="[#303030]"
              _hover="filter brightness-110"
              _cursor="pointer"
              @click="logoutHandler"
            />
          </div>

          <!-- 积分点数 -->
          <div _p="y-20px x-15px">

            <div _m="t-8px" _flex="~ items-center">
              <img _w="15px" _h="15px" src="./assets/img/coin.png" />
              <div
                _m="l-10px"
                _p="x-6px y-2px"
                _bg="white/10"
                _text="white"
                _border="rounded"
              >
                0积分点数
              </div>
            </div>
          </div>

          <!-- 按钮组 -->
          <!-- <div
            _w="full"
            _flex="~ justify-between"
            _p="y-15px x-20px"
            _bg="[#22211d]"
            _text="[#2e2e2e] 20px"
            _border="t [#303030]"
          >
            <div
              v-for="item in [
                'fa-user',
                'fa-bag-shopping',
                'fa-envelope',
                'fa-calendar',
                'fa-gift'
              ]"
              :key="item"
              class="fa-solid"
              :class="item"
              _flex="~ center"
              _w="40px"
              _h="40px"
              _border="rounded-full"
              _bg="[#717171]"
              _transition="duration-300"
              _hover="text-orange-400 text-30px bg-transparent"
              _cursor="pointer"
            />
          </div> -->
        </div>
      </div>

      <!-- 滚动列表 -->
      <div
        _m="t-15px"
        _p="y-10px"
        _h="330px"
        _overflow="y-auto"
        _text="[#727272]"
        _border="1.5px rounded-sm [#303030]"
      >
        <!-- prettier-ignore -->
        <div
          v-for="(item, i) in ([
            { txt: '主页', icon: 'fa-house' },
            { txt: '论坛', icon: 'fa-house' },
            { txt: '商城', icon: 'fa-house' },
            { txt: '插件', icon: 'fa-house' },
            { txt: '备用', icon: 'fa-house' },
            { txt: '排行', icon: 'fa-house' },
            { txt: '问答', icon: 'fa-house' }
          ])"
          :key="item.txt"
          _flex="~ items-center"
          _p="x-15px y-5px"
          _cursor="pointer"
          _transition="duration-300"
          _hover="bg-[#353535] text-white"
          :class="{ 'bg-[#353535] text-white': i === activeCateIndex }"
          @click="activeCateIndex = i"
        >
          <div
            _flex="~ center"
            class="fa-solid"
            :class="item.icon"
            _w="30px"
            _h="30px"
            _bg="[#171717]"
            _text="14px"
            _border="rounded-full"
            _m="r-15px"
          />
          <div>{{ item.txt }}</div>
        </div>
      </div>

      <!-- PLAY -->
      <div
        _flex="~"
        _m="t-auto b-50px"
        _w="full"
        _h="70px"
        _bg="[#4c4d4d]"
        _border="rounded-4px"
        _cursor="pointer"
      >
        <div _flex="1 ~ center" _bg="orange-400" _text="30px">PLAY</div>
        <!-- <div class="fa-solid fa-bars" _flex="~ center" _w="70px" _h="full" _text="30px" /> -->
      </div>
    </div>

    <!-- 右侧 -->
    <div _flex="~ col 1" _p="15px">
      <div _w="full" _flex="~ items-center">
        <div
          _flex="~"
          _p="5px"
          _bg=""
          class="bg-gradient-to-r to-transparent from-white/10"
          _border="rounded"
        >
          <div
            v-for="item in [
              { txt: '主页' },
              { txt: '新闻' },
              { txt: '活动' },
              { txt: '社区' },
              { txt: '日志' }
            ]"
            :key="item.txt"
            _w="100px"
            _h="40px"
            _flex="~ center"
            _cursor="pointer"
          >
            {{ item.txt }}
          </div>
        </div>
        <div _m="l-auto r-50px" _text="16px" _opacity="30">藏海宝藏</div>
      </div>

      <div
        _flex="~ 1 col"
        _p="15px"
        _m="y-20px"
        _bg="[#18191b]"
        _overflow="hidden"
        _text="white/40"
      >
        <div _m="t-15px" _text="20px">
          <div class="fa-solid fa-shop"></div>
          商城
        </div>
        <div _flex="~ 1" _m="t-15px" _overflow="y-auto">
          <div _border="~ black" _w="200px" _p="y-10px">
            <div
              v-for="item in goodsCategory"
              :key="item.txt"
              _flex="~ items-center"
              _p="y-6px x-12px"
              _transition="duration-300"
              _hover="bg-[#616161] text-orange-400"
              :class="{
                'bg-[#616161] text-orange-400': activeGoodsCateId === item.id,
              }"
              _cursor="pointer"
              @click="
                () => {
                  activeGoodsCateId = item.id;
                  updateGoodsList();
                }
              "
            >
              <div
                _w="10px"
                _h="10px"
                _m="r-10px"
                _border="rounded-full"
                _bg="[#313131]"
              ></div>
              <div>{{ item.name }}</div>
            </div>
          </div>

          <div _flex="~ 1" _p="x-15px" _text="white/90">
            <div _w="full">
              <div _w="full" _flex="~ wrap" _overflow="auto">
                <div
                  v-for="item in goodsList"
                  :key="item.title"
                  _w="190px"
                  _bg="[#303030]"
                  _border="rounded"
                  _flex="~ col items-center"
                  _filter="~"
                  _transition="duration-300"
                  _cursor="pointer"
                  _hover="brightness-110"
                  _m="r-15px b-15px"
                  @click="goodsClickHandler(item)"
                >
                  <div _m="t-15px">{{ item.title }}</div>
                  <img
                    _m="y-15px"
                    _w="160px"
                    _h="100px"
                    _object="cover"
                    :src="BASE_URL + item.img"
                  />
                  <div _m="b-15px" _flex="~ items-center">
                    <img
                      _m="r-5px"
                      _w="15px"
                      _h="15px"
                      src="./assets/img/coin.png"
                    />
                    <div>{{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 登录/注册弹窗 -->
    <el-dialog :visible.sync="isLoginDialogShow" width="400px">
      <div _text="white" _p="y-20px x-50px" _flex="~ col center" _bg="[#333]">
        <el-form>
          <el-input v-model="loginForm.account">
            <template v-slot:prepend>
              <el-icon name="user" />
            </template>
          </el-input>

          <div _m="y-10px">
            <el-input v-model="loginForm.password">
              <template v-slot:prepend>
                <el-icon name="lock" />
              </template>
            </el-input>
          </div>

          <el-button
            v-if="isRegisterDialogShow"
            _w="full"
            color="primary"
            @click="registerHandler"
          >
            注册
          </el-button>
          <template v-else>
            <el-button _w="full" color="primary" @click="loginHandler">
              登录
            </el-button>

            <div _m="y-10px" _flex="~ center">
              <el-checkbox v-model="isRemberLogin" label="记住我的登录" />
            </div>

            <div _flex="~ items-center">
              <div _h="1px" _flex="1" _bg="gray-500" />
              <div _m="x-5px" _text="gray-500">或者您还可以</div>
              <div _h="1px" _flex="1" _bg="gray-500" />
            </div>

            <div _m="y-10px" _w="full" _flex="~ justify-between">
              <el-button color="secondary" @click="isRegisterDialogShow = true">
                转到注册
              </el-button>
              <el-button color="secondary">找回服务</el-button>
            </div>

            <div _flex="~ center" _text="blue-400" _cursor="pointer">
              <i class="fa-solid fa-phone" _m="r-10px" _text="20px"></i>
              联系在线客服
            </div>
          </template>
        </el-form>
      </div>
    </el-dialog>

    <!-- 商品详情弹窗 -->
    <el-dialog :visible.sync="isGoodsDetailDialogShow" width="400px">
      <div
        v-if="activeGoodsDetail"
        _flex="~ col center"
        _p="y-20px"
        _text="white"
      >
        <div>{{ activeGoodsDetail.title }}</div>
        <img
          _m="t-20px"
          _w="200px"
          _h="140px"
          :src="BASE_URL + activeGoodsDetail.img"
        />
        <div _m="t-10px" _w="full" _text="center white/50 12px">
          <div _w="3/4" _m="auto">{{ activeGoodsDetail.sub_title }}</div>
          <div _m="y-10px">合计消耗</div>
        </div>
        <div _flex="~ items-center">
          <img src="./assets/img/coin.png" _w="15px" _h="15px" _m="r-5px" />
          <div>{{ activeGoodsDetail.price }}</div>
        </div>

        <div _m="t-10px" _flex="~ justify-center">
          <el-button _m="r-20px">购买</el-button>
          <el-button @click="isGoodsDetailDialogShow = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
const BASE_URL = "http://103.85.87.250:8087";
const api = Axios.create({ baseURL: BASE_URL + "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) config.headers = {};
    Object.assign(config.headers, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    // if (config.data.msg)
    //   Notify.create({
    //     type: 'positive',
    //     message: config.data.msg
    //   })
    return config.data.data;
  },
  (err) => {
    const code = err.code || err.response.status || 500;
    const msg = err.message || err.response.data || err.response.statusText;
    const errMsg = `${code}：${msg}`;
    alert(errMsg);
    throw new Error(errMsg);
  }
);

export default {
  data() {
    return {
      isGoodsDetailDialogShow: false,
      isLoginDialogShow: false,
      isRegisterDialogShow: false,
      BASE_URL,
      userInfo: {},
      goodsCategory: [],
      goodsList: [],
      activeCateIndex: 0,
      activeGoodsDetail: null,
      activeGoodsCateId: -1,
      isRemberLogin: true,
      loginForm: {
        account: "admin",
        password: "123456",
      },
    };
  },
  computed: {
    avatar() {
      return this.userInfo.avatar || "https://img.wuhaochao.top/funny.png";
    },
    username() {
      return this.userInfo.username || "用户名";
    },
    nickname() {
      return this.userInfo.nickname || "昵称";
    },
  },
  async mounted() {
    this.goodsCategory = await api.get("/goods/goodsCategory");
    if (this.goodsCategory.length) {
      this.activeGoodsCateId = this.goodsCategory[0].id;
      await this.updateGoodsList();
    }
  },
  methods: {
    async loginHandler() {
      const res = await api.post("/user/login", this.loginForm);
      if (!res) return alert("密码不正确");
      this.userInfo = res.userinfo;
      if (this.isRemberLogin) localStorage.setItem("userInfo", res.userinfo);
      alert("登录成功");
      this.isLoginDialogShow = false;
    },
    logoutHandler() {
      this.userInfo = null;
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    async registerHandler() {
      await api.post("");
      this.isRegisterDialogShow = false;
    },
    goodsClickHandler(goodDetail) {
      this.activeGoodsDetail = goodDetail;
      this.isGoodsDetailDialogShow = true;
    },
    async updateGoodsList() {
      this.goodsList = await api.get("/goods/list", {
        params: { category_id: this.activeGoodsCateId },
      });
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #555;
}
.el-dialog__header {
  background: #333;
}
.el-dialog__body {
  color: white;
  background: #333;
}
</style>
