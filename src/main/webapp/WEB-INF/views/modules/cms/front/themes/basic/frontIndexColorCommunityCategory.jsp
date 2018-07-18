<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>首页</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="JeeSite ${site.description}" />
	<meta name="keywords" content="JeeSite ${site.keywords}" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/colorCommunity/css/llui.css" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/colorCommunity/css/newyczbs.css" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/colorCommunity/css/reset.css" />
	<style type="text/css">
		.wrapper {
			position: relative;
			min-width: 1200px;
			height: 100%;
			min-height: 700px;
			background-image: url(${ctxStatic}/colorCommunity/img/home_title.png), url(${ctxStatic}/colorCommunity/img/home_slogan.png), url(${ctxStatic}/colorCommunity/img/home_bg.png);
			background-repeat: no-repeat;
			background-size: auto 140px, 110px auto, cover;
			background-position: 20px 40px, 108px 185px, 0 0;
			overflow: hidden;
		}
		.rect-top {
			position: absolute;
			width: 40%;
			bottom: 50px;
			left: 50px;
		}
		
		.time-div {
			width: 250px;
			font-size: 50px;
			color: #4D6794;
			height: 80px;
		}
		
		.date-div {
			width: 400px;
			font-size: 35px;
			color: #4D6794;
			height: 80px;
			font-weight: lighter;
			
		}
		
		.rect-box {
			position: absolute;
			top: 50%;
			/*right: 18%;*/
			right: 12%;
			margin-top: -256px;
		}
		
		.rect-box .rect {
			white-space: nowrap;
		}
		
		.rect-box .rect img {
			height: 250px;
			margin: 0 40px;
		}
	</style>
</head>
<body>
    <%-- <div class="row">
      <div class="span4">
		<ul>
   			<c:forEach items="${fnc:getMainNavList(site.id)}" var="category">
	   				<li class=""><a href="${category.url}" target="${category.target}"><span>${category.name}</span></a></li>
    		</c:forEach> 
		
    	</ul>
      </div>
    </div>--%>
    		<div class="wrapper">
			<div class="rect-top">
				<p id="timeDate" class="time-div"></p>
				<p id="timeDateAll" class="date-div"></p>
			</div>
			<div class="rect-box">
			<c:set var="categorys" value="${fnc:getMainNavList(site.id)}"></c:set>
				<div class="rect">
					<a href="${categorys[0].url}" target="${category.target}">
						<img src="${ctxStatic}/colorCommunity/img/home_shequjianjie.png" />
					</a>
					<a href="${categorys[1].url}" target="${category.target}">
						<img src="${ctxStatic}/colorCommunity/img/home_dangyuanzhijia.png" />
					</a>
					<a href="${categorys[2].url}" target="${category.target}">
						<img src="${ctxStatic}/colorCommunity/img/home_banshizhinan.png" />
					</a>
				</div>
				<div class="rect">
					<a href="${categorys[3].url}" target="${category.target}">
						<img src="${ctxStatic}/colorCommunity/img/home_shequhuodong.png" />
					</a>
					<a href="${categorys[4].url}" target="${category.target}">
						<img src="${ctxStatic}/colorCommunity/img/home_juminzizhi.png" />
					</a>
					<a href="${categorys[5].url}" target="${category.target}">
						<img src="${ctxStatic}/colorCommunity/img/home_wanggehua.png" />
					</a>
				</div>
			</div>
		</div>
</body>
		<script src="${ctxStatic}/colorCommunity/js/jquery-2.1.1.min.js"></script>
		<script src="${ctxStatic}/colorCommunity/js/llui-jquery.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				//定义一个函数，用于获取时间
				//创建一个日期对象
				var dd = new Date();
				//获取当前时间的年月日时分秒
				var year = dd.getFullYear(); //获取当前年
				var month = dd.getMonth() + 1; //获取当前月 必须加1 因为getMonth()的取值范围是1-11
				var date = dd.getDate(); //获取当天日
				var day = dd.getDay(); //获取当前天
				var hour = dd.getHours(); //获取当前时
				var minute = dd.getMinutes(); //获取当前分
				var second = dd.getSeconds(); //获取当前秒
				//规范秒的输出 如果是前0-9秒，则自动补零
				minute = (minute < 10) ? "0" + minute : minute;
				second = (second < 10) ? "0" + second : second;
				//拼装日期
				var dayChinese = "天";
				if(day == "1") {
					dayChinese = "一";
				}
				if(day == "2") {
					dayChinese = "二";
				}
				if(day == "3") {
					dayChinese = "三";
				}
				if(day == "4") {
					dayChinese = "四";
				}
				if(day == "5") {
					dayChinese = "五";;
				}
				if(day == "6") {
					dayChinese = "六";
				}
				if(day == "0") {
					dayChinese = "日";
				}
				
				var dates = hour + " : " + minute;
				window.setTimeout(dates,1000);//动态更新时间
				var fulldate = year + "/" + month + "/" + date + "  " + "周" + dayChinese; 
				$("#timeDate").html(dates);
				$("#timeDateAll").html(fulldate);
			});			
		</script>
</html>