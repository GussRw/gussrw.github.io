<template>
	<funny-resume v-if="funny" :cv="cv" :links="links" @navigate="navigate" />
	<main v-else id="cv" class="mx-auto max-w-4xl bg-white px-10 py-8 text-sm leading-relaxed">
		<contact-details :cv="cv" :links="links" @navigate="navigate" />
		<work-experience :cv="cv" class="mt-5" />
		<other-projects :cv="cv" class="mt-5 print:mt-0 print:break-before-page" />
		<skills-section :cv="cv" class="mt-5" />
		<education-section :cv="cv" class="mt-5" />
	</main>
</template>
<script setup>
import ContactDetails from "@/components/ContactDetails.vue";
import WorkExperience from "@/components/WorkExperience.vue";
import SkillsSection from "@/components/SkillsSection.vue";
import OtherProjects from "@/components/OtherProjects.vue";
import EducationSection from "@/components/EducationSection.vue";
import FunnyResume from "@/components/FunnyResume.vue";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import {computed, onMounted, onUnmounted, ref, watchEffect} from "vue";
import {useI18n} from "vue3-i18n";

// The path picks the language and mode: /es is Spanish, / and /en are English, a trailing /funny is the game version
const parseRoute = () => {
    const segments = window.location.pathname.split('/').filter(Boolean);
    return {lang: segments[0] === 'es' ? 'es' : 'en', funny: segments.includes('funny')};
};
const pathFor = (lang, funny) => `/${lang}${funny ? '/funny' : ''}`;

const route = ref(parseRoute());
const locale = computed(() => route.value.lang);
const funny = computed(() => route.value.funny);
const i18n = useI18n();
const cv = computed(() => (locale.value === 'es' ? es : en));
const links = computed(() => ({
    language: pathFor(locale.value === 'es' ? 'en' : 'es', funny.value),
    mode: pathFor(locale.value, !funny.value),
}));

watchEffect(() => {
    document.documentElement.lang = locale.value;
    i18n.setLocale(locale.value);
});

const navigate = path => {
    const modeChanged = path.endsWith('/funny') !== funny.value;
    window.history.pushState({}, '', path);
    route.value = parseRoute();
    if (modeChanged) window.scrollTo(0, 0);
}

// Keep the page in sync with the browser's back/forward buttons
const onPopState = () => (route.value = parseRoute());
onMounted(() => window.addEventListener('popstate', onPopState));
onUnmounted(() => window.removeEventListener('popstate', onPopState));
</script>
<style>
body {
    background-color: #f3f4f6;
}

.section-title {
    font-size: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #111827;
    border-bottom: 1px solid #9ca3af;
    padding-bottom: 0.125rem;
}

@page {
    size: letter;
    margin: 0.5in;
}

@media print {
    html {
        font-size: 12px;
    }

    body {
        background-color: #fff;
    }

    #cv {
        max-width: none;
        padding: 0;
    }

    #language-link {
        display: none;
    }

    section {
        break-inside: auto;
    }

    li, h3, h4 {
        break-inside: avoid;
    }
}
</style>
