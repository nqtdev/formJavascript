let sanpham = []; // mảng chứa dữ liệu nhập từ form
let arrTable = []; // mảng chứa item đã chọn từ form select
let arrChooseItem = []; // mảng chứa item đã chọn từ popup tặng hàng
let arrChooseItem1 = []; // mảng chứa item đã chọn từ popup giảm giá hàng 2.3
let arrChooseItem2 = []; // mảng chứa item đã chọn từ popup tặng hàng 2.2 promax
let arrVoucher = []; //mảng chứa item đã nhập từ voucher
let arrTotalHangTang = []; // mảng chứa item lấy từ hàng tặng
let arrTotalHangTangPro = []; // mảng chứa item lấy từ hàng tặng pro
let arrTotalHangGiamGia = []; // mảng chứa item lấy từ hàng giảm giá
let arrGiamGiaDonHang = []; // mảng chứa giảm giá đơn hàng
var totalC = 0;
let ListItem = JSON.parse(localStorage.getItem("hangtang"));
//Xử lý validate form
function validateInput() {
  let form = document.querySelector(".form");
  let form_input = form.querySelectorAll(".form-input");
  for (let i = 0; i < form_input.length; i++) {
    if (form_input[i].value === "") {
      form_input[i].parentElement.querySelector(
        ".error-message"
      ).innerText = `Please enter your ${form_input[i].id} `;
    } else {
      form_input[i].parentElement.querySelector(".error-message").innerText =
        "";
    }
  }
}
// kiểm tra điều kiện đưa vào mảng sanpham[]
function addNew() {
  validateInput();
  let form = document.querySelector(".form");
  let errorMessage = form.querySelectorAll(".error-message");
  let arrError = [];
  for (let i = 0; i < errorMessage.length; i++) {
    arrError.push(errorMessage[i].innerHTML);
  }
  var checkErrow = arrError.every((he) => he === "");
  if (checkErrow) {
    SaveData();
  }
}
// lưu dữ liệu nhập từ form
function SaveData() {
  let code = document.getElementById("code").value;
  let name = document.getElementById("name").value;
  let desc = document.getElementById("desc").value;
  let price = document.getElementById("price").value;
  let amount = document.getElementById("amount").value;
  let sanpham = localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [];
  sanpham.push({
    code: code,
    name: name,
    desc: desc,
    price: price,
    amount: amount,
  });
  localStorage.setItem("product", JSON.stringify(sanpham));
  renderData();
  load();
}
// đưa dữ liệu ra form select
function renderData() {
  let product = `
            <option value="">Select</option>
           `;
  for (let i = 0; i < sanpham.length; i++) {
    product += `
            <option value='${i + 1}'>
                <span class="stt">STT:${i + 1}</span>
                <br/>
                <span>${sanpham[i].name}</span>
                <br/>
                <span>SL: ${sanpham[i].amount}</span>
            </option>
            `;
  }
  document.getElementById("tableContent").innerHTML = product;
  alert("Thêm sản phẩm thành công ");
}
// hiển thị danh sách trong list select
function load() {
  let ListStudent = localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [];
  let product = `
            <option value="">Danh Sách Sản Phẩm</option>
           `;
  ListStudent.map((value, index) => {
    product += `
            <option value='${index}'>
                <span class="stt">STT:${index + 1}</span>
                <br/>
                <span>${value.name}</span>
                <br/>
            </option>
            `;
  });
  document.getElementById("tableContent").innerHTML = product;
}

