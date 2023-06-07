const {nanoid} = require('nanoid')
let books = require('./books')

const addBooks = (req, h) =>{
    let {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.payload

    const id = nanoid(16)
    let finished = readPage===pageCount? true : false
    const insertedAt = new Date().toISOString()
    let updatedAt = insertedAt
    
    const newBook = {
        id,
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        finished, 
        reading, 
        insertedAt, 
        updatedAt
    }

    books.push(newBook)

    if(name===undefined){
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }

    if(readPage > pageCount){
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }

    let isSuccess = books.filter((book) => book.id === id).length > 0

    if(isSuccess) {

        console.log('===BERHASIL DITAMBAHKAN===')
        console.log(newBook)

        const response = h.response({
            "status": "success",
            "message": "Buku berhasil ditambahkan",
            "data": {
                "bookId": id
            }
        })

        response.code(201)
        return response
    }

    return h.response({
        "status" : "fail",
        "meesage": "Gagal menmbahkan buku."
    }).code(500)

}

const getAllBooks = (req, h) => {
    return h.response({
        "status" : "success",
        "data" : {books} //BELOM KELARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
    }).code(200)
}

const getBook = (req, h) => {
    let book = books.filter((book) => book.id === req.params.bookId)[0]
    if(book !== undefined){
        return h.response({
            "status" : "success",
            "data" : {book}
        }).code(200)
    }

    return h.response({
        "message" : "fail",
        "message" : "Buku tidak ditemukan"
    }).code(404)
}

const editBook = (req, h) => {
    let {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.payload

    let finished = readPage===pageCount? true : false
    let updatedAt = new Date().toISOString()

    if(name===undefined){
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }

    if(readPage > pageCount){
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }

    const index = books.findIndex((book) => book.id === req.params.bookId)
    
    if(index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt
        }
        return h.response({
            "status": "success",
            "message": "Buku berhasil diperbarui"
        }).code(200)
    }

    return h.response({
        "status": "fail",
        "message": "Gagal memperbarui buku. Id tidak ditemukan"
    }).code(404)

}

const deleteBook = (req, h) => {
    const index = books.findIndex((book) => book.id === req.params.bookId)
    if(index !== -1) {
        books.splice(index,1)
        return h.response({
            "status": "success",
            "message": "Buku berhasil dihapus"
        }).code(200)
    }

    return h.response({
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    }).code(404)
}

module.exports = {
    addBooks,
    getAllBooks,
    getBook,
    editBook,
    deleteBook,
}