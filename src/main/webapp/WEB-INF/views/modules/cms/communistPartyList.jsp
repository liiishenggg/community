<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>党组织生成管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			
		});
		function page(n,s){
			$("#pageNo").val(n);
			$("#pageSize").val(s);
			$("#searchForm").submit();
        	return false;
        }
	</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li class="active"><a href="${ctx}/cms/communistParty/">党组织生成列表</a></li>
		<shiro:hasPermission name="cms:communistParty:edit"><li><a href="${ctx}/cms/communistParty/form">党组织生成添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="communistParty" action="${ctx}/cms/communistParty/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>姓名：</label>
				<form:input path="name" htmlEscape="false" maxlength="20" class="input-medium"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>姓名</th>
				<th>职务</th>
				<th>分管工作</th>
				<th>图片</th>
				<th>更新时间</th>
				<th>备注信息</th>
				<shiro:hasPermission name="cms:communistParty:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="communistParty">
			<tr>
				<td><a href="${ctx}/cms/communistParty/form?id=${communistParty.id}">
					${communistParty.name}
				</a></td>
				<td>
					${communistParty.job}
				</td>
				<td>
					${communistParty.manageThings}
				</td>
				<td>
					${communistParty.image}
				</td>
				<td>
					<fmt:formatDate value="${communistParty.updateDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<td>
					${communistParty.remarks}
				</td>
				<shiro:hasPermission name="cms:communistParty:edit"><td>
    				<a href="${ctx}/cms/communistParty/form?id=${communistParty.id}">修改</a>
					<a href="${ctx}/cms/communistParty/delete?id=${communistParty.id}" onclick="return confirmx('确认要删除该党组织生成吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>