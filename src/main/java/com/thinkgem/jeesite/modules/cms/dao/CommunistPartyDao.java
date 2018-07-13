/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.dao;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.cms.entity.CommunistParty;

/**
 * 党组织生成DAO接口
 * @author zjr
 * @version 2018-07-11
 */
@MyBatisDao
public interface CommunistPartyDao extends CrudDao<CommunistParty> {
	
}