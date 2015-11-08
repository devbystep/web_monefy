!function t(e, a, n) {
    function o(l, r) {
        if (!a[l]) {
            if (!e[l]) {
                var s = "function" == typeof require && require;
                if (!r && s)return s(l, !0);
                if (d)return d(l, !0);
                throw new Error("Cannot find module '" + l + "'")
            }
            var u = a[l] = {exports: {}};
            e[l][0].call(u.exports, function (t) {
                var a = e[l][1][t];
                return o(a ? a : t)
            }, u, u.exports, t, e, a, n)
        }
        return a[l].exports
    }

    for (var d = "function" == typeof require && require, l = 0; l < n.length; l++)o(n[l]);
    return o
}({
    1: [function (t, e, a) {
        function n() {
            var t = o.start_date, e = o.end_date;
            console.log(e, t);
            var a = document.getElementById("transactionList"), n = [];
            n.push("<table class='table table-hover'>");
            var d = localStorage.getItem("transactions");
            for (d = d ? JSON.parse(d) : [], l = 0, i = 0; i < JSON.parse(localStorage.transactions).length; i++)l += +JSON.parse(localStorage.transactions)[i].value;
            document.getElementById("summval").value = l;
            var s = "<tr><th></th><th>" + l + "</th><th></th><th></th></tr>";
            n.push(r), n.push(s), n.push("<thead>Транзакции в кошельке</thead>"), n.push("<tbody>"), d.forEach(function (t) {
                n.push("<tr>"), n.push("<td>"), n.push(moment(t.date).locale("ru").format("dddd, DD MMMM YYYY, hh:mm:ss a")), n.push("</td>"), n.push("<td>"), "Пополнение" == t.type ? n.push("<span style='color: #00ff00'>+") : n.push("<span style='color: #080808'>"), n.push(t.value), n.push("</span>"), n.push("</td>"), n.push("<td>"), n.push(t.description), n.push("</td>"), n.push("<td>"), n.push(t.type), n.push("</td>"), n.push("</tr>")
            }), n.push("</tbody>"), n.push("</table>"), a.innerHTML = n.join("")
        }

        window.onload = function () {
            var t = document.getElementById("add"), e = document.getElementById("spend"), a = document.getElementById("addDialog");
            t.onclick = function () {
                a.style.display = "block", d = !0, document.getElementById("addDialogTitle").style.display = "", document.getElementById("spendDialogTitle").style.display = "none", n()
            }, e.onclick = function () {
                a.style.display = "block", document.getElementById("addDialogTitle").style.display = "none", document.getElementById("spendDialogTitle").style.display = "", d = !1, n()
            }, o = new Calendar({
                element: $(".daterange--double"),
                earliest_date: "January 1, 2000",
                latest_date: new Date,
                start_date: "May 1, 2015",
                end_date: "May 31, 2015",
                callback: function () {
                    var t = moment(this.start_date).format("ll"), e = moment(this.end_date).format("ll");
                    console.debug("Start Date: " + t + "\nEnd Date: " + e)
                }
            }), n()
        };
        var o, d = !0, l = 0, r = "<thead><tr><th>Время</th><th>Сумма</th><th>Описание</th><th>Тип</th></tr></thead>";
        $(".daterange--double").on().click(function () {
            alert(o.start_date)
        })
    }, {}]
}, {}, [1]);