let sanpham = []; // mảng chứa dữ liệu nhập từ form
let arrTable = []; // mảng chứa item đã chọn từ form select
let arrChooseItem = []; // mảng chứa item đã chọn từ popup tặng hàng
let arrChooseItem1 = []; // mảng chứa item đã chọn từ popup giảm giá hàng 2.3
let arrChooseItem2 = []; // mảng chứa item đã chọn từ popup tặng hàng 2.2 promax
let arrVoucher = [
  { id: 1, hhName: "code1", hhSale: 100 },
  { id: 2, hhName: "code2", hhSale: 200 },
  { id: 3, hhName: "code3", hhSale: 300 },
  { id: 4, hhName: "code4", hhSale: 400 },
]; //mảng chứa item đã nhập từ voucher
let arrTotalHangTang = []; // mảng chứa item lấy từ hàng tặng
let arrTotalHangTangPro = []; // mảng chứa item lấy từ hàng tặng pro
let arrTotalHangGiamGia = []; // mảng chứa item lấy từ hàng giảm giá
let arrGiamGiaDonHang = []; // mảng chứa giảm giá đơn hàng
let arrVoucherChoose = []; // mảng chứa voucher đã chọn
var totalC = 0;
let totalVoucher = 0;
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
function DeleteAll(x) {}
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
  CartTotal.innerHTML = totalC;
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

// -------------- Hàng giảm giá 2.2 -----------------
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
    var checkbox = modal_row[i].querySelector(".check");
    if (checkbox.checked == true) {
      var codeItem = checkbox.parentElement.querySelector(".id").value;
      var nameItem = checkbox.parentElement.querySelector(".name").value;
      var priceItem = checkbox.parentElement.querySelector(".price").value;
      for (let i = 0; i < arrChooseItem.length; i++) {
        if (codeItem == arrChooseItem[i].id) {
          alert("sản phẩm khuyến mãi đã có trong giỏ hàng");
          return;
        }
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
  }
  document.querySelector("#table_item_hh").innerHTML = addtr2;
  alert("Thêm sản phẩm khuyến mãi thành công");
  TotalItem();
  NumberItem();
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
function NumberItem() {
  var up = document.querySelectorAll(".txt_invoer");
  var sumAmout = 0;
  for (let i = 0; i < arrChooseItem.length; i++) {
    var sumAmout1 = up[i].value;
    sumAmout += sumAmout1;
  }
  document.querySelector("#sp2").innerHTML = sumAmout;
}

// hiện popup 2.2
document.querySelector("#oneScreen").style.display = "none";
document.querySelector(".modalSearch").onclick = function () {
  document.querySelector("#oneScreen").style.display = "block";
  checkedPopupChild();
};
document.getElementById("btntanghang1").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};
document.querySelector("#btntanghang2").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};
// Xoá 2.2
function Delete2(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  var nameItem = tr.children[1].querySelector(".itemlist").innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrChooseItem.length; i++) {
    if (arrChooseItem[i].name == nameItem) {
      arrChooseItem.splice(i, 1);
    }
  }
  TotalItem();
  let modal_hangjs = document.querySelector(".modal_hanghoa");
  let modal_tablejs = modal_hangjs.querySelector("table");
  let modal_tbodyjs = modal_tablejs.querySelector("tbody");
  let modal_rowjs = modal_tbodyjs.getElementsByTagName("tr");
  for (let i = 0; i < modal_rowjs.length; i++) {
    let get22tdjs = modal_rowjs[i].querySelector(".name").value;
    if (get22tdjs == nameItem) {
      let checkbox22 = modal_rowjs[i].querySelector(".check");
      checkbox22.checked = false;
      break;
    }
  }
}
// Xử lý đánh dấu checked khi mở popup 2.2
let checkedPopupChild = () => {
  let getName22modal = document.querySelector("#table_item_hh");
  let getName22modaltr = getName22modal.querySelectorAll("tr");
  for (let i = 0; i < getName22modaltr.length; i++) {
    let getName22modalTd =
      getName22modaltr[i].querySelector(".nameItem1").value;
    let modal_hangjs = document.querySelector(".modal_hanghoa");
    let modal_tablejs = modal_hangjs.querySelector("table");
    let modal_tbodyjs = modal_tablejs.querySelector("tbody");
    let modal_rowjs = modal_tbodyjs.getElementsByTagName("tr");
    for (let i = 0; i < modal_rowjs.length; i++) {
      let get22tdjs = modal_rowjs[i].querySelector(".name").value;
      if (get22tdjs == getName22modalTd) {
        let checkbox22 = modal_rowjs[i].querySelector(".check");
        checkbox22.checked = true;
        break;
      }
    }
  }
};
function countUp(x) {
  let up = x.parentElement.querySelector(".txt_invoer");
  var i = parseInt(up.value, 10);
  up.value = ++i;
  TotalItem();
  NumberItem();
}
function countDown(x) {
  let up = x.parentElement.querySelector(".txt_invoer");
  var i = parseInt(up.value, 0);
  up.value = --i;
  TotalItem();
  NumberItem();
}

