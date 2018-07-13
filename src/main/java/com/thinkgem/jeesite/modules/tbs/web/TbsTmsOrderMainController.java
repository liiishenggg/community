/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tbs.web;

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
import com.thinkgem.jeesite.modules.tbs.entity.TbsTmsOrderMain;
import com.thinkgem.jeesite.modules.tbs.service.TbsTmsOrderMainService;

/**
 * 物流下单管理模块Controller
 * @author kui.li
 * @version 2017-12-14
 */
@Controller
@RequestMapping(value = "${adminPath}/tbs/tbsTmsOrderMain")
public class TbsTmsOrderMainController extends BaseController {

	@Autowired
	private TbsTmsOrderMainService tbsTmsOrderMainService;
	
	@ModelAttribute
	public TbsTmsOrderMain get(@RequestParam(required=false) String id) {
		TbsTmsOrderMain entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = tbsTmsOrderMainService.get(id);
		}
		if (entity == null){
			entity = new TbsTmsOrderMain();
		}
		return entity;
	}
	
	@RequiresPermissions("tbs:tbsTmsOrderMain:view")
	@RequestMapping(value = {"list", ""})
	public String list(TbsTmsOrderMain tbsTmsOrderMain, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<TbsTmsOrderMain> page = tbsTmsOrderMainService.findPage(new Page<TbsTmsOrderMain>(request, response), tbsTmsOrderMain); 
		model.addAttribute("page", page);
		return "modules/tbs/tbsTmsOrderMainList";
	}

	@RequiresPermissions("tbs:tbsTmsOrderMain:view")
	@RequestMapping(value = "form")
	public String form(TbsTmsOrderMain tbsTmsOrderMain, Model model) {
		model.addAttribute("tbsTmsOrderMain", tbsTmsOrderMain);
		return "modules/tbs/tbsTmsOrderMainForm";
	}

	@RequiresPermissions("tbs:tbsTmsOrderMain:edit")
	@RequestMapping(value = "save")
	public String save(TbsTmsOrderMain tbsTmsOrderMain, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, tbsTmsOrderMain)){
			return form(tbsTmsOrderMain, model);
		}
		tbsTmsOrderMainService.save(tbsTmsOrderMain);
		addMessage(redirectAttributes, "保存物流下单管理成功");
		return "redirect:"+Global.getAdminPath()+"/tbs/tbsTmsOrderMain/?repage";
	}
	
	@RequiresPermissions("tbs:tbsTmsOrderMain:edit")
	@RequestMapping(value = "delete")
	public String delete(TbsTmsOrderMain tbsTmsOrderMain, RedirectAttributes redirectAttributes) {
		tbsTmsOrderMainService.delete(tbsTmsOrderMain);
		addMessage(redirectAttributes, "删除物流下单管理成功");
		return "redirect:"+Global.getAdminPath()+"/tbs/tbsTmsOrderMain/?repage";
	}

}