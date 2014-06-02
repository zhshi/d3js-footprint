require 'pp'
require 'json'

files = [
"an_hui.geo.json",
"ao_men.geo.json",
"bei_jing.geo.json",
"chong_qing.geo.json",
"fu_jian.geo.json",
"gan_su.geo.json",
"guang_dong.geo.json",
"guang_xi.geo.json",
"gui_zhou.geo.json",
"hai_nan.geo.json",
"he_bei.geo.json",
"he_nan.geo.json",
"hei_long_jiang.geo.json",
"hu_bei.geo.json",
"hu_nan.geo.json",
"ji_lin.geo.json",
"jiang_su.geo.json",
"jiang_xi.geo.json",
"liao_ning.geo.json",
"nei_meng_gu.geo.json",
"ning_xia.geo.json",
"qing_hai.geo.json",
"shan_dong.geo.json",
"shan_xi_1.geo.json",
"shan_xi_2.geo.json",
"shang_hai.geo.json",
"si_chuan.geo.json",
"tai_wan.geo.json",
"tian_jin.geo.json",
"xi_zang.geo.json",
"xiang_gang.geo.json",
"xin_jiang.geo.json",
"yun_nan.geo.json",
"zhe_jiang.geo.json"
]

features = []

files.each do |fn|
  File.open(fn, "r") do |f|
    pj = JSON.load(f)
    features += pj["features"]
  end
end

result = { "type" => "FeatureCollection", "features" => features }

File.open("china_cities.json","w") do |f|
  f.write(result.to_json)
end
