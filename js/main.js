// console.log('xin chao');

// Đối tượng Validator
function Validator(options) {
    // console.log(options)
    console.log(options.rules)
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // console.log(formElement)
    }

}

// Định nghĩa rule
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function () {

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