<template>
  <div>
    <div class="list_tab">
      <div class="tab">
        <div v-for="(item,index) in tabs" class="tab_item tab_item" :class="{tab_active:item.id==currentIndex}" @click="tabClick(item.id)">
          {{item.name}}<span class="iconfont" :class="{'icon_xiala':item.id!=currentIndex,'icon_shangla':item.id==currentIndex}"></span>
        </div>
      </div>
    </div>
    <div  v-show="currentIndex==1">
      <brand-list  :brandList="brandList"  v-bind="$attrs" v-on="$listeners" @tabClick="tabClick"></brand-list>
    </div>
    <div class="tab_comtent" v-show="currentIndex!=1&&currentIndex!=0" @click="closeFrame">
      <div  @click.stop="noUseClick">
        <tab-content  v-show="currentIndex==2" :tabComtentList="fpyList" tabkey="fpayid" v-bind="$attrs" v-on="$listeners" @tabClick="tabClick">
          <div slot="title">首付价格筛选</div>
        </tab-content>
        <tab-content v-show="currentIndex==3" :tabComtentList="carTypeList" tabkey="cartype"  v-bind="$attrs" v-on="$listeners" @tabClick="tabClick">
          <div slot="title">车型筛选</div>
        </tab-content>
        <tab-content v-show="currentIndex==4" :tabComtentList="standardList" tabkey="standardtype"  v-bind="$attrs" v-on="$listeners" @tabClick="tabClick" >
          <div slot="title">标准筛选</div>
        </tab-content>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBrandList,getCarTypeList} from 'network/list'
  import TabContent from './TabContent'
  import BrandList from './BrandList'
  export default {
    name: "ListTab",
    components:{
      TabContent,
      BrandList
    },
    data(){
      return{
        currentIndex:0,
        tabs:[
          {id:1,name:'品牌'},
          {id:2,name:'首付'},
          {id:3,name:'车型'},
          {id:4,name:'标准'},
        ],
        brandList: {
          '#': [{
            name: "不限",
            id: '',
            initial: '#'
          }],
        },
        fpyList: [
          {
            name: "不限",
            id: ''
          },
          {
            name: "1万以内",
            id: "<1"
          },
          {
            name: "1-1.5万",
            id: "1-1.5"
          },
          {
            name: "1.5-2万",
            id: "1.5-2"
          },
          {
            name: "2-2.5万",
            id: "2-2.5"
          },
          {
            name: "2.5万以上",
            id: ">2.5"
          }
        ],
        mpyList: [
          {
            name: "不限",
            id: ''
          },
          {
            name: "2千以内",
            id: "<2"
          },
          {
            name: "2-2.5千",
            id: "2-2.5"
          },
          {
            name: "2.5-3千",
            id: "2.5-3"
          },
          {
            name: "3-3.5千",
            id: "3-3.5"
          },
          {
            name: "3.5千以上",
            id: ">3.5"
          }
        ],
        carTypeList: [{
          name: "不限",
          id: ''
        }],
        standardList: [
          {
            name: "不限",
            id: ''
          },
          {
            name: "国V",
            id: '国V'
          },
          {
            name: "国VI",
            id: '国VI'
          }
        ],
        
      }
    },
    methods:{
      tabClick(index){
        if (index==this.currentIndex){
          this.currentIndex=0
        }else {
          this.currentIndex=index;
        }
        // this.currentIndex=index;
      },
      noUseClick(e){
        // e.stopPropagation();
      },
      closeFrame(){
        this.currentIndex=0;
      },
      getBrandList(){
        getBrandList().then(res=>{
          let data = res.data;
          // data.sort(comm.compare(data, "initial", 1));
          let initial = "";
          let list = {};
          data.forEach((item, index) => {
            if (item.initial != initial) {
              initial = item.initial;
              list[initial] = [];
              list[initial].push(item);
              return;
            }
            list[initial].push(item);
    
          });
          this.brandList= Object.assign({},this.brandList, list);
        }).catch(err=>{
          console.log(err);
        })
     },
      getCarTypeList(){
        getCarTypeList().then(res=>{
          this.carTypeList=[this.carTypeList[0],...res.data];
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
      this.getCarTypeList();
      this.getBrandList();
    }
  
  }
</script>

<style scoped>
  .list_tab{
    height: 0.9rem;
  }
  .tab{
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    display: flex;
    background-color: #fff;
    border-bottom: 0.01rem solid #e4e4e4;
    /*position: fixed;*/
    /*top: 0.88rem;*/
    z-index: 999;
    
  }
  .tab_item{
    flex: 1;
    font-size:0.28rem;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tab_active{
    color:#FFAA00;
  }
  .tab_item .iconfont{
    font-size: 0.4rem;
  }
  .tab_item::after {
    content: '';
    height: 0.60rem;
    width: 1px;
    /*background-color:red;*/
    background-color: #e4e4e4;
    position: absolute;
    top: 0.10rem;
    right: 0.01rem;
  }
  .tab_item:last-child::after{
    width: 0;
  }
  .tab_comtent{
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
  }
  
</style>
