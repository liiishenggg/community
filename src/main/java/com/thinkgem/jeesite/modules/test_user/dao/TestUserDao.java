/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.test_user.dao;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.test_user.entity.TestUser;

/**
 * 测试DAO接口
 * @author 测试
 * @version 2018-01-04
 */
@MyBatisDao
public interface TestUserDao extends CrudDao<TestUser> {
	
}