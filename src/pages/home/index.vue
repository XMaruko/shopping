<template>
  <div class="app">
    <!-- 搜索栏 -->
   <div class="search">
     <div class="search-bar">
       <icon type="search" size="15"/>
       <span>搜索</span>
     </div>
   </div>
   <!-- 轮播图 -->
   <swiper :autoplay="autoplay" :indicatorDots="indicatorDots" :circular="circular">
     <swiper-item v-for="(item,index) in imgUrls" :key="index">
       <image :src="item" class="slide-image"/>
     </swiper-item>
   </swiper>
   <!-- 快捷菜单 -->
   <div class="menu">
     <div class="menu-item" v-for="(item,index) in meuns" :key="index">
       <img :src="item" />
     </div>
   </div>
   <!-- 楼层数据 -->
   <div class="floor" v-for="(item,index) in floors" :key="index">
     <div class="floor-title">
       <img :src='item.floor_title.image_src' />
     </div>
     <div class="floor-content">
      <div class="left">
         <img :src="item.product_list[0].image_src" />
       </div>
       <div class="right">
         <img v-if="i>0" v-for="(img,i) in item.product_list" :key="i" :src="img.image_src" />
       </div>
     </div>
   </div>
   <!-- 回到顶部 -->
   <div v-show="isShow">
    <div class="to-top" @click="toTopHandle ()">
      ︿
      <p>顶部</p>
    </div>
   </div>

  </div>

</template>

<script>
  import request from '../../utils/request.js'

  export default {
    name: 'app',
    data () {
      return {
        imgUrls: [],          // 轮播图图片
        indicatorDots: true, // 显示底部小圆点
        autoplay: true,       // 自动播放
        circular: true,        // 是否采用衔接滑动
        meuns: [],             // 快捷菜单图片
        floors: [],             // 楼层图片
        isShow: false
      }
    },
    methods: {
      // 轮播图
     async swiper () {
        let that = this;
        // 获取轮播图数据
         let res = await request('home/swiperdata');
         // 转换数据格式
         this.imgUrls = res.data && res.data.message ? res.data.message.map(item => {
           return item.image_src;
         }) : []
      },

      // 快捷菜单
     async quick () {
        let that = this;
        // 获取数据
        let res = await request('home/catitems');
        // 转换数据格式
        that.meuns = res.data && res.data['message'] ? res.data['message'].map(item => {
          return item.image_src
        }) : []
     },

     // 楼层数据
     async floorData () {
       let that = this;
       let res = await request('home/floordata');
       this.floors = res.data && res.data['message'] ? res.data['message'] : []
     },

     toTopHandle () {
       // 控制回到顶部
       mpvue.pageScrollTo({
         scrollTop: 0
       })
     }
    },
    created () {
      this.swiper();
      this.quick();
      this.floorData();

      // mpvue.request({
      //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
      //   success: function(res) {
      //     // console.log(res)
      //     let list = res.data['message'];
      //     // 从数组对象中获取其中一个属性
      //     that.imgUrls = res.data && res.data['message'] ? res.data['message'].map(item => {
      //       return item.image_src;
      //     }) : []
      //   }
      // })

      // 快捷菜单栏数据
      // mpvue.request({
      //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
      //   success: function(res){
      //     // console.log(res.data)
      //     // 验证数组 前两个为true的话，就执行map操作，否则为空
            // if ( res.data && Array.isArray(res.data['message'])){
            //  that.meuns = res.data['message'].map(item => {
            //     return item.image_src
            //   })
            // } else {
            //   that.meuns = []
            // }

            // ES6 解构赋值
            // let {message} = res.data;
            // that.meuns = message

          // let menulist = res.data['message'];
          // 验证数组 前两个为true的话，就执行map操作，否则为空
          // that.meuns = res.data && res.data['message'] ? res.data['message'].map(item => {
          //   return item.image_src
          // }) : []
        // }
      // })
    },
    onPageScroll (event) {
      // 小程序生命周期函数，监控页面的滚动
      // 如果滚动指定大小，那么就控制显示或隐藏
      this.isShow = event.scrollTop > 50
    }
  }
</script>

<style scoped>
  .search {
    padding: 10px;
    background-color: #EB4450;
  }
  .search .search-bar {
    background-color: #fff;
    width: 100%;
    height: 30px;
    border-radius: 3px;
    text-align: center;
  }
  .search .search-bar icon {
    vertical-align: middle;
    width: 25px;
  }
  .search .search-bar span {
    font-size: 14px;
    color: #CCCCCC;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }

  .menu {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
  }
  .menu .menu-item img{
    width: 150rpx;
    height: 150rpx;
  }

  .floor .floor-title img{
    width: 100%;
    height: 130rpx;
  }
  .floor .floor-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    box-sizing: border-box;
  }
  .floor .floor-content .left {
    width: 240rpx;
  }
  .floor .floor-content .left img {
    width: 232rpx;
    height:385rpx;
  }
  .floor .floor-content .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .floor .floor-content .right img {
    width: 233rpx;
    height: 188rpx;
    border-radius: 4px;
  }
  .to-top {
    width:100rpx;
    height:100rpx;
    border-radius: 50%;
    background:rgba(255,255,255,0.8);
    position: fixed;
    right:40rpx;
    bottom:40rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .to-top p {
    font-size: 16px;
  }
</style>