// -------------- Hàng giảm giá 2.3  -----------------
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
    var checkbox1 = modal_row1[i].querySelector('input[type="checkbox"]');

    if (checkbox1.checked == true) {
      var codeItem1 = checkbox1.parentElement.querySelector(".id").value;
      var nameItem1 = checkbox1.parentElement.querySelector(".name").value;
      var priceItem1 = checkbox1.parentElement.querySelector(".price").value;
      var SaleItem1 = checkbox1.parentElement.querySelector(".sale").value;
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

// hiện popup 2.3
document.querySelector("#oneScreen2").style.display = "none";
document.querySelector(".modalSearch2").onclick = function () {
  document.querySelector("#oneScreen2").style.display = "block";
  checkedPopupChild3();
};
document.getElementById("btngiamgia1").onclick = function () {
  document.querySelector("#oneScreen2").style.display = "none";
};
document.querySelector("#btngiamgia2").onclick = function () {
  document.querySelector("#oneScreen2").style.display = "none";
};

// xoá 2.3
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
  let modal_hangjs = document.querySelector(".modal_hanghoa1");
  let modal_tablejs = modal_hangjs.querySelector("table");
  let modal_tbodyjs = modal_tablejs.querySelector("tbody");
  let modal_rowjs = modal_tbodyjs.getElementsByTagName("tr");
  for (let i = 0; i < modal_rowjs.length; i++) {
    let get22tdjs = modal_rowjs[i].querySelector(".name").value;

    if (get22tdjs == nameItem) {
      let checkbox22 = modal_rowjs[i].querySelector(".check");

      checkbox22.checked = false;
      break;
    }
  }
}
// Xử lý checked khi mở popup 2.3
let checkedPopupChild3 = () => {
  let getName22modal = document.querySelector("#hh_item2_3");
  let getName22modaltr = getName22modal.querySelectorAll("tr");
  for (let i = 0; i < getName22modaltr.length; i++) {
    let getName22modalTd =
      getName22modaltr[i].querySelector(".nameItem2").value;
    let modal_hangjs = document.querySelector(".modal_hanghoa1");
    let modal_tablejs = modal_hangjs.querySelector("table");
    let modal_tbodyjs = modal_tablejs.querySelector("tbody");
    let modal_rowjs = modal_tbodyjs.getElementsByTagName("tr");
    for (let i = 0; i < modal_rowjs.length; i++) {
      let get22tdjs = modal_rowjs[i].querySelector(".name").value;
      if (get22tdjs == getName22modalTd) {
        let checkbox22 = modal_rowjs[i].querySelector(".check");
        checkbox22.checked = true;
        break;
      }
    }
  }
};
function TotalItem1() {
  var up = document.querySelectorAll(".txt_invoer2");
  var tongtai1 = 0;
  for (let i = 0; i < arrChooseItem1.length; i++) {
    var tong1 = arrChooseItem1[i].price * up[i].value - arrChooseItem1[i].sale;
    tongtai1 += tong1;
  }
  document.querySelector("#tt4").innerHTML = tongtai1;
}
function countUp1(x) {
  let up = x.parentElement.querySelector(".txt_invoer2");
  var i = parseInt(up.value, 10);
  up.value = ++i;
  TotalItem1();
}

