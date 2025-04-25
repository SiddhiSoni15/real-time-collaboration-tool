
// // // // // // let canvas = document.getElementById("canvas");
// // // // // // //let test = document.getElementById("test");
// // // // // // const isInitiator = location.hash === "#init";

// // // // // // canvas.width = 0.98 * window.innerWidth;
// // // // // // canvas.height = window.innerHeight;

// // // // // // //var io = io.connect("https://dopewhiteboard.herokuapp.com/");
// // // // // // var io = io.connect("http://localhost:8081");

// // // // // // let ctx = canvas.getContext("2d");

// // // // // // let x;
// // // // // // let y;
// // // // // // let mouseDown = false;
// // // // // // let dataChannel;
// // // // // // const servers = {
// // // // // //   iceServers: [
// // // // // //     {
// // // // // //       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
// // // // // //     },
// // // // // //   ],
// // // // // //   iceCandidatePoolSize: 10,
// // // // // // };
// // // // // // let pc = new RTCPeerConnection(servers);

// // // // // // console.log("created data channels");
// // // // // // let remoteStream;

// // // // // // function applyEvents() {
// // // // // //   dataChannel.onmessage = (e) => {
// // // // // //     let data = JSON.parse(e.data);

// // // // // //     if (data.draw) {
// // // // // //       ctx.lineTo(data.draw.x, data.draw.y);
// // // // // //       ctx.stroke();
// // // // // //     }
// // // // // //     if (data.down) {
// // // // // //       ctx.moveTo(data.down.x, data.down.y);
// // // // // //     }
// // // // // //   };
// // // // // // }

// // // // // // window.onload = async () => {
// // // // // //   pc.addEventListener("connectionstatechange", (event) => {
// // // // // //     if (pc.connectionState === "connected") {
// // // // // //       //console.log("connected");
// // // // // //     }
// // // // // //   });

// // // // // //   pc.ondatachannel = (e) => {
// // // // // //     console.log("re data channels");
// // // // // //     dataChannel = e.channel;
// // // // // //     applyEvents();
// // // // // //   };

// // // // // //   if (isInitiator) {
// // // // // //     dataChannel = pc.createDataChannel("test");
// // // // // //     applyEvents(); // Set up message handling for initiator
// // // // // //   } else {
// // // // // //     pc.ondatachannel = (e) => {
// // // // // //       console.log("Received data channel");
// // // // // //       dataChannel = e.channel;
// // // // // //       applyEvents(); // Set up message handling for receiver
// // // // // //     };
// // // // // //   }
  
// // // // // //   //let stream = await navigator.mediaDevices.getUserMedia({ video: true });

// // // // // //   //stream.getTracks().forEach((track) => {
// // // // // //     //pc.addTrack(track, stream);
// // // // // //   //});

// // // // // //   //remoteStream = new MediaStream();

// // // // // // //   pc.ontrack = (event) => {
// // // // // // //     event.streams[0].getTracks().forEach((track) => {
// // // // // // //       remoteStream.addTrack(track);
// // // // // // //     });
// // // // // // //   };

// // // // // //   //test.srcObject = remoteStream;

// // // // // //   //sending the ice candidates
// // // // // //   pc.onicecandidate = (event) => {
// // // // // //     if (event.candidate) {
// // // // // //       //console.log("send ice");
// // // // // //       io.emit("propogate", { ice: event.candidate });
// // // // // //     }
// // // // // //   };

// // // // // //   //sending the offer
// // // // // //   let offer = await pc.createOffer();
// // // // // //   await pc.setLocalDescription(offer);
// // // // // //   //console.log("send offer");
// // // // // //   io.emit("propogate", {
// // // // // //     offer: { type: offer.type, sdp: offer.sdp },
// // // // // //   });
// // // // // // };

