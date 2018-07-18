var mylayer = (function($, window, document) {
	var MyLayer = function() {
		this.list = {};
		this.numb = 0;
	}

	MyLayer.prototype = {
		constructor: MyLayer,
		open: function(options) {
			var layer = new Layer(options, this.numb);
			this.list[this.numb] = layer;
			this.numb++;
			return layer;
		},
		close: function(layer) {
			layer.close();
		},
		closeAll: function() {
			for(var o in this.list) {
				this.list[o].close();
			}
		}
	}

	var settings = {
		type: '1', // 弹出层的类型
		title: '标题', // 弹出层的标题
		offset: ['50%', '50%'],
		area: ['80%', '80%'], // 弹出层的大小
		dir: '', //top,left,right,bottom
		shadeClose: true, //点击遮罩关闭层
		content: '', //内容
		url: '', // 链接地址
		data: {}, // 传递的数据
		closeBack: null, // 关闭窗口的回调函数
		background: '',
		tBackground: ''
	};

	var Layer = function(options, numb) {
		this.numb = numb;
		this.options = $.extend({}, settings, options);
		this.isClose = true;
		this.resize = true;
		this.init();
	}

	Layer.prototype = {
		constructor: Layer,
		init: function() {
			this.setFrame();
			this.eventThing();
		},
		setFrame: function() {
			this.$screen = $('<div class="ll-screen"></div>');
			this.$dialog = $('<div class="ll-dialog"></div>');
			this.$head = $('<div class="dia-head"></div>');
			this.$title = $('<div class="dia-title"></div>');
			this.$bars = $('<div class="dia-bars"></div>');
			this.$min = $('<span class="dia-min fa fa-window-minimize"></span>');
			this.$max = $('<span class="dia-max fa fa-window-maximize"></span>');
			this.$mid = $('<span class="dia-mid fa fa-window-restore hide"></span>');
			this.$close = $('<span class="dia-close">×</span>');
			this.$content = $('<div class="dia-content"></div>');
			this.$iframe = $('<iframe class="dia-iframe"></iframe>');
			this.$foot = $('<div class="dia-foot"></div>');
			this.$screen.append(this.$dialog);
			this.$dialog.append(this.$head);
			this.$dialog.append(this.$content);
			if(this.options.type == '2') {
				this.$content.append(this.$iframe);
			}
			this.$dialog.append(this.$foot);
			this.$head.append(this.$title);
			this.$head.append(this.$bars);
			this.$bars.append(this.$min);
			this.$bars.append(this.$max);
			this.$bars.append(this.$mid);
			this.$bars.append(this.$close);
			this.$title.html(this.options.title);
			this.$content.css('background', this.options.background);
			this.$head.css('background', this.options.tBackground);
			if(this.options.type == '1') {
				if(this.options.url) {
					this.setContent(this.options.url, this.options.data);
				} else {
					this.$content.html(this.options.content);
				}
			} else {
				var url = this.options.url;
				if(this.options.data) {
					var dataValue = '';
					var data = this.options.data;
					for(key in data) {
						dataValue += key + '=' + data[key] + '&';
					}
					var reg = /\?/;
					if(reg.test(url)) {
						url += '&' + dataValue;
					} else {
						url += '?' + dataValue;
					}
				}
				this.$iframe.attr('src', url);
			}
			this.setScreen();
			this.setDialog();
			$('body').append(this.$screen);
			setTimeout(function() {
				this.$screen.css({
					left: '0',
					top: '0'
				});
			}.bind(this), 10);
		},
		eventThing: function() {
			var _this = this;
			if(this.options.shadeClose) {
				this.$screen.on('click', function(e) {
					if(_this.isClose) {
						_this.close();
					}
				});
			}
			this.$dialog.on('click', function(e) {
				e.stopPropagation();
			});
			$(window).on('resize', this.setDialog.bind(this));
			this.$min.on('click', function(e) {
				_this.minDialog();
			});
			this.$max.on('click', function(e) {
				_this.maxDialog();
			});
			this.$mid.on('click', function(e) {
				_this.resize = true;
				_this.setDialog();
			});
			this.$close.on('click', function(e) {
				_this.close();
			})
		},
		setScreen: function() {
			switch(this.options.dir) {
				case 'top':
					this.$screen.css({
						top: '-100%'
					});
					break;
				case 'bottom':
					this.$screen.css({
						top: '100%'
					});
					break;
				case 'left':
					this.$screen.css({
						left: '-100%'
					});
					break;
				case 'right':
					this.$screen.css({
						left: '100%'
					});
					break;
				default:
					break;
			}
			this.$screen
		},
		setContent: function() {
			var _this = this;
			$.ajax({
				type: 'post',
				url: _this.options.url,
				data: _this.options.data,
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				success: function(data) {
					_this.$content.html(data);
				},
				error: function() {
					_this.$content.html('请求失败！');
				}
			});
		},
		setDialog: function() {
			if(!this.resize) {
				return false;
			}
			var width = document.documentElement.clientWidth || document.body.clientWidth;
			var height = document.documentElement.clientHeight || document.body.clientHeight;
			var dWidth = this.options.area[0];
			var dHeight = 0;
			var x = this.options.offset[0];
			var y = 0;
			if(this.options.area.length < 2) {
				dHeight = this.options.area[0];
			} else {
				dHeight = this.options.area[1];
			}
			if(this.options.offset.length < 2) {
				y = this.options.offset[0];
			} else {
				y = this.options.offset[1];
			}
			var mleft = 0;
			var mtop = 0;
			if(this.isPercent(dWidth)) {
				dWidth = $.min(100, parseFloat(dWidth)) + '%';
				if(this.isPercent(x)) {
					mleft = -(parseFloat(dWidth) * parseFloat(x) * width) / 10000;
				} else {
					mleft = -(parseFloat(dWidth) * width / 200);
				}
			} else {
				dWidth = $.min(width, parseFloat(dWidth)) + 'px';
				if(this.isPercent(x)) {
					mleft = -(parseFloat(dWidth) * parseFloat(x)) / 100;
				} else {
					mleft = -(parseFloat(dWidth) / 2);
				}
			}
			if(this.isPercent(dHeight)) {
				dHeight = $.min(100, parseFloat(dHeight)) + '%';
				if(this.isPercent(y)) {
					mtop = -(parseFloat(dHeight) * parseFloat(y) * height) / 10000;
				} else {
					mtop = -(parseFloat(dHeight) * height / 200);
				}
			} else {
				dHeight = $.min(height, parseFloat(dHeight)) + 'px';
				if(this.isPercent(y)) {
					mtop = -(parseFloat(dHeight) * parseFloat(y)) / 100;
				} else {
					mtop = -(parseFloat(dHeight) / 2);
				}
			}
			if(!this.isPercent(x)) {
				x = parseFloat(x) + 'px';
			}
			if(!this.isPercent(y)) {
				y = parseFloat(y) + 'px';
			}
			this.$dialog.css({
				'width': dWidth,
				'height': dHeight,
				'left': x,
				'top': y,
				'margin-left': mleft + 'px',
				'margin-top': mtop + 'px'
			});
			this.$mid.addClass('hide');
			this.$max.removeClass('hide');
		},
		maxDialog: function() {
			this.resize = false;
			var width = document.documentElement.clientWidth || document.body.clientWidth;
			var height = document.documentElement.clientHeight || document.body.clientHeight;
			this.$dialog.css({
				'width': '100%',
				'height': '100%',
				'left': '0px',
				'top': '0px',
				'margin-left': '0px',
				'margin-top': '0px'
			});
			this.$mid.removeClass('hide');
			this.$max.addClass('hide');
		},
		minDialog: function() {
			var _this = this;
			this.resize = false;
			this.$screen.addClass('min');
			this.isClose = false;
			var $title = this.$title.clone();
			this.$screen.append($title);
			$title.addClass('screen-title');
			$title.on('click', function() {
				_this.restoreDialog();
			});
		},
		restoreDialog: function() {
			this.resize = true;
			this.$screen.removeClass('min');
			this.$screen.children('.screen-title').remove();
			this.setDialog();
			setTimeout(function() {
				this.isClose = true;
			}.bind(this), 10);
		},
		close: function() {
			this.resize = false;
			$(window).unbind('resize', this.setDialog.bind(this));
			if(this.options.dir) {
				this.setScreen();
				setTimeout(function() {
					this.$screen.remove();
				}.bind(this), 310);
			} else {
				this.$screen.remove();
			}
			delete mylayer.list[this.numb];
			this.options.closeBack && this.options.closeBack();
		},
		isPercent: function(num) {
			var reg = /%/;
			return reg.test(num + '');
		}
	}
	var mylayer = new MyLayer();
	return mylayer;
})(jQuery, window, document);

