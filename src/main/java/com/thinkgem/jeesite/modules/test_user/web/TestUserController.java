/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.test_user.web;

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
import com.thinkgem.jeesite.modules.test_user.entity.TestUser;
import com.thinkgem.jeesite.modules.test_user.service.TestUserService;

/**
 * 测试Controller
 * @author 测试
 * @version 2018-01-04
 */
@Controller
@RequestMapping(value = "${adminPath}/test_user/testUser")
public class TestUserController extends BaseController {

	@Autowired
	private TestUserService testUserService;
	
	@ModelAttribute
	public TestUser get(@RequestParam(required=false) String id) {
		TestUser entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = testUserService.get(id);
		}
		if (entity == null){
			entity = new TestUser();
		}
		return entity;
	}
	
	@RequiresPermissions("test_user:testUser:view")
	@RequestMapping(value = {"list", ""})
	public String list(TestUser testUser, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<TestUser> page = testUserService.findPage(new Page<TestUser>(request, response), testUser); 
		model.addAttribute("page", page);
		return "modules/test_user/testUserList";
	}

	@RequiresPermissions("test_user:testUser:view")
	@RequestMapping(value = "form")
	public String form(TestUser testUser, Model model) {
		model.addAttribute("testUser", testUser);
		return "modules/test_user/testUserForm";
	}

	@RequiresPermissions("test_user:testUser:edit")
	@RequestMapping(value = "save")
	public String save(TestUser testUser, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, testUser)){
			return form(testUser, model);
		}
		testUserService.save(testUser);
		addMessage(redirectAttributes, "保存测试成功");
		return "redirect:"+Global.getAdminPath()+"/test_user/testUser/?repage";
	}
	
	@RequiresPermissions("test_user:testUser:edit")
	@RequestMapping(value = "delete")
	public String delete(TestUser testUser, RedirectAttributes redirectAttributes) {
		testUserService.delete(testUser);
		addMessage(redirectAttributes, "删除测试成功");
		return "redirect:"+Global.getAdminPath()+"/test_user/testUser/?repage";
	}

}