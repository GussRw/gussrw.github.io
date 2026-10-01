<template>
	<main id="cv" class="mx-auto max-w-4xl bg-white px-10 py-8 text-sm leading-relaxed">
		<contact-details :cv="cv" @change-lang="changeLang" />
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
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import {computed, ref} from "vue";
import {useI18n} from "vue3-i18n";

// ?lang=es|en wins over the saved choice, so links and the PDF generator can pick a language
const urlLang = new URLSearchParams(window.location.search).get('lang');
const locale = ref(['en', 'es'].includes(urlLang) ? urlLang : (localStorage.locale ?? 'en'));
const i18n = useI18n();
const cv = computed(() => (locale.value === 'es' ? es : en));

const changeLang = () => {
    locale.value = localStorage.locale = locale.value === 'es' ? 'en' : 'es';
    i18n.setLocale(locale.value);
}
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
