var jstempl = function () {

    var toHtml = function (json) {
        var result = [];
        var keys = Object.keys(json);
        for (var i = 0; i < keys.length; i++) {
            var fieldName = keys[i];
            console.log(fieldName);
            var element = document.createElement(fieldName);
            if (typeof json[fieldName] === 'string') {
                element.innerText = json[fieldName];
                result.push(element);
                continue;
            }
            
            result.push(element);
        }
        if (result.length == 1) {
            return result[0];
        }
        return result;
    };

    return {
        toHtml: toHtml
    }
}();

document.body.appendChild(jstempl.toHtml({span: 'some text'}));