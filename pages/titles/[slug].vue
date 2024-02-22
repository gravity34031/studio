<template>
<div>
<div v-if="titleStatus=='success'">
<div class="row title-descr gx-lg-4 gx-3 gy-4">


    <div class="col-xl-2 col-sm-3 col-12 title-descr-l">
        <img class="title-poster" :src="title.poster_thumbnail" alt="">
        <div class="row flex-nowrap mt-2 g-sm-2 g-xs-5 g-xxs-4 g-3">
            <img class="average-rate-star" src="/imgs/primary-star.png" alt="">
            <img class="average-rate-star" src="/imgs/primary-star.png" alt="">
            <img class="average-rate-star" src="/imgs/primary-star.png" alt="">
            <img class="average-rate-star" src="/imgs/gray-star.png" alt="">
            <img class="average-rate-star" src="/imgs/gray-star.png" alt="">
        </div>
        <div class="mt-2 d-flex justify-content-between align-items-center">
            <div class="your-rate-container d-md-flex d-sm-block d-xs-flex flex-column align-items-start me-md-0 me-sm-2 me-0">
                <div class="d-flex align-items-center">
                    <img class="rate-star" src="/imgs/primary-star.png" alt="">
                    <div class="your-rate-num rate-num ms-2 my-auto">
                        <span v-if="title.your_rating">
                            {{title.your_rating}}
                        </span>
                        <span v-else>-</span>
                    </div>
                </div>
                <div class="your-rate-voters rate-voters mt-2">моя оценка</div>
            </div>
            <div v-if="title.average_rating" class="average-rate d-flex flex-column text-center">
                <div class="average-rate-num  rate-num">{{ title.average_rating.rating }}</div>
                <div class="average-rate-voters rate-voters">{{ title.average_rating.voters }} голосов</div>
            </div>
        </div>
        <hr class="d-sm-none d-block">
    </div>


    <div class="col-xl-10 col-sm-9 col-12 title-descr-r">
        <span class="title-descr-r-title">{{ title.title }} 
            <span v-if="title.original_title" class="text-soft text-200">/ {{title.original_title}}</span>
        </span>
        <div class="title-descr-r-other">
            <span v-if="title.schedule" class="r-schedule">Серия выйдет: 
                <span class="description-accent">
                    <span v-if="!title.schedule.delay">
                        {{ title.schedule.day }} 
                        <span v-if="title.schedule.time">{{ trimSeconds(title.schedule.time) }} по МСК</span>
                    </span>
                    <span v-else>
                        {{ formatDelayTime(title.schedule.delay) }} <span class="d-text-soft">из-за задержки</span>
                    </span>
                </span>
            </span>
            <span  v-if='title.aired_on' class="r-aired-on">Начало выходить: <span class="description-bold">{{ formatAiredOn(title.aired_on) }}</span></span>
            <span  v-if="title.episodes" class="r-episodes">Всего эпизодов: <span class="description-bold">{{ title.episodes }}</span></span>
            <span  v-if="title.episodes_aired" class="r-episodes-aired">Озвучено: <span class="description-bold">{{ Math.min(title.episodes_aired, title.episodes) }}</span></span>
            <span  v-if="title.status" class="r-status">Статус: <span class="description-bold">{{ title.status }}</span></span>
            <span  v-if="title.genres.length" class="r-genres">Жанры: <span class="description-bold">
                <span v-for="(genre, i) in title.genres" :key="genre.slug">
                    {{ genre.title }}{{ i < title.genres.length - 1 ? ', ' : '' }} 
                </span>
            </span></span>
            <span v-if="title.studios.length" class="r-studios">Студия: <span class="description-bold">
                <span v-for="(studio, i) in title.studios" :key="studio.slug">
                    {{ studio.title }}{{ i < title.studios.length - 1 ? ', ' : '' }} 
                </span>
            </span></span>
            <span v-if="title.actors.length" class="r-actors">
                Актеры: <span class="description-bold">
                    <span v-for="(actor, i) in title.actors" :key="actor.slug">
                        {{ actor.secondname }} {{ actor.firstname }}
                        {{ i < title.actors.length - 1 ? ', ' : '' }} 
                    </span>
            </span></span>
            <span v-if="title.alternative_title.length" class="r-alternative-titles">
                <div>Альтернативные названия: <br></div>
                    <div class="mt-2"></div>
                    <div v-for="(altTitle, i) in title.alternative_title" :key="i" class="text-indent-one-line mt-1">
                        {{altTitle.title}}
                    </div>

            </span>
            <span v-if="title.description" class="r-description mt-4">
                Описание: <br>
                    <div class="r-description-text text-indent">
                        {{ title.description }}
                    </div>
            </span>
        </div>
    </div>
</div>




<div class="row row-cols-1 gx-4 gy-0" 
    :class="title.related_lists.length&&title.frames.length?'row-cols-sm-2': ''">
    <div v-if="title.related_lists.length" class="col">
        <div class="headline mb-4 mt-5">
            <div class="headline-start"></div>
            <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
                <span class="mini-headline-text d-text">Связанное</span>
            </ol>
        </div>
        <div class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-4 row-cols-xxs-3 row-cols-2 g-3">
            <div v-for="relatedTitle in title.related_lists" class="col">
                <nuxt-link :to="relatedTitle.slug" class="text-link">
                    <div class="card h-100">
                        <img :src="relatedTitle.poster_thumbnail" class="card-img-top" alt="...">
                        <div class="card-body pt-2 pb-0 px-0 text-center text-sub text-400 d-flex flex-column justify-content-between">
                            <div class="trim-2-lines mb-1">{{ relatedTitle.title }}</div>
                            <div>{{ formatRelatedAiredOn(relatedTitle.aired_on) }}</div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>


    <div v-if="title.frames.length" class="col">
        <div class="headline mb-4 mt-sm-5 mt-4">
            <div class="headline-start"></div>
            <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
                <span class="mini-headline-text d-text">Кадры</span>
            </ol>
        </div>
        <div class="row row-cols-xl-3 row-cols-md-2 row-cols-sm-1 row-cols-xs-3 row-cols-xxs-2 row-cols-1 g-3">
            <div v-for="(frame, i) in title.frames" class="col">
                <div v-if="i<6" class="card">
                    <img :src="frame.image_thumbnail" class="card-img-top" :alt="frame.image_thumbnail">
                </div>
            </div>
        </div>
    </div>


</div>
</div>



<div class="overflow-hidden mt-5 d-flex justify-content-center">
    <div style="width: 95vw; height: 54.44vh; background-color: rgba(0, 0, 0, 0.15);"></div>
</div>


<Comment :title="title" :slug="slug" content_type="title"/>
</div>
</template>

<script setup>
import { formatDelayTime, formatAiredOn, formatRelatedAiredOn } from '~/assets/js/pretty_time';

const { data:user, token } = useAuth()
const runtimeConfig = useRuntimeConfig()
const api = runtimeConfig.public.api
const route = useRoute()

const slug = route.params.slug
const headers = {Authorization:token}
const options = {headers: headers}
const { data:title, status:titleStatus } = await useFetch(`${api}/titles/${slug}`, options)
// console.log(title.value)


function trimSeconds(time){
    time = time.split(':').slice(0,2).join(':')
    return time
}
</script>

<style lang="scss" scoped>

</style>