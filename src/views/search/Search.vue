<template>
  <div>
    <nav-bar class="home_nav">
      <div slot="center">喜相逢以租代购</div>
      <div slot="right"></div>
    </nav-bar>
    <search-input @search="search" :searchTab="keyWord"></search-input>
    <div class="search_tab  hot_tab">
      热门搜索：
      <div class="tab_content">
        <div class="item_item" v-for="(item,index) in hotSearchList" :key="item.id" v-if="index<12" @click="tabClick(item.keyword)">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <div class="search_tab history_tab" v-show="historySearchList.length!=0">
      历史搜索：
      <div class="tab_content">
        <div class="item_item" v-for="(item,index) in historySearchList" @click="tabClick(item.keyword)">{{item.keyword}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  import {getHotSearch, getHistorySearch} from 'network/search'
  import NavBar from 'components/common/navbar/NavBar'
  import SearchInput from 'components/content/search/SearchInput'
  
  
  export default {
    name: "Search",
    data() {
      return {
        keyWord: '',
        whether: false,
        hotSearchList: [],
        historySearchList: []
      }
    },
    components: {
      NavBar,
      SearchInput
    },
    methods: {
      
      getHotSearch() {
        getHotSearch().then(res => {
          this.hotSearchList = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      getHistorySearch() {
        getHistorySearch().then(res => {
          this.historySearchList = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      remove() {
        this.$router.replace('/home');
      },
      tabClick(keyWord) {
        this.keyWord=keyWord;
        this.search({
          key:'keyWord',
          value:keyWord,
          name:keyWord
        });
      },
      search(searchObj) {
        console.log(searchObj);
        this.$store.commit(Object.assign({},{ type:'setCarSearchInfo'},searchObj));
        this.$router.push('/list');
      }
      
    },
    created() {
      this.getHotSearch();
      this.getHistorySearch()
    }
  }
</script>

<style scoped>
 
  .hot_tab{
    position: relative;
    margin-bottom: 0.12rem;
  }
  .hot_tab::before{
    content: '';
    top: 0;
    right: 0;
    position: absolute;
    height: 1px;
    width: 95%;
    background-color:#e4e4e4;
  }
  .search_tab {
    color: #333;
    font-size: .28rem;
    background: #fff;
    padding: .24rem .26rem .34rem .26rem;
  }
  .tab_content {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-between;*/
    padding-top: .34rem;
    flex-direction: row;
    justify-content: flex-start;
    margin-right: -0.18rem;
    overflow: hidden;
  }

  .item_item {
    width: 1.60rem;
    font-size: .28rem;
    margin-bottom: .40rem;
    margin-right: 0.18rem;
    text-align: center;
    padding: .10rem 0;
    color: #333;
    background: #F5F5F9;
    height: .72rem;
    line-height: .60rem;
    border-radius: .12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
