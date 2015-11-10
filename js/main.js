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
    dd = new Calendar({
        element: $('.daterange--double'),
        earliest_date: 'January 1, 2000',
        latest_date: new Date(),
        start_date: 'May 1, 2015',
        end_date: 'May 31, 2015',
        callback: function () {
            var start = moment(this.start_date).format('ll'),
                end = moment(this.end_date).format('ll');

            console.debug('Start Date: ' + start + '\nEnd Date: ' + end);
        }
    });
    refresh();

};
var dd;


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


function addInput(argument) {

    var addValue = document.getElementById("addValue");
    var addDescription = document.getElementById("addDescription");

    if (!validate(addValue.value, addDescription.value)) {
        addValue.style.color = "red";
        document.getElementById("addValueError").style.display = '';
        // document.show.bs.modal;
        // document.data-target = '.bs-exmple-modal-sm';
        return
    }
    else {
        addValue.style.color = "black";
        document.getElementById("addValueError").style.display = 'none';
    }

    var val2 = function () {
        if (walletReplenished) {
            val1 = +addValue.value;
            return val1
        } else {
            var val1 = +addValue.value;
            val1 = 0 - val1;
            return val1
        }
    };

    var transaction = {
        date: moment().toISOString(),
        value: val2(),
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

var summvalue = 0;


function refresh() {
    var cal_start=dd.start_date;
    var cal_end=dd.end_date;
    console.log(cal_end, cal_start);
    var transactionList = document.getElementById("transactionList");
    var table = [];
    table.push("<table class='table table-hover'>");
    var transactions = localStorage.getItem("transactions");
    if (!transactions) {
        transactions = [];
    } else {
        transactions = JSON.parse(transactions);
    }
    summvalue = 0;
    for (i = 0; i < JSON.parse(localStorage["transactions"]).length; i++) {
        summvalue = summvalue + +JSON.parse(localStorage["transactions"])[i].value;
    }
    document.getElementById("summval").innerHTML = "Баланс: "+summvalue;
    table.push("<thead>Транзакции в кошельке</thead>");
    table.push("<thead><tr><th>Время</th><th>Сумма</th><th>Описание</th><th>Тип</th></tr></thead>");
    table.push("<tbody>");
    transactions.forEach(function (entry) {

        table.push("<tr>");

        table.push("<td>");
        table.push(moment(entry.date).locale("ru").format('dddd, DD MMMM YYYY, hh:mm:ss a'));
        table.push("</td>");

        table.push("<td>");
        if (entry.type == "Пополнение") {
            table.push("<span style='color: #00ff00'>" + "+");
        } else {
            table.push("<span style='color: #080808'>");
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