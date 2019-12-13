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
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        imgUrls: [],
        indicatorDots: true, // 显示底部小圆点
        autoplay: true,       // 自动播放
        circular: true        // 是否采用衔接滑动
      }
    },
    created () {
      // 获取轮播图数据
      let that = this;
      mpvue.request({
        url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
        success: function(res) {
          // console.log(res)
          let list = res.data['message'];
          // 从数组对象中获取其中一个属性
          list = list.map(item => {
            return item.image_src;
          })
          // console.log(list)
          that.imgUrls = list
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
</style>
