// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// create connection for signal r
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .build();

// receive message
connection.on("ReceiveMessage", (user, message) => {
  const html = `<p class="text-center mt-4" style="display: block;"><b>${user}:</b> ${message}</p>`;
  const chatDetail = document.querySelector(".chat-detail");
  chatDetail.insertAdjacentHTML("beforeend", html);
});

connection.start().catch((err) => console.log(err.toString()));

//   send message
document.querySelector(".send-message").addEventListener("click", (e) => {
  e.preventDefault();

  let user = document.querySelector(".name-input").value;
  let message = document.querySelector(".message-input").value;

  connection
    .invoke("SendMessage", user, message)
    .catch((err) => console.error(err.toString()));
});
