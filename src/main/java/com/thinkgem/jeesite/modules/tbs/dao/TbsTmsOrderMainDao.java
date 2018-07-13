/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tbs.dao;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.tbs.entity.TbsTmsOrderMain;

/**
 * 物流下单管理模块DAO接口
 * @author kui.li
 * @version 2017-12-14
 */
@MyBatisDao
public interface TbsTmsOrderMainDao extends CrudDao<TbsTmsOrderMain> {
	
}