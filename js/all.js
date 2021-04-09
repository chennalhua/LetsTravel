// 篩選地區用 change 監聽
// 上方新增的地區跟下方篩選的地區都寫死選項（依照目前提供的 JSON data area 欄位）
// 地區的篩選下拉需要加上『全部地區』option
// 不需要有「清除資料」的按鈕
// 預設資料為 3 筆（內容需依照目前提供的 JSON data）
// 篩選後會顯示『搜尋資料為 ? 筆』
// 描述欄位使用 textarea
// 星級區間是 1-10 分
// 金額、組數、星級的 type 為 Number

let data;

//axios
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json') // ( /user/12345 ) 網址
	//請求成功就會執行該 function
  .then(function (response) {
    console.log('資料已回傳');
    data = response.data.data;
    renderC3();
    init();
  });

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
const filterLocal = document.querySelector('#local');

//初始化
function init(){
  listContentBox();
  filterLocal.value == '全部';
  searchNum.textContent =`本次搜尋共 ${data.length} 筆資料`;
}

//list content
function listContentBox(){
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
}

//篩選器
function filterBox(){
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
    if(ticketLevel.value > 10 || ticketLevel.value <= 0){
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
    filterLocal.value = '全部'; //如果下方使用者有篩選地區，當新增跳套票時，會跳回「全部」選項
    renderC3();
  })
}
addTicketBox();

//c3 圖表
function renderC3(){
  let totalObj = {};
  //{高雄: 1, 台北: 1, 台中: 1}
  data.forEach(function(item){
    if(totalObj[item.area] == undefined){
      totalObj[item.area] = 1;
    }else {
      totalObj[item.area] += 1;
    }
  });
  let newData = [];
  let area = Object.keys(totalObj);
  //area = ["高雄", "台北", "台中"];
  area.forEach(function(item){
    let ary = [];
    ary.push(item);
    ary.push(totalObj[item]);
    newData.push(ary);
  });
  
  const chart = c3.generate({
    data: {
        columns: newData,
        type : 'donut',
        colors:{
          高雄:"#E68619",
          台北:"#26C0C7",
          台中:"#5151D3",
        }
    },
    size:{
      height:200
    },
    donut: {
        title: "套票地區比重",
        width:15,
        label:{
          show:false
        }
    }
  });
}