// // // // // // io.on("onpropogate", async (data) => {
// // // // // //   //console.log("happen");
// // // // // //   if (data.offer) {
// // // // // //     //console.log("offer");
// // // // // //     await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
// // // // // //     let answer = await pc.createAnswer();
// // // // // //     await pc.setLocalDescription(answer);
// // // // // //     io.emit("propogate", { answer });
// // // // // //   }
// // // // // //   if (data.answer) {
// // // // // //     //console.log("answer");
// // // // // //     await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
// // // // // //   }
// // // // // //   if (data.ice) {
// // // // // //     //console.log("ice");
// // // // // //     await pc.addIceCandidate(data.ice);
// // // // // //   }
// // // // // // });

// // // // // // window.onmousedown = (e) => {
// // // // // //   ctx.moveTo(x, y);
// // // // // //   if (dataChannel !== undefined) {
// // // // // //     dataChannel.send(JSON.stringify({ down: { x, y } }));
// // // // // //   } else {
// // // // // //     //console.log("not defined");
// // // // // //   }
// // // // // //   mouseDown = true;
// // // // // // };

// // // // // // window.onmouseup = (e) => {
// // // // // //   mouseDown = false;
// // // // // // };

// // // // // // window.onmousemove = (e) => {
// // // // // //   x = e.clientX;
// // // // // //   y = e.clientY;

// // // // // //   if (mouseDown) {
// // // // // //     dataChannel.send(JSON.stringify({ draw: { x, y } }));
// // // // // //     ctx.lineTo(x, y);
// // // // // //     ctx.stroke();
// // // // // //   }
// // // // // // };

// // // // // // public/script.js
// // // // // const canvas = document.getElementById("canvas");
// // // // // const ctx = canvas.getContext("2d");
// // // // // const socket = io(); // auto-connect to server

// // // // // canvas.width = window.innerWidth;
// // // // // canvas.height = window.innerHeight;

// // // // // let drawing = false;
// // // // // let x = 0, y = 0;

// // // // // canvas.addEventListener("mousedown", (e) => {
// // // // //   drawing = true;
// // // // //   x = e.clientX;
// // // // //   y = e.clientY;
// // // // //   ctx.moveTo(x, y);

// // // // //   socket.emit("draw", { type: "moveTo", x, y });
// // // // // });

// // // // // canvas.addEventListener("mouseup", () => {
// // // // //   drawing = false;
// // // // // });

// // // // // canvas.addEventListener("mousemove", (e) => {
// // // // //   if (!drawing) return;

// // // // //   x = e.clientX;
// // // // //   y = e.clientY;
// // // // //   ctx.lineTo(x, y);
// // // // //   ctx.stroke();

// // // // //   socket.emit("draw", { type: "lineTo", x, y });
// // // // // });

// // // // // // When receiving drawing data from others
// // // // // socket.on("draw", (data) => {
// // // // //   if (data.type === "moveTo") {
// // // // //     ctx.moveTo(data.x, data.y);
// // // // //   } else if (data.type === "lineTo") {
// // // // //     ctx.lineTo(data.x, data.y);
// // // // //     ctx.stroke();
// // // // //   }
// // // // // });




// // // // // public/script.js
// // // // const canvas = document.getElementById("canvas");
// // // // const ctx = canvas.getContext("2d");
// // // // const socket = io();
// // // // const clearBtn = document.getElementById("clearBtn");

// // // // canvas.width = window.innerWidth;
// // // // canvas.height = window.innerHeight;

// // // // let drawing = false;
// // // // let x = 0, y = 0;

// // // // canvas.addEventListener("mousedown", (e) => {
// // // //   drawing = true;
// // // //   x = e.clientX;
// // // //   y = e.clientY;
// // // //   ctx.moveTo(x, y);

// // // //   socket.emit("draw", { type: "moveTo", x, y });
// // // // });

// // // // canvas.addEventListener("mouseup", () => {
// // // //   drawing = false;
// // // // });

// // // // canvas.addEventListener("mousemove", (e) => {
// // // //   if (!drawing) return;

// // // //   x = e.clientX;
// // // //   y = e.clientY;
// // // //   ctx.lineTo(x, y);
// // // //   ctx.stroke();

