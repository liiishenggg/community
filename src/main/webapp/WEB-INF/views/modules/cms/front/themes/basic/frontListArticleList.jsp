<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>${category.name}</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${category.description}" />
	<meta name="keywords" content="${category.keywords}" />
	 <style type="text/css">
        html, body
        {
            margin: 0px 0px;
            width: 100%;
            height: 100%;
        }
        iframe
        {
            margin: 0px 0px;
            width: 80%;
            height: 100%;
        }
    </style>
	<script type="text/javascript">
		setTimeout( function(){document.getElementsByTagName("a")[0].click();}, 100 );//延迟5000毫米
		function load(url){
		   document.getElementById("content_iframe_right").src=url;
	   }
   </script>
</head>
<body>
	<div class="row" style="float :left" width="20%">
	   <div class="span2">
	       <div class="span10">
			  <h4>${category.name}</h4>
			  <c:if test="${category.module eq 'article'}">
				<ul><c:forEach items="${page.list}" var="article">
					<li><a href="javascript:void(0)" onclick="load('${article.url}')"style="color:${article.color}">${fns:abbr(article.title,96)}</a></li>
				</c:forEach></ul>
			  </c:if>
			  <c:if test="${category.module eq 'link'}">
				<ul><c:forEach items="${page.list}" var="link">
					<li><a href="javascript:void(0)" onclick="load('${article.href}')"target="_blank" style="color:${link.color}"><c:out value="${link.title}" /></a></li>
				</c:forEach></ul>
			  </c:if>
	  	  </div>
	   </div>
   </div>
  <iframe id="content_iframe_right" style="float :right" src="" scrolling="no" frameborder="0"></iframe>
</body>
</html>