(function ($) {
    jQuery.expr[':'].Contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
    };
    jQuery.expr[':'].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
    };
    $.fn.lazAutoComplete = function (options, callback) {
        this.each(function () {
            var $e = $(this);
            var $main = $('<span></span>');
            $main.addClass('lazAutoComplete');
            var $input = $('<input />');
            if (options.placeholder) {
                $input.attr('placeholder', options.placeholder);
            }
            $input.attr({
                'type': 'input',
                'name': $e.attr('name')
            });
            var $button = $('<button ></button>');
            var $ul = $('<ul></ul>');
            $e.children().each(function () {
                $ul.append("<li value='" + $(this).val() + "' >" + $(this).text() + "</li>");
            });
            $main.append($input);
            $main.append($button);
            $main.append($ul);
            $button.click(function () {
                $input.focus();
                $e.css({background: 'red'});
                $ul.children().show();
                $input.text();
                $ul.show();
                if (typeof ti !== 'undefined') {
                    clearTimeout(ti);
                    ti = undefined;
                }
            });
            $input.keyup(function (e) {
                //TODO SHOW NOTHING FOUND
                $ul.show();
                if (e.keyCode === '40' || e.keyCode === 40) {
                    var vdata = $ul.children(':visible');
                    var ss = 0;
                    var selected = null;
                    vdata.each(function () {
                        if ($(this).attr('class')) {
                            selected = ss;
                        }
                        ss++;
                    });
                    $ul.children().removeClass('selected');
                    if (selected === null) {
                        $(vdata[0]).addClass('selected');
                    } else if (selected + 1 === vdata.length) {
                        $(vdata[selected]).addClass('selected');
                    } else {
                        $(vdata[selected + 1]).addClass('selected');
                    }
                    setValue($ul.children('.selected').text(), $ul.children('.selected').attr('value'));
                    $ul.scrollTop($ul.children('.selected').position().top + $ul.scrollTop());
                } else if (e.keyCode === '38' || e.keyCode === 38) {
                    var vdata = $ul.children(':visible');
                    var ss = 0;
                    var selected = null;
                    vdata.each(function () {
                        if ($(this).attr('class')) {
                            selected = ss;
                        }
                        ss++;
                    });
                    $ul.children().removeClass('selected');
                    if (selected === null) {
                        $(vdata[ss - 1]).addClass('selected');
                    } else if (selected - 1 === -1) {
                        $(vdata[0]).addClass('selected');
                    } else {
                        $(vdata[selected - 1]).addClass('selected');
                    }
                    setValue($ul.children('.selected').text(), $ul.children('.selected').attr('value'));
                    $ul.scrollTop($ul.children('.selected').position().top + $ul.scrollTop());
                } else if (e.keyCode === 13 || e.keyCode === "13") {
                    setValue($ul.children('.selected').text(), $ul.children('.selected').attr('value'));
                    $ul.hide();
                    if (typeof callback !== 'undefined') {
                        callback($input.val(), $input.attr('v'));
                    }
                }
                else {
                    if ($(this).val()) {
                        $ul.children('li').hide();
                        $ul.children('li:contains(' + $(this).val() + ')').show();
                        $ul.children('li:visible:eq(0)').addClass('selected');
                    }
                    else {
                        $ul.children('li').show().removeClass('selected');
                    }
                }
            });
            $input.focusin(function () {
                $main.addClass('focus');
            });
            $input.focusout(function () {
                $main.removeClass('focus');
            });
            $ul.children('li').click(function () {
                setValue($(this).text(), $(this).attr('value'));
                if (typeof callback !== 'undefined') {
                    callback($input.val(), $input.attr('v'));
                }
                $ul.hide();
            });
            var ti;
            $input.focusout(function () {
                ti = setTimeout(function () {
                    $ul.hide();
                }, 100);
            });
            $e.before($main);
            $e.hide();
            return $main;
            function setValue(text, value) {
                $input.val(text);
                $input.attr('v', value);
                $e.val(value);
            }
        });
    };
})(jQuery);