(function($, window, document) {
	var settings = {
		width: '150px',
		height: '30px',
		background: '#379FFF',
		color: '#FFFFFF',
		title: '请选择',
		border: null,
		icolor: '#FFFFFF',
		numb: 10,
		margin: '0px',
		onChange: function(value, text) {}
	}

	var methods = {
		init: function(options) {
			return this.each(function(index, e) {
				var $this = $(this);
				var mySelect = $this.get(0).mySelect;
				if(!mySelect) {
					mySelect = new MySelect($this, options);
					mySelect.init();
					$this.get(0).mySelect = mySelect;
				} else {
					mySelect.reload(options);
				}
			});
		},
		refresh: function() {
			return this.each(function(index, e) {
				var $this = $(this);
				var mySelect = $this.get(0).mySelect;
				mySelect.reload();
			});
		}
	}

	var MySelect = function($select, options) {
		this.$select = $select;
		this.options = $.extend({}, settings, options);
	}

	MySelect.prototype = {
		constructor: MySelect,
		init: function() {
			this.setHTML();
			this.setAttr();
			this.setCss();
			this.initEventThing();
			this.eventThing();
		},
		reload: function(options) {
			if(options) {
				this.options = $.extend({}, settings, options);
			}
			this.getOptions();
			var text = this.getOptions();
			this.$span.html(text);
			this.$ul.html(this.$lis);
			this.setAttr();
			this.setCss();
			this.removeEventThing();
			this.eventThing();
		},
		setHTML: function() {
			this.$root = $('<div class="select-div"></div>');
			this.$show = $('<p></p>');
			this.$span = $('<span></span>');
			this.$i = $('<i class="fa fa-chevron-down"></i>');
			this.$ul = $('<ul></ul>');
			var text = this.getOptions();
			this.$span.html(text);
			this.$select.wrap(this.$root);
			this.$root = this.$select.parent();
			this.$root.append(this.$show);
			this.$root.append(this.$ul);
			this.$show.append(this.$span);
			this.$show.append(this.$i);
			this.$ul.append(this.$lis);
		},
		getOptions: function() {
			var _this = this;
			var $options = this.$select.find('option');
			var $selectOptions = this.$select.find('option:selected');
			this.$lis = [];
			var text = this.options.title;
			this.multiple = this.$select.prop('multiple');
			$options.each(function() {
				var $li = $('<li></li>');
				$li.data('value', $(this).val());
				$li.html($(this).html());
				if($(this).prop('selected')) {
					$li.addClass('select-selected');
				}
				_this.$lis.push($li);
			});
			$selectOptions.each(function(index, e) {
				if(index == 0) {
					text = $(this).html();
				} else {
					text += '，' + $(this).html();
				}
			});
			return text;
		},
		setAttr: function() {
			this.$select.attr('autocomplete', 'off');
			this.$root.attr('tabindex', '-1');
			this.disabled = this.$select.prop('disabled');
			if(this.disabled) {
				this.$root.attr('disabled', 'disabled');
			} else {
				this.$root.removeAttr('disabled');
			}
		},
		setCss: function() {
			this.$select.css('display', 'none');
			this.$root.css({
				width: this.options.width,
				margin: this.options.margin
			});
			if(this.options.border) {
				this.$show.css({
					'line-height': parseInt(this.options.height) - 6 + 'px',
					'border': '1px solid ' + this.options.border
				});
			} else {
				this.$show.css('line-height', parseInt(this.options.height) - 4 + 'px');
			}
			this.$show.css({
				'background': this.options.background,
				'color': this.options.color,
				'height': this.options.height
			});
			this.$i.css('color', this.options.icolor);
			var numb = $.min(this.options.numb, this.$lis.length);
			this.$ul.css('height', 26 * numb + 'px');
		},
		initEventThing: function() {
			var _this = this;
			this.$select.on('change', function() {
				var value = _this.$select.val();
				var text = _this.$span.html();
				_this.options.onChange && _this.options.onChange(value, text);
			});
			this.$ul.on('click', 'li', function() {
				_this.selectLi(this);
			});
		},
		eventThing: function() {
			var _this = this;
			if(!this.disabled) {
				this.$show.on('click', function() {
					_this.spreadSelect();
				});
				this.$root.on("blur", function() {
					_this.$ul.removeClass('open');
				});
			}
		},
		removeEventThing: function() {
			this.$show.unbind();
			this.$root.unbind();
		},
		spreadSelect: function() {
			this.$ul.toggleClass('open');
		},
		selectLi: function(obj) {
			var $li = $(obj);
			var $options = this.$select.find('option');
			var text = this.options.title;
			var value = '';
			if(!this.multiple) {
				if(!$li.hasClass('select-selected')) {
					$li.addClass('select-selected').siblings('li').removeClass('select-selected');
					text = $li.html();
					value = $li.data('value');
					this.$span.html(text);
					this.$select.find("option[value='" + value + "']").prop("selected", true);
					this.$select.trigger('change');
				}
				this.spreadSelect();
			} else {
				$li.toggleClass('select-selected');
				var val = $li.data('value');
				this.$ul.find('li.select-selected').each(function(index, e) {
					if(index == 0) {
						text = $(this).html();
						value = $(this).data('value');
					} else {
						text += '，' + $(this).html();
						value += ',' + $(this).data('value');
					}
				});
				this.$span.html(text);
				if($li.hasClass('select-selected')) {
					this.$select.find("option[value='" + val + "']").prop("selected", true);
				} else {
					this.$select.find("option[value='" + val + "']").prop('selected', false);
				}
				this.$select.trigger('change');
			}
		}
	}

	$.fn.mySelect = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.mySelect');
		}
	}
})(jQuery, window, document);

