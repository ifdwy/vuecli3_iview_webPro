<style type="text/css">
	.login{
		height: 969px;
		background-image: url('../../public/img/bg.png');
	}
	.imgTittle{
		margin: 10% auto;
	}
	.loginBox{
		margin: -10% auto;
	}
	.loginDiv{
		width: 430px;
	    height: 405px;
	    /* border: 1px dashed #a9a7a7; */
	    position: relative;
	    margin: -400px 50%;
	}
	.loginContent{
		float: left;
		margin-left: 10px;
		margin-top: 80px;
		font-weight: 700;
    	font-size: 15px;
	}
	.iconImg, .loginDes{
		float: left;
		margin-bottom: 10px;
	}
	.submitBtn{
		margin-top: 20px;
		width: 350px;
		float: left;
	}
</style>
<template>
	<div class="login">
		<img src="../../public/img/bgTittle.png" class="imgTittle">
		<img src="../../public/img/loginBox.png" class="loginBox">
		<div class="loginDiv">
			<div class="loginContent">
				<Icon type="ios-cog-outline" size="20" class="iconImg"/>
				<span class="loginDes">用户登录Test</span>
				<Input v-model="account" style="width: 350px">
			        <span slot="prepend">账号:</span>
			    </Input>
			    <br>
			    <Input v-model="password" type="password" style="width: 350px">
			        <span slot="prepend">密码:</span>
			    </Input>
			    <Button type="primary" @click="submit" class="submitBtn">登录</Button>
			</div>
			
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{	
		data(){
			return{
				account:'',
				password:''
			}
		},
		methods:{
			submit(){
				let data={
					account: this.account,
					password: this.password
					// ,
					// appId: "0",
					// expand: "didi",
					// remember: "off",
					// redirectUrl: "/login"
				}
				console.log("data=============>", data)

				this.$router.push("/index").catch(err =>{err})
				
				// this.$http.post("/ssoLoginApi/dca/sps/doAuth", data).then((login)=>{
				// 	console.log("login==========>", login)
				// })
			}
		}

	}
</script>