// console.log('xin chao');

// Đối tượng Validator
function Validator(options) {
    var selectorRules = {};
    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage;
        //.parentElement lấy thẻ cha.
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        // console.log(errorMessage)
        //Lấy ra các rules của các selector
        var rules = selectorRules[rule.selector];
        // Lặp qua từng rule và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            //Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false
                }

            });

            // Lấy dữ liệu form đã validate gửi ra ngoài.
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        return (values[input.name] = input.value) && values;

                    }, {});
                    // console.log(formValues)
                    options.onSubmit(formValues)
                }
            }


        }

        // lặp qua mỗi rule và xử lý: lắng nghe, blur, input ...
        options.rules.forEach(function (rule) {
            // Lưu lại các rule cho các input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            // console.log((rule.selector))
            var inputElement = formElement.querySelector(rule.selector);

            // console.log(inputElement)
            if (inputElement) {
                // Xử lý trường hợp blur ra ngoài.
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                    // console.log(errorElement)
                };
                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    //.parentElement lấy thẻ cha.
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                };
            }
        });
        // console.log(selectorRules);
    }
}

// Định nghĩa rule
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Email không đúng';
        },
    };
};
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Password ít nhất ${min} ký tự`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập lại không đúng';
        },
    };
};