function abc(list) {
  let tbody = "";
  for (var i = 0; i < list.length; i++) {
    var product = list[i];
    tbody += "<tr>";
    tbody += "<td>" + product.Code + "</td>";
    tbody += "<td>" + product.Name + "</td>";
    tbody += "</tr>";
  }

  var tr = `<tr><td>${product.Code}}</td</tr>`;
}

function countDown1(x) {
  let up = x.parentElement.querySelector(".txt_invoer2");
  var i = parseInt(up.value, 0);
  up.value = --i;
  TotalItem1();
}
// ----------------- Tặng hàng promax 2.2  -------------------------

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

// modal hàng tặng 2.2 promax
document.querySelector("#oneScreen1").style.display = "none";
document.querySelector("#btn22").onclick = function () {
  document.querySelector("#oneScreen1").style.display = "none";
};
document.querySelector(".modalSearch1").onclick = function () {
  document.querySelector("#oneScreen1").style.display = "block";
  checkedPopupChild2();
};
document.querySelector("#btn12").onclick = function () {
  document.querySelector("#oneScreen1").style.display = "none";
};
//  Xử lý checked khi mở popup 2.2 promax
let checkedPopupChild2 = () => {
  let getName22modal = document.querySelector("#table_item_hh1");
  let getName22modaltr = getName22modal.querySelectorAll("tr");
  for (let i = 0; i < getName22modaltr.length; i++) {
    let getName22modalTd =
      getName22modaltr[i].querySelector(".nameItem3").value;
    let modal_hangjs = document.querySelector(".modal_hanghoa2");
    let modal_tablejs = modal_hangjs.querySelector("table");
    let modal_tbodyjs = modal_tablejs.querySelector("tbody");
    let modal_rowjs = modal_tbodyjs.getElementsByTagName("tr");
    for (let i = 0; i < modal_rowjs.length; i++) {
      let get22tdjs = modal_rowjs[i].querySelector(".name").value;
      if (get22tdjs == getName22modalTd) {
        let checkbox22 = modal_rowjs[i].querySelector(".check");
        checkbox22.checked = true;
        break;
      }
    }
  }
};

// Xoá Popup 2.2 promax
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
  let modal_hangjs = document.querySelector(".modal_hanghoa2");
  let modal_tablejs = modal_hangjs.querySelector("table");
  let modal_tbodyjs = modal_tablejs.querySelector("tbody");
  let modal_rowjs = modal_tbodyjs.getElementsByTagName("tr");
  for (let i = 0; i < modal_rowjs.length; i++) {
    let get22tdjs = modal_rowjs[i].querySelector(".name").value;
    if (get22tdjs == nameItem2) {
      let checkbox22 = modal_rowjs[i].querySelector(".check");

      checkbox22.checked = false;
      break;
    }
  }
}
function TotalItem2() {
  var up = document.querySelectorAll(".txt_invoer3");
  var tongtai2 = 0;
  for (let i = 0; i < arrChooseItem2.length; i++) {
    var tong2 = arrChooseItem2[i].price * up[i].value;
    tongtai2 += tong2;
  }
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
  for (let i = 0; i < modalMainTr.length; i++) {
    var checkboxMain = modalMainTr[i].querySelector('input[type="checkbox"]');
    if (checkboxMain.checked == true) {
      let NameModalMain =
        checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem1");
      for (let i = 0; i < NameModalMain.length; i++) {
        let NameItemHangTang =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".nameItem1"
          )[i].value;
        let PriceItemlMain =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".PriceItem1"
          )[i].value;
        let IdItemlMain =
          checkboxMain.parentElement.parentElement.querySelectorAll(".IdItem1")[
            i
          ].value;
        let AmoutItemMain =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".txt_invoer"
          )[i].value;
        arrTotalHangTang.push({
          id: IdItemlMain,
          name: NameItemHangTang,
          price: PriceItemlMain,
          amout: AmoutItemMain,
        });
      }
      let NameModalMain2 =
        checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem2");
      for (let i = 0; i < NameModalMain2.length; i++) {
        let NameItemHangTang1 =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".nameItem2"
          )[i].value;
        let IdItemlMain1 =
          checkboxMain.parentElement.parentElement.querySelectorAll(".IdItem2")[
            i
          ].value;
        let PriceItemlMain1 =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".PriceItem2"
          )[i].value;
        let AmoutItemMain1 =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".txt_invoer2"
          )[i].value;
        let SaleItem1 =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".SaleItem2"
          )[i].value;
        arrTotalHangGiamGia.push({
          id: IdItemlMain1,
          name: NameItemHangTang1,
          price: PriceItemlMain1,
          sale: SaleItem1,
          amout: AmoutItemMain1,
        });
      }

      let NameModalMain3 =
        checkboxMain.parentElement.parentElement.querySelectorAll(".nameItem3");
      for (let i = 0; i < NameModalMain3.length; i++) {
        let NameItemHangTang3 =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".nameItem3"
          )[i].value;
        let IdItemlMain3 =
          checkboxMain.parentElement.parentElement.querySelectorAll(".IdItem3")[
            i
          ].value;
        let PriceItemlMain3 =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".PriceItem3"
          )[i].value;
        let AmoutItemMain3 =
          checkboxMain.parentElement.parentElement.querySelectorAll(
            ".txt_invoer3"
          )[i].value;
        arrTotalHangTangPro.push({
          id: IdItemlMain3,
          name: NameItemHangTang3,
          price: PriceItemlMain3,
          amout: AmoutItemMain3,
        });
      }
    }
  }
  checkAmoutItem(arrTotalHangTang, arrTotalHangGiamGia, arrTotalHangTangPro);
});

