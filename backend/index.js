import e from 'express'
import express from 'express'
import mysql from "mysql"
import cors from 'cors'


const PORT = 8000
const app = express()


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "mohamed09",
    database: "test"

})

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json("hello from the backend")
})

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"

    db.query(query, (err, data)=> {
        if(err) {
            console.log("err")
            return res.json(err)
        } else {
            return res.json(data)

        }
    })
})


app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(query, [values], (err, data) => {
        if(err) {
            return res.json(err)
        }else {
            res.json("book added successfully")
        }
    })
})

app.delete("/books/:id", (req, res)=> {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (err, data) => {
        if(err){
            return res.json(err)
        } else {
            return res.json("Book has been deleted")
        }
    })

})


app.put("/books/:id", (req, res)=> {
    const bookId = req.params.id;
    const query = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?"


    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
]
    db.query(query, [...values, bookId], (err, data) => {
        if(err){
            return res.json(err)
        } else {
            return res.json("Book has been updated")
        }
    })

})

app.listen(8000, () => {
    console.log(`Connected on port ${PORT}` )
})