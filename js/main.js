
var addBtn = document.getElementById("add");
var spendBtn = document.getElementById("spend");
var addDialog = document.getElementById("addDialog");

window.onload = function () {
    addBtn.onclick = function () {
        addDialog.style.display = "block";
    };
    refresh();
};

var addValue = document.getElementById("addValue");
var addDescription = document.getElementById("addDescription");
var transactionList = document.getElementById("transactionList");

function addInput(argument) {
    if (!validate(addValue.value, addDescription.value)) {
        addValue.style.border = "1px solid red";
        return
    }
    else {
        addValue.style.border = "1px solid black";
    }

    var transaction = {
        date: new Date(),
        value: addValue.value,
        description: addDescription.value,
        type: "Пополнение"
    };
    var transactions = localStorage.getItem("transactions");
    if (!transactions) {
        transactions = [];
    } else {
        transactions = JSON.parse(transactions);
    }
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addDialog.style.display = "none";
    addValue.value = "";
    addDescription.value = "";
    refresh()
}

function IsNumeric(sText) {
    var ValidChars = "0123456789.";
    var IsNumbers = true;
    var Char;

    for (i = 0; i < sText.length && IsNumbers == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumbers = false;
        }
    }

    if ((sText.length == 0) || (sText == null) || !(sText > 0)) {
        IsNumbers = false;
    }

    return IsNumbers
}

function validate(value, description) {
    if (!IsNumeric(value)) {
        <!--I want to add a modal window-->
        alert("Fill in the field value number");
        return false;
    }

    return true;
}

var tableHeader = "<thead><tr><th>Время</th><th>Сумма</th><th>Описание</th><th>Тип</th></tr></thead>";

function refresh() {
    var table = [];
    table.push("<table class='table table-hover'>");
    var transactions = localStorage.getItem("transactions");
    if (!transactions) {
        transactions = [];
    } else {
        transactions = JSON.parse(transactions);
    }
    table.push(tableHeader);
    table.push("<caption>Транзакции в кошельке</caption>");
    table.push("<tbody>");
    transactions.forEach(function (entry) {

        table.push("<tr>");

        table.push("<td>");
        table.push((new Date(entry.date)).toLocaleString("be"));
        table.push("</td>");


        table.push("<td>");
        table.push(entry.value);
        table.push("</td>");

        table.push("<td>");
        table.push(entry.description);
        table.push("</td>");

        table.push("<td>");
        table.push(entry.type);
        table.push("</td>");

        table.push("</tr>");

    });
    table.push("</tbody>");
    table.push("</table>");
    transactionList.innerHTML = table.join("");
}