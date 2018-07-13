/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.tbs.entity;

import com.thinkgem.jeesite.modules.sys.entity.Area;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 物流下单管理模块Entity
 * @author kui.li
 * @version 2017-12-14
 */
public class TbsTmsOrderMain extends DataEntity<TbsTmsOrderMain> {
	
	private static final long serialVersionUID = 1L;
	private Area startArea;		// 起始地点
	private Area endArea;		// 卸货地点
	private String shipper;		// 货主
	private Double price;		// 承运价格
	private String takeAddress;		// 详细收货地址
	private Date takeTime;		// 收货时间
	private String takeMan;		// 收货人信息
	private String takePhone;		// 收货人电话
	
	public TbsTmsOrderMain() {
		super();
	}

	public TbsTmsOrderMain(String id){
		super(id);
	}

	@NotNull(message="起始地点不能为空")
	public Area getStartArea() {
		return startArea;
	}

	public void setStartArea(Area startArea) {
		this.startArea = startArea;
	}
	
	@NotNull(message="卸货地点不能为空")
	public Area getEndArea() {
		return endArea;
	}

	public void setEndArea(Area endArea) {
		this.endArea = endArea;
	}
	
	@Length(min=1, max=64, message="货主长度必须介于 1 和 64 之间")
	public String getShipper() {
		return shipper;
	}

	public void setShipper(String shipper) {
		this.shipper = shipper;
	}
	
	@NotNull(message="承运价格不能为空")
	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
	
	@Length(min=0, max=200, message="详细收货地址长度必须介于 0 和 200 之间")
	public String getTakeAddress() {
		return takeAddress;
	}

	public void setTakeAddress(String takeAddress) {
		this.takeAddress = takeAddress;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getTakeTime() {
		return takeTime;
	}

	public void setTakeTime(Date takeTime) {
		this.takeTime = takeTime;
	}
	
	@Length(min=0, max=100, message="收货人信息长度必须介于 0 和 100 之间")
	public String getTakeMan() {
		return takeMan;
	}

	public void setTakeMan(String takeMan) {
		this.takeMan = takeMan;
	}
	
	@Length(min=0, max=20, message="收货人电话长度必须介于 0 和 20 之间")
	public String getTakePhone() {
		return takePhone;
	}

	public void setTakePhone(String takePhone) {
		this.takePhone = takePhone;
	}
	
}