// xử lý xoá sản phẩm
function Delete(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem = tr.children[1].innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrTable.length; i++) {
    if (arrTable[i].name == nameItem) {
      arrTable.splice(i, 1);
    }
  }
  cartTotal();
}
// xử lý trùng item
// đưa dữ liệu đã chọn trong select ra table item
function renderTable() {
  let select2 = document.getElementById("tableContent").value;
  let local = JSON.parse(localStorage.getItem("product"));
  for (var i = 0; i < arrTable.length; i++) {
    if (local[select2].name == arrTable[i].name) {
      alert("Sản phẩm đã có trong giỏ hàng");
      return;
    }
  }
  arrTable.push(local[select2]);
  var addtr = document.createElement("tr");
  var cartTable = document.querySelector(".table_item");
  cartTable.append(addtr);
  for (var i = 0; i < arrTable.length; i++) {
    tt = arrTable[i].price * 1;
    addtr.innerHTML = ` <tr>
            <td style='width:110px'><button onclick="Delete(this)">xoá</button></td> 
            <td style='text-align:start'> 
            <span class='name'>${arrTable[i].name}</span>
            <td style='width:110px;text-align:end'><input type='number' value='1' min='1' class='inputvalue' style='width:150px'></td>
            <td style='width:110px;text-align:end'>${arrTable[i].price}</td>
            <td style='width:110px;text-align:end'> <span class='tt'>${tt}</span></td>
            </tr>`;
  }
  cartTotal();
  InputChange();
  Delete();
}
// xử lý tính tổng tiền
function cartTotal() {
  var totalC = 0;
  var cartItem = document.querySelectorAll(".table_item tr");

  for (var i = 0; i < cartItem.length; i++) {
    var inputCart = cartItem[i].querySelector("input").value;
    var totalA = arrTable[i].price * inputCart;
    var carTotalA = cartItem[i].querySelector(".tt");
    carTotalA.innerHTML = totalA.toLocaleString("de-DE");
    totalC += totalA;
  }
  var CartTotal = document.querySelector("#price-total span");
  CartTotal.innerHTML = totalC
}
function InputChange() {
  var cartItem = document.querySelectorAll(".table_item tr");
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input");
    inputValue.addEventListener("change", () => {
      cartTotal();
    });
  }
}

// ẨN HIỆN POPUP SẢN PHẨM
document.querySelector("#oneScreen").style.display = "none";
document.querySelector("#oneScreen2").style.display = "none";
document.getElementById("btntanghang1").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};
document.querySelector("#btntanghang2").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};

document.getElementById("btngiamgia1").onclick = function () {
  document.querySelector("#oneScreen2").style.display = "none";
};
document.querySelector("#btngiamgia2").onclick = function () {
  document.querySelector("#oneScreen2").style.display = "none";
};
document.querySelector(".modalSearch").onclick = function () {
  document.querySelector("#oneScreen").style.display = "block";
};
document.querySelector(".modalSearch2").onclick = function () {
  document.querySelector("#oneScreen2").style.display = "block";
};

// modal
var modal = document.getElementById("myModal");
var table = document.getElementById("showItem");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var btnApply = document.getElementById("btn-main");
btnApply.onclick = function () {
  modal.style.display = "none";
};
btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// hang giam gia
var table1 = document.getElementById("showItem1");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// tăng giảm số lượng
//                                    -------------------Hàng Tặng----------------------
// gọi dữ liệu từ json
fetch("hangtang.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    localStorage.setItem("hangtang", JSON.stringify(products));
    let placeholder = document.querySelector("#hh_item");
    let out = "";
    for (let product of products) {
      out += `
      <tr > 
        <td class="inputcheck">
        <input type="checkbox"  class="check"/>
          <input type="hidden" class="id" value="${product.id}" />
          <input type="hidden" class="name" value="${product.hhName}" />    
          <input type="hidden" class="price" value="${product.hhPrice}" />  
        </td>
        <td > ${product.hhName} </td>
        <td > ${product.hhPrice} </td>
      </tr>
    `;
    }
    placeholder.innerHTML = out;
  });

