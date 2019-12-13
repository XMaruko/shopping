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
        imgUrls: [
          'https://f10.baidu.com/it/u=1261817652,2420085224&fm=72',
          'http://img4.imgtn.bdimg.com/it/u=1540229220,2046462304&fm=26&gp=0.jpg',
          'http://img1.imgtn.bdimg.com/it/u=1405017238,2507623329&fm=26&gp=0.jpg'
        ],
        indicatorDots: true, // 显示底部小圆点
        autoplay: true,       // 自动播放
        circular: true        // 是否采用衔接滑动
      }
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
  }
</style>
