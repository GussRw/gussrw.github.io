<template>
	<section>
		<h2 class="section-title">{{ cv.sections.experience }}</h2>
		<div v-for="company in cv.experience" :key="company.company" class="mt-3">
			<div class="flex justify-between">
				<h3 class="font-bold text-gray-900">{{ company.company }}</h3>
				<span v-if="company.location" class="text-gray-600">{{ company.location }}</span>
			</div>
			<div v-for="role in company.roles" :key="role.position" class="mt-1">
				<div class="flex justify-between">
					<h4 class="font-semibold italic text-gray-800">{{ role.position }}</h4>
					<span class="text-gray-600">{{ role.dates }}</span>
				</div>
				<ul class="list-disc pl-5 mt-1 space-y-0.5 text-gray-800">
					<li v-for="bullet in role.bullets" :key="bullet">
						<metric-text :text="bullet" />
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
<script setup>
import MetricText from "@/components/MetricText.vue";

defineProps({
    cv: {type: Object, required: true},
});
</script>
