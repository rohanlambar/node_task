
import express from 'express'

//creating a instance of server 
const app = express()

// creating a datastore to store books 
var books = [
    {
      id: 1,
      name: 'Obstacle is the Way',
      author: 'Ryan Holiday',
      genre: ['self-help', 'philosophy'],
      yearPublished: 2014,
      pages: 224,
      isbn: '978-1591846352',
      translations: ['Spanish', 'German', 'Mandarin']
    },
    {
      id: 2,
      name: 'Dune',
      author: 'Frank Herbert',
      genre: ['sci-fi', 'adventure'],
      yearPublished: 1965,
      pages: 412,
      movieAdaptation: true,
      series: 'Dune Chronicles'
    },
    {
      id: 3,
      name: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: ['mystery', 'thriller'],
      yearPublished: 2019,
      pages: 336,
      awards: ['Goodreads Choice Award'],
      audiobook: true
    },
    {
      id: 4,
      name: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: ['history', 'non-fiction'],
      yearPublished: 2011,
      pages: 443,
      translations: ['English', 'French', 'Arabic'],
      diagrams: true
    },
    {
      id: 5,
      name: 'The Midnight Library',
      author: 'Matt Haig',
      genre: ['fantasy', 'philosophical fiction'],
      yearPublished: 2020,
      pages: 304,
      movieAdaptation: false,
      themes: ['regret', 'alternative lives']
    },
    {
      id: 6,
      name: 'Atomic Habits',
      author: 'James Clear',
      genre: ['self-help', 'psychology'],
      yearPublished: 2018,
      pages: 320,
      charts: 12,
      workbookAvailable: true
    },
    {
      id: 7,
      name: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: ['fantasy', 'adventure'],
      yearPublished: 1937,
      pages: 310,
      prequelTo: 'Lord of the Rings',
      mapIncluded: true
    },
    {
      id: 8,
      name: 'Educated',
      author: 'Tara Westover',
      genre: ['memoir', 'biography'],
      yearPublished: 2018,
      pages: 334,
      awards: ['National Book Critics Circle Award'],
      movieRightsSold: true
    },
    {
      id: 9,
      name: 'Project Hail Mary',
      author: 'Andy Weir',
      genre: ['sci-fi', 'space opera'],
      yearPublished: 2021,
      pages: 476,
      diagrams: true,
      scientificAppendix: true
    },
    {
      id: 10,
      name: 'The Psychology of Money',
      author: 'Morgan Housel',
      genre: ['finance', 'psychology'],
      yearPublished: 2020,
      pages: 242,
      caseStudies: 19,
      realWorldExamples: true
    }
  ];


// to get encoded data from url there is need  to use middleware 
app.use(express.urlencoded({extended:false})) // extended : false make middleware choice simpler parser 

//creating routes 
app.get('/api/items',(req,res)=>{
    const html = `
   
    <h1> List of books present </h1>
    <table>
       <thead>
          <tr>
            <th>Id</th>
            <th>Book name</th>
            <th>Author name </th>
          </tr>
       </thead>
       <tbody>
         ${books.map((book)=> {
            return `<tr> 
                          <td>${book.id}</td>
                          <td>${book.name}</td>
                          <td>${book.author}</td>
                    </tr>`
         }).join('')}
       </tbody>
    </table>
   
    `
   return res.send(html)
})


// service to get book by id 
app.get('/api/:bookid',(req,res)=>{
    const reqid = Number(req.params.bookid)
    // const book = books.filter((book)=>  book.id === reqid )[0];
    const book = books.find((book)=>  book.id === reqid );

    const html = `
           <h1>Data of book with ${reqid} id is below  </h1>
           <h2> ${book.name}</h2>
           <h2> ${book.author}</h2>
           <h2> Book's Genre </h2>
           ${book.genre}
    `
    return res.send(html)
})

//writing a post request to add new item to list 



app.post('/api/item',(req,res)=>{
    // collecting payload from the request 
    const data = req.body;
    
    // checking whether all essential data field exists 

    if(!data || !data.name || !data.author ) return res.status(400).json({response:"enter valid field of name and author of book"});

    // adding it into books array of object 
      const length = books.length
      books.push({
        id:length+1,
        name:data.name,
        author:data.author,
    })

    // giving acknowledgement of activity on frontend 
    const html = `
    <h1>Successfully added following data </h1>
    <h2>book name ${data.name} <h2>
    <h2>book's author name is ${data.author}</h2>

    `
    return res.status(200).send(html);

})

// design  a put request to update a entry 
app.put('/api/item/:id',(req,res)=>{
       const bookid = Number(req.params.id);
       const data = req.body;
       if(!data || !data.name || !data.author ) res.status(400).json({response : " bad request"});
       books = books.filter((book) => book.id !== bookid);
       const newBook = {
        id:bookid,
        name : data.name,
        author :data.author,
       }

       books.slice(bookid-1,0,newBook);
       // send acknowledgement 
       const html = `
    <h1>Successfully updated data of book with following id ${bookid}  </h1>
    <h2>book name ${newBook.name} <h2>
    <h2>book's author name is ${newBook.author}</h2>

    `
      return res.send(html)


})

//design a delete request to delete  a entry from books array 

app.delete('/api/item/:id',(req,res)=>{
    const bookid = Number(req.params.id)
    // filtering the array 
     const deletedBook = books.filter((book) => book.id === bookid)[0];
      books = books.filter((book) => book.id !== bookid);
      
    // acknowledgement 
    const html = `
    <h1>Successfully added following data </h1>
    <h2>book name ${deletedBook.name} <h2>
    <h2>book's author name is ${deletedBook.author}</h2>

    `
      return res.send(html)
})

// making server listen
app.listen(8002,console.log("server listing of port number 8002 for task2 "));