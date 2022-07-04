let sanpham = []; // mảng chứa dữ liệu nhập từ form
let arrTable = []; // mảng chứa item đã chọn từ form select
let arrChooseItem = []; // mảng chứa item đã chọn từ popup tặng hàng

let arrChooseItem2 = []; // mảng chứa item đã chọn từ popup tặng hàng

let arrChooseItem1 = []; // mảng chứa item đã chọn từ popup giảm giá hàng
let arrVoucher = []; //mảng chứa item đã nhập từ voucher

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
document.querySelector("#oneScreen2").style.display = "none";
document.getElementById("btntanghang1").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};

document.querySelector(".modalSearch").onclick = function () {
  document.querySelector("#oneScreen").style.display = "block";
};
document.querySelector("#btn1").onclick = function () {
  document.querySelector("#oneScreen").style.display = "none";
};
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

// hang giam gia
var table1 = document.getElementById("showItem1");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// tăng giảm số lượng

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

let btnShow = document.querySelector("#btn1");
btnShow.addEventListener("click", () => {
  var modal_hang = document.querySelector(".modal_hanghoa");
  var modal_table = modal_hang.querySelector("table");
  var modal_tbody = modal_table.querySelector("tbody");
  var modal_row = modal_tbody.querySelectorAll("tr");
  for (let i = 0; i < modal_row.length; i++) {
    var td = modal_row[i].getElementsByClassName("inputcheck");
    // var input =  td.getElementsByClassName('check');
    var checkbox = modal_row[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked == true) {
      var codeItem = checkbox.parentElement.querySelector(".id").value;
      var nameItem = checkbox.parentElement.querySelector(".name").value;
      var priceItem = checkbox.parentElement.querySelector(".price").value;
      console.log(codeItem);
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
    console.log(arrChooseItem);
  }
  document.querySelector("#oneScreen").style.display = "none";
  let addtr2 = ``;
  for (let i = 0; i < arrChooseItem.length; i++) {
    addtr2 += `<tr>

let btnShow2 = document.querySelector("#btntanghang1");
btnShow2.addEventListener("click", () => {
  var modal_hang = document.querySelector('.modal_hanghoa');
  var modal_table = modal_hang.querySelector('table');
   var modal_tbody = modal_table.querySelector('tbody');
   console.log(modal_tbody)
   var modal_row = modal_tbody.getElementsByTagName('tr');
   console.log(modal_row)
   for(let i = 0; i< modal_row.length; i ++)
   {
       var td = modal_row[i].getElementsByClassName('inputcheck');
      // var input =  td.getElementsByClassName('check');
       var checkbox = modal_row[i].querySelector('input[type="checkbox"]')

       if(checkbox.checked == true)
       {
         var codeItem = checkbox.parentElement.querySelector('.id').value
         var nameItem = checkbox.parentElement.querySelector('.name').value
         var priceItem = checkbox.parentElement.querySelector('.price').value
         for(let i=0;i< arrChooseItem.length;i++)
         {
           if(codeItem == arrChooseItem[i].id)
           {
             alert("sản phẩm khuyến mãi đã có trong giỏ hàng")
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

        console.log(arrChooseItem)
       }
   }
   document.querySelector("#oneScreen").style.display = "none";
  let addtr2 = ``
  for (let i=0; i< arrChooseItem.length; i++){
    addtr2 +=
    `<tr>

      <td style='width:100px'><button onclick="Delete2(this)">xoá</button></td>
      <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrChooseItem[i].name} </p>
        <p style="margin-bottom:0"> ${arrChooseItem[i].id} </p>
      </td>
      <td style="width:40%"><button onclick="countUp(this)">+</button><input type="text" class="txt_invoer" style=" text-align: center;
        width: 50px;" value="1" ><button onclick="countDown(this)">-</button></td>
    </tr>
    `;
      if(checkbox.parentElement.querySelector('.id').value == arrChooseItem[i].id)
  {
    checkbox.checked = true;
  }
  }
  alert("Thêm sản phẩm khuyến mãi thành công");
  document.querySelector("#table_item_hh").innerHTML = addtr2;

});
function Checked() {}

  alert('Thêm sản phẩm khuyến mãi thành công');
  TotalItem();
});
let btnShow3 = document.querySelector("#btngiamgia1");
btnShow3.addEventListener("click", () => {
  var modal_hang1 = document.querySelector('.modal_hanghoa1');
  var modal_table1 = modal_hang1.querySelector('table');
   var modal_tbody1 = modal_table1.querySelector('tbody');
   console.log(modal_tbody1)
   var modal_row1 = modal_tbody1.getElementsByTagName('tr');
   console.log(modal_row1)
   for(let i = 0; i< modal_row1.length; i ++)
   {
       var td = modal_row1[i].getElementsByClassName('inputcheck');
      // var input =  td.getElementsByClassName('check');
       var checkbox1 = modal_row1[i].querySelector('input[type="checkbox"]')

       if(checkbox1.checked == true)
       {
         var codeItem1 = checkbox1.parentElement.querySelector('.id').value
         var nameItem1 = checkbox1.parentElement.querySelector('.name').value
         var priceItem1 = checkbox1.parentElement.querySelector('.price').value
         for(let i=0;i< arrChooseItem1.length;i++)
         {
           if(codeItem1 == arrChooseItem1[i].id)
           {
             alert("sản phẩm khuyến mãi đã có trong giỏ hàng")
             return;
           }
          //  if(codeItem == arrChooseItem[i].id)
          //  {
          //    var codeitem = checkbox.parentElement.querySelector('.id')
          //    codeitem.parentElement.querySelector('input[type="checkbox"]').checked = true;
          //  }
         }
         arrChooseItem1.push({
          id: codeItem1,
          name: nameItem1,
          price: priceItem1,
        });

        console.log(arrChooseItem1)
       }
   }
   document.querySelector("#oneScreen").style.display = "none";
  let addtr1 = ``
  for (let i=0; i< arrChooseItem1.length; i++){
    addtr1 +=
    `<tr>
      <td style='width:100px'><button onclick="Delete3(this)">xoá</button></td>
      <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrChooseItem1[i].name} </p>
        <p style="margin-bottom:0"> ${arrChooseItem1[i].id} </p>
      </td>
      <td style="width:40%"><button onclick="countUp(this)">+</button><input type="text" class="txt_invoer" style=" text-align: center;
        width: 50px;" value="1" ><button onclick="countDown(this)">-</button></td>
    </tr>
    `;
  //     if(checkbox.parentElement.querySelector('.id').value == arrChooseItem1[i].id)
  // {
  //   checkbox1.checked = true;
  // }
  }
  document.querySelector("#hh_item2_3").innerHTML = addtr1;
  alert('Thêm sản phẩm khuyến mãi thành công');
  TotalItem();
});
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
=======
  console.log(arrChooseItem);
  TotalItem();
}
function Delete3(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem = tr.children[1].querySelector('.itemlist').innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrChooseItem1.length; i++) {
    if (arrChooseItem1[i].name == nameItem) {
      arrChooseItem1.splice(i, 1);
    }
  }
  console.log(arrChooseItem1);
  TotalItem();
}
function DeleteVoucher(x) {
  // xoá html
  let tr = x.parentElement.parentElement;
  let nameItem = tr.children[1].querySelector('.itemlist').innerText;
  tr.remove();
  // xoá array
  for (let i = 0; i < arrVoucher.length; i++) {
    if (arrVoucher[i].name3 == nameItem) {
      arrVoucher.splice(i, 1);
    }
  }
  console.log(arrChooseItem);
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
function TotalItem() {
  var up = document.querySelectorAll(".txt_invoer");
  var tongtai = 0;
  for (let i = 0; i < arrChooseItem.length; i++) {
    var tong = arrChooseItem[i].price * up[i].value;
    tongtai += tong;
  }
  document.querySelector("#tt2").innerHTML = tongtai;
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
// // lấy giá trị khi click checkbox
// lấy giá trị khi click checkbox
let btnShow2 = document.querySelector("#btn12");
btnShow2.addEventListener("click", () => {
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
      <td style='width:100px'><button onclick="Delete3(this)">xoá</button></td>
      <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrChooseItem2[i].name} </p>
        <p style="margin-bottom:0"> ${arrChooseItem2[i].id} </p>
      </td>
      <td style="width:40%"><button onclick="countUp(this)">+</button><input type="text" class="txt_invoer" style=" text-align: center;
        width: 50px;" value="1" ><button onclick="countDown(this)">-</button></td>
    </tr>
    `;
  }
  document.querySelector("#table_item_hh1").innerHTML = addtr22;
  alert("Thêm sản phẩm khuyến mãi thành công");
});
function Delete3(x) {
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
}

function Delete3(x) {
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
}
// xử lý voucher
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
        </td>
        <td > ${product.hhName} </td>
        <td > ${product.hhPrice} </td>
      </tr>
    `;
    }
    placeholder2.innerHTML = out;
  });

///voucher 
var inputVoucher = document.querySelector("#input-voucher")
var outputVoucher = document.querySelector("#table_item_voucher")

inputVoucher.addEventListener('keypress',(e)=>{

  if(e.keyCode == 13){
    debugger;
    var valueVoucher = inputVoucher.value;
    for(let i =0; i< arrVoucher.length; i++)
    {
      if(valueVoucher == arrVoucher[i].name3)
      {
        alert("mã voucher trùng");
        return;
      }
    }
  arrVoucher.push({
    name3: valueVoucher,
  })
  console.log(arrVoucher)
  var voucher = "";
  for(let i=0; i< arrVoucher.length;i++)
  {
    voucher += `
    <tr>
    <td style='width:100px'><button onclick="DeleteVoucher(this)">xoá</button></td>
    <td> <p style="font-weight: 500; margin-bottom: 0" class="itemlist">${arrVoucher[i].name3} </p>
    </td>
  </tr>
    `
  }


  outputVoucher.innerHTML = voucher;
}
})
