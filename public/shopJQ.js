(function ($) {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "/dt",
            success: function (data) {
                $.Shop.setShopData(data);
                console.log(data);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });

        $(document).on("click", ".addBtn", function () {
            var item = $(this).data(),
                product = item.name,
                price = item.price,
                quantity = item.quantity,
                d = '#' + product;

            if ($('tr').is(d)) {
                $.Cart.addQuant(d);
            } else {
                $.Cart.appendItemToBascket(product, price);
            }
            $.Cart.updateTotal(product, price);
        });

        $(window).scroll(function () {
        });
    });
    ///--------------------shop-----------
    (function ($) {
        $.Shop = {
            setShopData: function (data) {
                for (var i = 0; i < data.length - 1; ++i) {
                    $('.it').eq(0).clone().appendTo('.wrapIt')
                }
                data.forEach(function (el, i) {
                    $(".im").eq(i).attr('src', el.src)
                    $(".name").eq(i).text(el.name)
                    $(".price").eq(i).text(el.price + ' $')
                    $(".addBtn").eq(i).data({ url: el.src, name: el.name, price: el.price })
                });
            }
        }
    })(jQuery);

    ///-----------------cart------------

    (function ($) {
        $.Cart = {
            addQuant: function (d) {
                $(d).data('dt').qv += 1;
                var qv = $(d).data('dt').qv;
                var pr = $(d).data('dt').pr;
                $(d).data('dt').tt = qv * pr;
                var tt = $(d).data('dt').tt;

                $(d + '> td').map(function (i, e) {
                    if ($(e).attr('class') == 'quantity') {
                        $(e).text(qv);
                    }
                    else if ($(e).attr('class') == 'total') {
                        var tpr = pr * qv;
                        $(e).text(tpr + ' $');
                    }
                });

            },

            appendItemToBascket: function (product, price) {
                var v = $(".tbody").append($("<tr>", { id: product }).data('dt', { qv: 1, pr: price, tt: price })
                    .append($("<td>").append($("<div>", {
                        text: '\u2717', class: 'red',
                        click: function () {
                            $(this).parent().parent().remove();
                            $.Cart.updateTotal()
                        }
                    })))
                    .append($("<td>", { text: product, class: 'product' }))
                    .append($("<td>", { text: price + ' $', class: 'price' }))
                    .append($("<td>", { text: 1, class: 'quantity' }))
                    .append($("<td>", { text: price + ' $', class: 'total' })))
            },

            updateTotal: function () {
                var sm = 0;
                $('td.total').map(function (i, e) {
                    sm += parseInt($(e).text())
                });
                if (sm === 0) {
                    $('#at').text('basket is empty')
                } else {
                    $('#at').text('Total: ' + sm + ' $')
                }
            }
        }
    })(jQuery);
}(jQuery));

