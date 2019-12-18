<template>
  <div>
    <div>## sdfsd</div>
    <div v-for="item in data" :key="item.id">- [{{item.name}}]({{item.url}}) {{item.description}}</div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        data:[],
        page:1,
      }
    },
    created(){
      this.getData();
    },
    methods: {
      getData(){
        axios.get(`https://api.github.com/users/mybells/starred?page=${this.page}&per_page=100`).then(res=>{
          let arr=res.data;
          this.data.push(...arr);
          if(arr&&arr.length){
            this.page++;
            this.getData();
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>