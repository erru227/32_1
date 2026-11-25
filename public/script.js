//var outcome = document.getElementById("win_status");
//var role = document.getElementById("role");
let url = (location.protocol === "https:" ? "wss://" : "ws://") + location.host;
let websocket = new WebSocket(url);
var output = document.getElementById("message");
var l_b = document.getElementById("l_b");
var r_b = document.getElementById("r_b");
let change_seen = false;

websocket.onmessage = (event) => {
   const msg = JSON.parse(event.data);
   if (msg.type === "click") {
      other_click(document.getElementById(msg.id));
   }
};

//Set of three functions for handling button click functionality
//If no effect is in place, will add an effect for 2 sec, before letting the effect fade
function click_done(b_id, class_choice){
   b_id.classList.remove(class_choice);
   change_seen = false;
}
function other_click(b_id){
   user_click(b_id, false);
}
function user_click(b_id, curr_player=true){
   //Only make a change if no other change is in progress
   if (change_seen || !(socket.readyState === WebSocket.OPEN))
      return;
   change_seen = true;
   let class_choice = curr_player == true ? "clicked" : "opp_clicked";

   b_id.classList.add(class_choice);
   if (curr_player) {
      websocket.send(JSON.stringify({ type: "click", id: b_id.id }));
   }
   setTimeout(() => click_done(b_id, class_choice), 2000);
}

//When one person clicks a button, it highlights on the other one's screen in diff color than when user click a button
//Use limited express (specifically use(), static(), listen())
//Use fetch() and await()
//Divide up code between the script.js and server.js files, so that server.js handles only server, and script.js covers the content



/*
function show_board(){
   //Empty the loading text
   output.textContent = "";
   for (const e of document.querySelectorAll(".game")){
      e.style.display = "inline";
   }
}*/
//NOW use websockets

//This example hard-codes the socket to pvp. You can also create a list of sockets, or a file reporting other open sockets to see other people waiting for games

/*
websocket.onopen = function() { 
   //Todo, establish game open
};
        
websocket.onclose = function() { 
   //Todo, establish game closed
};

websocket.onmessage = function(e) {
   //TODO!!! Messages need to be turned into function calls!
};*/