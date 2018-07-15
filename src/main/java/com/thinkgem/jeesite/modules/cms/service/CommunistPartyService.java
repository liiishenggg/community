/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.cms.entity.CommunistParty;
import com.thinkgem.jeesite.modules.cms.dao.CommunistPartyDao;

/**
 * 党组织生成Service
 * @author zjr
 * @version 2018-07-11
 */
@Service
@Transactional(readOnly = true)
public class CommunistPartyService extends CrudService<CommunistPartyDao, CommunistParty> {

	public CommunistParty get(String id) {
		return super.get(id);
	}
	
	public List<CommunistParty> findList(CommunistParty communistParty) {
		return super.findList(communistParty);
	}
	
	public Page<CommunistParty> findPage(Page<CommunistParty> page, CommunistParty communistParty) {
		communistParty.getSqlMap().put("dsf", dataScopeFilter(communistParty.getCurrentUser(), "o", "u"));
		return super.findPage(page, communistParty);
	}
	
	@Transactional(readOnly = false)
	public void save(CommunistParty communistParty) {
		super.save(communistParty);
	}
	
	@Transactional(readOnly = false)
	public void delete(CommunistParty communistParty) {
		super.delete(communistParty);
	}
	
}