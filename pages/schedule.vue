<template>
<div v-for="dayObj of scheduleTitles" :key="dayObj.day">
    <div >
        <div class="headline" :class="dayObj.day!=='Без расписания'?'mb-4':''">
            <div class="headline-start"></div>
            <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
                <span class="headline-text primary-color">{{dayObj.day}}</span>
            </ol>
        </div>
        <div class="my-2" v-if="dayObj.day=='Без расписания'">
            Данные релизы выходят без расписания
        </div>
    </div>


    <div class="row row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-xxs-2 g-3 mb-4">

        <div class="col" v-for="day of dayObj.titles">
            <nuxt-link :to="`/titles/${day.title.slug}`" class="text-link">
                <div class="card card-shadow captioned-card position-relative">
                    <div class="position-absolute card-delay" v-if="day.delay">
                        <div class="card-delay-header">ЗАДЕРЖКА</div>
                        <div class="card-delay-text">серия задержана до <br>{{ formatDelayTime(day.delay) }}</div>
                    </div>
                    <img :src="day.title.poster_thumbnail" class="captioned-card-img" alt="...">
                    <div class="card-body captioned-card-body py-2 px-2">
                        <div class="d-text-soft text-center">
                            <span class="card-text text-lg text-400">{{ day.title.title }}</span>
                            <div class="mt-1">
                                <span class="text-base text-400">{{ Math.min(day.title.episodes_aired + 1, day.title.episodes) }} серия</span>
                            </div>
                            <div class="">
                                <span class="text-base text-400" v-if="day.time">выйдет в {{ trimSeconds(day.time) }}</span>
                                <span class="text-base text-400" v-else>время неизвестно</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nuxt-link>
        </div>

    </div>
</div>
</template>

<script setup>
import { formatDelayTime } from '~/assets/js/pretty_time';

const runtimeConfig = useRuntimeConfig()
const api = runtimeConfig.public.api


const { data: scheduleTitles, status:scheduleStatus } = await useFetch(`${api}/schedule`)

function trimSeconds(time){
    time = time.split(':').slice(0,2).join(':')
    return time
}
</script>

<style lang="scss" scoped>

</style>