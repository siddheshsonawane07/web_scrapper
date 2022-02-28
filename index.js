const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const PORT = 8000;
const cors = require('cors');
const app = express();

app.use(cors())

app.listen(PORT,()=> console.log(`server is running at PORT ${PORT}`))

const url = 'https://www.theguardian.com/uk'

app.get('/', function (req, res) {
    res.json('Webscraper made using Node.js & Express.js');
})

app.get('/results',(req,res)=>{
    axios(url).then(response=>{
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.fc-item__title',html).each(function(){
        const title = $(this).text();
        const url = $(this).find('a').attr('href');
        articles.push({
            title,url
        })
    });
    res.json(articles)
}).catch(e=>console.log(e))
})