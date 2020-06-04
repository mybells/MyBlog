<template>
  <div>
    <h2>获取github某人关注的stars列表</h2>
    <Input type="text" style="width:200px;" @keyup.enter.native="btnClick" v-model.trim="name" placeholder="github name" />
    <Button type="primary" @click="btnClick" :loading="btnFlag">{{ btntext }}</Button>
    <Button type="primary" @click="showHtml=!showHtml">{{viewtext}}</Button>
    <div v-show="showHtml" v-html="htmlStr"></div>
    <div v-show="!showHtml">
      <template v-for="(items, key) in list">
        <div>## {{ key }}</div>
        <template v-for="(item, key) in items">
          <p>- [{{item.name}}]({{item.html_url}}) {{item.description}}</p>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import MarkdownIt from "markdown-it"
import { Button, Input, Message, Loading } from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
export default {
  components: {
    Input,
    Button
  },
  data() {
    return {
      page: 1,
      name: "",
      btnFlag: false,
      showHtml:true,
      data: {},
      list: {},
      htmlStr:''
    }
  },
  computed: {
    viewtext(){
      return this.showHtml ? "查看md代码" : "预览"
    },
    btntext() {
      return this.btnFlag ? "获取中" : "获取stars列表"
    }
  },
  created() {
    // this.getData();
  },
  methods: {
    btnClick() {
      if (!this.name) {
        Message({ message: "不能为空！", type: "warning" })
        return
      }
      this.data = {}
      this.list={};
      this.htmlStr='';
      this.btnFlag = true;
      this.page = 1
      this.getData()
    },
    getData() {
      axios.get(`https://api.github.com/users/${this.name}/starred?page=${this.page}&per_page=100`,{headers: {Accept: 'application/vnd.github.v3+json'}}).then(res => {
        let arr = res.data
        if (arr && arr.length) {
          arr.reduce((monitor, item) => {
            if (item.language) {
              if (monitor[item.language]) {
                monitor[item.language].push(item)
              } else {
                monitor[item.language] = [item]
              }
            } else {
              monitor["Other"] ? monitor["Other"].push(item) : (monitor["Other"] = [item])
            }
            return monitor
          }, this.data)
          this.page++
          this.getData()
        } else {
          this.btnFlag = false
          if (!Object.keys(this.data).length) {
            Message("无数据！")
          } else {
            this.list=this.data;
            let md = new MarkdownIt({ html: true, linkify: true });
            let mdStr='';
            for(let key in this.data){
              mdStr+=`\n## ${key}`;
              let list=this.data[key];
              for(let obj of list){
                mdStr+=`\n- [${obj.name}](${obj.html_url})<svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  width="15"
                  height="15"
                  class="icon outbound"
                >
                  <path
                    fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                  ></path>
                  <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
                </svg> ${obj.description}`;
              }
            }
            this.htmlStr = md.render(mdStr);
          }
        }
      }).catch(error=>{
        this.btnFlag = false
        Message({ message: '没找到此用户', type: "warning" })
      })
    }
  }
}
</script>
