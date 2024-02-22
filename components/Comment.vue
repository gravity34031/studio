<template>
<div>
<div class="headline mb-4 mt-5">
    <div class="headline-start"></div>
    <ol class="breadcrumb py-2 ps-4 mb-0 flex-fill">
        <span class="headline-text primary-color">Комментарии</span>
    </ol>
</div>


<form class="">
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label text-base text-400">Оставьте свой комментарий:</label>
        <textarea v-model="commentBody" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="">
        <button @click.prevent=postComment() type="submit" class="btn btn-primary mb-3">Отправить</button>
    </div>
</form>




<div v-if="commentStatus=='success'">
    <div v-for="(comment, index) in comments.results" :key="comment.pk" class="d-flex comment mt-4">
        <!-- left part -->
        <div v-if="!comment.is_deleted">
            <nuxt-link :to="`/profile/${comment.author.username}`" class="text-link">
                <div class="comment-avatar me-3">
                    <img :src="comment.author.avatar" class="comment-avatar-img" alt="">
                </div>
            </nuxt-link>
        </div>
        <div v-else>
            <div class="comment-avatar me-3">
                <img src="/imgs/avatar.webp" class="comment-avatar-img" alt="">
            </div>
        </div>
        <!-- right part -->
        <div class="w-100">
            <div class="d-flex justify-content-between align-items-center">
                <div v-if="!comment.is_deleted" class="d-xs-flex d-block align-items-center">
                    <nuxt-link :to="`/profile/${comment.author.username}`" class="text-link">
                        <div class="comment-author me-2">{{ comment.author.display_name }}</div>
                    </nuxt-link>
                    <div class="comment-time mt-xs-0 mt-1">{{ getPastTime(comment.create_time) }}</div>
                </div>
                <div v-else class="d-xs-flex d-block align-items-center">
                    <div class="comment-author me-2">Неизвестно</div>
                    <div class="comment-time mt-xs-0 mt-1">{{ getPastTime(comment.create_time) }}</div>
                </div>
                <!-- comment buttons -->
                <div v-if="!comment.is_deleted" class="comment-buttons">
                    <img @click=openReplyInput(comment.pk) src="/imgs/gray-reply.png" class="comment-icon ms-2 me-2" alt="">
                    <div class="dropstart">
                        <img src="/imgs/gray-menu.png" class="comment-icon ms-2 me-2" data-bs-toggle="dropdown" aria-expanded="false">
                        <ul class="dropdown-menu navbar-dropdown-menu">
                            <a class="dropdown-item cursor-pointer" @click.prevent="openEditInput(comment.pk)">Редактировать</a>
                            <a class="dropdown-item cursor-pointer" data-bs-toggle="modal" :data-bs-target="`#deleteCommentModal${comment.pk}`">Удалить</a>
                        </ul>
                    </div>
                    <!-- modal delete -->
                    <div class="modal fade" :id="`deleteCommentModal${comment.pk}`" tabindex="-1" aria-labelledby="deleteCommentModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5">Удаление</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body pb-2">
                                    Вы уверены, что хотите удалить комментарий?
                                    <div class="d-flex justify-content-end mt-2">
                                        <button @click.prevent="deleteComment(comment.pk)" type="button" class="btn btn-danger btn-sm me-2 px-3">Да</button>
                                        <button type="button" class="btn btn-success btn-sm px-3" data-bs-dismiss="modal">Нет</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!comment.is_deleted" :ref="el => commentDivRefs[comment.pk] = el">
                <div class="comment-body mt-2">
                    <nuxt-link :to="`/profile/${getReplyUserAndBody(comment.body).user.slice(1)}`">{{getReplyUserAndBody(comment.body).user}}</nuxt-link>
                    {{ getReplyUserAndBody(comment.body).body }}<span
                    class='comment-ellipsis' v-if="sliceComment(comment.body)[1]"
                    >...</span><span
                    class="d-none comment-continuation">{{sliceComment(comment.body)[1]}}</span>
                </div>
                <div v-if="sliceComment(comment.body)[1]" @click="showNextText(comment.pk)" class="comment-continue">читать далее</div>
            </div>
            <div v-else>
                <div class="comment-body comment-deleted mt-2">
                    Комментарий удален
                </div>
            </div>
            <!-- edit -->
            <div v-if="!comment.is_deleted" :ref="el => editCommentRefs[comment.pk] = el" style="display: none">
                <textarea
                    @input="() => autoExpandTextarea(comment.pk, edit=true)"
                    class="reply-comment form-control mt-2" rows="1"
                    :value="comment.body"></textarea>
            
                <div class="d-flex justify-content-end mt-2">
                    <button @click.prevent=closeEditInput(comment.pk) type="submit" class="btn btn-hidden btn-xs me-2">Отмена</button>
                    <button @click.prevent='editComment(comment.pk)' type="submit" class="btn btn-xs">Ответить</button>
                </div>
            </div>
            <div class="comment-rating mt-2">
                <span :class="`comment-rating-${comment.rating<0?'negative':'positive'} comment-rating-${Math.min(Math.abs(comment.rating), 5)}`">{{ comment.rating }}</span>
                <img @click="makeLike(comment.pk, comment.your_reaction)" src="/imgs/gray-like.png" :class="`comment-icon ms-2 me-2 ${comment.your_reaction==1?'comment-icon-selected':''}`" alt="">
                <img @click="makeDislike(comment.pk, comment.your_reaction)" src="/imgs/gray-dislike.png" :class="`comment-icon ms-2 me-2 ${comment.your_reaction==0?'comment-icon-selected':''}`" alt="">
            </div>

            <!-- reply -->
            <div :ref="el => replyCommentRefs[comment.pk] = el" style="display: none">
                <textarea
                    @input=autoExpandTextarea(comment.pk)
                    class="reply-comment form-control mt-2"
                    placeholder="Введите ответ" rows="1"></textarea>
                
                <div class="d-flex justify-content-end mt-2">
                    <button @click.prevent=closeReplyInput(comment.pk) type="submit" class="btn btn-hidden btn-xs me-2">Отмена</button>
                    <button @click.prevent='replyComment(comment.pk, comment.author.username)' type="submit" class="btn btn-xs">Ответить</button>
                </div>
            </div>

             
            <!-- COMMENT's REPLY (childrens) -->
            <div>
                <div v-for="children in comment.children" :key="children.pk" class="d-flex comment mt-4">
                    <!-- left -->
                    <div v-if="!children.is_deleted">
                        <nuxt-link :to="`/profile/${children.author.username}`" class="text-link">
                            <div class="comment-avatar me-3">
                                <img :src="children.author.avatar" class="comment-avatar-img" alt="">
                            </div>
                        </nuxt-link>
                    </div>
                    <!-- right -->
                    <div class="w-100">
                        {{ children.is_deleted }}
                        <div class="d-xxs-flex d-block justify-content-between align-items-center">
                            <div v-if="!children.is_deleted" class="d-xs-flex d-block align-items-center">
                                <nuxt-link :to="`/profile/${children.author.username}`" class="text-link">
                                    <div class="comment-author me-2">{{ children.author.display_name }}</div>
                                </nuxt-link>
                                <div class="comment-time mt-xs-0 mt-1">{{ getPastTime(children.create_time) }}</div>
                            </div>
                            <!-- comment buttons -->
                            <div class="comment-buttons">
                                <img @click=openReplyInput(children.pk) src="/imgs/gray-reply.png" class="comment-icon ms-2 me-2" alt="">
                                <div class="dropstart">
                                    <img src="/imgs/gray-menu.png" class="comment-icon ms-2 me-2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <ul class="dropdown-menu navbar-dropdown-menu">
                                        <a class="dropdown-item cursor-pointer" @click.prevent="openEditInput(children.pk)">Редактировать</a>
                                        <a class="dropdown-item cursor-pointer" data-bs-toggle="modal" :data-bs-target="`#deleteCommentModal${children.pk}`">Удалить</a>
                                    </ul>
                                </div>
                                <!-- modal delete -->
                                <div class="modal fade" :id="`deleteCommentModal${children.pk}`" tabindex="-1" aria-labelledby="deleteCommentModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5">Удаление</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body pb-2">
                                                Вы уверены, что хотите удалить комментарий?
                                                <div class="d-flex justify-content-end mt-2">
                                                    <button @click.prevent="deleteComment(children.pk)" type="button" class="btn btn-danger btn-sm me-2 px-3">Да</button>
                                                    <button type="button" class="btn btn-success btn-sm px-3" data-bs-dismiss="modal">Нет</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!children.is_deleted" :ref="el => commentDivRefs[children.pk] = el">
                            <div class="comment-body mt-2">
                                <nuxt-link :to="`/profile/${getReplyUserAndBody(children.body).user.slice(1)}`">{{getReplyUserAndBody(children.body).user}}</nuxt-link>
                                {{ getReplyUserAndBody(children.body).body }}<span
                                class='comment-ellipsis' v-if="sliceComment(children.body)[1]"
                                >...</span><span
                                class="d-none comment-continuation">{{sliceComment(children.body)[1]}}</span>
                            </div>
                            <div v-if="sliceComment(children.body)[1]" @click="showNextText(children.pk)" class="comment-continue">читать далее</div>
                        </div>
                        <!-- edit -->
                        <div v-if="!children.is_deleted" :ref="el => editCommentRefs[children.pk] = el" style="display: none">
                            <textarea
                                @input="() => autoExpandTextarea(children.pk, edit=true)"
                                class="reply-comment form-control mt-2" rows="1"
                                :value="children.body"></textarea>
                        
                            <div class="d-flex justify-content-end mt-2">
                                <button @click.prevent=closeEditInput(children.pk) type="submit" class="btn btn-hidden btn-xs me-2">Отмена</button>
                                <button @click.prevent='editComment(children.pk)' type="submit" class="btn btn-xs">Ответить</button>
                            </div>
                        </div>
                        <div class="comment-rating mt-2">
                            <span :class="`comment-rating-${children.rating<0?'negative':'positive'} comment-rating-${Math.min(Math.abs(children.rating), 5)}`">{{ children.rating }}</span>
                            <img @click="makeLike(children.pk, children.your_reaction, parentPk=children.parent)" src="/imgs/gray-like.png" :class="`comment-icon ms-2 me-2 ${children.your_reaction==1?'comment-icon-selected':''}`" alt="">
                            <img @click="makeDislike(children.pk, children.your_reaction, parentPk=children.parent)" src="/imgs/gray-dislike.png" :class="`comment-icon ms-2 me-2 ${children.your_reaction==0?'comment-icon-selected':''}`" alt="">
                        </div>
                        <!-- reply -->
                        <div :ref="el => replyCommentRefs[children.pk] = el" style="display: none">
                            <textarea
                                @input=autoExpandTextarea(children.pk)
                                class="reply-comment form-control mt-2"
                                placeholder="Введите ответ" rows="1"></textarea>
                        
                            <div class="d-flex justify-content-end mt-2">
                                <button @click.prevent=closeReplyInput(children.pk) type="submit" class="btn btn-hidden btn-xs me-2">Отмена</button>
                                <button @click.prevent='replyComment(children.pk, children.author.username)' type="submit" class="btn btn-xs">Ответить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <button type="submit" class="btn btn-primary w-100 py-0 mt-4">Загрузить еще</button>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { getPastTime } from '~/assets/js/pretty_time'
