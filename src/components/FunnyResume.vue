<template>
	<div class="arcade">
		<transition name="fade">
			<button v-if="!started" type="button" class="start-screen" @click="start">
				<span class="arcade-title text-2xl sm:text-4xl">Gustavo Peralta</span>
				<span class="blink arcade-text mt-8 text-lime-300">▶ {{ fun.pressStart }}</span>
				<span class="mt-3 text-sm text-slate-400">{{ fun.startHint }}</span>
			</button>
		</transition>

		<nav class="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-1 px-4 pt-4 text-sm">
			<a :href="links.mode" class="arcade-link" @click.prevent="$emit('navigate', links.mode)">◀ {{ fun.switchToSerious }}</a>
			<a :href="links.language" class="arcade-link" @click.prevent="$emit('navigate', links.language)">{{ cv.switchLanguage }}</a>
			<a :href="`/${cv.pdf.file}`" download class="arcade-link">{{ cv.pdf.label }}</a>
		</nav>

		<main class="mx-auto max-w-4xl space-y-6 px-4 py-6">
			<section v-reveal class="arcade-panel reveal">
				<p class="arcade-text text-pink-400">{{ fun.player }}</p>
				<h1 class="arcade-title mt-2 text-2xl sm:text-3xl">Gustavo Peralta</h1>
				<p class="mt-2 text-slate-300">
					{{ fun.class }}: <span class="text-lime-300">{{ cv.title }}</span>
					<span class="level-badge ml-2">{{ fun.level }}</span>
				</p>
				<p class="mt-3 text-slate-200"><metric-text :text="cv.summary" /></p>
				<div class="mt-4 grid gap-2 sm:grid-cols-2">
					<div v-for="stat in fun.stats" :key="stat.label">
						<div class="flex justify-between text-xs text-slate-400"><span>{{ stat.label }}</span><span>{{ stat.value }}/100</span></div>
						<div class="stat-track"><div class="stat-fill" :style="{'--value': `${stat.value}%`}" /></div>
					</div>
				</div>
				<p class="mt-4 text-sm text-slate-400">
					📧 <a href="mailto:gussrw1@gmail.com" class="arcade-link">gussrw1@gmail.com</a>
					· 🐙 <a href="https://github.com/GussRw" class="arcade-link">github.com/gussrw</a>
					· 💼 <a href="https://www.linkedin.com/in/gussrw" class="arcade-link">linkedin.com/in/gussrw</a>
					· 📍 {{ cv.location }}
				</p>
			</section>

			<bug-smasher v-reveal :game="fun.game" class="reveal" />

			<section v-reveal class="arcade-panel reveal">
				<h2 class="arcade-title">🗺️ {{ fun.questLog }}</h2>
				<article v-for="(level, i) in levels" :key="level.position" v-reveal class="quest reveal mt-4">
					<p class="arcade-text text-xs text-pink-400">{{ fun.levelLabel }} {{ levels.length - i }} · {{ level.dates }}</p>
					<h3 class="mt-1 text-lg font-bold text-lime-300">{{ level.position }} <span class="text-slate-300">@ {{ level.company }}</span></h3>
					<ul class="mt-2 space-y-1 text-slate-200">
						<li v-for="bullet in level.bullets" :key="bullet" class="quest-item"><metric-text :text="bullet" /></li>
					</ul>
				</article>
			</section>

			<section v-reveal class="arcade-panel reveal">
				<h2 class="arcade-title">🎮 {{ fun.achievements }}</h2>
				<p class="mt-1 text-sm text-slate-400">{{ fun.achievementHint }}</p>
				<div class="mt-3 grid gap-3 sm:grid-cols-2">
					<button v-for="project in cv.projects" :key="project.name" type="button" class="achievement" @click="celebrate">
						<span class="trophy">🏆</span>
						<span class="block font-bold text-yellow-300">{{ project.name }}</span>
						<span class="mt-1 block text-sm text-slate-300"><metric-text :text="project.description" /></span>
					</button>
				</div>
			</section>

			<section v-reveal class="arcade-panel reveal">
				<h2 class="arcade-title">🎒 {{ fun.inventory }}</h2>
				<div v-for="skill in cv.skills" :key="skill.category" class="mt-3">
					<p class="text-xs uppercase tracking-wider text-slate-400">{{ skill.category }}</p>
					<div class="mt-1 flex flex-wrap gap-2">
						<span v-for="(item, i) in skill.items.split(', ')" :key="item" class="item" :style="{'--delay': `${i * 0.15}s`}">{{ item }}</span>
					</div>
				</div>
			</section>

			<section v-reveal class="arcade-panel reveal">
				<h2 class="arcade-title">🥋 {{ fun.training }}</h2>
				<div v-for="degree in cv.education" :key="degree.degree" class="mt-3">
					<p class="font-bold text-lime-300">{{ degree.degree }}</p>
					<p class="text-sm text-slate-300">{{ degree.school }} · {{ degree.dates }}</p>
				</div>
				<h3 class="arcade-text mt-5 text-pink-400">🎖️ {{ fun.badges }}</h3>
				<div class="mt-2 flex flex-wrap gap-2">
					<span v-for="certification in cv.certifications" :key="certification" class="badge">{{ certification }}</span>
				</div>
				<h3 class="arcade-text mt-5 text-pink-400">💬 {{ fun.dialogue }}</h3>
				<ul class="mt-2 space-y-1 text-slate-200">
					<li v-for="language in cv.languages.split(', ')" :key="language">▸ {{ language }}</li>
				</ul>
			</section>

			<section v-reveal class="arcade-panel reveal text-center">
				<p class="arcade-text text-slate-200">{{ fun.ending }}</p>
				<a href="mailto:gussrw1@gmail.com" class="arcade-title mt-3 inline-block text-lg text-lime-300 hover:underline">gussrw1@gmail.com</a>
				<p class="mt-4"><a :href="links.mode" class="blink arcade-link arcade-text" @click.prevent="$emit('navigate', links.mode)">{{ fun.continue }}</a></p>
			</section>
		</main>
	</div>
