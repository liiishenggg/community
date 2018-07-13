<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>物流下单管理管理</title>
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
		<li class="active"><a href="${ctx}/tbs/tbsTmsOrderMain/">物流下单管理列表</a></li>
		<shiro:hasPermission name="tbs:tbsTmsOrderMain:edit"><li><a href="${ctx}/tbs/tbsTmsOrderMain/form">物流下单管理添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="tbsTmsOrderMain" action="${ctx}/tbs/tbsTmsOrderMain/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>id：</label>
				<form:input path="id" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>起始地点：</label>
				<sys:treeselect id="startArea" name="startArea.id" value="${tbsTmsOrderMain.startArea.id}" labelName="startArea.name" labelValue="${tbsTmsOrderMain.startArea.name}"
					title="区域" url="/sys/area/treeData" cssClass="input-small" allowClear="true" notAllowSelectParent="true"/>
			</li>
			<li><label>卸货地点：</label>
				<sys:treeselect id="endArea" name="endArea.id" value="${tbsTmsOrderMain.endArea.id}" labelName="endArea.name" labelValue="${tbsTmsOrderMain.endArea.name}"
					title="区域" url="/sys/area/treeData" cssClass="input-small" allowClear="true" notAllowSelectParent="true"/>
			</li>
			<li><label>货主：</label>
				<form:input path="shipper" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>详细收货地址：</label>
				<form:input path="takeAddress" htmlEscape="false" maxlength="200" class="input-medium"/>
			</li>
			<li><label>收货时间：</label>
				<input name="takeTime" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate"
					value="<fmt:formatDate value="${tbsTmsOrderMain.takeTime}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
			</li>
			<li><label>收货人信息：</label>
				<form:input path="takeMan" htmlEscape="false" maxlength="100" class="input-medium"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>起始地点</th>
				<th>卸货地点</th>
				<th>货主</th>
				<th>更新时间</th>
				<th>备注</th>
				<shiro:hasPermission name="tbs:tbsTmsOrderMain:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="tbsTmsOrderMain">
			<tr>
				<td><a href="${ctx}/tbs/tbsTmsOrderMain/form?id=${tbsTmsOrderMain.id}">
					${tbsTmsOrderMain.startArea.name}
				</a></td>
				<td>
					${tbsTmsOrderMain.endArea.name}
				</td>
				<td>
					${tbsTmsOrderMain.shipper}
				</td>
				<td>
					<fmt:formatDate value="${tbsTmsOrderMain.updateDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<td>
					${tbsTmsOrderMain.remarks}
				</td>
				<shiro:hasPermission name="tbs:tbsTmsOrderMain:edit"><td>
    				<a href="${ctx}/tbs/tbsTmsOrderMain/form?id=${tbsTmsOrderMain.id}">修改</a>
					<a href="${ctx}/tbs/tbsTmsOrderMain/delete?id=${tbsTmsOrderMain.id}" onclick="return confirmx('确认要删除该物流下单管理吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>