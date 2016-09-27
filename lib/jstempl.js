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
            if (Array.isArray(json[fieldName])) {
                for (var j = 0; j < json[fieldName].length; j++) {
                    element.appendChild(toHtml(json[fieldName][j]));
                }
                result.push(element);
                continue;
            }
            if (typeof json[fieldName] === 'object') {
                var keys2 = Object.keys(json[fieldName]);
                for (var p = 0; p < keys2.length; p++) {
                    var fieldName2 = keys2[p];
                    switch (fieldName2) {
                        case 'class' :
                            element.setAttribute('class', Array.isArray(json[fieldName][fieldName2]) ? json[fieldName][fieldName2].join(',') : json[fieldName][fieldName2]);
                            break;
                        case 'text':
                            element.innerText = json[fieldName][fieldName2];
                            break;
                        case 'children':
                            if (Array.isArray(json[fieldName][fieldName2])) {
                                for (var k = 0; k < json[fieldName][fieldName2].length; k++) {
                                    element.appendChild(toHtml(json[fieldName][fieldName2][k]));
                                }
                            } else {
                                element.appendChild(toHtml(json[fieldName][fieldName2]));
                            }
                            break;
                        default:
                            element.setAttribute(fieldName2, json[fieldName][fieldName2]);
                    }
                }
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
document.body.appendChild(jstempl.toHtml({
    div: [{span: 'a'}, {
        span: {
            text: 'b',
            class: ['a', 'b'],
            children: [{a: {text: 'ooo', href: 'http://google.com'}}, {b: 'RRRR'}]
        }
    }]
}));