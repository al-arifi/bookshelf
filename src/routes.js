const {
    addBooks,
    getAllBooks,
    getBook,
} = require('./handler')

const routes = [
    // Menambah buku
    {
        method : 'POST',
        path : '/books',
        handler : addBooks
    },
    // Menampilkan seluruh buku
    {
        method : 'GET',
        path : '/books',
        handler : getAllBooks
    },
    // Menampilkan detail buku
    {
        method : 'GET',
        path : '/books/{bookId}',
        handler : getBook
    },
    // Mengubah data buku
    // {
    //     method : 'PUT',
    //     path : '/books/{bookId}'
    // },
    // Menghapus buku
    // {
    //     method : 'DELETE',
    //     path : '/books/{bookId}'
    // }
]

module.exports = routes