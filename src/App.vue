<template>
	<div id="app"><router-view /></div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {};
	},
	mounted() {
		//禁用右键（防止右键查看源代码）
		window.oncontextmenu = function() {
			return false;
		};
		window.addEventListener('keydown', function(e) {
			if (e.ctrlKey && e.keyCode == 123) {
				e.preventDefault();
				window.event.returnValue = false;
			}
		});
	}
};
</script>

<style>
@import url('./assets/css/public.css');
</style>
