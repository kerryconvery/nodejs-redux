const { createStore } = require('redux');
const http = require('http');

function reducer(state = 0, action) {
  if (['INCREMENT', 'DECREMENT'].includes(action.type)) {
    for(index = 0; index < 20000; index++) {
      console.log(action)
    }
  }

  switch(action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
}

const store = createStore(reducer);

http.createServer(function (req, res) {
  if (req.url === '/inc') {
    store.dispatch({ type: 'INCREMENT' });
  } else if (req.url === '/dec') {
    store.dispatch({ type: 'DECREMENT' });
  }

  res.write(store.getState().toString());
  res.end();
}).listen(3000, function(){
 console.log("server start at port 3000");
});
