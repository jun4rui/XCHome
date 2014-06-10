/*
chrome.bookmarks.search("Linux",function(mainTree){
	for(i in mainTree){
		document.write(mainTree[i]["id"]+"="+mainTree[i]["title"]+"<br/>");
	}
});
*/
var loadingHtmlStr	= '<div class="panel panel-info"> <div class="panel-heading"> <h3 class="panel-title">提醒</h3> </div> <div class="panel-body">正在载入内容，请稍等……</div> </div>';
var intervalId		= "";
var intervalDeplay	= 30000;

// 系统循环用
var systemIntervalId		= "";
var systemIntervalDeplay	= 30000;


var dataModule	= new Array(
	// ["名称(显示在tab上)","调用方法名称"]
	["常去网站","getPop"],
	["CNBETA","getCnbeta"],
	["驱动之家","getMydrivers"],
	["STEAM中国","getSteamcn"],
	["TGFCER","getTgfcer"],
	["TG水区","getTgfcerShui"],
	["Stage1ST","getS1"]
);

// 生成并输出内容
function makeContent(inArray,inTemplateStr, inHeaderStr, inFooterStr){
	var tempHTMLStr	= "";
	var today	= (new Date()).toLocaleString();
	tempHTMLStr	+=	'<span class="label label-success"><span class="glyphicon glyphicon-refresh"></span> 自动更新于：'+today+'</span>';

	// 设定开头添加串
	if (typeof(inHeaderStr)=="undefined"){
		tempHTMLStr	+=	'<div class="list-group">';
	}else{
		tempHTMLStr	+=	inHeaderStr;
	}
	// 产生主要内容
	for (var i in inArray){
		var tempTemplateStr	= inTemplateStr;
		for (var j in inArray[i]){
			tempTemplateStr	= tempTemplateStr.replace("[VALUE"+j+"]",inArray[i][j]);
			//alert(tempTemplateStr);
		}
		tempHTMLStr	+=	tempTemplateStr;
	}

	// 设定末尾添加串
	if (typeof(inFooterStr)=="undefined"){
		tempHTMLStr	+=	'</div>';
	}else{
		tempHTMLStr	+=	inFooterStr;
	}
	$("#contentPanel").html(tempHTMLStr);
}

function getPop(){
	var popSiteList	= new Array(
		//["图片","文字","链接地址"]
		["https://lh4.googleusercontent.com/8KAM1bc9fnjpDZWut2m0C_Kx95SMo0R9BDpm1D6FQmdhWQk1-4zpQpjbQFVDytN7l5Rme9nr=s141-h90-e365-rw","Chrome网上应用商店","https://chrome.google.com/webstore/category/extensions?hl=zh-CN"],
		["http://static.cnbetacdn.com/newsimg/2013/0902/01378086055.jpg_180x132.jpg","Cnbeta","http://www.cnbeta.com"],
		["http://www.soomal.com/images/doc/20130829/00035111_01.jpg","数码多媒体","http://www.soomal.com"],
		["http://cdn.ifanr.cn/wp-content/uploads/2013/09/201309011336409c364.jpg","爱范儿","http://www.ifanr.com/"],
		["http://static.oschina.net/uploads/space/2013/0812/111742_tQ1n_179699.jpg","开源中国","http://oschina.net/"],
		["http://linuxtoy.org/wp-content/themes/be/img/logo.gif","Linuxtoy","http://linuxtoy.org/"],
		["http://icon.solidot.org/images/green/green_logo.jpg","Solidot","http://www.solidot.org/"],
		["http://www.3dmgame.com/templets/index/images/logo%20380-90.png","3DM","http://www.3dmgame.com/"],
		["http://www.ali213.net/images/newlogo.gif","游侠网","http://www.ali213.net/"],
		["./siteIcon/nga.jpg","艾泽拉斯国家地理","http://wow.178.com/"],
		["https://ssl.gstatic.com/s2/oz/images/google-logo-plus-0fbe8f0119f4a902429a5991af5db563.png","Google Plus","https://plus.google.com/"],
		["http://image.coolapk.com/apk_logo/2013/0709/10001_1373352522_82.jpg","酷安网","http://www.coolapk.com/"],
		["http://cdn.androidpolice.com/wp-content/themes/ap1/images/logo.jpg","Android police","http://www.androidpolice.com/"],
		["http://ww2.sinaimg.cn/large/4ddead09gw1e6nkjeriirj20au040mxh.jpg","龙的天空","http://www.lkong.net/book.php"],
		["http://p4.music.126.net/cTCKKI5KT509R5PyKbwE0A==/5705365836595911.jpg?param=210y160","网易云音乐","http://music.163.com/"],
		["http://www.ed2000.com/Images/logo_200x60.png","ED2000","http://www.ed2000.com/"],
		["http://images.17173.com/2013/xin/2013/09/03/cc0903mzyk04s.jpg","17173","http://www.17173.com/"]
	);

	var tempHTMLStr	= "";
	for (i in popSiteList){
		tempHTMLStr	+= '<div class="siteBox col-md-2 col-sm-3" style="margin-bottom:15px;"> <a href="'+popSiteList[i][2]+'" class="thumbnail siteItem"> <img src="'+popSiteList[i][0]+'" alt="">'+popSiteList[i][1]+'</a> </div>';
	}
	$("#contentPanel").html(tempHTMLStr);
}

