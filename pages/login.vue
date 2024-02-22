<template>
<div class="container-sm identify-form">
    <div class="text-500 text-lg text-center mb-2">Авторизация</div>
    <span class="text-300">На данной странице вы сможете войти в ваш аккаунт</span>
    <form class="mt-4">
        <div class="mb-3 row">
            <label for="authUsername" class="col-sm-4 col-form-label pb-1">Имя пользователя</label>
            <div class="col-sm-8">
                <input v-model="username" type="text" class="form-control" id="authUsername">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="authPassword" class="col-sm-4 col-form-label pb-1">Пароль</label>
            <div class="col-sm-8">
                <input v-model="password" type="password" class="form-control" id="authPassword">
            </div>
        </div>
        <div class="d-xxs-block d-flex text-sm-start text-center mt-4">
            <button  @click.prevent=login() type="submit" class="btn btn-primary py-1 px-3 flex-fill">Войти</button>
        </div>
    </form>
</div>
</template>

<script setup>
import { ref } from 'vue';

const { signIn } = useAuth()


const username = ref('')
const password = ref('')
async function login() {
    try {
        await signIn({username: username.value, password: password.value}, { callbackUrl: '/' })
    } catch(err) {
        if (err.response.status != '404') {
            console.log(err.response._data)
            console.log(err.response.status)
        } else {
            console.log(err)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>