function checkAmoutItem(
  amoutTotalHangTang,
  amoutTotalHangGiamGia,
  arrTotalHangTangPro
) {
  let amoutTotalHangTang1 = 0;
  for (let i = 0; i < amoutTotalHangTang.length; i++) {
    amoutTotalHangTang1 += parseInt(arrTotalHangTang[i].amout);
  }
  if (amoutTotalHangTang1 <= 10) {
    let amoutTotalHangTangPro1 = 0;
    for (let i = 0; i < arrTotalHangTangPro.length; i++) {
      amoutTotalHangTangPro1 += parseInt(arrTotalHangTangPro[i].amout);
    }
    if (amoutTotalHangTangPro1 <= 5) {
      let amoutTotalHangGiamGia = 0;
      for (let i = 0; i < arrTotalHangGiamGia.length; i++) {
        amoutTotalHangGiamGia += parseInt(arrTotalHangGiamGia[i].amout);
      }
      if (amoutTotalHangGiamGia <= 3) {
        renderDataKhuyenMai();
      } else {
        confirm("Sản phẩm hàng giảm giá 2.4 chọn đã vượt quá số lượng");
        const numbers24 = arrTotalHangGiamGia;
        numbers24.length = 0;
        arrTotalHangTang = [];
        arrTotalHangGiamGia = [];
        arrTotalHangTangPro = [];
        return;
      }
    } else {
      confirm("Sản phẩm Hàng giảm giá 2.3 chọn đã vượt quá số lượng");
      const numbers23 = arrTotalHangTangPro;
      numbers23.length = 0;
      arrTotalHangTang = [];
      arrTotalHangGiamGia = [];
      arrTotalHangTangPro = [];
      return;
    }
  } else {
    confirm("Sản phẩm chọn Hàng khuyến mãi 2.2 đã vượt quá số lượng");

    const numbers22 = amoutTotalHangTang;
    numbers22.splice(0, amoutTotalHangTang.length);
    numbers22.length = 0;
    arrTotalHangTang = [];
    arrTotalHangGiamGia = [];
    arrTotalHangTangPro = [];
    return;
  }
}