// lấy giá trị khi click checkbox
let btnShow2 = document.querySelector("#btntanghang1");
btnShow2.addEventListener("click", () => {
  var modal_hang = document.querySelector(".modal_hanghoa");
  var modal_table = modal_hang.querySelector("table");
  var modal_tbody = modal_table.querySelector("tbody");
  var modal_row = modal_tbody.getElementsByTagName("tr");
  for (let i = 0; i < modal_row.length; i++) {
    var td = modal_row[i].getElementsByClassName("inputcheck");
    // var input =  td.getElementsByClassName('check');
    var checkbox = modal_row[i].querySelector('input[type="checkbox"]');

    if (checkbox.checked == true) {
      var codeItem = checkbox.parentElement.querySelector(".id").value;
      var nameItem = checkbox.parentElement.querySelector(".name").value;
      var priceItem = checkbox.parentElement.querySelector(".price").value;
      for (let i = 0; i < arrChooseItem.length; i++) {
        if (codeItem == arrChooseItem[i].id) {
          alert("sản phẩm khuyến mãi đã có trong giỏ hàng");
          return;
        }
        //  if(codeItem == arrChooseItem[i].id)
        //  {
        //    var codeitem = checkbox.parentElement.querySelector('.id')
        //    codeitem.parentElement.querySelector('input[type="checkbox"]').checked = true;
        //  }
      }
      arrChooseItem.push({
        id: codeItem,
        name: nameItem,
        price: priceItem,
      });
    }
  }
  document.querySelector("#oneScreen").style.display = "none";
  let addtr2 = ``;
  for (let i = 0; i < arrChooseItem.length; i++) {
    addtr2 += `<tr>
      <td style='width:100px'><button onclick="Delete2(this)">xoá</button></td>
      <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrChooseItem[i].name} </p>
        <p style="margin-bottom:0"> ${arrChooseItem[i].id} </p>
        <input type="hidden" class="nameItem1" value="${arrChooseItem[i].name}">
        <input type="hidden" class="PriceItem1" value="${arrChooseItem[i].price}">
        <input type="hidden" class="IdItem1" value="${arrChooseItem[i].id}">
      </td>
      <td style="width:40%"><button onclick="countUp(this)">+</button><input name="amoutItem"type="text" class="txt_invoer" style=" text-align: center;
        width: 50px;" value="1" ><button onclick="countDown(this)">-</button></td>
    </tr>
    `;
    if (
      checkbox.parentElement.querySelector(".id").value == arrChooseItem[i].id
    ) {
      checkbox.checked = true;
    }
  }
  document.querySelector("#table_item_hh").innerHTML = addtr2;
  alert("Thêm sản phẩm khuyến mãi thành công");
  TotalItem();
});
function TotalItem() {
  var up = document.querySelectorAll(".txt_invoer");
  var tongtai = 0;
  for (let i = 0; i < arrChooseItem.length; i++) {
    var tong = arrChooseItem[i].price * up[i].value;
    tongtai += tong;
  }
  document.querySelector("#tt2").innerHTML = tongtai;
}
function Delete2(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem = tr.children[1].querySelector(".itemlist").innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrChooseItem.length; i++) {
    if (arrChooseItem[i].name == nameItem) {
      arrChooseItem.splice(i, 1);
    }
  }
  TotalItem();
}
function countUp(x) {
  let up = x.parentElement.querySelector(".txt_invoer");
  var i = parseInt(up.value, 10);
  up.value = ++i;
  TotalItem();
}
function countDown(x) {
  let up = x.parentElement.querySelector(".txt_invoer");
  var i = parseInt(up.value, 0);
  up.value = --i;
  TotalItem();
}

// -------------- Hàng giảm giá-----------------
fetch("hanggiamgia.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    localStorage.setItem("hanggiamgia", JSON.stringify(products));
    let placeholder2 = document.querySelector("#hh_item2");
    let out = "";
    for (let product of products) {
      out += `
      <tr > 
        <td class="inputcheck">
        <input type="checkbox"  class="check"/>
          <input type="hidden" class="id" value="${product.id}" />
          <input type="hidden" class="name" value="${product.hhName}" />    
          <input type="hidden" class="price" value="${product.hhPrice}" />  
          <input type="hidden" class="sale" value="${product.hhSale}" />  
        </td>
        <td > ${product.hhName} </td>
        <td > ${product.hhPrice} </td>
      </tr>
    `;
    }
    placeholder2.innerHTML = out;
  });
