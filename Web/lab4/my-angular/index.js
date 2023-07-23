import express from 'express';
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';
import bodyParser from 'body-parser';

import user_list_file from "./data/userList.json" assert { type: "json" };
import news_list_file from "./data/news.json" assert { type: "json" };

const user_list = user_list_file.userList;
const news_list = news_list_file.newsList;


const app = express();

const urlencodedParser = express.urlencoded({
  extended: false,
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4200"],
  }
});

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders': 'Authorization,X-Requested-With, X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
}
app.use(cors(corsOptions));

app.get('/user_check', (req, res) => {
  let user = user_list.find(user => user.email === req.query.email && user.password === req.query.password);
  if (user){
    res.send(user)
  } else{
    res.send();
  }
})

app.get('/get_users',(req, res) => {
  res.send(user_list)
})

app.get('/get_user_by_id', (req, res) => {
  let user = user_list.find(user => user.id === req.query.id);
  if (user){
    res.send(user)
  } else{
    res.send();
  }
})

app.get('/get_news', (req, res) => {
  let cur_user = user_list.find(user => user.id === req.query.id);
  let final_news_list = []
  for (let news of news_list) {
    if (cur_user.friends.includes(news.user_id) || news.user_id === cur_user.id){
      final_news_list.push(news)
    }
  }
  res.send(final_news_list);
});

app.post('/add_user', urlencodedParser, (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const date_of_birth = req.body.date_of_birth
  //console.log(date_of_birth)
  const password = req.body.password
  const ids = user_list.map(user => user.id);
  let id = Math.max(...ids) + 1
  id = id.toString()
  user_list.push({
    "id": id,
    "name": name,
    "date_of_birth": date_of_birth,
    "email": email,
    "role": "Пользователь",
    "status": "Активный",
    "friends": [],
    "password": password
  })
  res.json({id: id})
})

app.post('/add_news_submit', urlencodedParser, (req, res) => {
  const content = req.body.content
  const user_id = req.body.user_id
  const ids = news_list.map(news => news.id);
  let id = Math.max(...ids) + 1
  id = id.toString()
  news_list.push({
    "id": id,
    "user_id": user_id,
    "content": content
  })
  res.json({message: 'success'})
})

app.post('/delete_friend',  urlencodedParser,(req, res) => {
  const friend_id = req.body.friend_id;
  const user = req.body.user
  let friend_index = user.friends.indexOf(friend_id);
  const user_index = user_list.map((user) => {
    return parseInt(user.id)
  }).indexOf(parseInt(user.id))
  if (friend_index !== -1) {
    user_list[user_index].friends.splice(friend_index, 1);
    console.log(user_list[user_index].friends)
  }
  res.json({message: 'success'})
})

app.post('/edit_user/:id([0-9]{1,})', urlencodedParser, (req, res) => {
  let body = req.body;
  const id = req.params.id
  const change_id = user_list.map((user) => {
    return parseInt(user.id)
  }).indexOf(parseInt(id))
  if (change_id !== -1 && body) {
    if (body.name !== "") {
      user_list[change_id].name = body.name
    }
    if (body.date !== "" && (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(body.date)))
      user_list[change_id].date_of_birth = body.date
    if (body.email !== "")
      user_list[change_id].email = body.email
    user_list[change_id].role = body.role
    user_list[change_id].status = body.status
  }
  res.json({message: 'success'})
});

io.on('connection', (socket) => {
  socket.on('send-news', (news_content, user_id) => {
    io.emit('receive-news', news_content, user_id)
  })
});
