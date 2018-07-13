<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>测试管理</title>
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
		<li class="active"><a href="${ctx}/test_user/testUser/">测试列表</a></li>
		<shiro:hasPermission name="test_user:testUser:edit"><li><a href="${ctx}/test_user/testUser/form">测试添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="testUser" action="${ctx}/test_user/testUser/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>ID：</label>
				<form:input path="id" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>用户名：</label>
				<form:input path="username" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>密码：</label>
				<form:input path="password" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>删除标志：</label>
				<form:radiobuttons path="delFlag" items="${fns:getDictList('del_flag')}" itemLabel="label" itemValue="value" htmlEscape="false"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>ID</th>
				<th>用户名</th>
				<th>密码</th>
				<th>删除标志</th>
				<shiro:hasPermission name="test_user:testUser:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="testUser">
			<tr>
				<td><a href="${ctx}/test_user/testUser/form?id=${testUser.id}">
					${testUser.id}
				</a></td>
				<td>
					${testUser.username}
				</td>
				<td>
					${testUser.password}
				</td>
				<td>
					${fns:getDictLabel(testUser.delFlag, 'del_flag', '')}
				</td>
				<shiro:hasPermission name="test_user:testUser:edit"><td>
    				<a href="${ctx}/test_user/testUser/form?id=${testUser.id}">修改</a>
					<a href="${ctx}/test_user/testUser/delete?id=${testUser.id}" onclick="return confirmx('确认要删除该测试吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>