// // // //   socket.emit("draw", { type: "lineTo", x, y });
// // // // });

// // // // // 🔄 Receive drawing events from other tabs
// // // // socket.on("draw", (data) => {
// // // //   if (data.type === "moveTo") {
// // // //     ctx.moveTo(data.x, data.y);
// // // //   } else if (data.type === "lineTo") {
// // // //     ctx.lineTo(data.x, data.y);
// // // //     ctx.stroke();
// // // //   }
// // // // });

// // // // // 🧼 Clear button click
// // // // clearBtn.addEventListener("click", () => {
// // // //   clearCanvas();
// // // //   socket.emit("clear");
// // // // });

// // // // // 🧽 Clear canvas function
// // // // function clearCanvas() {
// // // //   ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // }

// // // // // 🧽 Listen for clear command from server
// // // // socket.on("clear", () => {
// // // //   clearCanvas();
// // // // });



// // // // public/script.js
// // // const canvas = document.getElementById("canvas");
// // // const ctx = canvas.getContext("2d");
// // // const socket = io();
// // // const clearBtn = document.getElementById("clearBtn");

// // // canvas.width = window.innerWidth;
// // // canvas.height = window.innerHeight;

// // // let drawing = false;
// // // let x = 0, y = 0;

// // // canvas.addEventListener("mousedown", (e) => {
// // //   drawing = true;
// // //   x = e.clientX;
// // //   y = e.clientY;
// // //   ctx.moveTo(x, y);

// // //   socket.emit("draw", { type: "moveTo", x, y });
// // // });

// // // canvas.addEventListener("mouseup", () => {
// // //   drawing = false;
// // // });

// // // canvas.addEventListener("mousemove", (e) => {
// // //   if (!drawing) return;

// // //   x = e.clientX;
// // //   y = e.clientY;
// // //   ctx.lineTo(x, y);
// // //   ctx.stroke();

// // //   socket.emit("draw", { type: "lineTo", x, y });
// // // });

// // // // 🔄 Receive drawing events from other tabs
// // // socket.on("draw", (data) => {
// // //   if (data.type === "moveTo") {
// // //     ctx.moveTo(data.x, data.y);
// // //   } else if (data.type === "lineTo") {
// // //     ctx.lineTo(data.x, data.y);
// // //     ctx.stroke();
// // //   }
// // // });

// // // // 🧼 Clear button click
// // // clearBtn.addEventListener("click", () => {
// // //   clearCanvas();           // Clear current tab immediately
// // //   socket.emit("clear");    // Notify server to clear all others
// // // });

// // // // 🧽 Clear canvas function
// // // function clearCanvas() {
// // //   ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // }

// // // // 🧽 Listen for clear command from server
// // // socket.on("clear", () => {
// // //   clearCanvas();           // When server broadcasts, clear canvas
// // // });



// // // script.js
// // const canvas = document.getElementById("canvas");
// // const ctx = canvas.getContext("2d");
// // const socket = io();  // Connect to the server
// // const clearBtn = document.getElementById("clearBtn");

// // canvas.width = window.innerWidth;
// // canvas.height = window.innerHeight;

// // let drawing = false;
// // let x = 0, y = 0;

// // canvas.addEventListener("mousedown", (e) => {
// //   drawing = true;
// //   x = e.clientX;
// //   y = e.clientY;
// //   ctx.moveTo(x, y);

// //   socket.emit("draw", { type: "moveTo", x, y });
// // });

// // canvas.addEventListener("mouseup", () => {
// //   drawing = false;
// // });

// // canvas.addEventListener("mousemove", (e) => {
// //   if (!drawing) return;

// //   x = e.clientX;
// //   y = e.clientY;
// //   ctx.lineTo(x, y);
// //   ctx.stroke();

// //   socket.emit("draw", { type: "lineTo", x, y });
// // });

// // // Receive drawing data from other tabs
// // socket.on("draw", (data) => {
// //   if (data.type === "moveTo") {
// //     ctx.moveTo(data.x, data.y);
// //   } else if (data.type === "lineTo") {
// //     ctx.lineTo(data.x, data.y);
// //     ctx.stroke();
// //   }
// // });

