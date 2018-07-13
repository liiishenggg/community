/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.entity;

import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 党组织生成Entity
 * @author zjr
 * @version 2018-07-11
 */
public class CommunistParty extends DataEntity<CommunistParty> {
	
	private static final long serialVersionUID = 1L;
	private String name;		// 姓名
	private String job;		// 职务
	private String manageThings;		// 分管工作
	private String image;		// 图片
	
	public CommunistParty() {
		super();
	}

	public CommunistParty(String id){
		super(id);
	}

	@Length(min=0, max=20, message="姓名长度必须介于 0 和 20 之间")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Length(min=0, max=100, message="职务长度必须介于 0 和 100 之间")
	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}
	
	@Length(min=0, max=500, message="分管工作长度必须介于 0 和 500 之间")
	public String getManageThings() {
		return manageThings;
	}

	public void setManageThings(String manageThings) {
		this.manageThings = manageThings;
	}
	
	@Length(min=0, max=100, message="图片长度必须介于 0 和 100 之间")
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
}