﻿local curl = require "lcurl.safe"

script_info = {
	["title"] = "嘀哩嘀哩",
	["description"] = "",
	["version"] = "0.0.2",
	["tooltip"] = "http://www.dilidili.wang/",
}

--初始化新番列表
function onInitAnime()
	return parse(get("http://www.dilidili.wang/"))
end

--列表项点击事件
function onItemClick(item)
	local act = ACT_SHARELINK
	local arg = ""
	local _, _, li = string.find(get(item.url), "<li class=\"list_xz\">(.-)<li>")
	if li then
		_, _, arg, pwd = string.find(li, "(https?://pan.baidu.com/s/[A-Za-z0-9-_]+).->(.-)</a>")
		if arg then
			_, _, pwd = string.find(pwd, "(%w%w%w%w)")
			if pwd then
				arg = arg .. " " .. pwd
			end
		end
	end
	if arg == nil or #arg == 0 then
		act = ACT_ERROR
		arg = "获取链接失败"
	end
	return act, arg 
end

function get(url)
	local r = ""
	local c = curl.easy{
		url = url,
		ssl_verifyhost = 0,
		ssl_verifypeer = 0,
		followlocation = 1,
		timeout = 15,
		proxy = pd.getProxy(),
		writefunction = function(buffer)
			r = r .. buffer
			return #buffer
		end,
	}
	local _, e = c:perform()
	c:close()
	return r
end

function parse(data)
	local anime_week = {}
	local week = {"星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"}
	local sep = {"<!%-%- 星期一开始 %-%->", "<!%-%- 星期二开始 %-%->", "<!%-%- 星期三开始 %-%->", "<!%-%- 星期四开始 %-%->", "<!%-%- 星期五开始 %-%->", "<!%-%- 星期六开始 %-%->", "<!%-%- 星期日开始 %-%->", "<!%-%- seven end %-%->"}
	for i = 1, 7 do
		local _, _, tmp = string.find(data, sep[i] .. "(.-)" .. sep[i+1])
		local begin = 1
		local anime_day = {["title"] = week[i]}
		while tmp do
			local _, b, url, img, name = string.find(tmp, "<a href=\"(.-)\".-<img src=\"(.-)\".-<p>(.-)</p>", begin)
			if url == nil then
				break
			end
			if #url > 0 and string.byte(url) == 47 then
				url = "http://www.dilidili.wang" .. url
			end
			if #img > 0 and string.byte(img) == 47 then
				img = "http://www.dilidili.wang" .. img
			end
			table.insert(anime_day, {["url"] = url, ["name"] = name, ["image"] = img, ["icon_size"] = "55,55"})
			begin = b + 1
		end
		table.insert(anime_week, anime_day)
	end
	return anime_week
end