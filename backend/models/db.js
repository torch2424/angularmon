//Not actually going to store data yet for v1
//Found out we can request entire arrays of data

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var badMove = new Schema({
  move_id: {
    type: Number,
    required: 'The User Id is required'
},
  updated_at: Date
});


mongoose.model('badMoves', badMove);
mongoose.connect('mongodb://localhost/angularmon');