(function($, window, document) {
	var settings = {
		background: 'transparent',
		color: '#000',
		width: '5px',
		body: false
	}

	var methods = {
		init: function(options) {
			return this.each(function(index, e) {
				var $this = $(this);
				var data = $this.data('llScroll');
				options = $.extend({}, settings, options);
				if(!data) {
					new llScroll($this, options).init();
					$this.data('llScroll', 'llScroll');
				}
			});
		},

	}

	var llScroll = function($obj, options) {
		this.$obj = $obj;
		this.options = options;
		this.setEvent = false;
	}

	llScroll.prototype = {
		constructor: llScroll,
		init: function() {
			this.setFrame();
			this.setCss();
			this.setAttr();
			if(!this.setEvent && this.per < 1) {
				this.eventThing();
			}
			this.loadContent();
		},
		setFrame: function() {
			this.$content = $('<div class="ll-scroll-cotent"></div>');
			this.$scroll = $('<div class="ll-scroll"></div>');
			this.$bar = $('<div class="ll-bars"></div>');
			this.$scroll.append(this.$bar);
			this.$content.html(this.$obj.contents());
			this.$obj.html(this.$content);
			this.$obj.append(this.$scroll);
			var position = this.$obj.css('position');
			if(position != 'fixed' || position != 'absolute') {
				this.$obj.css({
					overflow: 'hidden',
					position: 'relative'
				});
			} else {
				this.$obj.css({
					overflow: 'hidden'
				});
			}
		},
		setAttr: function() {
			this.allHeight = this.$content.height();
			this.scrollHeight = this.$scroll.height();
			var pt = this.$obj.css('padding-top');
			var pb = this.$obj.css('padding-bottom');
			this.allHeight += parseFloat(pt);
			this.allHeight += parseFloat(pb);
			this.per = this.scrollHeight / this.allHeight;
			this.syHeight = this.allHeight - this.scrollHeight;
			this.barHeight = this.scrollHeight * this.per;
			this.bsyHeight = this.scrollHeight - this.barHeight;
			this.syPer = this.bsyHeight / this.syHeight;
			this.setBar();
		},
		setBar: function() {
			if(this.per < 1) {
				this.$bar.css('height', this.barHeight);
				var mTop = parseFloat(this.$content.css('top'));
				this.scroll(mTop);
			} else {
				this.$bar.css({
					height: 0,
					top: 0
				});
				this.$content.css('top', -1);
			}
		},
		setCss: function() {
			this.$scroll.css({
				'width': this.options.width,
				'background': this.options.background
			});
			this.$bar.css({
				'background': this.options.color,
				'border-radius': this.options.width
			});
			if(this.options.body) {
				this.$obj.addClass('ll-scroll-body');
			}
		},
		eventThing: function() {
			var _this = this;
			this.setEvent = true;
			this.$obj.on('mouseover', function() {
				_this.$scroll.css('opacity', 1);
			});
			this.$obj.on('mouseout', function() {
				_this.$scroll.css('opacity', 0);
			});
			this.$obj.on('mousewheel', function(e) {
				e = e || window.event;
				var top = e.originalEvent.wheelDelta / 4;
				var vTop = parseFloat(_this.$content.css('top')) + top;
				_this.scroll(vTop);
				e.stopPropagation();
				e.preventDefault();
			});
			this.$obj.on('DOMMouseScroll', function(e) {
				e = e || window.event;
				var top = -e.originalEvent.detail * 10;
				var vTop = parseFloat(_this.$content.css('top')) + top;
				_this.scroll(vTop);
				e.stopPropagation();
				e.preventDefault();
			});
			this.$bar.on('mousedown', function(e) {
				var eY = e.clientY;
				var vTop = parseFloat(_this.$content.css('top'));
				$(document).on('mousemove', function(e) {
					var mY = e.clientY;
					var bsY = mY - eY;
					var sY = -bsY / _this.syPer;
					var mTop = vTop + sY;
					_this.scroll(mTop);
				});
				$(document).on('mouseup', function(e) {
					$(document).unbind('mousemove');
					$(document).unbind('mouseup');
				});
			});
		},
		scroll: function(top) {
			var bTop = -top * this.per;
			if(top <= -(this.syHeight + 1)) {
				top = -(this.syHeight + 1);
				bTop = this.bsyHeight;
			}
			if(top >= -1) {
				top = -1;
				bTop = 0;
			}
			this.$content.css('top', top + 'px');
			this.$bar.css('top', bTop + 'px');
		},
		unbind: function() {
			this.$obj.unbind();
			this.$bar.unbind();
			this.setEvent = false;
		},
		loadContent: function() {
			var _this = this;
			var time = setInterval(function() {
				_this.setAttr();
				if(_this.setEvent && _this.per >= 1) {
					_this.unbind();
				}
				if(!_this.setEvent && _this.per < 1) {
					_this.eventThing();
				}
			}, 1000 / 50);
		}
	}
	$.fn.llScroll = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
				arguments, 1));
		} else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	}
})(jQuery, window, document);

