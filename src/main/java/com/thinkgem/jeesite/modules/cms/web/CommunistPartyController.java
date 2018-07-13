/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.cms.entity.CommunistParty;
import com.thinkgem.jeesite.modules.cms.service.CommunistPartyService;

/**
 * 党组织生成Controller
 * @author zjr
 * @version 2018-07-11
 */
@Controller
@RequestMapping(value = "${adminPath}/cms/communistParty")
public class CommunistPartyController extends BaseController {

	@Autowired
	private CommunistPartyService communistPartyService;
	
	@ModelAttribute
	public CommunistParty get(@RequestParam(required=false) String id) {
		CommunistParty entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = communistPartyService.get(id);
		}
		if (entity == null){
			entity = new CommunistParty();
		}
		return entity;
	}
	
	@RequiresPermissions("cms:communistParty:view")
	@RequestMapping(value = {"list", ""})
	public String list(CommunistParty communistParty, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<CommunistParty> page = communistPartyService.findPage(new Page<CommunistParty>(request, response), communistParty); 
		model.addAttribute("page", page);
		return "modules/cms/communistPartyList";
	}

	@RequiresPermissions("cms:communistParty:view")
	@RequestMapping(value = "form")
	public String form(CommunistParty communistParty, Model model) {
		model.addAttribute("communistParty", communistParty);
		return "modules/cms/communistPartyForm";
	}

	@RequiresPermissions("cms:communistParty:edit")
	@RequestMapping(value = "save")
	public String save(CommunistParty communistParty, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, communistParty)){
			return form(communistParty, model);
		}
		communistPartyService.save(communistParty);
		addMessage(redirectAttributes, "保存党组织生成成功");
		return "redirect:"+Global.getAdminPath()+"/cms/communistParty/?repage";
	}
	
	@RequiresPermissions("cms:communistParty:edit")
	@RequestMapping(value = "delete")
	public String delete(CommunistParty communistParty, RedirectAttributes redirectAttributes) {
		communistPartyService.delete(communistParty);
		addMessage(redirectAttributes, "删除党组织生成成功");
		return "redirect:"+Global.getAdminPath()+"/cms/communistParty/?repage";
	}

}