function renderDataKhuyenMai() {
  var popup = document.querySelector("#tablePopupRender");
  hangtang = "";
  for (let i = 0; i < arrTotalHangTang.length; i++) {
    let tt03 = arrTotalHangTang[i].price * arrTotalHangTang[i].amout;
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
          <p style="text-decoration: line-through;color:red;font-weight:300">${arrTotalHangTang[i].price}</p>
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
  hangpro = "";
  for (let i = 0; i < arrTotalHangTangPro.length; i++) {
    let tt02 = arrTotalHangTangPro[i].price * arrTotalHangTangPro[i].amout;
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
  hangGiam = "";
  for (let i = 0; i < arrTotalHangGiamGia.length; i++) {
    let tt01 = arrTotalHangGiamGia[i].price - arrTotalHangGiamGia[i].sale;
    let th01 = tt01 * arrTotalHangGiamGia[i].amout;
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
  hello();
  arrTotalHangTang = [];
  arrTotalHangGiamGia = [];
  arrTotalHangTangPro = [];
}
function hello() {
  var he1 = 0;
  if (document.querySelector("#option-b").checked == true) {
    let valueGiamGiaDon = document.querySelector(".khuyenmaigiamdon");
    var he = document.querySelector("#Valuegiamgiadonhang");
    he.innerHTML = valueGiamGiaDon.value;
    he1 = valueGiamGiaDon.value;
  }
  var giaphaitra = document.querySelectorAll(".giaphaitra");
  var ValueGiaGiam = 0;
  for (let i = 0; i < giaphaitra.length; i++) {
    var valueGia = giaphaitra[i].innerText;
    ValueGiaGiam += parseInt(valueGia);
  }
  var tongtienhang1 = document.querySelector("#tongtienhang1");
  var tongtienhang = document.querySelector("#tongtienhang").innerText;
  var tongphaithu = document.querySelector("#tongphaithu");
  tongphaithu.innerHTML = parseInt(tongtienhang) + ValueGiaGiam - he1;
  tongtienhang1.innerHTML = parseInt(tongtienhang) + ValueGiaGiam;
}
let checkChecked = document.querySelector("#btn-main");
// xử lý huỷ nút checkbox hàng khuyến mại khi in ra màn hình main
checkChecked.addEventListener("click", () => {
  let checkmodal = document.querySelector("#modal-contentTable");
  let checkmodalTr = checkmodal.querySelectorAll(".tr-modal");
  for (let i = 0; i < checkmodalTr.length; i++) {
    var checkboxModal = checkmodalTr[i].querySelector("input[type=checkbox]");
    if (checkboxModal.checked == true) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  }
});

// Voucher 2.5
let inputVoucher = document.querySelector(".tag-container input");
const tagContainer = document.querySelector(".tag-container");
const input = document.querySelector(".tag-container input");

let tags = [];
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    for (let i = 0; i < arrVoucher.length; i++) {
      if (e.target.value == arrVoucher[i].hhName && e.target.value != tags[i]) {
        e.target.value.split(",").forEach((tag) => {
          tags.push(tag);
        });
        addTags();
        getNameVoucher();
        input.value = "";
        return;
      }
    }
    alert("Mã voucher không đúng");
    input.value = "";
    return;
  }
});
function createTag(label) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  const span = document.createElement("span");
  span.innerHTML = label;
  const closeIcon = document.createElement("i");
  closeIcon.innerHTML = "x";
  closeIcon.setAttribute("class", "material-icons");
  closeIcon.setAttribute("data-item", label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}

function clearTags() {
  document.querySelectorAll(".tag").forEach((tag) => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  clearTags();
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      tagContainer.prepend(createTag(tag));
    });
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const tagLabel = e.target.getAttribute("data-item");
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    addTags();
  }
});
let getNameVoucher = () => {
  let modalMain = document.querySelector("#modal-contentTable");
  let modalMainTr = modalMain.querySelector(".tr-modal1");
  let voucherTableItem2 = modalMainTr.querySelector("#table_item2");
  let voucherSpan = voucherTableItem2.querySelectorAll("Span");
  arrVoucherChoose = [];
  totalVoucher = 0;
  for (let i = 0; i < voucherSpan.length; i++) {
    let voucherSpan2 = voucherSpan[i].innerHTML;
    for (let i = 0; i < arrVoucher.length; i++) {
      if (voucherSpan2 == arrVoucher[i].hhName) {
        var priceVoucher = arrVoucher[i].hhSale;
        if (arrVoucherChoose) {
          arrVoucherChoose.push({
            name: voucherSpan2,
            price: priceVoucher,
          });
        }
        totalVoucher += priceVoucher;
      }
    }
  }
  document.querySelector("#tt5").innerHTML = totalVoucher;

  console.log(arrVoucherChoose);
  console.log(totalVoucher);
};
