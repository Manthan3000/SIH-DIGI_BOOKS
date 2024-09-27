
const apiURL = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40"; // Google Books API for random books

let product = [];

// Fetch book data from Google Books API
async function fetchBooks() {
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        
        // Extract relevant book information (title, image, author)
        product = data.items.map((item, index) => ({
            id: index,
            image: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author', // Join if multiple authors
            downloadLink: item.accessInfo?.webReaderLink || '#', // Link to read/download if available
        }));

        // Initial display of products
        displayItem(product);
    } catch (error) {
        console.error("Error fetching book data:", error);
    }
}

document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = product.filter((item) => 
        item.title.toLowerCase().includes(searchData) ||
        item.author.toLowerCase().includes(searchData) // Allow search by author
    );
    displayItem(filteredData);
});

const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item) => {
        const { image, title, author, downloadLink } = item;
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image} alt="${title}">
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>By: ${author}</h2>
                    <a href="${downloadLink}" target="_blank"><button>Download</button></a>
                </div>
            </div>`
        );
    }).join('');
};

// Call function to fetch and display books
fetchBooks();

