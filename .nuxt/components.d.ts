
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


export const BestSellers: typeof import("../components/BestSellers.vue")['default']
export const Breadcrumb: typeof import("../components/Breadcrumb.vue")['default']
export const ChatBot: typeof import("../components/ChatBot.vue")['default']
export const ChatBotNotification: typeof import("../components/ChatBotNotification.vue")['default']
export const Commitments: typeof import("../components/Commitments.vue")['default']
export const DepartmentsSidebar: typeof import("../components/DepartmentsSidebar.vue")['default']
export const FeaturedProducts: typeof import("../components/FeaturedProducts.vue")['default']
export const FilterSidebar: typeof import("../components/FilterSidebar.vue")['default']
export const Footer: typeof import("../components/Footer.vue")['default']
export const FruitAndHealth: typeof import("../components/FruitAndHealth.vue")['default']
export const GiftBasketCard: typeof import("../components/GiftBasketCard.vue")['default']
export const GiftBaskets: typeof import("../components/GiftBaskets.vue")['default']
export const Header: typeof import("../components/Header.vue")['default']
export const HeroBanner: typeof import("../components/HeroBanner.vue")['default']
export const ProductCard: typeof import("../components/ProductCard.vue")['default']
export const SuperOffer: typeof import("../components/SuperOffer.vue")['default']
export const SupportButtons: typeof import("../components/SupportButtons.vue")['default']
export const Toast: typeof import("../components/Toast.vue")['default']
export const ToastContainer: typeof import("../components/ToastContainer.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyBestSellers: LazyComponent<typeof import("../components/BestSellers.vue")['default']>
export const LazyBreadcrumb: LazyComponent<typeof import("../components/Breadcrumb.vue")['default']>
export const LazyChatBot: LazyComponent<typeof import("../components/ChatBot.vue")['default']>
export const LazyChatBotNotification: LazyComponent<typeof import("../components/ChatBotNotification.vue")['default']>
export const LazyCommitments: LazyComponent<typeof import("../components/Commitments.vue")['default']>
export const LazyDepartmentsSidebar: LazyComponent<typeof import("../components/DepartmentsSidebar.vue")['default']>
export const LazyFeaturedProducts: LazyComponent<typeof import("../components/FeaturedProducts.vue")['default']>
export const LazyFilterSidebar: LazyComponent<typeof import("../components/FilterSidebar.vue")['default']>
export const LazyFooter: LazyComponent<typeof import("../components/Footer.vue")['default']>
export const LazyFruitAndHealth: LazyComponent<typeof import("../components/FruitAndHealth.vue")['default']>
export const LazyGiftBasketCard: LazyComponent<typeof import("../components/GiftBasketCard.vue")['default']>
export const LazyGiftBaskets: LazyComponent<typeof import("../components/GiftBaskets.vue")['default']>
export const LazyHeader: LazyComponent<typeof import("../components/Header.vue")['default']>
export const LazyHeroBanner: LazyComponent<typeof import("../components/HeroBanner.vue")['default']>
export const LazyProductCard: LazyComponent<typeof import("../components/ProductCard.vue")['default']>
export const LazySuperOffer: LazyComponent<typeof import("../components/SuperOffer.vue")['default']>
export const LazySupportButtons: LazyComponent<typeof import("../components/SupportButtons.vue")['default']>
export const LazyToast: LazyComponent<typeof import("../components/Toast.vue")['default']>
export const LazyToastContainer: LazyComponent<typeof import("../components/ToastContainer.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
