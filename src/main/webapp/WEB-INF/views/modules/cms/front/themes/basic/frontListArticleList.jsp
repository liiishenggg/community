<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>${category.name}</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${category.description}" />
	<meta name="keywords" content="${category.keywords}" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/colorCommunity/css/reset.css" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/colorCommunity/css/newyczbs.css" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/colorCommunity/css/llui.css" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/bootstrap/2.3.1/awesome/font-awesome.min.css" />
	<style type="text/css">
		.swap-index {
			min-width: 1000px;
			height: 100%;
			position: relative;
			-moz-user-select: none;
			-ms-user-select: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			cursor: default;
			overflow: hidden;
		}
		/*********头部开始***********/
			
		.swap-index .head-title {
			width: 100%;
			height: 100px;
			position: absolute;
			top: 0;
			overflow: hidden;
			background: url("${ctxStatic}/colorCommunity/img/nav_bg.png") no-repeat center center/100% 100%;
				
		}
			
		.swap-index .head-title .head-left {
			width: 50%;
			float: left;
		}
			
		.swap-index .head-title .head-right {
			width: 50%;
			float: right;
			text-align: right;
		}
			
		.nav-img {
			width: 500px;
			height: 100px;
		}
		
		/*********头部结束***********/
		.center-cotent {
			position: absolute;
			top: 100px;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: #F1F2F5;
			
		}
			
		.clearfix:after {
			content: "." ;
			display: block ;
			height: 0 ;
			clear: both ;
			visibility: hidden ;
		}
			
		.menus {
			float: left;
			width: 220px;
			padding: 10px;
			overflow: hidden;
			box-sizing: border-box;
			
		}
		
		.menu-div {
			width: 200px;
			height: 100%;
			min-height: 200px;
			background: white;
			top: 20px;
		}
		
		.menu-list li {
			margin: 10px 0;
			overflow: hidden;
			text-indent: 1em;
			font-size: 13px;
			line-height: 40px;
			cursor: pointer;
		}
		
		.menu-list li.active {
			background-color: #E3F2FD;
		}
		
		.graph_0 {
			display: inline-block;
			vertical-align: middle;
			width: 7px;
			height: 20px;
			border-radius: 1px;
			margin-right: 3%;
			background: #2196F3;	
		}
		
		.graph_1 {
			display: inline-block;
			vertical-align: middle;
			width: 7px;
			height: 20px;
			border-radius: 1px;
			margin-right: 3%;
			background: #FFEB3B;	
		}
		
		.graph_2 {
			display: inline-block;
			vertical-align: middle;
			width: 7px;
			height: 20px;
			border-radius: 1px;
			margin-right: 3%;
			background: #01CD74;	
		}
		
		.graph_3 {
			display: inline-block;
			vertical-align: middle;
			width: 7px;
			height: 20px;
			border-radius: 1px;
			margin-right: 3%;
			background: #F44336;	
		}
		
		.cotent-div {
			position: relative;
			height: 100%;
			margin-left: 220px;
			overflow: hidden;
		}
		
		.article .header {
			position: absolute;
			top: 0;
			bottom: 60px;
			width: 100%;
			padding: 10px 0 0 10px;
			box-sizing: border-box;
		}
		
		 .header .content {
			position: relative;
			height: 100%;
		}
		

		.iframes {
			position: absolute;
			top: 10px;
			bottom: 0;
			width: 99%;
			background: white;
			min-height: 500px;
			height: 90%;
		}
		
			
	</style>
</head>
<body>
	<div class="swap-index">
			<div class="head-title">
				<div class="head-left">
					<img src="${ctxStatic}/colorCommunity/img/nav_left.png" class="nav-img" />
				</div>
				<div class="head-right">
					<img src="${ctxStatic}/colorCommunity/img/nav_right.png" class="nav-img" />
				</div>
			</div>
			<div class="center-cotent clearfix">
				<div class="menus">
					<button type="button" id="return" class="btn reset-btn reset">返回主页</button>
					<div class="menu-div">
						<ul id="oUl" class="menu-list">
						<c:set var="i" value="0"/>
						  <c:if test="${category.module eq 'article'}">
							<c:forEach items="${page.list}" var="article">
								<li onclick="testdata('社区周边')">
									<span class="graph_${i} }"></span>
									<span style="vertical-align: middle;">${fns:abbr(article.title,96)}</span>
								</li>
								<c:set var="i" value="${i+1}"/>
							</c:forEach>
						  </c:if>
						</ul>
					</div>
				</div>
				<div class="cotent-div">
					<div class="header">
						<div class="content">
							<div id="iframes" class="iframes">
							<c:set var="i" value="0"/>
							  <c:if test="${category.module eq 'article'}">
							  	<c:forEach items="${page.list}" var="article">
									<div class="theDiv" id="oDiv${i}" style="display:none;"><iframe id="content_iframe_right" width="100%" height="500" src="${article.url}" frameborder="0"></iframe></div>
									<c:set var="i" value="${i+1}"/>
								</c:forEach>
							  </c:if>
							</div>
						</div>
					</div>
				</div>
			</div>
</body>
	<script type="text/javascript" src="${ctxStatic}/colorCommunity/js/jquery-2.1.1.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="${ctxStatic}/colorCommunity/js/llui-jquery.js" charset="utf-8"></script>
	<script type="text/javascript">
		//切换菜单颜色
		$('.menu-list').children('li').on('click', function(e) {
			$(this).addClass("active").siblings().removeClass("active");
	    })
		
		$("#return").click(function(){
			history.go(-1);
		})
		
		function testdata(obj){
			document.getElementById('iframes').innerHTML=obj;
		}
		
		
		var fbUls =document.getElementById("oUl");
		var fbLis = fbUls.getElementsByTagName("li");
		var aDivs = document.getElementsByClassName("theDiv");
		for(var i = 0,val=fbLis.length;i<val;i++){
		    fbLis[i].index = i; //存放当前元素的下标
		    fbLis[i].onclick = function(){
		        for(var j=0; j< fbLis.length; j++){
		            fbLis[j].className=" ";
		            aDivs[j].style.display = "none";
		        }
		        //给当前点击的元素添加活跃标记
		        this.className="liactive";
		        //显示对应的模块内容
		        aDivs[this.index].style.display = "block";
		    };
		}
	</script>
</html>