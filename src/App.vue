<template>
  <div _flex="~" _h="100vh" _bg="[#191c20]" _text="white">
    <!-- 左侧 -->
    <div _flex="~ col" _h="full" _p="20px">
      <div _border="~ [#303030]">
        <div _w="225px" _bg="[#1c1d1f]">
          <!-- 用户信息 -->
          <div
            v-if="userInfo.token"
            _flex="~"
            _w="full"
            _h="100px"
            _border="1.5px rounded-sm [#303030]"
          >
            <div _flex="~" _w="full" _p="15px">
              <img :src="avatar" _w="60px" _h="60px" _border="rounded" />

              <div
                _flex="~ col justify-between"
                _h="60px"
                _m="l-15px m-15px"
                _text="13px"
              >
                <div _font="bold" @click="isLoginDialogShow = true">
                  {{ username }}
                </div>
                <div>Player</div>
                <div _p="y-4px x-3px" _text="12px white/50" _border="rounded">
                  <!--                  昵称:{{ nickname }}-->
                </div>
              </div>
            </div>

            <div
              v-if="userInfo.token"
              title="退出登录"
              _p="x-2px"
              _h="full"
              _flex="~ items-center"
              _bg="[#303030]"
              _hover="filter brightness-110"
              _cursor="pointer"
              @click="logoutHandler"
            >
              <i class="el-icon-d-arrow-right"></i>
            </div>
          </div>
          <div
            v-else
            _flex="~ center"
            _w="full"
            _h="100px"
            _text="white"
            _bg="[#2b70fa]"
            _transition="duration-300"
            _border="1.5px rounded-[5px] [#2b70fa]"
            _cursor="pointer"
            _active="bg-white text-[#2b70fa]"
            @click="isLoginDialogShow = true"
          >
            点击登录
          </div>

          <!-- 积分点数 -->
          <div _flex="~ justify-between items-end" _p="y-20px x-15px">
            <div _flex="~ items-center">
              <img _w="15px" _h="15px" src="./assets/img/coin.png" />
              <div
                _m="l-10px"
                _p="x-6px y-2px"
                _bg="white/10"
                _text="white size-13px"
                _border="rounded"
              >
                {{ integral }}积分点数
              </div>
            </div>

            <div _text="blue-400 size-15px" _cursor="pointer" @click="injectRefresh">刷新</div>
            <div _text="blue-400 size-15px" _cursor="pointer" @click="injectRecharge">充值</div>
          </div>
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
        <!-- 饿了么图标库 https://element.eleme.cn/2.0/#/zh-CN/component/icon -->
        <div
          v-for="(item, i) in [
            { txt: '主页', icon: 'el-icon-s-home' },
            { txt: '论坛', icon: 'el-icon-news' },
            { txt: '商城', icon: 'el-icon-goods' },
            { txt: '插件', icon: 'el-icon-plus' },
            { txt: '备用', icon: 'el-icon-menu' },
            { txt: '排行', icon: 'el-icon-s-data' },
            { txt: '问答', icon: 'el-icon-service' },
          ]"
          :key="i"
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
            _w="30px"
            _h="30px"
            _bg="[#171717]"
            _text="14px"
            _border="rounded-full"
            _m="r-15px"
          >
            <i :class="item.icon" />
          </div>
          <div>{{ item.txt }}</div>
        </div>
      </div>

      <!-- PLAY -->
      <div
        _flex="~"
        _m="t-auto"
        _w="full"
        _h="70px"
        _bg="[#4c4d4d]"
        _border="rounded-4px"
        _cursor="pointer"
      >
        <div
          _flex="1 ~ center"
          _bg="orange-400"
          _text="30px"
          _filter="~"
          _transition="duration-300"
          _hover="brightness-110"
          @click="injectPlay"
        >
          开始游戏
        </div>
      </div>

      <div
        _m="t-14px b-30px x-25px"
        _text="blue-400"
        _flex="~ justify-between"
        _children="cursor-pointer"
      >
        <!-- <div @click="isLoginDialogShow = isRegisterDialogShow = true"> -->
        <div @click="injectRegisterHandler">注册用户</div>

        <div @click="injectResetPsdHandler">修改密码</div>
      </div>
    </div>

    <!-- 右侧 -->
    <div _flex="~ col 1" _p="15px">
      <div _w="full" _flex="~ items-center">
        <div
          _flex="~"
          _p="5px"
          class="bg-gradient-to-r to-transparent from-white/10"
          _border="rounded"
        >
          <div
            v-for="(item, i) in [
              { txt: '主页' },
              { txt: '新闻' },
              { txt: '活动' },
              { txt: '社区' },
              { txt: '日志' },
            ]"
            :key="i"
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
            <!-- 商品分类列表 -->
            <div
              v-for="item in [
                { id: undefined, name: '全部' },
                ...goodsCategory,
              ]"
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

          <div _flex="~ 1" _p="x-15px" _text="white/90" _overflow="y-auto">
            <div _w="full">
              <div _w="full" _flex="~ wrap" _overflow="auto">
                <!-- 商品列表 -->
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
    <el-dialog
      :title="isRegisterDialogShow ? '注册用户' : '登录用户'"
      :visible.sync="isLoginDialogShow"
      width="400px"
      :before-close="beforeCloseLoginDialog"
    >
      <div _text="white" _p="y-20px x-50px" _flex="~ col center" _bg="[#333]">
        <el-form>
          <el-input v-if="!isRegisterDialogShow" v-model="loginForm.account">
            <template v-slot:prepend>
              <el-icon name="user" />
            </template>
          </el-input>
          <el-input v-else v-model="registerForm.username">
            <template v-slot:prepend>
              <el-icon name="user" />
            </template>
          </el-input>

          <div _m="y-10px">
            <el-input v-if="!isRegisterDialogShow" v-model="loginForm.password">
              <template v-slot:prepend>
                <el-icon name="lock" />
              </template>
            </el-input>

            <el-input v-else v-model="registerForm.password">
              <template v-slot:prepend>
                <el-icon name="lock" />
              </template>
            </el-input>
          </div>

          <el-input
            v-if="isRegisterDialogShow"
            v-model="loginForm.invitation_code"
            _m="b-10px"
            placeholder="邀请码"
          />

          <el-button
            v-if="isRegisterDialogShow"
            _w="full"
            type="primary"
            @click="registerHandler"
            @keydown.enter="registerHandler"
          >
            注册
          </el-button>
          <template v-else>
            <el-button
              _w="full"
              type="primary"
              @click="loginHandler"
              @keydown.enter="loginHandler"
            >
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
              <el-button @click="injectRegisterHandler"> 注册账号 </el-button>
              <el-button @click="injectForgetPsdHandler">忘记密码</el-button>
            </div>

            <!-- <div _flex="~ center" _text="blue-400" _cursor="pointer">
              <i class="fa-solid fa-phone" _m="r-10px" _text="20px"></i>
              联系在线客服
            </div> -->
          </template>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      title="重置密码"
      :visible.sync="isResetPsdDialogShow"
      width="400px"
    >
      <el-form :model="resetPsdForm" _m="y-20px x-50px">
        <el-form-item
          prop="newpassword"
          :rules="[{ required: true, message: '新密码不能为空' }]"
        >
          <el-input
            v-model="resetPsdForm.newpassword"
            type="password"
            placeholder="新密码"
          />
        </el-form-item>
        <el-form-item
          prop="confirmPsd"
          :rules="[
            { required: true, message: '确认密码不能为空' },
            {
              validator: (rule, value, callback) => {
                if (value !== resetPsdForm.newpassword)
                  callback('密码输入不一致');
                else callback();
              },
            },
          ]"
        >
          <el-input
            v-model="resetPsdForm.confirmPsd"
            type="password"
            placeholder="确认密码"
          />
        </el-form-item>
        <el-form-item prop="security_code">
          <el-input v-model="registerForm.security_code" placeholder="安全码" />
        </el-form-item>
        <el-button type="primary" _w="full" @click="injectResetPsdHandler">
          修改密码
        </el-button>
      </el-form>
    </el-dialog>

    <!-- 商品详情弹窗 -->
    <el-dialog
      title="商品详情"
      :visible.sync="isGoodsDetailDialogShow"
      width="400px"
    >
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
        <div _flex="~ items-center">
          <div _m="y-10px">
            <el-input
              v-model="exchangeForm.character_name"
              placeholder="角色名称"
            />
          </div>
        </div>
        <div _m="t-10px" _flex="~ justify-center">
          <el-button _m="r-20px" @click="buyGoodHandler">购买</el-button>
          <el-button @click="isGoodsDetailDialogShow = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import { Loading, Message } from "element-ui";
