
import express from 'express'
import mongoose from 'mongoose'
const app = express()

app.use(express.urlencoded({extended:false}));

// establishing database connectivity 
const dbconnection = mongoose.connect("mongodb://127.0.0.1:27017/learning")
                             .then(()=>console.log("database connected"))
                             .catch((err)=>console.log("error",err));


// designing schema 

const bookSchema = new mongoose.Schema({
            name : {
                type:String,
                required: true,
            },
            author : {
                type:String,
                required: true,
            },
            rating : {
                type : Number,
                required:false,
            },
        },
        {timestamps:true}
);

// establishing the models
const Books = mongoose.model("booksDb",bookSchema);

// building services 


//creating routes 
app.get('/api/items',async (req,res)=>{

    // getting all collections 
    const books = await Books.find({});
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
                          <td>${book._id}</td>
                          <td>${book.name}</td>
                          <td>${book.author}</td>
                          ${
                           book.rating ? `<td>${book.rating}</td>`:``
                          }
                          
                    </tr>`
         }).join('')}
       </tbody>
    </table>
   
    `
   return res.send(html)
})


// service to get book by id 
app.get('/api/:bookid',async (req,res)=>{
    const reqid = (req.params.bookid)

    const book = await Books.findById((reqid).trim());
    if(!book) res.status(400).json({response : "no book found"});
    const html = `
           <h1>Data of book with ${reqid} id is below  </h1>
           <h2> ${book.name}</h2>
           <h2> ${book.author}</h2>
           <h2> Book's Genre </h2>
           ${book.genre}
            ${  
                book.rating ? `<td>${book.rating}</td>`:``
            }
                          
    `      
    return res.send(html)
})

//writing a post request to add new item to db 

app.post('/api/item',async (req,res)=>{
    // collecting payload from the request 
    const data = req.body;
    
    // checking whether all essential data field exists 

    if(!data || !data.name || !data.author ) return res.status(400).json({response:"enter valid field of name and author of book"});

    // adding it into books database 

    const bookData = {
        name : data.name ,
        author : data.author,
    }
    if(data.rating) {
        bookData.rating = data.rating;
    }

    const result = await Books.create(bookData)
     

    // giving acknowledgement of activity on frontend 
    const html = `
    <h1>Successfully added following data ${result._id} </h1>
    <h2>book name ${result.name} <h2>
    <h2>book's author name is ${result.author}</h2>
    ${  
        result.rating ? `<td>${result.rating}</td>`:``
    }
         

    `
    return res.status(200).send(html);

})

// design  a put request to update a entry 
app.patch('/api/item/:id',async(req,res)=>{
       const bookid = (req.params.id).trim();
       const data = req.body;
       if(!data || !data.name || !data.author ) res.status(400).json({response : " bad request"});
       const newBook = {
       
        name : data.name,
        author :data.author,
       }
       const result = await Books.findByIdAndUpdate(bookid,newBook);
    
       // send acknowledgement 
       const html = `
    <h1>Successfully updated data of book with following id ${result._id}  </h1>
    <h2>book name ${result.name} <h2>
    <h2>book's author name is ${result.author}</h2>

    `
      return res.send(html)


})

// //design a delete request to delete  a entry from books array 

app.delete('/api/item/:id',async (req,res)=>{
    const bookid = ((req.params.id).trim())
    // filtering the array 
     const result = await Books.findByIdAndDelete(bookid);
   
      
    // acknowledgement 
    const html = `
    <h1>Successfully deleted  following data </h1>
    <h2>book name ${result.name} <h2>
    <h2>book's author name is ${result.author}</h2>

    `
      return res.send(html)
})

app.listen(8003,()=>console.log('server performing task3 running on port 8003'))