let btnShow3 = document.querySelector("#btngiamgia1");
btnShow3.addEventListener("click", () => {
  var modal_hang1 = document.querySelector(".modal_hanghoa1");
  var modal_table1 = modal_hang1.querySelector("table");
  var modal_tbody1 = modal_table1.querySelector("tbody");
  var modal_row1 = modal_tbody1.getElementsByTagName("tr");
  for (let i = 0; i < modal_row1.length; i++) {
    var td = modal_row1[i].getElementsByClassName("inputcheck");
    // var input =  td.getElementsByClassName('check');
    var checkbox1 = modal_row1[i].querySelector('input[type="checkbox"]');

    if (checkbox1.checked == true) {
      var codeItem1 = checkbox1.parentElement.querySelector(".id").value;
      var nameItem1 = checkbox1.parentElement.querySelector(".name").value;
      var priceItem1 = checkbox1.parentElement.querySelector(".price").value;
      var SaleItem1 = checkbox1.parentElement.querySelector('.sale').value
      for (let i = 0; i < arrChooseItem1.length; i++) {
        if (codeItem1 == arrChooseItem1[i].id) {
          alert("sản phẩm khuyến mãi đã có trong giỏ hàng");
          return;
        }
      }
      arrChooseItem1.push({
        id: codeItem1,
        name: nameItem1,
        price: priceItem1,
        sale: SaleItem1,
      });
    }
  }
  document.querySelector("#oneScreen").style.display = "none";
  let addtr1 = ``;
  for (let i = 0; i < arrChooseItem1.length; i++) {
    addtr1 += `<tr>
      <td style='width:100px'><button onclick="Delete3(this)">xoá</button></td>
      <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrChooseItem1[i].name} </p>
        <p style="margin-bottom:0" > ${arrChooseItem1[i].id} </p>
        <input type="hidden" class="nameItem2" value="${arrChooseItem1[i].name}">
        <input type="hidden" class="PriceItem2" value="${arrChooseItem1[i].price}">
        <input type="hidden" class="IdItem2" value="${arrChooseItem1[i].id}">
        <input type="hidden" class="SaleItem2" value="${arrChooseItem1[i].sale}">
      </td>
      <td style="width:40%"><button onclick="countUp1(this)">+</button><input name="amoutItem" type="text" class="txt_invoer2" style=" text-align: center;
        width: 50px;" value="1" ><button onclick="countDown1(this)">-</button></td>
    </tr>
    `;
  }
  document.querySelector("#hh_item2_3").innerHTML = addtr1;
  alert("Thêm sản phẩm khuyến mãi thành công");
  TotalItem1();
});
function Delete3(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem = tr.children[1].querySelector(".itemlist").innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrChooseItem1.length; i++) {
    if (arrChooseItem1[i].name == nameItem) {
      arrChooseItem1.splice(i, 1);
    }
  }
  TotalItem1();
}
function TotalItem1() {
  var up = document.querySelectorAll(".txt_invoer2");
  var tongtai1 = 0;
  for (let i = 0; i < arrChooseItem1.length; i++) {
    var tong1 = arrChooseItem1[i].price * up[i].value - arrChooseItem1[i].sale;
    tongtai1 += tong1;
  }
  console.log(tongtai1)
  document.querySelector("#tt4").innerHTML = tongtai1;
}
function countUp1(x) {
  let up = x.parentElement.querySelector(".txt_invoer2");
  var i = parseInt(up.value, 10);
  up.value = ++i;
  TotalItem1();
}

