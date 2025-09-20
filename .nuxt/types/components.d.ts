
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)

interface _GlobalComponents {
      'BestSellers': typeof import("../../components/BestSellers.vue")['default']
    'Breadcrumb': typeof import("../../components/Breadcrumb.vue")['default']
    'ChatBot': typeof import("../../components/ChatBot.vue")['default']
    'ChatBotNotification': typeof import("../../components/ChatBotNotification.vue")['default']
    'Commitments': typeof import("../../components/Commitments.vue")['default']
    'DepartmentsSidebar': typeof import("../../components/DepartmentsSidebar.vue")['default']
    'FeaturedProducts': typeof import("../../components/FeaturedProducts.vue")['default']
    'FilterSidebar': typeof import("../../components/FilterSidebar.vue")['default']
    'Footer': typeof import("../../components/Footer.vue")['default']
    'FruitAndHealth': typeof import("../../components/FruitAndHealth.vue")['default']
    'GiftBasketCard': typeof import("../../components/GiftBasketCard.vue")['default']
    'GiftBaskets': typeof import("../../components/GiftBaskets.vue")['default']
    'Header': typeof import("../../components/Header.vue")['default']
    'HeroBanner': typeof import("../../components/HeroBanner.vue")['default']
    'ProductCard': typeof import("../../components/ProductCard.vue")['default']
    'SuperOffer': typeof import("../../components/SuperOffer.vue")['default']
    'SupportButtons': typeof import("../../components/SupportButtons.vue")['default']
    'Toast': typeof import("../../components/Toast.vue")['default']
    'ToastContainer': typeof import("../../components/ToastContainer.vue")['default']
    'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyBestSellers': LazyComponent<typeof import("../../components/BestSellers.vue")['default']>
    'LazyBreadcrumb': LazyComponent<typeof import("../../components/Breadcrumb.vue")['default']>
    'LazyChatBot': LazyComponent<typeof import("../../components/ChatBot.vue")['default']>
    'LazyChatBotNotification': LazyComponent<typeof import("../../components/ChatBotNotification.vue")['default']>
    'LazyCommitments': LazyComponent<typeof import("../../components/Commitments.vue")['default']>
    'LazyDepartmentsSidebar': LazyComponent<typeof import("../../components/DepartmentsSidebar.vue")['default']>
    'LazyFeaturedProducts': LazyComponent<typeof import("../../components/FeaturedProducts.vue")['default']>
    'LazyFilterSidebar': LazyComponent<typeof import("../../components/FilterSidebar.vue")['default']>
    'LazyFooter': LazyComponent<typeof import("../../components/Footer.vue")['default']>
    'LazyFruitAndHealth': LazyComponent<typeof import("../../components/FruitAndHealth.vue")['default']>
    'LazyGiftBasketCard': LazyComponent<typeof import("../../components/GiftBasketCard.vue")['default']>
    'LazyGiftBaskets': LazyComponent<typeof import("../../components/GiftBaskets.vue")['default']>
    'LazyHeader': LazyComponent<typeof import("../../components/Header.vue")['default']>
    'LazyHeroBanner': LazyComponent<typeof import("../../components/HeroBanner.vue")['default']>
    'LazyProductCard': LazyComponent<typeof import("../../components/ProductCard.vue")['default']>
    'LazySuperOffer': LazyComponent<typeof import("../../components/SuperOffer.vue")['default']>
    'LazySupportButtons': LazyComponent<typeof import("../../components/SupportButtons.vue")['default']>
    'LazyToast': LazyComponent<typeof import("../../components/Toast.vue")['default']>
    'LazyToastContainer': LazyComponent<typeof import("../../components/ToastContainer.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
