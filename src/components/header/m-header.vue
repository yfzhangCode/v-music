<template>
    <div class="m-header">
        <div class="icon"></div>
        <h2 class="text">music</h2>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
    @import url('../../common/style/variable.scss');
    @import url('../../common/style/_mixins.scss');
    @import url('../../common/style/base.scss');
    .m-header {
        height: 44px;
        text-align: center;
        background-color: $color-background;
        font-size: 0;
        .icon {
            display: inline-block;
            width: 30px;
            height: 32px;
            vertical-align: top;
            @include bg-image('../../common/image/logo');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 30px 32px;
            margin-top: 6px;
        }
        .text {
            display: inline-block;
            font-size: 16px;
            color: #fff;
            margin-left: 10px;
            line-height: 44px;
        }

    }
</style>
