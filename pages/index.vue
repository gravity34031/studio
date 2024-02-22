<template>
<div>
    <div class="headline mb-4">
        <div class="headline-start"></div>
        <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
            <span class="headline-text primary-color">АНИМЕ ЭТОГО СЕЗОНА ({{ prettyCurrentSeason }})</span>
        </ol>
    </div>

    <div v-if="thisSeasonStatus=='pending'">
        Загрузка...
    </div>
    <div v-else-if="thisSeasonStatus=='error'">
        Ошибка загрузки
    </div>
    <div v-else-if="thisSeasonStatus=='success'">
        <div class="row row-cols-xxl-7 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-xs-3 row-cols-xxs-2 g-3">
            <div class="col" v-for="title of thisSeasonTitles.results" :key="title.pk">
                <nuxt-link :to="`/titles/${title.slug}`">
                    <div class="card card-crumpled">
                        <img :src="title.poster_thumbnail" class="card-img-top" alt="...">
                        <div class="card-body card-body-crumpled p-0">
                            <div class="card-text mx-1 justify-content-center">
                                <div class="card-text-main text-lg">
                                    {{ title.title }}
                                </div>
                                <div class="text-sub d-text-soft px-1 my-2 position-absolute align-self-end">
                                    <span v-for="(genre, i) in title.genres" :key="genre.pk">{{genre.title}}{{ i < title.genres.length-1 ? ', ' : '' }} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>



    <div class="headline mb-4 mt-5">
        <div class="headline-start"></div>
        <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
            <nuxt-link to="/news/" class="text-link">
                <span class="headline-text primary-color">НОВОСТИ</span>
            </nuxt-link>
        </ol>
    </div>



    <div v-if="newsStatus=='pending'">
        Загрузка...
    </div>
    <div v-else-if="newsStatus=='error'">
        Ошибка загрузки
    </div>
    <div v-if="newsStatus=='success'">
        <div class="row row-cols-xl-3 row-cols-md-2 row-cols-1 gx-6 gy-md-5 gy-4">
            <div class="col" v-for="post of newsPosts.results" :key="post.pk">
                <nuxt-link :to="`/news/${post.slug}`" class="text-link">
                    <div class="card">
                        <img src="/imgs/ce169b64d929722f96ad23c943a667eb2edfd89a.jpg" class="card-img-top" alt="...">
                        <div class="card-body pb-0 px-0">
                            <span class="card-text text-500 text-lg">{{ post.title }}</span>
                            <div class="text-sub mt-2 d-flex justify-content-between">
                                <span>
                                    <img src="/imgs/view.png" width="18" height="12" alt="view">
                                    <span class="ms-2">{{ post.views }}</span>
                                </span>
                                <span class="d-text-muted">{{ getPastTime(post.create_time) }}</span>
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>



    <div class="headline mb-4 mt-5">
        <div class="headline-start"></div>
        <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
            <span class="headline-text primary-color">НЕДАВНО ОБНОВЛЕННЫЕ</span>
        </ol>
    </div>



    <div v-if="recentStatus=='pending'">
        Загрузка...
    </div>
    <div v-else-if="recentStatus=='error'">
        Ошибка загрузки
    </div>
    <div v-if="recentStatus=='success'">
        <div id="sliderId" class="slider position-relative">
            <div class="slider-arrows">
                <div class="slider-arrow-left hidden">
                    <div class="slider-arrow-bg"></div>
                    <img class="slider-arrow mirror" src="/imgs/slider-arrow-light.png" alt="">
                </div>
                <div class="slider-arrow-right hidden">
                    <div class="slider-arrow-bg"></div>
                    <img class="slider-arrow" src="/imgs/slider-arrow-light.png" alt="">
                </div>
            </div>

            <div class="slider-container">
                <div class="row cards-wrapper flex-nowrap row-cols-xl-8 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-xxs-2 g-3">

                    <div class="col" v-for="title of recentTitles.results" :key="title.pk">
                        <nuxt-link :to="`/titles/${title.slug}`" class="text-link">
                        <div class="card card-shadow captioned-card">
                            <img :src="title.poster_thumbnail" class="captioned-card-img"
                                alt="...">
                            <div class="card-body captioned-card-body py-2 px-2">
                                <div class="d-text-soft text-center">
                                    <span class="card-text text-lg">{{ title.title }}</span>
                                    <div class="mt-2">
                                        <span class="">{{ getPastTime(title.update_time) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </nuxt-link>
                    </div>

                </div>
            </div>

        </div>
    </div>



    <div class="headline mb-4 mt-5">
        <div class="headline-start"></div>
        <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
            <nuxt-link to="/youtube/" class="text-link">
                <span class="headline-text primary-color">ВИДЕО</span>
            </nuxt-link>
        </ol>
    </div>



    <div v-if="videoStatus=='pending'">
        Загрузка...
    </div>
    <div v-else-if="videoStatus=='error'">
        Ошибка загрузки
    </div>
    <div v-if="videoStatus=='success'">
        <div class="row row-cols-xl-3 row-cols-md-2 row-cols-1 gx-6 gy-md-5 gy-4">
            <div class="col" v-for="post of videoPosts.results" :key="post.pk">
                <a v-bind:href="post.link" target="_blank" class="text-link">
                    <div class="card card-crumpled">
                        <img :src="post.image" class="card-img-top" alt="...">
                        <div class="card-body card-body-crumpled p-0">
                            <div class="card-text mx-2 justify-content-center">
                                <div class="card-text-main text-500 text-xl">
                                    {{ post.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        </div>
    </div>

</div>
</template>

<script setup>
import {getPastTime, getCurrentSeasonDate} from '~/assets/js/pretty_time'; // give minutes as an argument


const runtimeConfig = useRuntimeConfig()
const api = runtimeConfig.public.api



/* GET TITLES OF THIS SEASON */
const currentSeasonObj = getCurrentSeasonDate()
const prettyCurrentSeason = currentSeasonObj.name
const aired_on_from = currentSeasonObj.date

const { data:thisSeasonTitles, status:thisSeasonStatus } = await useFetch(`${api}/titles/?aired_on_from=${aired_on_from}`)



/* GET NEWS */
const { data:newsPosts, status:newsStatus } = await useFetch(`${api}/news/?page_size=3`)



/* GET RECENTLY UPDATED TITLES */
const { data:recentTitles, status:recentStatus } = await useFetch(`${api}/titles/?page_size=10&ordering=-update_time`)



/* GET YOUTUBE VIDEOS */
const { data:videoPosts, status:videoStatus } = await useFetch(`${api}/youtube/?page_size=3`)
</script>

<script>
import initSlider from '~/assets/js/slider.js';
export default {
    mounted(){
        initSlider()
    }
}
</script>

<style lang="scss" scoped>

</style>