(function($, window, document) {
	var settings = {
		allPage: 0,
		curPage: 0,
		allNumb: 0,
		rows: 10,
		align: 'center'
	}

	var methods = {
		init: function(options) {
			return this.each(function(index, e) {
				var $this = $(this);
				var data = $this.data('llPage');
				options = $.extend({}, settings, options);
				if(!data) {
					var page = new llPage($this, options);
					page.init();
					$this.data('llPage', page);
				}
			});
		},
		setOption: function(options) {
			return this.each(function(index, e) {
				var $this = $(this);
				var data = $this.data('llPage');
				if(data) {
					data.setOptions(options);
				}
			});
		}
	}

	var llPage = function($obj, options) {
		this.$obj = $obj;
		this.options = options;
	}

	llPage.prototype = {
		constructor: llPage,
		init: function() {
			this.setAttr();
			this.initFrame();
			this.eventThing();
		},
		setAttr: function() {
			if(isNaN(parseInt(this.options.allPage))) {
				this.options.allPage = 0;
			} else {
				this.options.allPage = parseInt(this.options.allPage);
			}
			if(isNaN(parseInt(this.options.curPage))) {
				this.options.curPage = 0;
			} else {
				this.options.curPage = parseInt(this.options.curPage);
			}
			if(isNaN(parseInt(this.options.allNumb))) {
				this.options.allNumb = 0;
			} else {
				this.options.allNumb = parseInt(this.options.allNumb);
			}
			if(isNaN(parseInt(this.options.rows))) {
				this.options.rows = 0;
			} else {
				this.options.rows = parseInt(this.options.rows);
			}
			if(this.options.allPage == 0) {
				if(this.options.allNumb >= 0) {
					if(this.options.allNumb % this.options.rows == 0) {
						this.options.allPage = Math.floor(this.options.allNumb / this.options.rows);
					} else {
						this.options.allPage = Math.floor(this.options.allNumb / this.options.rows) + 1;
					}
					if(this.options.allPage <= 0) {
						this.options.allPage = 1;
					}
				}
			}
			if(this.$llPage) {
				this.$allNumb.html(this.options.allNumb);
				this.$allPage.html(this.options.allPage);
			}
		},
		initFrame: function() {
			this.$llPageBack = $('<div class="ll-page-back"></div>');
			this.$llPage = $('<div class="ll-page"></div>');
			this.$llPage.css('text-align', this.options.align);
			this.$pageExp = $('<span class="page-exp"></span>');
			this.$allNumb = $('<span>' + this.options.allNumb + '</span>');
			this.$curPage = $('<span>' + this.options.curPage + '</span>');
			this.$allPage = $('<span>' + this.options.allPage + '</span>');
			this.$pre = $('<div class="pre"><</div>');
			this.$ul = $('<ul class="page-list">');
			this.$next = $('<div class="next">></div>');
			this.$span1 = $('<span class="page-nor">到第</span>');
			this.$input = $('<input type="text" class="page-input" value="1"/>');
			this.$span2 = $('<span class="page-nor">页</span>');
			this.$btn = $('<button type="button" class="page-btn">前往</button>');
			this.$llPageBack.append(this.$llPage);
			this.$llPage.append(this.$pageExp);
			this.$llPage.append(this.$pre);
			this.$llPage.append(this.$ul);
			this.$llPage.append(this.$next);
			this.$llPage.append(this.$span1);
			this.$llPage.append(this.$input)
			this.$llPage.append(this.$span2)
			this.$llPage.append(this.$btn);
			this.$pageExp.append('共');
			this.$pageExp.append(this.$allNumb);
			this.$pageExp.append('条记录，');
			this.$pageExp.append(this.$curPage);
			this.$pageExp.append('/');
			this.$pageExp.append(this.$allPage);
			this.$obj.append(this.$llPageBack);
			this.setFrame(true);
		},
		setFrame: function(first) {
			this.$ul.html('');
			if(this.options.curPage) {
				this.options.curPage = this.options.curPage < 1 ? 1 : this.options.curPage;
				this.options.curPage = this.options.curPage > this.options.allPage ? this.options.allPage : this.options.curPage;
			} else {
				this.options.curPage = 1;
			}
			if(this.options.allPage <= 5) {
				for(var i = 1; i <= this.options.allPage; i++) {
					var $li = $('<li>' + i + '</li>');
					if(i == this.options.curPage) {
						$li.addClass('active');
					}
					this.$ul.append($li);
				}
			} else {
				if(this.options.curPage < 4) {
					for(var i = 1; i <= 4; i++) {
						var $li = $('<li>' + i + '</li>');
						if(i == this.options.curPage) {
							$li.addClass('active');
						}
						this.$ul.append($li);
					}
					var $sl = $('<li class="sl">...</li>');
					this.$ul.append($sl);
					var $last = $('<li>' + this.options.allPage + '</li>');
					this.$ul.append($last);
				} else if(this.options.curPage > this.options.allPage - 3) {
					var $first = $('<li>1</li>');
					this.$ul.append($first);
					var $sl = $('<li class="sl">...</li>');
					this.$ul.append($sl);
					for(var i = this.options.allPage - 3; i <= this.options.allPage; i++) {
						var $li = $('<li>' + i + '</li>');
						if(i == this.options.curPage) {
							$li.addClass('active');
						}
						this.$ul.append($li);
					}
				} else {
					var $first = $('<li>1</li>');
					this.$ul.append($first);
					var $sl1 = $('<li class="sl">...</li>');
					this.$ul.append($sl1);
					for(var i = this.options.curPage - 1; i <= this.options.curPage + 1; i++) {
						var $li = $('<li>' + i + '</li>');
						if(i == this.options.curPage) {
							$li.addClass('active');
						}
						this.$ul.append($li);
					}
					var $sl2 = $('<li class="sl">...</li>');
					this.$ul.append($sl2);
					var $last = $('<li>' + this.options.allPage + '</li>');
					this.$ul.append($last);
				}
			}
			this.$curPage.html(this.options.curPage);
			if(!first) {
				this.options.callBack && this.options.callBack(this.options.curPage);
			}
			if(this.options.allPage <= 1) {
				this.$llPage.hide();
			} else {
				this.$llPage.show();
			}
		},
		eventThing: function() {
			var _this = this;
			this.$ul.on('click', 'li', function(e) {
				_this.selectPage($(this));
			});
			this.$btn.on('click', function(e) {
				_this.skip();
			});
			this.$pre.on('click', function(e) {
				_this.step(-1);
			});
			this.$next.on('click', function(e) {
				_this.step(1);
			});
		},
		step: function(step) {
			if(step < 0 && this.options.curPage > 1) {
				this.options.curPage += step;
				this.setFrame();
			} else if(step > 0 && this.options.curPage < this.options.allPage) {
				this.options.curPage += step;
				this.setFrame();
			}
		},
		selectPage: function($li) {
			if(!$li.hasClass('active') && !$li.hasClass('sl')) {
				$li.addClass('active').siblings('li').removeClass('active');
				this.options.curPage = parseInt($li.html());
				this.setFrame();
			}
		},
		skip: function() {
			this.options.curPage = parseInt(this.$input.val());
			this.setFrame();
		},
		setOptions: function(options) {
			$.extend(this.options, options);
			this.setAttr();
			this.setFrame(true);
		}
	}

	$.fn.llPage = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
				arguments, 1));
		} else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	}
})(jQuery, window, document);

