local curl = require "lcurl.safe"
local json = require "cjson.safe"

script_info = {
	["title"] = "AGE动漫",
	["description"] = "",
	["version"] = "0.0.2",
	["tooltip"] = "http://donghua.agefans.com/",
}

function onInitAnime()
	return parse(get())
end

function onItemClick(item)
	return ACT_SHARELINK, item.url
end

function get()
	local r = ""
	local c = curl.easy{
		url = "http://donghua.agefans.com/new_anime_all",
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
	local j = json.decode(data)
	if j == nil then
		return anime_week
	end
	local count = 0
	for i, day in ipairs(j) do 
		if type(day) == "table" then
			count = count + 1
			local anime_day = {["title"] = week[count]}
			for a, item in ipairs(day) do 
				local anime_item = {}
				anime_item["url"] = item["url"]
				anime_item["name"] = item["name"]
				anime_item["id"] = item["id"]
				anime_item["icon_size"] = "63,88"
				if type(anime_item.url) == "string" and #anime_item.url > 0 then
					anime_item["image"] = "http://donghua.agefans.com/poster/" .. item["id"]
					table.insert(anime_day, anime_item)
				end
			end
			table.insert(anime_week, anime_day)
		end
	end
	return anime_week
end