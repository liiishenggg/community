<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>${category.name}</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${category.description}" />
	<meta name="keywords" content="${category.keywords}" />
</head>
<body>
	<div class="row">
	   <div class="span2">
	       <div class="span10">
	       <c:set var="siteId" value="${fnc:getCurrentSiteId()}"/>
				<c:forEach items="${fnc:getComPartyList(siteId,10,'')}" var="com">
					<li style="margin: 0px; padding: 20px 0px; cursor: default; list-style: none; border-top: none; border-right: none; border-bottom: 1px solid rgb(221, 221, 221); border-left: none; border-image: initial; float: left; width: 820px; height: 155px; overflow: hidden;">
						<div class="leader_left" style="margin: 0px; padding: 0px; cursor: default; float: left; width: 117px; height: 156px;">
							<img src="${pageContext.request.contextPath}/userfiles/${com.image}" style="border-width: initial; border-style: none; list-style: none; display: block; width: 117px; height: 156px;" /></div>
						<div class="leader_right" style="margin: 0px; padding: 0px 10px 0px 23px; cursor: default; float: right; width: 670px;">
							<p style="margin: 0px; padding: 5px 0px; cursor: default; list-style: none; border: none; line-height: 34px; overflow: hidden;">
								<b style="display: inline-block; width: 100px;">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</b>${com.name}</p>
							<p style="margin: 0px; padding: 5px 0px; cursor: default; list-style: none; border: none; line-height: 34px; overflow: hidden;">
								<b style="display: inline-block; width: 100px;">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</b>${com.job}</p>
							<p style="margin: 0px; padding: 5px 0px; cursor: default; list-style: none; border: none; line-height: 34px; overflow: hidden; height: 58px;">
								<b style="display: inline-block; width: 100px;">分管工作：</b>${com.manageThings}。</p>
					</li>
				</c:forEach>
	  	  </div>
	   </div>
   </div>
   <div style="position:relative; float:right; right:100px; top:100px;">
	 <a href="#" onClick="javascript :history.back(-1);"><img src="${ctxStatic}/images/go-back.png" border="0" title="返回上一页"></a>
	<!-- <input id="btnCancel" class="btn" type="button" value="返 回" onclick="history.go(-1)"/> -->
</div>
</body>
</html>