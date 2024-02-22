<template>
    <div class="headline">
        <div class="headline-start"></div>
        <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
            <span class="headline-text primary-color">Аниме</span>
        </ol>
    </div>

    <div class="mt-3">
        Здесь ты можешь найти аниме, отсортированные
        <span>
            <a class="text-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ translateSorting(selectedSorting) }}
            </a>
            <div class="navbar-dropdown-menu common-dropdown-menu">
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" @click="selectSorting('title')" v-if="selectedSorting != 'title'">По
                            названию</a></li>
                    <li><a class="dropdown-item" href="#" @click="selectSorting('update_time')"
                            v-if="selectedSorting != 'update_time'">По времени обновления</a></li>
                    <li><a class="dropdown-item" href="#" @click="selectSorting('create_time')"
                            v-if="selectedSorting != 'create_time'">По дате добавления</a></li>
                    <li><a class="dropdown-item" href="#" @click="selectSorting('rating')"
                            v-if="selectedSorting != 'rating'">По рейтингу</a></li>
                    <li><a class="dropdown-item" href="#" @click="selectSorting('popular')"
                            v-if="selectedSorting != 'popular'">По популярности</a></li>
                </ul>
            </div>
        </span>
    </div>



    <div class="row mt-4 gx-lg-4 gx-2">
        <div class="col-md-9 col-12 order-md-1 order-2">
            <client-only>
                <div v-if="titleStatus == 'pending'">
                    Загрузка...
                </div>
                <div v-else-if="titleStatus == 'error'">
                    Ошибка загрузки
                </div>
                <div v-else-if="titleStatus == 'success'">
                    <div>Всего найдено: {{ titles.count }}</div>
                    <div class="mt-2 mb-4">Показано: {{ titles.results.length }}</div>
                    <div class="row row-cols-xl-8 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-xxs-2 g-3">
                        <div class="col" v-for="title of titles.results" :key="title.pk">
                            <nuxt-link :to="`/titles/${title.slug}`" class="text-link">
                                <div class="card card-shadow captioned-card">
                                    <img :src="title.poster_thumbnail" class="captioned-card-img" alt="...">
                                    <div class="card-body captioned-card-body py-2 px-2">
                                        <div class="d-text-soft text-center">
                                            <span class="card-text text-lg text-400">{{ title.title }}</span>
                                            <div class="mt-2">
                                                <span class="text-sub text-400">{{ getYear(title.aired_on) }} /
                                                    <span v-for="(genre, i) in title.genres"
                                                        :key="genre.slug">{{ genre.title }}{{ i < title.genres.length - 1 ? ', '
                                                        : '' }} </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <nav class="mt-3" aria-label="Page navigation" v-if="pages>1">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="page==1?'disabled':''" v-if="pages>2">
                            <a class="page-link" aria-label="Previous" @click.prevent="goToPage(1)">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                            <li class="page-item" :class="page==i?'active':''" v-for="i in pages">
                                <a class="page-link" @click.prevent="goToPage(i)">{{i}}</a>
                            </li>
                        <li class="page-item" :class="page==pages?'disabled':''" v-if="pages>2">
                            <a class="page-link" aria-label="Next" @click.prevent="goToPage(pages)">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </client-only>

        </div>


        <div class="col-md-3 col-12 order-md-2 order-1 mb-md-0 mb-3">
            <div class="headline mb-3">
                <div class="headline-start"></div>
                <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
                    <span class="mini-headline-text d-text">ФИЛЬТРЫ</span>
                </ol>
            </div>



            <form>
                <div class="filter">
                    <div class="filter-header">
                        СТАТУС
                    </div>
                    <div class="filter-input">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="status1" v-model="status"
                                value="Вышел" @click="handleStatusClick('Вышел')">
                            <label class="form-check-label" for="status1">
                                Вышел
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="status2" v-model="status"
                                value="Онгоинг" @click="handleStatusClick('Онгоинг')">
                            <label class="form-check-label" for="status2">
                                В работе
                            </label>
                        </div>
                    </div>
                </div>


                <div class="filter mt-2">
                    <div class="filter-header">
                        РЕЙТИНГ
                    </div>
                    <div class="filter-input">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="rating" id="rating9" v-model="rating"
                                value="9" @click="handleRatingClick('9')">
                            <label class="form-check-label" for="rating9">
                                9+
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="rating" id="rating8" v-model="rating"
                                value="8" @click="handleRatingClick('8')">
                            <label class="form-check-label" for="rating8">
                                8+
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="rating" id="rating7" v-model="rating"
                                value="7" @click="handleRatingClick('7')">
                            <label class="form-check-label" for="rating7">
                                7+
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="rating" id="rating6" v-model="rating"
                                value="6" @click="handleRatingClick('6')">
                            <label class="form-check-label" for="rating6">
                                6+
                            </label>
                        </div>
                    </div>
                </div>


                <div class="filter mt-2">
                    <div class="filter-header">
                        СЕЗОН
                    </div>
                    <div class="filter-input">
                        <div v-for="(period, key) in seasonArray" :key="key">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="season" :id="`season${key}`"
                                    v-model="season" :value="period.date" @click=handleSeasonClick(period.date)>
                                <label class="form-check-label" :for="`season${key}`">
                                    {{ period.name }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="filter mt-2">
                    <div class="filter-header">
                        ЖАНРЫ
                    </div>
                    <div class="filter-input">
                        <div v-if="genresStatus == 'pending'">
                            Загрузка...
                        </div>
                        <div v-else-if="genresStatus == 'error'">
                            Ошибка загрузки
                        </div>
                        <div v-else-if="genresStatus == 'success'">
                            <div v-for="(genre, key) of genres.results" :key="key">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="genre" :id="`genre${genre.slug}`"
                                        v-model="genreFilter" :value="genre.slug">
                                    <label class="form-check-label" :for="`genre${genre.slug}`">
                                        {{ genre.title }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="filter mt-2">
                    <div class="filter-header">
                        АКТЕРЫ
                    </div>
                    <div class="filter-input">
                        <div v-if="actorsStatus == 'pending'">
                            Загрузка...
                        </div>
                        <div v-else-if="actorsStatus == 'error'">
                            Ошибка загрузки
                        </div>
                        <div v-else-if="actorsStatus == 'success'">
                            <div v-for="(actor, key) of actors.results">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="actor" :id="`actor${actor.slug}`"
                                        v-model="actorFilter" :value="actor.slug">
                                    <label class="form-check-label" :for="`actor${actor.slug}`">
                                        {{ actor.secondname }} {{ actor.firstname }} {{ actor.surname }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="filter mt-2">
                    <div class="filter-header">
                        СТУДИИ
                    </div>
                    <div class="filter-input">
                        <div v-if="studiosStatus == 'pending'">
                            Загрузка...
                        </div>
                        <div v-else-if="studiosStatus == 'error'">
                            Ошибка загрузки
                        </div>
                        <div v-else-if="studiosStatus == 'success'">
                            <div v-for="(studio, key) of studios.results">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="studio"
                                        :id="`studio${studio.slug}`" v-model="studioFilter" :value="studio.slug">
                                    <label class="form-check-label" :for="`studio${studio.slug}`">
                                        {{ studio.title }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary w-100 py-0 mt-4" @click.prevent=clearAllFilters()>
                    Очистить все
                </button>


            </form>
        </div>


    </div>
</template>





<script setup>
import { ref, watch } from 'vue';
import { getYear, getYearsAndSeasonsPeriod } from '~/assets/js/pretty_time';


const runtimeConfig = useRuntimeConfig()
const api = runtimeConfig.public.api
const route = useRoute()
const router = useRouter()


/* FETCH */
/* fetch titles */
const titles = ref([])
const titleStatus = ref('')

const pageSize = ref(40)
const titlesCount = ref(0)
const pages = ref(1)

async function fetchData() {
    const query = route.query
    pageSize.value = query.page_size ? query.page_size : 40
    const pageSizeParam = 'page_size='+pageSize.value
    const pageParam = page.value ? 'page=' + page.value : ''

    const sortParam = selectedSorting.value ? 'ordering=' + selectedSorting.value : ''
    const statusParam = status.value ? 'status=' + status.value : ''
    const ratingParam = rating.value ? 'rating=' + rating.value : ''
    const seasonParam = season.value ? season.value.split(' ') : ''
    const aired_on_from = seasonParam ? 'aired_on_from=' + seasonParam[0] : ''
    const aired_on_to = seasonParam ? 'aired_on_to=' + seasonParam[1] : ''
    const genresParam = genreFilter.value.length ? 'genres=' + genreFilter.value.join(',') : ''
    const actorsParam = actorFilter.value.length ? 'actors=' + actorFilter.value.join(',') : ''
    const studioParam = studioFilter.value.length ? 'studios=' + studioFilter.value.join(',') : ''

    const paramsArr = [pageParam, pageSizeParam, sortParam, statusParam, 
        ratingParam, aired_on_to, aired_on_from,
        genresParam, actorsParam, studioParam]
        .filter((el) => el); // clear empty params

    const params = paramsArr.join('&')

    const response = await useFetch(`${api}/titles/?${params}`)

    titles.value = response.data.value
    titleStatus.value = response.status.value

    titlesCount.value = titles.value.count
    pages.value = Math.ceil(titlesCount.value/pageSize.value)
};




async function clearAllFilters() {
    const queriesToExclude = ['status', 'rating', 'season', 'genre', 'actor', 'studio']
    const currentQuery = route.query
    const newQuery = {}
    for (const query in currentQuery) {
        if (!queriesToExclude.includes(query)) {
            newQuery[query] = currentQuery[query]
        }
    }
    await router.push({ query: newQuery })

    status.value = ''
    rating.value = ''
    season.value = ''
    genreFilter.value = []
    actorFilter.value = []
    studioFilter.value = []
}


function addQuery(qParam, qValue) {
    const currentQuery = route.query
    const newQuery = { ...currentQuery }
    if (!(qParam=='ordering' || qParam=='page')){
        page.value = 1
    }
    // if it is checkbox(its using proxy array)
    if (Array.isArray(qValue) || qValue instanceof Proxy) {
        // clear empty values
        qValue = qValue.filter(el => el)
    }
    if (qValue) {
        newQuery[qParam] = qValue
    } else { // del new query param if it has no value
        delete newQuery[qParam]
    }
    router.push({ query: newQuery })
};

// clear radio input on click if it had been clicked
function clearRadio(option, value) {
    if (option.value === value) {
        option.value = ''
    }
}

// if filter is in query get it and use in fetch else will be empty '' ref
// param is name of the parameter that can be in query
function getRefInQuery(param, standart = '') {
    const query = route.query[param]
    let selectedFilter
    if (Array.isArray(standart)) { // for checkbox
        selectedFilter = Array.isArray(query) ? [...query] : [query]
    } else {
        selectedFilter = query ? query : standart
    }
    return selectedFilter
}


/* ORDERING */
const defaultSorting = 'title' // default selected sorting type
const selectedSorting = ref(getRefInQuery('ordering', defaultSorting))
async function selectSorting(sorting) {
    selectedSorting.value = sorting
};
function translateSorting(sorting) {
    const sortingsDict = {
        title: "По названию",
        update_time: "По времени обновления",
        create_time: "По дате добавления",
        rating: "По рейтингу",
        popular: "По популярности"
    }
    return sortingsDict[sorting]
};


/* Handlers to clear radio field if click on selected */
function handleStatusClick(value) {
    clearRadio(status, value)
}
function handleRatingClick(value) {
    clearRadio(rating, value)
}
function handleSeasonClick(value) {
    clearRadio(season, value)
}
// function toggleGenre(value) {
//     if (genre.value.includes(value)) {
//         console.log(genre)
//         genre.value = genre.value.filter(item => item!==value)
//     }
//     genre.value.push(value)

//     addQuery('genre', genre.value)
//     fetchData()
//     console.log(genre.value)
// }



/* watchers */
watch(selectedSorting, () => {
    addQuery('ordering', selectedSorting.value)
    fetchData()
});



const status = ref(getRefInQuery('status'));
watch(status, () => {
    addQuery('status', status.value)
    fetchData()
});


const rating = ref(getRefInQuery('rating'))
watch(rating, () => {
    addQuery('rating', rating.value)
    fetchData()
});


const season = ref(getRefInQuery('season'))
// async function handleSeasonChange() {
//     await addQuery('aired_on_from', season.value.start)
//     await addQuery('aired_on_to', season.value.end)
//     fetchData()
// }
watch(season, () => {
    addQuery('season', season.value)
    fetchData()
});


const genreFilter = ref(getRefInQuery('genre', []))
watch(genreFilter, () => {
    addQuery('genre', genreFilter.value)
    fetchData()
})


const actorFilter = ref(getRefInQuery('actor', []))
watch(actorFilter, () => {
    addQuery('actor', actorFilter.value)
    fetchData()
})


const studioFilter = ref(getRefInQuery('studio', []))
watch(studioFilter, () => {
    addQuery('studio', studioFilter.value)
    fetchData()
})



const page = ref(1);
function goToPage(num) {
    page.value = num
}
watch(page, () => {
    addQuery('page', page.value)
    fetchData()
})






/* initializing */
fetchData()
const seasonArray = getYearsAndSeasonsPeriod()

/* get genres */
const { data: genres, status: genresStatus } = await useFetch(`${api}/genre`)

/* get actors */
const { data: actors, status: actorsStatus } = await useFetch(`${api}/actor`)

/* get studio */
const { data: studios, status: studiosStatus } = await useFetch(`${api}/studio`)







</script>






<style lang="scss" scoped></style>