(function($, window, document) {
	var settings = {
		url: '',
		method: 'post',
		columns: [
			[]
		],
		data: [],
		pagination: false,
		singleSelect: false,
		queryParams: {},
		dataNull: '暂无数据！',
		rows: 6,
		setNumb: false
	}

	var methods = {
		init: function(options) {
			return this.each(function(index, e) {
				var $this = $(this);
				var data = $this.data('llTable');
				options = $.extend({}, settings, options);
				if(!data) {
					var table = new llTable($this, options);
					table.init();
					$this.data('llTable', table);
				}
			});
		},
		getSelected: function() {
			var $this = $(this);
			var data = $this.data('llTable');
			if(data) {
				return data.getSelected();
			} else {
				return null;
			}
		},
		getOptions: function() {
			var $this = $(this);
			var data = $this.data('llTable');
			if(data) {
				return data.getOptions();
			} else {
				return null;
			}
		}
	}

	var llTable = function($obj, options) {
		this.$obj = $obj;
		this.options = options;
		this.colsNumb = 0;
		this.pageNumb = 1;
		this.selectRows = [];
	}

	llTable.prototype = {
		constructor: llTable,
		init: function() {
			this.setFrame();
			this.setAttr();
			this.eventThing();
		},
		setFrame: function() {
			this.$llTable = $('<div class="ll-table"></div>');
			this.$tableBox = $('<div class="ll-table-box"></div>');
			this.$hTableBox = $('<div class="ll-htable-box"></div>');
			this.$hTable = $('<table class="ll-htable"></table>');
			this.$bTableBox = $('<div class="ll-btable-box"></div>');
			this.$loading = this.createLoading();
			this.$dataNull = $('<div class="ll-data-null">' + this.options.dataNull + '</div>');
			this.$bTable = $('<table class="ll-btable"></table>');
			this.$footer = $('<div class="ll-table-footer"></div>');
			this.$page = $('<div class="ll-table-page"></div>');
			this.$obj.hide();
			this.$llTable.append(this.$tableBox);
			if(this.options.pagination) {
				this.$llTable.append(this.$footer);
			}
			this.$tableBox.append(this.$hTableBox);
			this.$tableBox.append(this.$bTableBox);
			this.$hTableBox.append(this.$hTable);
			this.$bTableBox.append(this.$bTable);
			this.$bTableBox.append(this.$loading);
			this.$bTableBox.append(this.$dataNull);
			this.$footer.append(this.$page);
			this.$obj.before(this.$llTable);
			this.$llTable.append(this.$obj);
		},
		createLoading: function() {
			var $screen = $('<div class="loadingScreen"></div>');
			var $loading = $('<div class="loading"></div>');
			var strs = "正在加载数据".split('');
			var $span = null;
			$.each(strs, function(i, e) {
				$span = $('<span>' + e + '</span>');
				$span.addClass('load' + (i + 1));
				$loading.append($span);
			});
			$screen.append($loading);
			return $screen;
		},
		setAttr: function() {
			if(this.options.pagination) {
				this.initPage();
			}
			this.setHTable();
			this.getData();
			this.setBHeight();
			this.$bTableBox.llScroll();
		},
		setHTable: function() {
			var _this = this;
			if(this.options.columns) {
				var columns = this.options.columns;
				var length = this.options.columns.length;
				var tbody = [];
				var $tr = null;
				var $td = null;
				var $div = null;
				var $span = null;
				this.fields = [];
				$.each(columns, function(i, e) {
					$tr = $('<tr></tr>');
					if(_this.options.setNumb && i == 0) {
						$td = $('<td></td>');
						$div = $('<div></div>');
						$span = $('<span></span>');
						_this.$check = $('<input type="checkbox" />');
						$td.append($div);
						$div.append($span);
						$span.append(_this.$check);
						if(length > 1) {
							$td.attr('rowspan', length);
						}
						$div.addClass('numb');
						$tr.append($td);
						var fd = {
							field: 'tNumb'
						};
						_this.fields.push(fd);
					}
					$.each(e, function(j, f) {
						$td = $('<td></td>');
						$div = $('<div></div>');
						$span = $('<span></span>');
						$td.append($div);
						$div.append($span);
						var field = f.field;
						var title = f.title;
						var colspan = parseInt(f.colspan) ? parseInt(f.colspan) : 0;
						var rowspan = parseInt(f.rowspan) ? parseInt(f.rowspan) : 0;
						var width = parseFloat(f.width) ? parseFloat(f.width) : 0;
						if(colspan) {
							$td.attr('colspan', colspan);
							if(i == 0) {
								_this.colsNumb += colspan;
							}
						} else {
							if(i == 0) {
								_this.colsNumb++;
							}
						}
						if(rowspan) {
							$td.attr('rowspan', rowspan);
						}
						if(width) {
							$td.css('width', width + 'px');
						}
						if(f.field) {
							$td.attr('field', field);
							if(i + rowspan == length || i == length - 1) {
								var fd = {
									field: field,
									width: width,
									colspan: colspan,
									setContent: f.setContent
								};
								_this.fields.push(fd);
								f.last = true;
							}
						}
						f.th = $td;
						$span.html(title);
						$tr.append($td);
					});
					tbody.push($tr);
				});
				if(length > 1) {
					var thWidth = Math.floor(100 / this.colsNumb);
					$.each(columns, function(i, e) {
						$.each(e, function(j, f) {
							var colspan = parseInt(f.colspan) ? parseInt(f.colspan) : 1;
							f.th.css('width', thWidth * colspan + 'px');
						});
					});
				}
				if(this.options.setNumb) {
					var numbWidth = 0;
					$.each(this.fields, function(i, e) {
						if(i === 0) {
							return;
						}
						if(e.width) {
							numbWidth += e.width;
						} else {
							numbWidth += 30;
						}
					});
					numbWidth = numbWidth / 30;
					tbody[0].find('td').eq(0).css('width', numbWidth + 'px');
					this.fields[0].width = numbWidth;
				}
				this.hLength = length;
				this.$hTable.append(tbody);
			}
		},
		setBTable: function() {
			var _this = this;
			var data = this.options.data;
			this.$bTable.html('');
			if(data && data.length > 0) {
				this.bLength = data.length;
				var tbody = [];
				var $tr = null;
				var $td = null;
				var $div = null;
				var $span = null;
				var snumb = 0;
				if(this.options.setNumb) {
					snumb = (this.pageNumb - 1) * this.options.rows + 1;
				}
				$.each(data, function(i, e) {
					$tr = $('<tr></tr>');
					if(e.trSelected === true) {
						$tr.addClass('active');
					}
					$.each(_this.fields, function(j, f) {
						$td = $('<td></td>');
						$div = $('<div></div>');
						$span = $('<span></span>');
						$td.append($div);
						$div.append($span);
						var colspan = parseInt(f.colspan) ? parseInt(f.colspan) : 0;
						var width = parseFloat(f.width) ? parseFloat(f.width) : 0;
						$td.attr('field', f.field);
						if(colspan) {
							$td.attr('colspan', colspan);
						}
						if(_this.hLength > 1) {
							var thWidth = Math.floor(100 / _this.colsNumb);
							$td.css('width', thWidth + 'px');
						} else {
							if(width) {
								$td.css('width', width + 'px');
							}
						}
						if(_this.options.setNumb && j === 0) {
							$div.addClass('numb');
							$span.html(snumb);
							snumb++;
						} else if(f.setContent) {
							var con = f.setContent(e);
							if(con === undefined || con === null) {
								$span.html(e[f.field]);
							} else {
								$span.html(con);
							}
						} else {
							$span.html(e[f.field]);
						}
						$tr.append($td);
					});
					tbody.push($tr);
				});
				this.$dataNull.removeClass('active');
				this.$loading.hide();
				this.$bTable.html(tbody);
			} else {
				this.$loading.hide();
				this.$dataNull.addClass('active');
			}
		},
		setBHeight: function() {
			var jheight = 3;
			if(this.options.pagination) {
				jheight = 58;
			}
			var allHeight = this.$llTable.height();
			var hHeight = this.$hTableBox.height();
			var bHeight = allHeight - hHeight - jheight;
			if(bHeight <= 0) {
				bHeight = 32 * this.options.rows;
			}
			this.$bTableBox.css('height', bHeight + 'px');
			this.$loading.css('height', bHeight + 'px');
			this.$dataNull.css('height', bHeight + 'px');
			this.$dataNull.css('line-height', bHeight / 3 * 2 + 'px');
		},
		initPage: function() {
			var _this = this;
			this.$page.llPage({
				curPage: _this.pageNumb,
				allNumb: 0,
				rows: this.rows,
				align: 'right',
				callBack: function(numb) {
					_this.$loading.show();
					_this.pageNumb = numb;
					_this.getData();
				}
			});
		},
		getData: function() {
			var _this = this;
			var data = this.options.queryParams;
			data.pageNumb = this.pageNumb;
			data.rows = this.rows;
			$.ajax({
				type: _this.options.method,
				url: _this.options.url,
				data: data,
				dataType: 'json',
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				success: function(data) {
					if(data) {
						_this.options.data = data.rows;
						_this.setBTable();
						if(_this.options.pagination) {
							_this.$page.llPage('setOption', {
								allPage: data.allPage,
								allNumb: data.allNumb
							});
						}
					}
				},
				error: function() {
					_this.options.data = [];
					_this.setBTable();
				}
			})
		},
		eventThing: function() {
			var _this = this;
			this.$bTable.on('click', 'tr', function(e) {
				_this.selectRow($(this));
				_this.autoCheckAll();
			})
			this.$check.on('change', function(e) {
				var flag = $(this).prop('checked');
				_this.selectAll(flag);
			});
			$(window).on('resize', function() {
				_this.setBHeight();
			});
		},
		selectRow: function($tr) {
			var index = $tr.index();
			if(!this.options.data[index].trSelected) {
				this.options.data[index].trSelected = true;
			} else {
				this.options.data[index].trSelected = false;
			}
			$tr.toggleClass('active');
		},
		selectAll: function(flag) {
			var _this = this;
			if(flag) {
				$.each(this.options.data, function(i, e) {
					if(!_this.options.data[i].trSelected) {
						_this.options.data[i].trSelected = true;
						_this.$bTable.find('tr').eq(i).addClass('active');
					}
				});
			} else {
				$.each(this.options.data, function(i, e) {
					if(_this.options.data[i].trSelected) {
						_this.options.data[i].trSelected = false;
						_this.$bTable.find('tr').eq(i).removeClass('active');
					}
				});
			}
		},
		autoCheckAll: function() {
			var selectAll = true;
			$.each(this.options.data, function(i, e) {
				if(!e.trSelected) {
					selectAll = false;
				}
			});
			this.$check.prop('checked', selectAll);
		},
		getSelected: function() {
			var selectData = [];
			$.each(this.options.data, function(i, e) {
				if(e.trSelected) {
					selectData.push(e.id || '');
				}
			});
			return selectData;
		},
		getOptions: function() {
			return this.options;
		}
	}

	$.fn.llTable = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
				arguments, 1));
		} else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	}
})(jQuery, window, document);

