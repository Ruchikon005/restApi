let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let app = express();
const PORT = 80

let Students = {
    list: [
        { 
            "id": 4010341, 
            "name": "Warodom", 
            "surname": "Werapun", 
            "major": "CoE" ,
            "GPA" : 3.3
        },
        { 
            "id": 4010342, 
            "name": "Johe", 
            "surname": "Lennon", 
            "major": "SE" ,
            "GPA" : 2.87
        },
    ]
}

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

router.route('/Students')
   .get((req, res) => res.json(Students))
 
   .post((req, res) => {
       console.log(req.body)
       let newStudents = {}
       newStudents.id = (Students.list.length)? Students.list[Students.list.length - 1].id + 1:1
       newStudents.id = req.body.id
       newStudents.name = req.body.name 
       newStudents.surname = req.body.surname
       newStudents.major = req.body.major
       newStudents.GPA = req.body.GPA
       Students = { "list": [...Students.list, newStudents] }
       res.json(Students)
   })


router.route('/Students/:Student_id')
   .get((req, res) => {
       let Student_id = req.params.Student_id
       let id = Students.list.findIndex(item => +item.id === +Student_id)
       res.json(Students.list[id])
   })
   .put((req, res) => {
       let Student_id = req.params.Student_id
       let id = Students.list.findIndex(item => +item.id === +Student_id)
       Students.list[id].id = req.body.id
       Students.list[id].name = req.body.name
       Students.list[id].surname = req.body.surname
       Students.list[id].major = req.body.major
       Students.list[id].GPA = req.body.GPA
       res.json(Students.list)
   })
 
   .delete((req, res) => {
       const Student_id = req.params.Student_id
       console.log('StudentId: ',Student_id)
       Students.list = Students.list.filter(item => +item.id !== +Student_id)
       res.json(Students.list)
   })

     

app.listen(PORT, () => {
    console.log('server is running')
})