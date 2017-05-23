<template>
	<div id="messages">
		
		<div id="messages" v-for="message in messages">
			<p id="from">{{message.from}} </p>
			<p id="text">{{message.text}}</p>
			
		
			<p id="time">{{message.createdAt}}</p>
			
			
		</div>	
		
	 
    
	</div>
</template>

<script>
	
	export default {
		props: ['messages']

	}
</script>


<style>
	#messages p {
		color: #262626;
		

	}
	#messages {
		width: 290px;
		margin-left: 20px;
    padding: 0;
    
    
    
	}
	


	#from {
		font-weight: 400;
		font-size: 16px;
		display: inline-block;
    
		
	}
	#text {
		font-weight: 400;
		font-size: 12px;
		
		
		display: inline-block;
    
		word-wrap: break-word;
    word-break: break-word;
	}

#time {
	font-weight: 300;
	font-size: 10px;
	
}
</style>