function getCnbeta(){
	$.get("http://www.cnbeta.com",function(HTMLData){
		var tempArray	= new Array();
		$(HTMLData).find("div.items_area dl").each(function(){
			var tempTitle	= $(this).find("dt a").text();
			var tempPic		= $(this).find("div.pic img").attr("src");
			var tempUrl		= $(this).find("dt a").attr("href");
			var tempDesc	= $(this).find("div.newsinfo p").text().replace("阅读全文>>","");
			tempArray.push(new Array(tempTitle,tempPic,tempUrl,tempDesc));
		});
		var templateStr	=	'<a href="http://www.cnbeta.com/[VALUE2]" class="list-group-item listItem"><img src="[VALUE1]" class="img-rounded"/><h4 class="list-group-item-heading">[VALUE0]</h4><p class="list-group-item-text" style="line-height:180%;">[VALUE3]</p><div class="clear"></div></a>';
		makeContent(tempArray, templateStr);
	});
}

function getMydrivers(){
	$.get("http://rss.mydrivers.com/rss.aspx?Tid=1",function(HTMLData){
		var tempArray	= new Array();
		$(HTMLData).find("item").each(function(){
			var tempTitle	= $(this).find("title").text();
			var tempUrl		= $(this).find("link").text();
			var tempCategory= $(this).find("category").text();
			var tempAuthor	= $(this).find("author").text();
			var tempDesc	= $(this).find("description").text();
			tempArray.push(new Array(tempTitle,tempUrl,tempCategory,tempAuthor,tempDesc));
		});
		var templateStr	=	'<a href="[VALUE1]" class="list-group-item listItem" title="[VALUE4]"><div class="list-group-item-text"><table style="width:100%;"> <tr> <td style="width:120px; text-align:left;"><strong>【[VALUE2]】</strong></td> <td>[VALUE0]</td> <td style="width:120px; text-align:left;">[VALUE3]</td> </tr> </table></div>';
		makeContent(tempArray, templateStr);
	});
}

function getTgfcer(){
	$.get("http://wap.tgfcer.com/index.php?action=forum&fid=10&vt=1&tp=100&pp=100&sc=0&vf=0&sm=0&iam=&css=",function(HTMLData){
		var tempArray	= new Array();
		$(HTMLData).find("span.title").each(function(){
			var tempTitle	= $(this).find("a").text();
			var tempPic		= "";
			var tempUrl		= $(this).find("a").attr("href");
			var tempDesc	= "";
			if (tempTitle.indexOf("[")!=0)
				tempArray.push(new Array(tempTitle,tempPic,tempUrl,tempDesc));
		});
		var templateStr	=	'<a href="http://wap.tgfcer.com/[VALUE2]" class="list-group-item listItem"><p class="list-group-item-text">[VALUE0]</p></a>';
		makeContent(tempArray, templateStr);
	});
}

function getTgfcerShui(){
	$.get("http://wap.tgfcer.com/index.php?action=forum&fid=25&vt=1&tp=100&pp=100&sc=0&vf=0&sm=0&iam=&css=",function(HTMLData){
		var tempArray	= new Array();
		$(HTMLData).find("span.title").each(function(){
			var tempTitle	= $(this).find("a").text();
			var tempPic		= "";
			var tempUrl		= $(this).find("a").attr("href");
			var tempDesc	= "";
			if (tempTitle.indexOf("[")!=0)
				tempArray.push(new Array(tempTitle,tempPic,tempUrl,tempDesc));
		});
		var templateStr	=	'<a href="http://wap.tgfcer.com/[VALUE2]" class="list-group-item listItem"><p class="list-group-item-text">[VALUE0]</p></a>';
		makeContent(tempArray, templateStr);
	});
}

