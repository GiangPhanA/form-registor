// console.log('xin chao');

// Đối tượng Validator
function Validator(options) {
    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        //.parentElement lấy thẻ cha.
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        // console.log(errorMessage)
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')

        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }

    }
    // console.log(options)
    // console.log(options.rules)
    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    if (formElement) {
        // console.log(formElement)
        options.rules.forEach(function (rule) {
            // console.log((rule.selector))
            var inputElement = formElement.querySelector(rule.selector);

            // console.log(inputElement)
            if (inputElement) {
                // Xử lý trường hợp blur ra ngoài.
                inputElement.onblur = function () {
                    // console.log('blur' + rule.selector)
                    // console.log(inputElement.value)
                    // value: inputElement.value
                    // test function: rule.test
                    // console.log(rule)
                    validate(inputElement, rule)
                    // console.log(errorElement)
                }
                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    //.parentElement lấy thẻ cha.
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }

        })
    }

}

// Định nghĩa rule
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    }


}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Email không đúng"

        }
    }
}
Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.lenth >= min ? undefined : `Password ít nhất ${min} ký tự`;

        }
    }
}