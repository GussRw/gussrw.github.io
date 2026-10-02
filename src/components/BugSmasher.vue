<template>
	<section class="arcade-panel">
		<div class="flex flex-wrap items-baseline justify-between gap-2">
			<h2 class="arcade-title">{{ game.title }}</h2>
			<p class="arcade-text text-lime-300">{{ game.score }}: {{ score }}</p>
		</div>
		<p class="mt-1 text-sm text-slate-300">{{ game.hint }}</p>
		<div ref="field" class="bug-field mt-3">
			<button
				v-for="bug in bugs"
				:key="bug.id"
				type="button"
				class="bug"
				:class="{splat: bug.splat}"
				:style="{left: `${bug.x}%`, top: `${bug.y}%`, transform: `rotate(${bug.angle}deg)`}"
				:aria-label="game.title"
				@click="squash(bug)">
				{{ bug.splat ? '💥' : '🐛' }}
			</button>
			<transition name="pop">
				<p v-if="toast" class="toast">🏆 {{ game.win }}</p>
			</transition>
		</div>
	</section>
</template>
<script setup>
import {onMounted, onUnmounted, reactive, ref} from "vue";

defineProps({
    game: {type: Object, required: true},
});

const BUG_COUNT = 6;
const WIN_EVERY = 10;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const score = ref(0);
const toast = ref(false);
let nextId = 0;
let frame;
let toastTimer;

const spawn = () => {
    const angle = Math.random() * 360;
    const speed = reducedMotion ? 0 : 0.15 + Math.random() * 0.25;
    return {
        id: nextId++,
        x: 5 + Math.random() * 85,
        y: 10 + Math.random() * 75,
        vx: Math.cos(angle * Math.PI / 180) * speed,
        vy: Math.sin(angle * Math.PI / 180) * speed,
        angle: angle + 90,
        splat: false,
    };
};

const bugs = reactive(Array.from({length: BUG_COUNT}, spawn));

// Move each bug and bounce it off the edges of the field
const tick = () => {
    for (const bug of bugs) {
        if (bug.splat) continue;
        bug.x += bug.vx;
        bug.y += bug.vy;
        if (bug.x < 0 || bug.x > 92) bug.vx *= -1;
        if (bug.y < 0 || bug.y > 85) bug.vy *= -1;
        bug.angle = Math.atan2(bug.vy, bug.vx) * 180 / Math.PI + 90;
    }
    frame = requestAnimationFrame(tick);
};

const squash = bug => {
    if (bug.splat) return;
    bug.splat = true;
    score.value++;
    if (score.value % WIN_EVERY === 0) {
        toast.value = true;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => (toast.value = false), 2500);
    }
    setTimeout(() => bugs.splice(bugs.indexOf(bug), 1, spawn()), 400);
};

onMounted(() => {
    if (!reducedMotion) frame = requestAnimationFrame(tick);
});
onUnmounted(() => {
    cancelAnimationFrame(frame);
    clearTimeout(toastTimer);
});
</script>
<style scoped>
.bug-field {
    position: relative;
    height: 14rem;
    border: 2px dashed #334155;
    border-radius: 0.5rem;
    background: repeating-linear-gradient(0deg, #0f172a 0 23px, #111c33 23px 24px);
    overflow: hidden;
}

.bug {
    position: absolute;
    font-size: 1.75rem;
    line-height: 1;
    cursor: crosshair;
    transition: transform 0.1s linear;
}

.bug.splat {
    animation: splat 0.4s ease-out forwards;
}

.toast {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.75rem 1rem;
    border: 2px solid #facc15;
    border-radius: 0.5rem;
    background: #1e1b4b;
    color: #facc15;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.7rem;
    text-align: center;
    white-space: nowrap;
}

.pop-enter-active, .pop-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.pop-enter-from, .pop-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.6);
}

@keyframes splat {
    to {
        transform: scale(1.8);
        opacity: 0;
    }
}
</style>
