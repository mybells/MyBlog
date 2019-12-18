<template>
  <div>
    <template v-for="item in data">
      <h2 id="其他"><a href="#其他" aria-hidden="true" class="header-anchor">#</a> 其他</h2>
      <li>
        <a :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.name }}
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15"
            class="icon outbound">
            <path fill="currentColor"
              d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path>
            <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
          </svg>
        </a> {{ item.description }}
      </li>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      data: {},
      page: 1,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get(`https://api.github.com/users/mybells/starred?page=${this.page}&per_page=100`).then(res => {
        let arr = res.data;
        this.data.push(...arr);
        if (arr && arr.length) {
          this.page++;
          this.getData();
        }
      })
    }
  },
}
</script>