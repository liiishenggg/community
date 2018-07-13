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
	             <c:if test="${category.module eq 'article'}">
	            	 <c:set var="aList" value="${fnc:getArticleList(site.id, category.id, 5, '')}"/>
	  					<c:choose>
			             <c:when test="${aList!= null && fn:length(aList) == 1}">
				   			 <c:set var="article" value="${aList[0]}"/>
							 <li><a href="${ctx}/view-${article.category.id}-${article.id}${urlSuffix}" style="color:${article.color}">${fns:abbr(article.title,40)}</a></li>
						</c:when>
						<c:otherwise>
			   				<li class=""><a href="${category.url}" target="${category.target}"><span>${category.name}</span></a></li>
   						</c:otherwise>	
					</c:choose>
				</c:if>
				<c:if test="${category.module ne 'article'}">
	   				<li class=""><a href="${category.url}" target="${category.target}"><span>${category.name}</span></a></li>
				</c:if>
    		</c:forEach>
		
    	</ul>
      </div>
    </div>
</body>
</html>