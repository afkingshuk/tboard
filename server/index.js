// Module dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

import webpackConfig from '../webpack.config.dev.js';

// Database
mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://local:localhost@localhost0.idky9.mongodb.net/tboard0?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

// Routers
import auth from './routes/auth';
import teams from './routes/teams';
import projects from './routes/projects';
import cards from './routes/cards';

import users from './routes/users/users'
import friends from './routes/users/friends'

import tasks from './routes/tasks/tasks';
import comments from './routes/tasks/comments';

// Create express app
let app = express();


// Configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


// Middleware
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// Configure routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/users/:user/friends', friends);
app.use('/api/teams', teams);
app.use('/api/projects', projects);
app.use('/api/projects/:project/cards', cards);
app.use('/api/projects/:project/tasks', tasks);
app.use('/api/projects/:project/tasks/:task/comments', comments);


// Main application route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


// Start listenning
const PORT = app.get('port');
app.listen(PORT, () => console.log('tboard is Running on localhost: ' + PORT));


// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
});


// //step 3 complicated 
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('server/public'));

//   app.get('*', () => {
//     res.sendFile(path.resolve(__dirname, 'server', 'public', 'index.html'));
//   });
// }