const { token } = useAuth()
const runtimeConfig = useRuntimeConfig()
const api = runtimeConfig.public.api

const props = defineProps({
    slug: String,
    content_type: String,
    title: Object,
})
const content_type = props.content_type

/* FETCH COMMENTS */

const comments = ref([])
const commentStatus = ref('')
async function fetchComments() {
    const slug = props.slug
    const query = {content_type: content_type}
    const options = {
        headers: {Authorization: token.value},
        query: query
    }
    const response = await useFetch(`${api}/comments/${slug}`, options)
    comments.value = response.data.value
    commentStatus.value = response.status.value
}

fetchComments()

/* POST COMMENTS */
const commentBody = ref('')
const object_id = props.title ? props.title.pk : undefined
async function postComment(body=false) {
    try {
        // check if post not from reply
        if (!body) {
            body = {
                content_type: content_type,
                object_id: object_id,
                body: commentBody.value
            }
        }

        const text = body.body
        const response = await useFetch(`${api}/comment/`, {
            method: 'post',
            headers: {Authorization: token.value},
            body: body
        })
        fetchComments() // update comments
        commentBody.value = '' // clear input field
        return response
    } catch(err) {
        console.log(err)
        console.log('---------------')
        console.log(err.response)
    }
}

// REPLY
// ref on div which contains textarea. key is comment.pk
const replyCommentRefs = ref({})