function getS1(){
	$.get("http://bbs.saraba1st.com/2b/forum.php?mod=guide&view=newthread",function(HTMLData){
		var tempArray	= new Array();
		$(HTMLData).find("#threadlist table tbody tr").each(function(){
			var tempTitle	= $(this).find("th.common a").text();
			var tempUrl		= $(this).find("th.common a").attr("href");
			var tempType	= "【"+$(this).find("td.by a:eq(0)").text()+"】 ";
			var tempBy		= $(this).find("td.by cite a:eq(0)").text();
			if (tempTitle!="")
				tempArray.push(new Array(tempType,tempTitle,tempBy,tempUrl));
		});
		var templateStr	= '<a href="http://bbs.saraba1st.com/2b/[VALUE3]" class="list-group-item listItem"><div class="list-group-item-text"><table style="width:100%;"> <tr> <td style="width:120px; text-align:left;"><strong>[VALUE0]</strong></td> <td>[VALUE1]</td> <td style="width:120px; text-align:left;">[VALUE2]</td> </tr> </table></div>';
		makeContent(tempArray, templateStr);
	});
}

function getSteamcn(){
	$.get("http://steamcn.com/forum.php?mod=guide&view=newthread",function(HTMLData){
		var tempArray	= new Array();
		$(HTMLData).find("#threadlist table tbody tr").each(function(){
			var tempTitle	= $(this).find("th.common a").text();
			var tempUrl		= $(this).find("th.common a").attr("href");
			var tempType	= "【"+$(this).find("td.by a:eq(0)").text()+"】 ";
			var tempBy		= $(this).find("td.by cite a:eq(0)").text().replace("pinkgun","<strong><font color='red'>pinkgun</font></strong>");
			if (tempTitle!="")
				tempArray.push(new Array(tempType,tempTitle,tempBy,tempUrl));
		});
		var templateStr	= '<a href="http://www.steamcn.com/[VALUE3]" class="list-group-item listItem"><div class="list-group-item-text"><table style="width:100%;"> <tr> <td style="width:120px; text-align:left;"><strong>[VALUE0]</strong></td> <td>[VALUE1]</td> <td style="width:120px; text-align:left;">[VALUE2]</td> </tr> </table></div>';
		makeContent(tempArray, templateStr);
	});
}


// 获取SG点数
function getAccountNum(){
	$.get("http://www.steamgifts.com/",function(HTMLData){
		var tempStr	= $(HTMLData).find("div#navigation ol li a.arrow:eq(1)").text();
		var sgPointNum	= tempStr.substring(tempStr.indexOf("(")+1,tempStr.indexOf(")"));
		$("#sysInfoPanel").text("SG点: "+sgPointNum);
	});
}

$(document).ready(function(){
	// 生成nav-tabs
	for (i in dataModule){
		$(".navbar-left").append('<li><a href="#" data-run="'+dataModule[i][1]+'">'+dataModule[i][0]+'</a></li>');
	}
	$(".navbar-left li:eq(0)").addClass("active");

	// 绑定点击行为
	$(".navbar-left li").click(function(){
		// remove所有的li的active，并设置当前li的active
		$(".navbar-left li.active").removeClass("active");
		$(this).addClass("active");
		// loading提示
		$("#contentPanel").prepend(loadingHtmlStr);
		var doRunStr	= $(this).find("a").attr("data-run");
		//alert(doRunStr);

		if (doRunStr=="getCnbeta"){
			getCnbeta();
			// 设置定时更新
			clearInterval(intervalId);
			intervalId	= setInterval(getCnbeta,intervalDeplay);
		}

		if (doRunStr=="getMydrivers"){
			getMydrivers();
			// 设置定时更新
			clearInterval(intervalId);
			intervalId	= setInterval(getMydrivers,intervalDeplay);
		}

		if (doRunStr=="getTgfcer"){
			getTgfcer();
			// 设置定时更新
			clearInterval(intervalId);
			intervalId	= setInterval(getTgfcer,intervalDeplay);
		}

		if (doRunStr=="getSteamcn"){
			getSteamcn();
			// 设置定时更新
			clearInterval(intervalId);
			intervalId	= setInterval(getSteamcn,intervalDeplay);
		}

		if (doRunStr=="getTgfcerShui"){
			getTgfcerShui();
			// 设置定时更新
			clearInterval(intervalId);
			intervalId	= setInterval(getTgfcerShui,intervalDeplay);
		}

		if (doRunStr=="getS1"){
			getS1();
			// 设置定时更新
			clearInterval(intervalId);
			intervalId	= setInterval(getS1,intervalDeplay);
		}
		if (doRunStr=="getPop"){
			getPop();
		}
	});

	// 模拟点击第一个
	$(".navbar-left li:eq(0)").click();
	// 获取sg点数
	getAccountNum();
	setInterval(getAccountNum,systemIntervalDeplay);
});