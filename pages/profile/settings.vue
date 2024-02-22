<template>
<div class="row">

    <div class="col-lg-9 col-md-8 col-xs-7 col-xxs-6 col-12 row order-xxs-1 order-2 ps-xxs-0 ps-2 mx-auto">
        <div class="col-sm-6 col-12">
            <div class="mb-4">
                <label for="profileUsername" class="pb-1 text-300">Логин (никнейм)</label>
                <input type="text" class="form-control" id="profileUsername" value="gravity34031" disabled>
            </div>
            <div class="mb-4">
                <label for="profileDisplayname" class="pb-1 text-300">Отображаемое имя</label>
                <input type="text" class="form-control" id="profileDisplayname" value="gravity">
            </div>
            <div class="mb-4">
                <label for="profileEmail" class="pb-1 text-300">Электронная почта</label>
                <input type="text" class="form-control" id="profileEmail" value="gravity2507@gmail.com">
            </div>
            <div class="mb-4 d-flex flex-column">
                <label for="profileAvatar" class="pb-1 text-300">Аватар</label>
                <input class="form-control" type="file" id="profileAvatar">
                <div class="align-self-center mt-4">
                    <img class="w-100 img-round" src="/imgs/avatar.webp" alt="">
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-12">
            <div class="mb-4">
                <label for="profileFirstname" class="pb-1 text-300">Имя</label>
                <input type="text" class="form-control" id="profileFirstname" value="Никита">
            </div>
            <div class="mb-4">
                <label for="profileSecondname" class="pb-1 text-300">Фамилия</label>
                <input type="text" class="form-control" id="profileSecondname" value="Комаров">
            </div>
            <div class="mb-4">
                <div class="pb-1 text-300">Пол</div>
                <div class="d-flex">
                    <div class="pe-3">
                        <input class="form-check-input" type="radio" name="profileGender" id="profileGenderMale">
                        <label class="form-check-label ps-1" for="profileGenderMale">
                            <span class="d-lg-block d-sm-none d-none">мужской</span>
                            <span class="d-lg-none d-md-block d-sm-none d-xs-block d-xxs-none d-block">муж.</span>
                            <span class="d-md-none d-sm-block d-xs-none d-xxs-block d-none">м.</span>
                        </label>
                    </div>
                    <div class="pe-3">
                        <input class="form-check-input" type="radio" name="profileGender" id="profileGenderFemale">
                        <label class="form-check-label ps-1" for="profileGenderFemale">
                            <span class="d-lg-block d-none">женский</span>
                            <span class="d-lg-none d-md-block d-sm-none d-xs-block d-xxs-none d-block">жен.</span>
                            <span class="d-md-none d-sm-block d-xs-none d-xxs-block d-none">ж.</span>
                        </label>
                    </div>
                    <div class="">
                        <input class="form-check-input" type="radio" name="profileGender" id="profileGenderNone">
                        <label class="form-check-label ps-1" for="profileGenderNone">
                            <span class="d-lg-block d-none">не указано</span>
                            <span class="d-lg-none d-md-block d-sm-none d-xs-block d-xxs-none d-block">нет</span>
                            <span class="d-md-none d-sm-block d-xs-none d-xxs-block d-none">-</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="mb-5">
                <label for="profileBirthday" class="pb-1 text-300">Дата рождения</label>
                <input type="text" class="form-control" id="profileBirthday" value="потом моменять ---">
            </div>

            <div class="headline mb-4">
                <div class="headline-start"></div>
                <ol class="breadcrumb py-1 ps-3 mb-0">
                    <span class="text-lg text-400 primary-color">Контакты</span>
                </ol>
            </div>
            <div class="mb-4">
                <label for="profileVk" class="pb-1 text-300">Вконтакте</label>
                <input type="text" class="form-control" id="profileVk" value="https://vk.com">
            </div>
            <div class="mb-4">
                <label for="profileTg" class="pb-1 text-300">Телеграм</label>
                <input type="text" class="form-control" id="profileTg" value="https://tg.com">
            </div>
            <div class="mb-4">
                <label for="profileYoutube" class="pb-1 text-300">Ютуб</label>
                <input type="text" class="form-control" id="profileYoutube" value="https://youtube.com">
            </div>
            <div class="">
                <label for="profileSite" class="pb-1 text-300">Сайт</label>
                <input type="text" class="form-control" id="profileSite" value="https://some-site.com">
            </div>
        </div>
        <div class="w-100 mt-4">
            <button type="submit" class="btn btn-primary py-0 w-100">Отправить</button>
        </div>
    </div>


    <ProfileAside />


</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>