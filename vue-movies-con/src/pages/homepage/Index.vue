<template>
	<div class="container">
		<div class="list-con">
			<h2>{{ title }}</h2>
			<div class="banner swiper-container" id="swiper-t250">
				<div class="swiper-wrapper">
	          		<div v-for="item in data_t250" class="swiper-slide" key="item.id" @mouseenter="transform_item($event, 0)" @mouseleave="transform_item($event, 1)">
	          			<a class="movie-link" :href="item.alt">
	              			<div class="defer-image image-ratio:25x36">
	              				<img :src="item.images.medium" alt="">
	              			</div>
	              			<div>{{ item.title }}</div>
	            		</a>
	          		</div>
	          	</div>
			</div>
		</div>
		<div class="modal-backdrop"></div>
	</div>
</template>

<script>	
	import $ from 'jquery'

	export default {
		name: 'homepage',
		data: function() {
			return {
				title: null,
				data_t250: null,
				swiper: {}
			}
		},
		created: function() {
			var that = this;
			this.axios.get('/data/api/movies/top250').then(function(res){
		        console.log(res.data);
		        that.$data.title = res.data.data[0].title;
		        that.$data.data_t250 = res.data.data[0].subjects;
		        var onlyOne = that.$data.data_t250.length == 1;
		        that.$nextTick(function() {
		        	that.$data.swiper = new Swiper("#swiper-t250", {
		                slidesOffsetBefore: 6,
                		spaceBetween: 10,
                		slidesPerView: 8.5,
		                onInit:function(){
		                }
		            })
		        });
			});
		}, 
		mounted() {
			//
		},
		methods: {
			transform_item: function(e, type) {
				// $(e.target).css('color', '#eee');
				// console.log(name+'&&'+type)
				// console.log(e.target)
				if(type == 0) {
					$(e.target).addClass('scale-plus');
				}else {
					$(e.target).addClass('scale-minus').removeClass('scale-plus');
				}
			}
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	@import '../../common/css/swiper.min.css';
	html, body {
		font-size: 62.5%;
		padding: 0;
		margin: 0;
		color: #333;
	}
	.container {
		padding: 1rem;
		//max-width: 1200px;
		margin: 0 auto;
		h2 {
			font-size: 2rem;
			text-indent: .5rem;
		}
	}
	.movie-link {
		display: block;
		text-decoration: none;
		text-align: center;
		font-size: 1.6rem;
		line-height: 3rem;
		color: #333;
		img {
			display: block;
			width: 100%;
		}
	}
	.defer-image {
		overflow: hidden;
		position: relative;
		img {
			position: absolute;
			top:0;
			left:0;
			display: block;
			max-width: 100%;
			min-height: 100%;
		}
	}
	.image-ratio\:25x36 { padding-top: 144%; }
	
	.scale-plus {
		animation: myscale_plus linear 0.5s 1;
		animation-fill-mode:forwards;
	}
	.scale-minus {
		transform: scale3d(1, 1, 1);
		-ms-transform: scale3d(1, 1, 1); 	
		-moz-transform: scale3d(1, 1, 1); 	
		-webkit-transform: scale3d(1, 1, 1); 
		-o-transform: scale3d(1, 1, 1);
	}
	@keyframes myscale_plus {
		from {
			transform: scale3d(1, 1, 1);
			-ms-transform: scale3d(1, 1, 1); 	
			-moz-transform: scale3d(1, 1, 1); 	
			-webkit-transform: scale3d(1, 1, 1); 
			-o-transform: scale3d(1, 1, 1);
		}
		to {
			transform: scale3d(1.1, 1.1, 1.1);
			-ms-transform: scale3d(1.1, 1.1, 1.1); 	
			-moz-transform: scale3d(1.1, 1.1, 1.1); 	
			-webkit-transform: scale3d(1.1, 1.1, 1.1); 
			-o-transform: scale3d(1.1, 1.1, 1.1); 	
		}
	}

	@-moz-keyframes myscale_plus /* Firefox */{
		from {
			transform: scale3d(1, 1, 1);
			-ms-transform: scale3d(1, 1, 1); 	
			-moz-transform: scale3d(1, 1, 1); 	
			-webkit-transform: scale3d(1, 1, 1); 
			-o-transform: scale3d(1, 1, 1);
		}
		to {
			transform: scale3d(1.1, 1.1, 1.1);
			-ms-transform: scale3d(1.1, 1.1, 1.1); 	
			-moz-transform: scale3d(1.1, 1.1, 1.1); 	
			-webkit-transform: scale3d(1.1, 1.1, 1.1); 
			-o-transform: scale3d(1.1, 1.1, 1.1); 	
		}
	}

	@-webkit-keyframes myscale_plus /* Safari 和 Chrome */{
		from {
			transform: scale3d(1, 1, 1);
			-ms-transform: scale3d(1, 1, 1); 	
			-moz-transform: scale3d(1, 1, 1); 	
			-webkit-transform: scale3d(1, 1, 1); 
			-o-transform: scale3d(1, 1, 1);
		}
		to {
			transform: scale3d(1.1, 1.1, 1.1);
			-ms-transform: scale3d(1.1, 1.1, 1.1); 	
			-moz-transform: scale3d(1.1, 1.1, 1.1); 	
			-webkit-transform: scale3d(1.1, 1.1, 1.1); 
			-o-transform: scale3d(1.1, 1.1, 1.1); 		
		}
	}

	@-o-keyframes myscale_plus /* Opera */{
		from {
			transform: scale3d(1, 1, 1);
			-ms-transform: scale3d(1, 1, 1); 	
			-moz-transform: scale3d(1, 1, 1); 	
			-webkit-transform: scale3d(1, 1, 1); 
			-o-transform: scale3d(1, 1, 1);
		}
		to {
			transform: scale3d(1.1, 1.1, 1.1);
			-ms-transform: scale3d(1.1, 1.1, 1.1); 	
			-moz-transform: scale3d(1.1, 1.1, 1.1); 	
			-webkit-transform: scale3d(1.1, 1.1, 1.1); 
			-o-transform: scale3d(1.1, 1.1, 1.1); 	
		}
	}
</style>


