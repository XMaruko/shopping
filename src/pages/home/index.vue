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
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        imgUrls: [],          // 轮播图图片
        indicatorDots: true, // 显示底部小圆点
        autoplay: true,       // 自动播放
        circular: true,        // 是否采用衔接滑动
        meuns: []
      }
    },
    created () {
      let that = this;
      // 获取轮播图数据
      mpvue.request({
        url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
        success: function(res) {
          // console.log(res)
          let list = res.data['message'];
          // 从数组对象中获取其中一个属性
          that.imgUrls = res.data && res.data['message'] ? res.data['message'].map(item => {
            return item.image_src;
          }) : []
        }
      })

      // 快捷菜单栏数据
      mpvue.request({
        url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
        success: function(res){
          // console.log(res.data)
          // 验证数组 前两个为true的话，就执行map操作，否则为空
            if ( res.data && Array.isArray(res.data['message'])){
             that.meuns = res.data['message'].map(item => {
                return item.image_src
              })
            } else {
              that.meuns = []
            }
            
            // ES6 解构赋值
            // let {message} = res.data;
            // that.meuns = message

          // let menulist = res.data['message'];
          // 验证数组 前两个为true的话，就执行map操作，否则为空
          // that.meuns = res.data && res.data['message'] ? res.data['message'].map(item => {
          //   return item.image_src
          // }) : []
        }
      })
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
</style>