function abc(list){
  let tbody = '';
  for(var i = 0; i < list.length; i++){
    var product = list[i];
    tbody += '<tr>';
    tbody += '<td>' + product.Code+'</td>';
    tbody += '<td>' + product.Name+'</td>';
    tbody +='</tr>';
  }

  var tr = `<tr><td>${product.Code}}</td</tr>`
}

function countDown1(x) {

  let up = x.parentElement.querySelector(".txt_invoer2");
  var i = parseInt(up.value, 0);
  up.value = --i;
  TotalItem1();
}
// ----------------- Tặng hàng promax -------------------------

// js hàng tặng 2.2 promax
// modal hàng tặng 2
document.querySelector("#oneScreen1").style.display = "none";
document.querySelector("#btn22").onclick = function () {
  document.querySelector("#oneScreen1").style.display = "none";
};
document.querySelector(".modalSearch1").onclick = function () {
  document.querySelector("#oneScreen1").style.display = "block";
};
document.querySelector("#btn12").onclick = function () {
  document.querySelector("#oneScreen1").style.display = "none";
};
// gọi dữ liệu từ json
fetch("hangtangpro.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    localStorage.setItem("hangtang2", JSON.stringify(products));
    let placeholder = document.querySelector("#hh_item1");
    let out = "";
    for (let product of products) {
      out += `
      <tr >
        <td class="inputcheck">
        <input type="checkbox"  class="check"/>
          <input type="hidden" class="id" value="${product.id}" />
          <input type="hidden" class="name" value="${product.hhName}" />
          <input type="hidden" class="price" value="${product.hhPrice}" />
        </td>
        <td > ${product.hhName} </td>
        <td > ${product.hhPrice} </td>
      </tr>
    `;
    }
    placeholder.innerHTML = out;
  });
// lấy giá trị khi click checkbox
let btnShow4 = document.querySelector("#btn12");
btnShow4.addEventListener("click", () => {
  var modal_hang2 = document.querySelector(".modal_hanghoa2");
  var modal_table2 = modal_hang2.querySelector("table");
  var modal_tbody2 = modal_table2.querySelector("tbody");
  var modal_row2 = modal_tbody2.getElementsByTagName("tr");
  for (let i = 0; i < modal_row2.length; i++) {
    var td = modal_row2[i].getElementsByClassName("inputcheck");
    // var input =  td.getElementsByClassName('check');
    var checkbox2 = modal_row2[i].querySelector('input[type="checkbox"]');
    if (checkbox2.checked == true) {
      var codeItem2 = checkbox2.parentElement.querySelector(".id").value;
      var nameItem2 = checkbox2.parentElement.querySelector(".name").value;
      var priceItem2 = checkbox2.parentElement.querySelector(".price").value;
      for (let i = 0; i < arrChooseItem2.length; i++) {
        if (codeItem2 == arrChooseItem2[i].id) {
          alert("sản phẩm khuyến mãi đã có trong giỏ hàng");
          return;
        }
      }
      arrChooseItem2.push({
        id: codeItem2,
        name: nameItem2,
        price: priceItem2,
      });
    }
  }
  document.querySelector("#oneScreen1").style.display = "none";
  let addtr22 = ``;
  for (let i = 0; i < arrChooseItem2.length; i++) {
    addtr22 += `<tr>
      <td style='width:100px'><button onclick="Delete4(this)">xoá</button></td>
      <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrChooseItem2[i].name} </p>
        <p style="margin-bottom:0"> ${arrChooseItem2[i].id} </p>
        <input type="hidden" class="nameItem3" value="${arrChooseItem2[i].name}">
        <input type="hidden" class="PriceItem3" value="${arrChooseItem2[i].price}">
        <input type="hidden" class="IdItem3" value="${arrChooseItem2[i].id}">
      </td>
      <td style="width:40%"><button onclick="countUp2(this)">+</button><input type="text" name="amoutItem" class="txt_invoer3" style=" text-align: center;
        width: 50px;" value="1" ><button onclick="countDown2(this)">-</button></td>
    </tr>
    `;
  }
  document.querySelector("#table_item_hh1").innerHTML = addtr22;
  alert("Thêm sản phẩm khuyến mãi thành công");
  TotalItem2();
});
function Delete4(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem2 = tr.children[1].querySelector(".itemlist").innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrChooseItem2.length; i++) {
    if (arrChooseItem2[i].name == nameItem2) {
      arrChooseItem2.splice(i, 1);
    }
  }
  TotalItem2();
}
function TotalItem2() {
  var up = document.querySelectorAll(".txt_invoer3");
  var tongtai2 = 0;
  for (let i = 0; i < arrChooseItem2.length; i++) {
    var tong2 = arrChooseItem2[i].price * up[i].value;
    tongtai2 += tong2;
  }
  console.log(tongtai2)
  document.querySelector("#tt3").innerHTML = tongtai2;
}
function countUp2(x) {
  let up = x.parentElement.querySelector(".txt_invoer3");
  var i = parseInt(up.value, 10);
  up.value = ++i;
  TotalItem2();
}
function countDown2(x) {
  let up = x.parentElement.querySelector(".txt_invoer3");
  var i = parseInt(up.value, 0);
  up.value = --i;
  TotalItem2();
}

