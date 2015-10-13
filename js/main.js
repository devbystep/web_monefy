window.onload = function () {

    var addBtn = document.getElementById("add");
    var spendBtn = document.getElementById("spend");
    var addDialog = document.getElementById("addDialog");

    addBtn.onclick = function () {
        addDialog.style.display = "block";
        walletReplenished = true;
        document.getElementById("addDialogTitle").style.display = '';
        document.getElementById("spendDialogTitle").style.display = 'none';
        refresh()
    };
    spendBtn.onclick = function () {
        addDialog.style.display = "block";
        document.getElementById("addDialogTitle").style.display = 'none';
        document.getElementById("spendDialogTitle").style.display = '';
        walletReplenished = false;
        refresh()
    };

    refresh();

};

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
        <!--I want to add a modal window -->
        alert("Fill in the field value number");
        return false;
    }
    return true;
}

var walletReplenished = true;

var tableHeader = "<thead><tr><th>Время</th><th>Сумма</th><th>Описание</th><th>Тип</th></tr></thead>";

function addInput(argument) {

    var addValue = document.getElementById("addValue");
    var addDescription = document.getElementById("addDescription");

    if (!validate(addValue.value, addDescription.value)) {
        addValue.style.color = "red";
        document.getElementById("addValueError").style.display = '';
        return
    }
    else {
        addValue.style.color = "black";
        document.getElementById("addValueError").style.display = 'none';
    }

    var transaction = {
        date: moment().toISOString(),
        value: +addValue.value,
        description: addDescription.value,
        type: (function () {
            return (walletReplenished) ? "Пополнение" : "Списание"
        })(walletReplenished)
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

function refresh() {
    var transactionList = document.getElementById("transactionList");
    var table = [];
    table.push("<table class='table table-hover'>");
    var transactions = localStorage.getItem("transactions");
    if (!transactions) {
        transactions = [];
    } else {
        transactions = JSON.parse(transactions);
    }
    table.push(tableHeader);
    table.push("<thead>Транзакции в кошельке</thead>");
    table.push("<tbody>");
    transactions.forEach(function (entry) {

        table.push("<tr>");

        table.push("<td>");
        table.push(moment(entry.date).locale("be").format('dddd, DD MMMM YYYY, hh:mm:ss a'));
        table.push("</td>");

        table.push("<td>");
        if (entry.type == "Пополнение") {
            table.push("<span style='color: #00ff00'>" + "+");
        } else {
            table.push("<span style='color: #080808'>" + "-");
        }
        table.push(entry.value);
        table.push("</span>");
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