// // // Clear button click
// // clearBtn.addEventListener("click", () => {
// //   clearCanvas();           // Clear current tab immediately
// //   socket.emit("clear");    // Notify server to clear all tabs
// // });

// // // Clear canvas function
// // function clearCanvas() {
// //   ctx.clearRect(0, 0, canvas.width, canvas.height);
// // }

// // // Listen for clear command from the server
// // socket.on("clear", () => {
// //   clearCanvas();           // Clear canvas on all tabs
// // });



// // script.js
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// const socket = io();  // Connect to the server
// const clearBtn = document.getElementById("clearBtn");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// // Check if the canvas is cleared from previous sessions using localStorage
// if (localStorage.getItem("canvasCleared") === "true") {
//   clearCanvas();  // Clear the canvas on load if stored state says it's cleared
// }

// let drawing = false;
// let x = 0, y = 0;

// canvas.addEventListener("mousedown", (e) => {
//   drawing = true;
//   x = e.clientX;
//   y = e.clientY;
//   ctx.moveTo(x, y);

//   socket.emit("draw", { type: "moveTo", x, y });
// });

// canvas.addEventListener("mouseup", () => {
//   drawing = false;
// });

// canvas.addEventListener("mousemove", (e) => {
//   if (!drawing) return;

//   x = e.clientX;
//   y = e.clientY;
//   ctx.lineTo(x, y);
//   ctx.stroke();

//   socket.emit("draw", { type: "lineTo", x, y });
// });

// // Receive drawing data from other tabs
// socket.on("draw", (data) => {
//   if (data.type === "moveTo") {
//     ctx.moveTo(data.x, data.y);
//   } else if (data.type === "lineTo") {
//     ctx.lineTo(data.x, data.y);
//     ctx.stroke();
//   }
// });

// // Clear button click
// clearBtn.addEventListener("click", () => {
//   clearCanvas();           // Clear current tab immediately
//   localStorage.setItem("canvasCleared", "true");  // Store the clear state permanently
//   socket.emit("clear");    // Notify server to clear all tabs
// });

// // Clear canvas function
// function clearCanvas() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// // Listen for clear command from the server
// socket.on("clear", () => {
//   clearCanvas();           // Clear canvas on all tabs
//   localStorage.setItem("canvasCleared", "true");  // Persist clear state in localStorage
// });



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const socket = io();  // Connect to the server
const clearBtn = document.getElementById("clearBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ensure the canvas is cleared when it is initialized
if (localStorage.getItem("canvasCleared") === "true") {
  clearCanvas();  // Clear the canvas if the state says it's cleared
}

let drawing = false;
let x = 0, y = 0;

// Draw events on the canvas
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  x = e.clientX;
  y = e.clientY;
  ctx.moveTo(x, y);

  socket.emit("draw", { type: "moveTo", x, y });
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  x = e.clientX;
  y = e.clientY;
  ctx.lineTo(x, y);
  ctx.stroke();

  socket.emit("draw", { type: "lineTo", x, y });
});

// Listen for draw data from other tabs
socket.on("draw", (data) => {
  if (data.type === "moveTo") {
    ctx.moveTo(data.x, data.y);
  } else if (data.type === "lineTo") {
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
  }
});

// Clear button click
clearBtn.addEventListener("click", () => {
  clearCanvas();  // Clear the current tab immediately
  socket.emit("clear");  // Notify server to clear all tabs
  localStorage.setItem("canvasCleared", "true");  // Persist clear state in localStorage
});

// Clear canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Listen for clear command from the server (to clear all tabs)
socket.on("clear", () => {
  clearCanvas();  // Clear canvas on all tabs
  localStorage.setItem("canvasCleared", "true");  // Persist clear state in localStorage
});

// Reset the canvas to be ready for a new drawing after clearing
socket.on("reset", () => {
  // Reset any ongoing drawing behavior if needed
  drawing = false;
});
