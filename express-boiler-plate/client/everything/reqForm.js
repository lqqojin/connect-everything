const request = require('request');

let obj = {
    "A_key": "a_value",
    "B_key": "b_value",
    "C_key": 1000,
    "D_key": true,
}

const buildForm = (data) => {
    if (!data) return new Error('not exists data');
    const keys = Object.keys(data);
    let form = [];
    console.log(keys);
    form = keys.map((key) => {
        return (`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    })
    form = form.join('&');
    console.log(form);
    return form;
}

request.post({
    url: 'http://127.0.0.1:6000/everything/form',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: buildForm(obj),
}, (error, res, body) => {
    // if (error) createError(res.statusCode, error.toString())
    setTimeout(() => {
        console.log(body);
    }, 1000)
})