<template>
<div class="navbar-fluid container-fluid">
    <div class="navbar-container container-xxl px-2">
        <nav class="navbar py-0 navbar-expand-md">



            <div class="order-1 navbar-collapsed-container">
                <nuxt-link class="navbar-brand d-xs-block d-none" to='/'>STUDIOBAND</nuxt-link>
                
                <div class="navbar-dropdown-container">
                    <a id='navbar-dropdown' class="navbar-dropdown nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{ getMenu }}
                    </a>
                    <div class="navbar-dropdown-menu">
                        <ul class="dropdown-menu">
                            <li><nuxt-link class="dropdown-item" to='/'>Главная</nuxt-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><nuxt-link class="dropdown-item" to='/titles/'>Аниме</nuxt-link></li>
                            <li><nuxt-link class="dropdown-item" to='/schedule/'>Расписание</nuxt-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><nuxt-link class="dropdown-item" to='/news/'>Новости</nuxt-link></li>
                            <li><nuxt-link class="dropdown-item" to='/youtube/'>Видео</nuxt-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><nuxt-link class="dropdown-item" to='/titles/random'>Случайное аниме</nuxt-link></li>
                        </ul>
                    </div>
                </div>
            </div>



            <button class="navbar-toggler order-3" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>



            <div class="collapse navbar-collapse order-3" id="navbarSupportedContent">
                <div class="navbar-collapse-wrapper d-xxs-flex d-block">
                    <form class="form-navbar-search d-flex my-2 mx-auto" role="search">
                        <input class="form-control navbar-search me-xxs-3 me-0" type="search" placeholder="Search" aria-label="Search">
                    </form>
                    <div v-if="getProfile" class="navbar-dropdown-container">
                        <a class="navbar-dropdown nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img class="navbar-profile-image" :src="user.avatar" alt="">
                            <span class="navbar-profile-text">{{user.username}}</span>
                        </a>
                        <div class="navbar-dropdown-menu">
                            <ul class="dropdown-menu">
                                <li><nuxt-link class="dropdown-item" to='/profile/'>Профиль</nuxt-link></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><nuxt-link class="dropdown-item" to='/'>Рейтинг</nuxt-link></li>
                                <li><nuxt-link class="dropdown-item" to='/'>Избранное</nuxt-link></li>
                                <li><nuxt-link class="dropdown-item" to='/'>Комментарии</nuxt-link></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><nuxt-link class="dropdown-item" to='/profile/settings/'>Настройки</nuxt-link></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item cursor-pointer" @click.prevent=logOut()>Выйти</a></li>
                            </ul>
                        </div>             
                    </div>
                    <div v-else class="d-flex align-self-center">
                        <div>
                            <nuxt-link to="/login/" class="text-link">Войти</nuxt-link>
                        </div>
                        <div class="mx-2 d-text-soft">
                            /
                        </div>
                        <div>
                            <nuxt-link to="/registration/" class="text-link">Зарегистрироваться</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>



        </nav>
    </div>
</div>
</template>

<script setup>
import { computed } from '#imports'

const { signOut, data:user, status } = useAuth()
const route = useRoute()

const menuSlugToName = {
    'index': "Главная",
    'titles': "Аниме",
    'schedule': "Расписание",
    'news': "Новости",
    'youtube': "Видео",
    'titles-slug': "Аниме",
    'login': "Авторизация",
    'registration': "Регистрация",
    'profile': "Профиль",
    'profile-settings': "Настройки",
}
const getMenu = computed(() => {
    let res = 'Меню'
    if (menuSlugToName[route.name]) {
        res = menuSlugToName[route.name]
    }
    return res
})


async function logOut() {
    try {
        await signOut({callbackUrl: '/'})
    } catch(err) {
        console.log(err)
    }
}

const getProfile = computed(() => {
    let userData = undefined
    try {
        userData = user.value
    } catch(err){
        console.log(err)
    }
    return userData
})
</script>

<style lang="scss" scoped>

</style>