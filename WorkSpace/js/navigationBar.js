Vue.component('navigation-bar', {
    template: `
    <nav class="col-md-10 navbar-center navbar navbar-bg naviHeight">
    <a class="navbar-title">
        <img src="images/homeImages/home-navi.png">
    </a>
    <div>
        <ul class="nav justify-content-end">

            <!-- 搜索 -->
            <li class="nav-item naviBtn">
                <div class="button navbar-btn-search">
                    <span class="glyphicon glyphicon-search"></span>
                    <span class="navbar-btn-search-title">搜索</span>
                </div>
            </li>

            <!-- 返回首页 -->
            <li class="nav-item naviBtn">
                <button class="button navbar-btn" @click="naviBackBtnClick">
                    <img src="images/homeImages/home-back@2x.png">
                    <i class="navbar-backHome">返回首页</i>
                </button>
            </li>
        </ul>
    </div>
</nav>
    `,
    methods: {

    }
})