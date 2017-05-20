<template>
	<div id="messages">
		
		<ul v-for="message in messages">
			<p>{{message}}</p>
		</ul>	
		
	 
    
	</div>
</template>

<script>
	
	export default {
		props: ['messages']

	}
</script>


<style>
	
</style>