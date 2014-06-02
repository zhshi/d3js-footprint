require 'pp'
require 'json'

File.open('china_cities.csv', 'w') do |f|
  File.open('china_cities.json', 'r') do |j|
    pj = JSON.load(j)
    pj["features"].each do |city|
      f.puts "#{city["id"]},#{city["properties"]["name"]}"
    end
  end
end
