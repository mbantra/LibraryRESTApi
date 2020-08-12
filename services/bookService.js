const axios = require('axios');
const xml2js = require('xml2js');

const parser = xml2js.Parser({ explicitArray: false });


function bookService() {

    function getBookDetailsById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.GOODREADS_API_BOOK_URL}${id}?key=${process.env.GOODREADS_API}`)
            .then((response) => {
                parser.parseString(response.data, (err, result) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(result.GoodreadsResponse.book);
                })
            })
            .catch((error) => reject(error));
        });
    }


    return { getBookDetailsById }
}

module.exports = bookService();