function openReplyInput(pk) {
    const container = replyCommentRefs.value[pk]

    // close reply if it's already opened
    if (container.dataset.replyIsOpen == 'true') {
        closeReplyInput(pk)
        return
    }

    // close all other opened replies
    for (let key in replyCommentRefs.value) {
        const reply = replyCommentRefs.value[key]
        if (reply.dataset.replyIsOpen == 'true') {
            closeReplyInput(key)
        }
    }

    container.style.display = 'Block'
    container.dataset.replyIsOpen = 'true'
}
function closeReplyInput(pk) {
    const container = replyCommentRefs.value[pk]
    container.style.display = 'None'
    container.dataset.replyIsOpen = 'false'
}

function autoExpandTextarea(pk, edit=false){
    let container
    if (!edit) {
        container = replyCommentRefs.value[pk]
    } else {
        container = editCommentRefs.value[pk]
    }
    const textarea = container.querySelector('textarea')
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

async function replyComment(parent_pk, parent_username) {
    const textarea = replyCommentRefs.value[parent_pk].querySelector('textarea')
    let body = textarea.value
    // if (body == '') {
    //     console.log('body не может быть пустым')
    //     return
    // }
    body = '@' + parent_username + ', ' + body

    const response = await postComment({
        content_type: content_type,
        object_id: object_id,
        body: body,
        parent: parent_pk
    })
    if (response.status.value == 'success') {
        textarea.value = ''
        closeReplyInput(parent_pk)
    }
}

function getReplyUserAndBody(text) {
    text = sliceComment(text)[0]
    let user = ''
    let clear_text = text

    if (text[0] == '@'){
        user = text.slice(0, text.indexOf(','))
        clear_text = text.slice(text.indexOf(','))
    }

    return {body: clear_text, user: user}
}


// READ NEXT PART OF A COMMENT
const commentDivRefs = ref({})
function showNextText(commentPk) {
    const commentDiv = commentDivRefs.value[commentPk]
    const commentContinuation = commentDiv.querySelector('.comment-continuation')
    const commentContinue = commentDiv.querySelector('.comment-continue')
    const commentEllipsis = commentDiv.querySelector('.comment-ellipsis')

    commentContinuation.classList.replace('d-none', 'd-inline') // show second part of the comment
    commentContinue.classList.add('d-none') // hide 'читать далее' button
    commentEllipsis.classList.add('d-none')
}

function sliceComment(text){
    let textArray = []
    textArray[0] = text.slice(0, 300)
    textArray[1] = text.slice(300)
    textArray[0] = textArray[0]
    return textArray
}


// REACTION
function makeLike(id, current_reaction, parentPk=undefined){
    makeReaction(id, 1, current_reaction, parentPk)
}
function makeDislike(id, current_reaction, parentPk=undefined){
    makeReaction(id, 0, current_reaction, parentPk)
}
async function makeReaction(id, status, current_reaction, parentPk){
    try {
        if (current_reaction==status) {
            status = -1
        }
        const response = await useFetch(`${api}/react-comment/${id}/`, {
            method: 'patch',
            headers: {Authorization: token.value},
            body: {
                'status': status
            }
        })
        // get new comment data
        const updatedCommentResponse = await useFetch(`${api}/comment/${id}/`, {
            headers: {Authorization: token.value}
        })
        // take rating and your_reaction field from the comment
        const updatedComment = updatedCommentResponse.data.value
        const rating = updatedComment.rating
        const your_reaction = updatedComment.your_reaction
        
        // seek current comment
        let currentCommentIndex = comments.value.results.map(el => el.pk).indexOf(id)
        let commentsArray = comments.value.results
        // if current comment is a child
        if (parentPk) {
            // seek one more time in parent's comments
            let currentParentIndex = comments.value.results.map(el => el.pk).indexOf(parentPk)
            commentsArray = comments.value.results[currentParentIndex].children
            currentCommentIndex = commentsArray.map(el => el.pk).indexOf(id)
        }
        // update rating and your_reaction fields of current comment
        commentsArray[currentCommentIndex].rating = rating
        commentsArray[currentCommentIndex].your_reaction = your_reaction
    } catch(err) {
        console.log(err.response)
    }
}

/* EDITING */
const editCommentRefs = ref({})
function openEditInput(pk) {
    const container = editCommentRefs.value[pk]
    const commentContainer = commentDivRefs.value[pk]

    // close edit if it's already opened
    if (container.dataset.editIsOpen == 'true') {
        closeEditInput(pk)
        return
    }

    // close all other opened edits
    for (let key in editCommentRefs.value) {
        const edit = editCommentRefs.value[key]
        if (edit.dataset.editIsOpen == 'true') {
            closeEditInput(key)
        }
    }

    // resize and show textarea
    nextTick(() => {
        autoExpandTextarea(pk, true);
    });
    container.style.display = 'Block'
    container.dataset.editIsOpen = 'true'
    commentContainer.style.display = 'None'
}

function closeEditInput(pk) {
    const container = editCommentRefs.value[pk]
    const commentContainer = commentDivRefs.value[pk]
    container.style.display = 'None'
    container.dataset.editIsOpen = 'false'
    commentContainer.style.display = 'Block'
}

async function editComment(pk) {
    const textarea = editCommentRefs.value[pk].querySelector('textarea')
    let body = textarea.value
    try {
        const response = await useFetch(`${api}/comment/${pk}/`, {
            method: 'patch',
            headers: {Authorization: token.value},
            body: {
                body: body
            }
        })
        if (response.status.value == 'success') {
            closeEditInput(pk)
        }
        fetchComments() // update comments
    } catch(err){
        console.log(err.response)
    }
}


/* DELETING */
async function deleteComment(pk) {
    try {
        const response = await useFetch(`${api}/comment/${pk}/`, {
            method: 'delete',
            headers: {Authorization: token.value},
        })

        if (response.status.value == 'success') {
        }
        
        nextTick(() => {
            const modalCommentDelete = new bootstrap.Modal(`#deleteCommentModal${pk}`)
            console.log(modalCommentDelete)
            modalCommentDelete.hide()
            fetchComments() // update comments
        })
    } catch(err){
        console.log(err.response)
    }
}
</script>

<style scoped>

</style>