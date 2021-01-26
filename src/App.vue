<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

  #app,html,body{
    height: 100%;
    margin: 0;
  }
  .topButs{
    display: flex;
    flex-flow: nowrap row;
    align-items: center;
  }
  .retrun{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    background: #409EFF;
    border: 1px solid #409EFF;
    color: #FFF;
    border-radius: 20px;
  }
</style>
