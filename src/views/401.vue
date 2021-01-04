<template>
  <div class="errPage-container" style="background: #fff">
    <h-row>
      <h-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限访问该页面</h2>
        <h6 style="margin-top: 20px">你可联系运营人员开通权限</h6>
        <ul style="margin-top: 10px; margin-bottom: 10px" class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/"> 回首页 </router-link>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="
                openImgBox(
                  'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
                )
              "
              >点我看图</a
            >
          </li>
        </ul>
      </h-col>
      <h-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </h-col>
    </h-row>
  </div>
</template>

<script>
import errGif from '@/assets/401.gif'
import { mapMutations } from 'vuex'

export default {
  name: 'NoPermission',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
    }
  },
  methods: {
    ...mapMutations(['openImgBox']),
  },
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 100%;
  padding: 100px 0 0 20%;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