// const BASE_URL = "http://103.85.87.250:8087";
// const BASE_URL = "https://www.moshou80.com:8088";
const BASE_URL = "http://43.248.117.202:8797";
const api = Axios.create({ baseURL: BASE_URL + "/api" });

let reqs = 0;
let loadInts = null;
const setReqs = (n) => {
  reqs += n;
  if (reqs > 0) {
    loadInts = Loading.service({ background: "#00000060" });
  } else if (loadInts) {
    loadInts.close();
    loadInts = null;
  }
};

api.interceptors.request.use((config) => {
  setReqs(1);
  const userInfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
  const token = userInfo.token;
  if (token) {
    if (!config.headers) config.headers = {};
    Object.assign(config.headers, { token });
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    setReqs(-1);
    if (config.data.code !== 200) {
      if (config.data.msg) Message.error(config.data.msg);
      throw new Error(config.data.msg);
    }
    return config.data.data;
  },
  (err) => {
    setReqs(-1);
    const code = err.code || err.response.status || 500;
    const msg = err.message || err.response.data || err.response.statusText;
    const errMsg = `${code}：${msg}`;
    Message.error(errMsg);
    throw new Error(errMsg);
  }
);

export default {
  data() {
    return {
      /** 是否显示商品详情弹窗 */
      isGoodsDetailDialogShow: false,
      /** 是否显示登录弹窗 */
      isLoginDialogShow: false,
      /** 是否显示注册弹窗 */
      isRegisterDialogShow: false,
      /** 是否显示重置密码弹窗 */
      isResetPsdDialogShow: false,
      /** 服务端根路径 */
      BASE_URL,
      /** 用户信息 */
      userInfo: {
          integral:0
      },
      /** 商品分了列表 */
      goodsCategory: [],
      /** 商品列表 */
      goodsList: [],
      /** 左侧的分类索引 */
      activeCateIndex: 0,
      /** 选中的商品详情信息 */
      activeGoodsDetail: null,
      /** 选中的商品分类ID */
      activeGoodsCateId: undefined,
      /** 是否记住登录 */
      isRemberLogin: true,
      /** 登录表单 */
      loginForm: {
        account: "",
        password: "",
      },
      /** 注册表单 */
      registerForm: {
        username: "",
        password: "",
        security_code: "",
      },
      /** 重置密码表单 */
      resetPsdForm: {
        newpassword: "",
        confirmPsd: "",
        security_code: "",
      },
      /** 兑换表单 */
      exchangeForm: {
        character_name: "",
      },
    };
  },
  computed: {
    avatar() {
      return this.userInfo.avatar || "https://img.wuhaochao.top/funny.png";
    },
    username() {
      return this.userInfo.username || "点我登录";
    },
    nickname() {
      return this.userInfo.nickname || "昵称";
    },
    integral(){
        return this.userInfo.integral || 0;
    }
  },
  async mounted() {
    const userInfoStorage = JSON.parse(
      localStorage.getItem("userinfo") || "{}"
    );
    if (userInfoStorage.token) this.userInfo = userInfoStorage;

    this.goodsCategory = await api.get("/goods/goodsCategory");
    if (this.goodsCategory.length) {
      await this.updateGoodsList();
    }
  },
  methods: {
    /** 登录 */
    async loginHandler() {
      const res = await api.post("/user/login", this.loginForm);
      this.userInfo = res.userinfo;
      if (this.isRemberLogin)
        localStorage.setItem("userinfo", JSON.stringify(res.userinfo));
      Message.success("登录成功");
      this.isLoginDialogShow = false;
    },
    /** 退出登录 */
    logoutHandler() {
      this.userInfo = {};
      localStorage.removeItem("userinfo");
    },
    /** 注册 */
    async registerHandler() {
      const res = await api.post("/user/register", this.registerForm);
      this.userInfo = res.userinfo;
      localStorage.setItem("userinfo", JSON.stringify(res.userinfo));
      this.isLoginDialogShow = this.isRegisterDialogShow = false;
      Message.success("注册成功");
    },
    /** 打开商品详情 */
    goodsClickHandler(goodDetail) {
      this.activeGoodsDetail = goodDetail;
      this.isGoodsDetailDialogShow = true;
    },
    /** 更新商品列表 */
    async updateGoodsList() {
      this.goodsList = await api.get("/goods/list", {
        params: { category_id: this.activeGoodsCateId },
      });
    },
    /** 购买商品 */
    async buyGoodHandler() {
      await api.post("/exchange/item", {
        alias: this.activeGoodsDetail.alias,
        character_name: this.exchangeForm.character_name,
      });
      Message.success("操作成功");
      this.isGoodsDetailDialogShow = false;
    },
    beforeCloseLoginDialog(done) {
      done();
      setTimeout(() => (this.isRegisterDialogShow = false), 300);
    },
    /** 重置密码 */
    async resetPsdHandler() {
      await api.post("/user/resetpwd");
      Message.success("重置密码成功");
    },
    injectRegisterHandler() {
      if (window.wow_dialog_regist) window.wow_dialog_regist();
      else Message.error("不存在 wow_dialog_regist 方法");
    },
    injectResetPsdHandler() {
      if (window.wow_dialog_modify) window.wow_dialog_modify();
      else Message.error("不存在 wow_dialog_modify 方法");
    },
    injectForgetPsdHandler() {
      if (window.wow_dialog_forget) window.wow_dialog_forget();
      else Message.error("不存在 wow_dialog_forget 方法");
    },
    injectPlay() {
      if (window.wow_startgame) window.wow_startgame();
      else Message.error("不存在 wow_startgame 方法");
    },
    async injectRefresh(){
        const data = await api.post("/user/getIntegral");
        this.userInfo.integral =  data.integral
        Message.success("刷新成功");
    },
    injectRecharge(){
      open('https://baidu.com',"_self")
    }
  },
};
</script>

<style>
html body {
  font-family: Tahoma, Verdana, Arial, Helvetica, "苹方", "微软雅黑";
  font-weight: bold;
  user-select: none;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #555;
}
.el-dialog__header,
.el-dialog__header span,
.el-dialog__body {
  color: white;
  background: #333;
}
</style>
