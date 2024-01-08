const express = require('express');
const { engine } = require('express-handlebars');
const request = require('request')
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

//pk_249c4987c73a4486ae06e9a8298c0f5a API KEY
function callApi(finishedApi) {
    request('https://api.iex.cloud/v1/data/core/quote/aapl?token=pk_249c4987c73a4486ae06e9a8298c0f5a', {json: true}, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode == 200) {
        finishedApi(body);
    };
});
}


//Set handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherStuff = "Just some other stuff"
//Set handlebar rotes
app.get('/', (req, res) => {
    callApi(function (doneApi){
        res.render('home', {
            stock: doneApi
        });
    });
});


app.get('/about.html', (req, res) => {
    res.render('about', {
        stuff: otherStuff
    });
});


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log("Server listening on Port " + PORT));
