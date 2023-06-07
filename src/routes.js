const {
    addBooks,
    getAllBooks,
    getBook,
    editBook,
    deleteBook,
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
    {
        method : 'PUT',
        path : '/books/{bookId}',
        handler : editBook
    },
    // Menghapus buku
    {
        method : 'DELETE',
        path : '/books/{bookId}',
        handler : deleteBook
    }
]

module.exports = routes