// ----------- Giảm giá voucher------------------\
var inputVoucher = document.querySelector("#input-voucher");
var outputVoucher = document.querySelector("#table_item_voucher");

inputVoucher.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    var valueVoucher = inputVoucher.value;
    for (let i = 0; i < arrVoucher.length; i++) {
      if (valueVoucher == arrVoucher[i].name3) {
        alert("mã voucher trùng");
        return;
      }
    }
    arrVoucher.push({
      name3: valueVoucher,
    });
    var voucher = "";
    for (let i = 0; i < arrVoucher.length; i++) {
      voucher += `
    <tr>
    <td style='width:100px'><button onclick="DeleteVoucher(this)">xoá</button></td>
    <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrVoucher[i].name3} </p>
    </td>
  </tr>
    `;
    }

    outputVoucher.innerHTML = voucher;
  }
});
function DeleteVoucher(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem = tr.children[1].querySelector(".itemlist").innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrVoucher.length; i++) {
    if (arrVoucher[i].name3 == nameItem) {
      arrVoucher.splice(i, 1);
    }
  }
  TotalItem();
}


// Check / Uncheck All Checkboxes
var checkboxes = document.querySelectorAll("input[type = 'checkbox']");
function checkAll(myCheckbox) {
  if (myCheckbox.checked == true) {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = true;
    });
  } else {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  }
}
// ----------- In hàng tặng ra màn hình main------------------\
let btnShowMain = document.querySelector("#btn-main");
btnShowMain.addEventListener("click", () => {


  let modalMain = document.querySelector("#modal-contentTable");
  let modalMainTr = modalMain.querySelectorAll(".tr-modal");
  console.log(modalMainTr);
  for (let i = 0; i < modalMainTr.length; i++) {
    var checkboxMain = modalMainTr[i].querySelector('input[type="checkbox"]');
    if (checkboxMain.checked == true) {
      let NameModalMain = checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem1")
      for(let i=0;i< NameModalMain.length;i++){
        let NameItemHangTang = checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem1")[i].value;
        let PriceItemlMain = checkboxMain.parentElement.parentElement.querySelectorAll(".PriceItem1")[i].value;
        let IdItemlMain = checkboxMain.parentElement.parentElement.querySelectorAll(".IdItem1")[i].value;
        let AmoutItemMain = checkboxMain.parentElement.parentElement.querySelectorAll(".txt_invoer")[i].value;
        arrTotalHangTang.push({
          id:IdItemlMain,
          name: NameItemHangTang,
          price: PriceItemlMain,
          amout: AmoutItemMain,
          
        });
      }
      let NameModalMain2 = checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem2")
      for(let i=0;i< NameModalMain2.length;i++){
        let NameItemHangTang1 = checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem2")[i].value;
        let IdItemlMain1 = checkboxMain.parentElement.parentElement.querySelectorAll(".IdItem2")[i].value;
        let PriceItemlMain1 = checkboxMain.parentElement.parentElement.querySelectorAll(".PriceItem2")[i].value;
        let AmoutItemMain1 = checkboxMain.parentElement.parentElement.querySelectorAll(".txt_invoer2")[i].value;
        let SaleItem1 = checkboxMain.parentElement.parentElement.querySelectorAll(".SaleItem2")[i].value;
        arrTotalHangGiamGia.push({
          id: IdItemlMain1,
          name: NameItemHangTang1,
          price: PriceItemlMain1,
          sale: SaleItem1,
          amout: AmoutItemMain1,
        });
      }

      let NameModalMain3 = checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem3")
      for(let i=0;i< NameModalMain3.length;i++){
        let NameItemHangTang3 = checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem3")[i].value;
        let IdItemlMain3 = checkboxMain.parentElement.parentElement.querySelectorAll(".IdItem3")[i].value;
        let PriceItemlMain3 = checkboxMain.parentElement.parentElement.querySelectorAll(".PriceItem3")[i].value;
        let AmoutItemMain3 = checkboxMain.parentElement.parentElement.querySelectorAll(".txt_invoer3")[i].value;
        arrTotalHangTangPro.push({
          id: IdItemlMain3,
          name: NameItemHangTang3,
          price: PriceItemlMain3,
          amout: AmoutItemMain3,
        });
      }
    }
  }
  console.log(arrTotalHangTang)
  console.log(arrTotalHangGiamGia)
  console.log(arrTotalHangTangPro)
  checkAmoutItem(arrTotalHangTang,arrTotalHangGiamGia,arrTotalHangTangPro )
});

