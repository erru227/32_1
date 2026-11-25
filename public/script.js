let url = (location.protocol === "https:" ? "wss://" : "ws://") + location.host;
let websocket = new WebSocket(url);
var output = document.getElementById("message");
var l_b = document.getElementById("l_b");
var r_b = document.getElementById("r_b");
var game_area = document.getElementById("g_area");
let change_seen = false;

websocket.onmessage = (event) => {
   const msg = JSON.parse(event.data);
   if (msg.type === "click") {
      other_click(document.getElementById(msg.id));
   } else if (msg.type === "status") {
      if (msg.players >= 2) {
         game_area.classList.remove("game");
         output.textContent = "";
      } else {
         game_area.classList.add("game");
         output.textContent = "Waiting...";
      }
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
   if (change_seen || !(websocket.readyState === WebSocket.OPEN))
      return;
   change_seen = true;
   let class_choice = curr_player == true ? "clicked" : "opp_clicked";

   b_id.classList.add(class_choice);
   if (curr_player) {
      websocket.send(JSON.stringify({ type: "click", id: b_id.id }));
   }
   setTimeout(() => click_done(b_id, class_choice), 2000);
}
