<template>
<div class="container-sm identify-form">
    <div class="text-500 text-lg text-center mb-2">Регистрация</div>
    <span class="text-300">На данной странице вы сможете зарегистрировать новый аккаунт</span>
    <form class="mt-4">
        <div class="mb-3 row">
            <label for="regUsername" class="col-sm-4 col-form-label pb-1">Имя пользователя*</label>
            <div class="col-sm-8">
                <input v-model="username" type="text" class="form-control" id="regUsername" placeholder="введите имя пользователя">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="regDisplayname" class="col-sm-4 col-form-label pb-1">Отображаемое имя</label>
            <div class="col-sm-8">
                <input v-model="displayname" type="text" class="form-control" id="regDisplayname" placeholder="если не задано, равно имени пользователя">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="regPassword" class="col-sm-4 col-form-label pb-1">Пароль*</label>
            <div class="col-sm-8">
                <input v-model="password" type="password" class="form-control" id="regPassword">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="regRePassword" class="col-sm-4 col-form-label pb-1">Повторите пароль*</label>
            <div class="col-sm-8">
                <input v-model="repassword" type="password" class="form-control" id="regRePassword">
            </div>
        </div>
        <div class="d-xxs-block d-flex text-sm-start text-center mt-4">
            <button @click.prevent=registration() type="submit" class="btn btn-primary py-1 flex-fill">Отправить</button>
        </div>
    </form>
</div>
</template>

<script setup>
const { signUp } = useAuth()

const username = ref('')
const displayname = ref('')
const password = ref('')
const repassword = ref('')
async function registration() {
    try {
        await signUp({username: username.value, displayname: displayname.value,
            password: password.value, password2: repassword.value}, { callbackUrl: '/' })
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