<template>
<div class="row">

    <div class="col-lg-9 col-md-8 col-xs-7 col-xxs-6 col-12 row order-xxs-1 order-2 ps-xxs-0 ps-2 mx-auto text-xs-start text-center">
        <div class="col-lg-2 col-md-3 col-xs-4 col-12 gx-xs-4 gx-7">
            <img class="left-side-img" src="/imgs/avatar.webp" alt="">
            <div class="profile-social mt-3 row row-cols-3 gx-xl-4 gx-lg-3 gx-md-3 gx-sm-3 gx-xs-2 gx-xxs-3 gx-4">
                <img src="/imgs/icons/vk.png" alt="">
                <img src="/imgs/icons/telegram.png" alt="">
                <img src="/imgs/icons/instagram.png" alt="">
            </div>
        </div>
        <hr class="d-xs-none d-block mt-3">
        <div class="col-lg-10 col-md-9 col-xs-8 col-12">
            <span class="profile-header">Gravity</span>
            <div class="profile-description mt-2">
                <span class="profile-gender">муж</span> /
                <span class="profile-age">19 лет</span> /
                <span class="profile-realname">Комаров Никита</span> /
                <span class="reg-date">на сайте с 11 июля 2023г.</span>
            </div>
            <div class="headline mb-3 mt-4">
                <div class="headline-start"></div>
                <ol class="breadcrumb py-1 ps-xs-4 ps-0 mb-0 flex-fill">
                    <span class="text-lg primary-color mx-xs-0 mx-auto">Активность</span>
                </ol>
            </div>
            <div class="profile-activity">
                <p class="mb-2">комментариев: <span class="text-500">123</span></p>
                <p class="mb-2">в избранном: <span class="text-500">5</span></p>
                <p class="mb-0">оценено: <span class="text-500">8</span></p>
            </div>
        </div>
    </div>


    <ProfileAside />

</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>