</template>
<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import MetricText from "@/components/MetricText.vue";
import BugSmasher from "@/components/BugSmasher.vue";

const props = defineProps({
    cv: {type: Object, required: true},
    links: {type: Object, required: true},
});
defineEmits(['navigate']);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fun = computed(() => props.cv.funny);
const levels = computed(() => props.cv.experience.flatMap(company => company.roles.map(role => ({...role, company: company.company}))));

const started = ref(false);
const start = () => (started.value = true);
const onKey = () => start();
onMounted(() => window.addEventListener('keydown', onKey, {once: true}));
onUnmounted(() => window.removeEventListener('keydown', onKey));

// Slide sections in as they scroll into view
const vReveal = {
    mounted(el) {
        if (reducedMotion || !('IntersectionObserver' in window)) {
            el.classList.add('is-visible');
            return;
        }
        el._observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.add('is-visible');
                el._observer.disconnect();
            }
        }, {threshold: 0.15});
        el._observer.observe(el);
    },
    unmounted(el) {
        el._observer?.disconnect();
    },
};

// A small emoji confetti burst from wherever the trophy was clicked
const celebrate = event => {
    if (reducedMotion) return;
    const emojis = ['🎉', '✨', '⭐', '🚀', '🎊'];
    for (let i = 0; i < 14; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti';
        piece.textContent = emojis[i % emojis.length];
        piece.style.left = `${event.clientX}px`;
        piece.style.top = `${event.clientY}px`;
        piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 240}px`);
        piece.style.setProperty('--dy', `${-60 - Math.random() * 160}px`);
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 1000);
    }
};
</script>
<style>
.arcade {
    min-height: 100vh;
    background: radial-gradient(circle at top, #1e1b4b, #020617 70%);
    color: #e2e8f0;
    font-size: 0.95rem;
    line-height: 1.6;
}

.arcade-title {
    font-family: 'Press Start 2P', monospace;
    font-size: 1rem;
    line-height: 1.5;
    color: #f8fafc;
    text-shadow: 3px 3px 0 #db2777;
}

.arcade-text {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.7rem;
    line-height: 1.8;
}

.arcade-link {
    color: #67e8f9;
    text-decoration: underline;
}

.arcade-link:hover {
    color: #a5f3fc;
}

.arcade-panel {
    border: 2px solid #4338ca;
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.85);
    padding: 1.25rem;
    box-shadow: 0 0 0 4px #020617, 0 0 24px rgba(99, 102, 241, 0.35);
}

.arcade b {
    color: #fde047;
    font-weight: 700;
}

.start-screen {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #020617;
    text-align: center;
}

.blink {
    animation: blink 1s steps(2, start) infinite;
}

.level-badge {
    display: inline-block;
    padding: 0.1rem 0.5rem;
    border-radius: 0.25rem;
    background: #db2777;
    color: #fff;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.6rem;
}

.stat-track {
    height: 0.6rem;
    border-radius: 9999px;
    background: #1e293b;
    overflow: hidden;
}

.stat-fill {
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, #22d3ee, #a3e635);
    transition: width 1.2s ease-out 0.3s;
}

.is-visible .stat-fill {
    width: var(--value);
}

.quest {
    border-left: 4px solid #db2777;
    padding-left: 1rem;
}

.quest-item::before {
    content: '★ ';
    color: #facc15;
}

.achievement {
    position: relative;
    border: 2px solid #854d0e;
    border-radius: 0.5rem;
    background: #1c1917;
    padding: 0.75rem 0.75rem 0.75rem 3rem;
    text-align: left;
    transition: transform 0.2s, border-color 0.2s;
}

.achievement:hover {
    transform: translateY(-3px);
    border-color: #facc15;
}

.trophy {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    font-size: 1.5rem;
    transition: transform 0.3s;
}

.achievement:hover .trophy {
    transform: rotate(-15deg) scale(1.2);
}

.item {
    display: inline-block;
    border: 1px solid #0e7490;
    border-radius: 0.375rem;
    background: #083344;
    padding: 0.15rem 0.6rem;
    color: #a5f3fc;
    font-size: 0.85rem;
    animation: float 3s ease-in-out var(--delay) infinite;
}

.badge {
    border: 2px solid #a3e635;
    border-radius: 9999px;
    padding: 0.2rem 0.8rem;
    color: #d9f99d;
    font-size: 0.85rem;
}

.reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal.is-visible {
    opacity: 1;
    transform: none;
}

.confetti {
    position: fixed;
    z-index: 60;
    pointer-events: none;
    font-size: 1.25rem;
    animation: confetti 1s ease-out forwards;
}

.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-leave-to {
    opacity: 0;
}

@keyframes blink {
    to {
        visibility: hidden;
    }
}

@keyframes float {
    50% {
        transform: translateY(-3px);
    }
}

@keyframes confetti {
    to {
        transform: translate(var(--dx), var(--dy)) rotate(360deg);
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .blink, .item {
        animation: none;
    }

    .reveal, .stat-fill {
        transition: none;
    }
}
</style>