function checkAmoutItem(amoutTotalHangTang,amoutTotalHangGiamGia, arrTotalHangTangPro  ){
  let amoutTotalHangTang1 = 0
  for(let i=0; i<amoutTotalHangTang.length;i++){
      amoutTotalHangTang1 += parseInt(arrTotalHangTang[i].amout)
  }
  if(amoutTotalHangTang1 <= 10){
    let amoutTotalHangTangPro1 = 0
    for(let i=0; i<arrTotalHangTangPro.length;i++){
      amoutTotalHangTangPro1 += parseInt(arrTotalHangTangPro[i].amout)
  
    }
    if(amoutTotalHangTangPro1 <= 5){
      let amoutTotalHangGiamGia = 0
      for(let i=0; i<arrTotalHangGiamGia.length;i++){
        amoutTotalHangGiamGia += parseInt(arrTotalHangGiamGia[i].amout)
    
      }
      if(amoutTotalHangGiamGia <= 3){
        renderDataKhuyenMai()
      }
      else{
        alert('Sản phẩm hàng giảm giá 2.4 chọn đã vượt quá số lượng');
        return;
      }
    }
    else{
      alert('Sản phẩm Hàng giảm giá 2.3 chọn đã vượt quá số lượng');
      return;
    }
  
  }
  else{
    alert('Sản phẩm chọn Hàng khuyến mãi 2.2 đã vượt quá số lượng');
    return;
  }

}

