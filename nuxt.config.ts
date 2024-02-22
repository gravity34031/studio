// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

  
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/styles/bootstrap.scss', '~/assets/styles/main.css', '~/assets/styles/font.css'],

    // plugins: [
    //     {src: '~/plugins/slider.client.js', mode: 'client'}
    // ],

    runtimeConfig: {
        // Keys within public are also exposed client-side
        public: {
          api: 'http://127.0.0.1:8000/api/v1', // WILL BE TAKEN FROM ENV
        }
    },


    modules: ['@sidebase/nuxt-auth'],
    auth: {
        baseURL: `${process.env.NUXT_PUBLIC_API}`,
        provider: {
            type: 'local',
            endpoints: {
                signIn: { path: '/auth/token-based/login/', method: 'post' },
                signOut: { path: '/auth/token-based/logout/', method: 'post' },
                signUp: { path: '/register/', method: 'post' },
                getSession: { path: '/profile', method: 'get' }
            },
            /**
             * Pages that `nuxt-auth` needs to know the location off for redirects.
             */
            // pages: {
            // // Path of the login-page that the user should be redirected to, when they try to access a protected page without being logged in.
            // login: '/login' // default
            // },
            /**
             * Settings for the authentication-token that `nuxt-auth` receives from the `signIn` endpoint and that can be used to authenticate subsequent requests.
             */
            token: {
            /**
             * How to extract the authentication-token from the sign-in response.
             *
             * E.g., setting this to `/token/bearer` and returning an object like `{ token: { bearer: 'THE_AUTH_TOKEN' }, timestamp: '2023' }` from the `signIn` endpoint will
             * result in `nuxt-auth` extracting and storing `THE_AUTH_TOKEN`.
            **/
            signInResponseTokenPointer: '/token',
            // Header type to be used in requests. This in combination with `headerName` is used to construct the final authentication-header `nuxt-auth` uses, e.g, for requests via `getSession`.
            type: 'Token',
            // Header name to be used in requests that need to be authenticated, e.g., to be used in the `getSession` request.
            headerName: 'Authorization', // default value
            /**
             * Maximum age to store the authentication token for. After the expiry time the token is automatically deleted on the application side, i.e., in the users' browser.
             *
             * Note: Your backend may reject / expire the token earlier / differently.
             */
            maxAgeInSeconds: 30*60*60,
            },
        }
    },


    app: {
        head: {
            script: [
                // {
                //     src: "/js/slider.js",
                //     // @ts-ignore
                //     body: true 
                // },
                {
                    src: "/js/main.js",
                    // @ts-ignore
                    body: true
                },
                {
                    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js",
                    integrity: "sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm",
                    crossorigin: "anonymous"
                }
            ]
        }
    }
})
