/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tbs.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.tbs.entity.TbsTmsOrderMain;
import com.thinkgem.jeesite.modules.tbs.dao.TbsTmsOrderMainDao;

/**
 * 物流下单管理模块Service
 * @author kui.li
 * @version 2017-12-14
 */
@Service
@Transactional(readOnly = true)
public class TbsTmsOrderMainService extends CrudService<TbsTmsOrderMainDao, TbsTmsOrderMain> {

	public TbsTmsOrderMain get(String id) {
		return super.get(id);
	}
	
	public List<TbsTmsOrderMain> findList(TbsTmsOrderMain tbsTmsOrderMain) {
		return super.findList(tbsTmsOrderMain);
	}
	
	public Page<TbsTmsOrderMain> findPage(Page<TbsTmsOrderMain> page, TbsTmsOrderMain tbsTmsOrderMain) {
		return super.findPage(page, tbsTmsOrderMain);
	}
	
	@Transactional(readOnly = false)
	public void save(TbsTmsOrderMain tbsTmsOrderMain) {
		super.save(tbsTmsOrderMain);
	}
	
	@Transactional(readOnly = false)
	public void delete(TbsTmsOrderMain tbsTmsOrderMain) {
		super.delete(tbsTmsOrderMain);
	}
	
}