function renderDataKhuyenMai(){
  var popup = document.querySelector("#tablePopupRender");
  hangtang = ''
for(let i=0; i < arrTotalHangTang.length;i++){
  let tt03 = arrTotalHangTang[i].price * arrTotalHangTang[i].amout
  hangtang += `
          <tr>
          <td style='text-align:start'> 
          <span class='name'>
          <p>${arrTotalHangTang[i].name}</p>
          <p>${arrTotalHangTang[i].id}</p>
          </span>
          <td style='width:110px;text-align:end'>${arrTotalHangTang[i].amout}</td>
          <td style='width:110px;text-align:end'> <span class='tt'>
          <p>0</p>
          <p style="text-decoration: line-through;color:red;font-weight:300">${ arrTotalHangTang[i].price}</p>
          </span></td>
          <td style='width:110px;text-align:end'> 
          <span class='tt'>
          <p>0</p>
          <p style="text-decoration: line-through;color:red;font-weight:300">${tt03}</p>
          </span>
          </td>
          </tr>`;
    }
    popup.innerHTML = hangtang;


    var popup1 = document.querySelector("#tablePopupRender1");
    hangpro = ''
  for(let i=0; i < arrTotalHangTangPro.length;i++){
    let tt02 = arrTotalHangTangPro[i].price * arrTotalHangTangPro[i].amout
    hangpro += `
            <tr>
            <td style='text-align:start'> 
            <span class='name'>
            <p>${arrTotalHangTangPro[i].name}</p>
            <p>${arrTotalHangTangPro[i].id}</p>
            </span>
            <td style='width:110px;text-align:end'>${arrTotalHangTangPro[i].amout}</td>
            <td style='width:110px;text-align:end'> <span class='tt'>
            <p>0</p>
            <p style="text-decoration: line-through;color:red;font-weight:300">${arrTotalHangTangPro[i].price}</p>
            </span></td>
            <td style='width:110px;text-align:end'> 
            <span class='tt'>
            <p>0</p>
            <p style="text-decoration: line-through;color:red;font-weight:300">${tt02}</p>
            </span>
            </td>
            </tr>`;
      }
      popup1.innerHTML = hangpro;


      var popup2 = document.querySelector("#tablePopupRender2");
      hangGiam = ''
    for(let i=0; i < arrTotalHangGiamGia.length;i++){
      let tt01 = arrTotalHangGiamGia[i].price - arrTotalHangGiamGia[i].sale;
      let th01 = tt01* arrTotalHangGiamGia[i].amout;
      hangGiam += `
              <tr>
              <td style='text-align:start'> 
              <span class='name'>
              <p>${arrTotalHangGiamGia[i].name}</p>
              <p>${arrTotalHangGiamGia[i].id}</p>
              </span>
              <td style='width:110px;text-align:end'>${arrTotalHangGiamGia[i].amout}</td>
              <td style='width:110px;text-align:end'> 
              <span class='tt'>
              <p>${tt01}</p>
              <p style="text-decoration: line-through;color:red;font-weight:300">${arrTotalHangGiamGia[i].sale}</p>
              
              </span>
              </td>
              <td style='width:110px;text-align:end'> 
              <span class='tt'>
              <p class="giaphaitra">${th01}</p>
              <p style="text-decoration: line-through;color:red;font-weight:300">${arrTotalHangGiamGia[i].sale}</p>
              </span>
              </td>
              </tr>`;
        }

        popup2.innerHTML = hangGiam;
        hello()
}
function hello(){
  var he1=0;
  if(document.querySelector("#option-b").checked == true){
    let valueGiamGiaDon = document.querySelector(".khuyenmaigiamdon");
    var he = document.querySelector("#Valuegiamgiadonhang");
    he.innerHTML = valueGiamGiaDon.value;
    he1 = valueGiamGiaDon.value;
  }
  var giaphaitra = document.querySelectorAll(".giaphaitra");
  var ValueGiaGiam = 0;
  for(let i=0; i< giaphaitra.length;i++)
  {
    var valueGia = giaphaitra[i].innerText;
    console.log(giaphaitra[i].innerText)
    ValueGiaGiam += parseInt(valueGia);
  }
  var tongtienhang1 = document.querySelector("#tongtienhang1")
  var tongtienhang = document.querySelector("#tongtienhang").innerText;
  var tongphaithu = document.querySelector("#tongphaithu");
  tongphaithu.innerHTML = parseInt(tongtienhang) + ValueGiaGiam - he1;
  tongtienhang1.innerHTML = parseInt(tongtienhang) + ValueGiaGiam;

}

