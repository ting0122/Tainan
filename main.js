  //監聽hover

  //台灣地圖是很多path分割出來的，所以這裡對每個path(縣市)監聽
  document.querySelectorAll("path").forEach(function(path){
    path.addEventListener('mouseover', function(){
      let targetCounty = this.getAttribute("data-name");
      //這裡要注意，此時取得的data-name是html裡英文的縣市名稱
      //但氣象局回傳的縣市名稱是中文的
      forCasting(targetCounty)//呼叫以下寫好的function對氣象中心發出get請求
    })
  })

  //拿下方這張別人做好的表，等等用迴圈來映射名稱位置
  var place_data=[
    {
      tag: "taipei_city",
      place: "臺北市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "new_taipei_city",
      place: "新北市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "taichung_city",
      place: "台中市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "tainan_city",
      place: "臺南市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "kaohsiung_city",
      place: "高雄市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "keelung_city",
      place: "基隆市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "taoyuan_country",
      place: "桃園市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "hsinchu_city",
      place: "新竹市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "hsinchu_country",
      place: "新竹縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "miaoli_country",
      place: "苗栗縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "changhua_country",
      place: "彰化縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "nantou_country",
      place: "南投縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "yunlin_country",
      place: "雲林縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "chiayi_city",
      place: "嘉義市",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "chiayi_country",
      place: "嘉義縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "pingtung_country",
      place: "屏東縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "yilan_country",
      place: "宜蘭縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "hualien_country",
      place: "花蓮縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "taitung_country",
      place: "台東縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "penghu_country",
      place: "澎湖縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "kinmen_country",
      place: "金門縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    },
    {
      tag: "lienchiang_country",
      place: "連江縣",
      low: 20,
      high: 24,
      weather: "Sunny"
    }
  ];


  //發出 Get 去請求資料
  function forCasting(targetCounty){

    //英文換中文名稱
    for(const i of place_data){
      if(i.tag === targetCounty){
        targetCounty = i.place
      }
    }

    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWA-45E35599-A032-4F2C-8AF6-0F2790F16504"
    )
    .then((Response) => {
        return Response.json();
    })
    .then((Response) => {
        for (const location of Response.records.locations) {
          for (const loc of location.location) {
            if (loc.locationName === targetCounty){
              //接下來要取得該縣市所需要的資料
              //還好loc.location.weatherElement.elementName"WeatherDescription"已經有統整了
              //loc.weatherDescription位置的time[0].elementValue[0].value 在這裡，超多層的
              let wx = [] ; //這裡要先讓他成為array 以免之後被判定為undefine 取不出值
              for(const w of loc.weatherElement){
                if(w.elementName === 'WeatherDescription')

                  //他一開始的資料都是用句號分隔。所以這裡把它分割，放進空字串
                  wx = w.time[0].elementValue[0].value.split("。")

                  document.getElementById("name").innerHTML = targetCounty
                  document.getElementById("bio").innerHTML = wx[0] //晴時多雲
                  document.getElementById("_area").innerHTML = wx[2] //平均溫度
              }
            }
          }
        }
      }
    )
  }