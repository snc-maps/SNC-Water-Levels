Tooltip = (function(){
	function Tooltip(ts, active=true){
		this.ts = ts;
		this.active=active;
	}

	Tooltip.prototype.toString = function(){
		return ("<span class=\"mvc-tooltip" + (this.active? " mvc-tooltip-active":"") + "\" title=\"" + this.ts.getTooltip() + "\">"
			+ this.ts.getUnits()
			+ "<span class=\"mvc-tooltip-text\">"
				+ this.ts.getTooltip()
			+ "</span>"
		+ "</span>");
	}

	function tooltip_show($event) {
		$e = $($event.target);
		if($e.length < 1)
			return;
		$e.addClass('mvc-show');
	}
	function tooltip_hide($event) {
		$e = $($event.target);
		if($e.length < 1)
			return;
		$e.removeClass('mvc-show');
	}

	Tooltip.bind = function(e1='click', e2='mouseout'){
		$('.mvc-tooltip.mvc-tooltip-active').bind(e1, null, tooltip_show);
		$('.mvc-tooltip.mvc-tooltip-active').bind(e2, null, tooltip_hide);
	}
	Tooltip.unbind = function(e1='click', e2='mouseout'){
		$('.mvc-tooltip.mvc-tooltip-active').unbind(e1, null, tooltip_show);
		$('.mvc-tooltip.mvc-tooltip-active').unbind(e2, null, tooltip_hide);
	}

	return Tooltip;
})()