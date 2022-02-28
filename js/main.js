// console.log('xin chao');

// Đối tượng Validator
function Validator(options) {
    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        //.parentElement lấy thẻ cha.
        var errorElement = inputElement.parentElement.querySelector('.form-message')
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
                inputElement.onblur = function () {
                    // console.log('blur' + rule.selector)
                    // console.log(inputElement.value)
                    // value: inputElement.value
                    // test function: rule.test
                    // console.log(rule)
                    validate(inputElement, rule)
                    // console.log(errorElement)

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
        test: function () {

        }
    }

}