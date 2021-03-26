// 篩選地區用 change 監聽
// 上方新增的地區跟下方篩選的地區都寫死選項（依照目前提供的 JSON data area 欄位）
// 地區的篩選下拉需要加上『全部地區』option
// 不需要有「清除資料」的按鈕
// 預設資料為 3 筆（內容需依照目前提供的 JSON data）
// 篩選後會顯示『搜尋資料為 ? 筆』
// 描述欄位使用 textarea
// 星級區間是 1-10 分
// 金額、組數、星級的 type 為 Number

let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
];

//選擇器
const areaList = document.querySelector('.area-list');
const searchNum = document.querySelector('.search-num');
//表單選擇器
const ticketName = document.querySelector('#name');
const ticketImgUrl = document.querySelector('#imgUrl');
const ticketAreaPlace = document.querySelector('#areaplace');
const ticketPrice = document.querySelector('#price');
const ticketLevel = document.querySelector('#level');
const ticketGroup = document.querySelector('#group');
const ticketDes = document.querySelector('#des');
const form = document.querySelector('form');
//表單按鈕
const addBtn = document.querySelector('.add-btn');

//初始化
function init(){
  let str = '';
  data.forEach(function(item){
    let content = `<li class="area-card">
    <div class="card-header">
        <div class="card-img">
            <img src="${item.imgUrl}" alt="place">
        </div>
        <h4 class="local-title">${item.area}</h4>
        <p class="local-level">${item.rate}</p>
    </div>
    <div class="card-body">
        <div>
            <h3 class="area-name">${item.name}</h3>
            <p class="area-des">${item.description}</p>
        </div>
        <div class="card-footer">
            <p class="last-group"><i class="fas fa-exclamation-circle"></i>剩下最後 ${item.group} 組</p>
            <h4 class="price"><sup>TWD</sup>$${item.price}</h4>
        </div>
    </div>
    </li>`;
    str += content;
  });
  areaList.innerHTML = str;
  searchNum.textContent =`本次搜尋共 ${data.length} 筆資料`;
}
init();

//篩選器
function filterBox(){
  const filterLocal = document.querySelector('#local');
  filterLocal.addEventListener('change',function(e){
    let str = '';
    let count = 0;
    data.forEach(function(item){
      if(e.target.value == '全部'){
        init();
        return
      }else if(e.target.value == item.area){
        count += 1;
        str += `<li class="area-card">
        <div class="card-header">
            <div class="card-img">
                <img src="${item.imgUrl}" alt="place">
            </div>
            <h4 class="local-title">${item.area}</h4>
            <p class="local-level">${item.rate}</p>
        </div>
        <div class="card-body">
            <div>
                <h3 class="area-name">${item.name}</h3>
                <p class="area-des">${item.description}</p>
            </div>
            <div class="card-footer">
                <p class="last-group"><i class="fas fa-exclamation-circle"></i>剩下最後 ${item.group} 組</p>
                <h4 class="price"><sup>TWD</sup>$${item.price}</h4>
            </div>
        </div>
        </li>`;
        searchNum.textContent =`本次搜尋共 ${count} 筆資料`;
      }
      areaList.innerHTML = str;
    });
    // filterLocal.value = '地區搜尋';
  });
}
filterBox();

//新增表單
function addTicketBox(){
  addBtn.addEventListener('click',function(e){
    if(ticketLevel.value > 10){
      alert('星級區間是 1-10 分，請重新填寫')
      form.reset(); //清除表單內容
      return
    }
    data.push({
      id: Date.now(),//產生亂數
      name: ticketName.value,
      imgUrl: ticketImgUrl.value,
      area: ticketAreaPlace.value,
      description:ticketDes.value,
      group: Number(ticketGroup.value),
      price: Number(ticketPrice.value),
      rate:Number(ticketLevel.value)
    })
    form.reset();//清除表單內容
    init();
  })
}
addTicketBox();