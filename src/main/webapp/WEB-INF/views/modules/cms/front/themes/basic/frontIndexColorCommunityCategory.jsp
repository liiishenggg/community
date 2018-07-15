<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>首页</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="JeeSite ${site.description}" />
	<meta name="keywords" content="JeeSite ${site.keywords}" />
</head>
<body>
    <div class="row">
      <div class="span4">
		<ul>
   			<c:forEach items="${fnc:getMainNavList(site.id)}" var="category">
	   				<li class=""><a href="${category.url}" target="${category.target}"><span>${category.name}</span></a></li>
    		</c:forEach>
		
    	</ul>
      </div>
    </div>
</body>
</html>