/**
 * 操作表格 合并单元格 行
 */
(function($, window, document) {
	// 看过jquery源码就可以发现$.fn就是$.prototype, 只是为了兼容早期版本的插件
	// 才保留了jQuery.prototype这个形式
	$.fn.mergeCell = function(options) {
		return this.each(function() {
			var cols = options.cols;
			var serial = options.serial ? options.serial : [];
			for(var i = cols.length - 1; cols[i] != undefined; i--) {
				mergeCell($(this), cols[i], serial);
			}
			dispose($(this));
		});
	};
	// 如果对javascript的closure和scope概念比较清楚, 这是个插件内部使用的private方法
	// 具体可以参考本人前一篇随笔里介绍的那本书
	function mergeCell($table, colIndex, serials) {
		$table.data('$td', '');
		$table.data('rowspan', 1);
		$table.data('id', '');
		$table.data('serial', 1);
		var $td = null;
		var id = null;
		var length = $table.find('tr').length;
		var serial = serials.contains(colIndex);
		$table.find('tr').each(function(i, e) {
			id = $(e).attr('merge');
			if(!id) {
				return;
			}
			$td = $(e).find('td').eq(colIndex);
			if(i === 0) {
				$table.data('$td', $td);
				$table.data('rowspan', 1);
				$table.data('id', id);
			} else {
				if($table.data('id') === id) {
					$table.data('rowspan', $table.data('rowspan') + 1);
					$td.hide();
					if(i === length - 1) {
						$table.data('$td').attr('rowspan', $table.data('rowspan'));
						if(serial) {
							$table.data('$td').html($table.data('serial'));
						}
					}
				} else {
					$table.data('$td').attr('rowspan', $table.data('rowspan'));
					if(serial) {
						$table.data('$td').html($table.data('serial'));
						$table.data('serial', $table.data('serial') + 1);
					}
					$table.data('$td', $td);
					$table.data('rowspan', 1);
					$table.data('id', id);
					if(serial && i === length - 1) {
						$table.data('$td').html($table.data('serial'));
					}
				}
			}
		});
	}

	// 同样是个private函数  清理内存之用
	function dispose($table) {
		$table.removeData();
	}
})(jQuery, window, document);

(function($, window, document) {
	$.extend({
		min: function(val1, val2) {
			return val1 < val2 ? val1 : val2;
		},
		max: function(val1, val2) {
			return val1 > val2 ? val1 : val2;
		}
	});

	Array.prototype.contains = function(needle) {
		for(i in this) {
			if(this[i] == needle) return true;
		}
		return false;
	}
})(jQuery, window, document);

(function($, window, document) {
	$.ajaxSetup({
	    type: 'POST',
	    complete: function(xhr,status) {  
	    	//debugger;
	        var sessionStatus = xhr.getResponseHeader('sessionstatus');
	        var url = xhr.getResponseHeader('url');  
	        if(sessionStatus == '8000') {  
	        	window.parent.location.href=url;
	        }  
	    }  
	}); 
	$.ajaxSetup({
	    type: 'GET',
	    complete: function(xhr,status) {  
	    	//debugger;
	        var sessionStatus = xhr.getResponseHeader('sessionstatus');
	        var url = xhr.getResponseHeader('url');  
	        if(sessionStatus == '8000') {  
	        	window.parent.location.href=url;
	        }  
	    }  
	});
})(jQuery, window, document);