let sanpham = [];
let arrTable = [];
let arrChooseItem = [];
let ListItem = JSON.parse(localStorage.getItem("hangtang"));
var ListArray = document.getElementsByClassName("check");

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
// hàm lưu dữ liệu khi điền
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
// hiển thị danh sách chọn
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
  var cartItem = document.querySelectorAll(".table_item tr");
  var totalC = 0;
  for (var i = 0; i < cartItem.length; i++) {
    var inputCart = cartItem[i].querySelector("input").value;
    var totalA = arrTable[i].price * inputCart;
    var carTotalA = cartItem[i].querySelector(".tt");
    carTotalA.innerHTML = totalA.toLocaleString("de-DE");
    totalC += totalA;
  }
  var CartTotal = document.querySelector("#price-total span");
  CartTotal.innerHTML = totalC.toLocaleString("de-DE");
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
document.querySelector("#btn2").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};
document.querySelector(".modalSearch").onclick = function () {
  document.querySelector("#oneScreen").style.display = "block";
};
document.getElementById("btn1").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};
// modal
var modal = document.getElementById("myModal");
var table = document.getElementById("showItem");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var btnApply = document.getElementById("btn-main");
btn.onclick = function () {
  modal.style.display = "block";
};
btnApply.onclick = function () {
  table.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// tăng giảm số lượng
function countUp() {
  var txtInvoer = document.getElementById("txt_invoer");
  var i = parseInt(txtInvoer.value, 10);
  txtInvoer.value = ++i;
}
function countDown() {
  var txtInvoer = document.getElementById("txt_invoer");
  var i = parseInt(txtInvoer.value, 0);
  txtInvoer.value = --i;
}
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
        <td>
          <input type="hidden" class="id" value="${product.id}" />
          <input type="checkbox" onclick="getData(this)" class="check" value="${product.hhName}"/>
          <input type="hidden" class="name" value="${product.hhName}" />    
          <input type="hidden" class="price" value="${product.hhPrice}" />  
        </td>
        <td class="namehh" vua > ${product.hhName} </td>
        <td > ${product.hhPrice} </td>
      </tr>
    `;
    }
    placeholder.innerHTML = out;
  });
// lấy giá trị khi click checkbox
let btnShow2 = document.querySelector("#btn1");
let result2 = document.querySelector("#showItem");
btnShow2.addEventListener("click", () => {
  let checkbox2 = document.querySelector('input[type="checkbox"]:checked');
  console.log(checkbox2);
  result2.innerText = checkbox2.parentElement.textContent;
});

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
// xử lý xoá sản phẩm
function Delete2(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem = tr.children[1].innerText;
  console.log(nameItem);
  tr.remove();
  // xoá array
  for (let i = 0; i < arrChooseItem.length; i++) {
    if (arrChooseItem[i].name == nameItem) {
      arrChooseItem.splice(i, 1);
    }
  }
  cartTotal();
}
// function checkIcon() {
//   for (var value of ListArray) {
//     value.addEventListener("click", function () {
//       if (this.checked == true) {
//         arrChooseItem.push(ListItem[this.value]);
//         console.log(arrChooseItem);
//       } else {
//         arrChooseItem = arrChooseItem.filter((e) => e !== this.value);
//       }
//     });
//   }
// }

// click checkbox add value
let btnShow = document.querySelector("#btn-main");
let result = document.querySelector("#tt2");
btnShow.addEventListener("click", () => {
  let checkbox = document.querySelector('input[type="checkbox"]:checked');
  console.log(checkbox);
  result.innerText = checkbox.parentElement.textContent;
});
document.getElementById("btn1").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
  document.querySelector("#table_item_hh").innerHTML = ` <tr>
  <td style='width:100px'><button onclick="Delete2(this)">xoá</button></td>
  <td><button onclick="countUp()">+</button><input type="text" id="txt_invoer" style=" text-align: center;
  width: 50px;" value="1" ><button onclick="countDown()">-</button></td>
  </tr>
  `;
};
