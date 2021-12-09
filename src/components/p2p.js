import Peer from "peerjs";

function getConnect() {
  // 両方サーバーへ接続 id は数字　+　ukeru okuru?
  const peer = new Peer("client1", {
    host: "localhost",
    port: 9000,
    path: "/",
  });

  // 接続待ち(client2)
  peer.on("connection", (conn) => {
    console.log("他のクライアントからの接続あり");
    conn.on("data", (data) => {
      console.log(data);
    });
    conn.send("send message");
  });

  // 接続(client1)
  const conn = peer.connect("client2");
  conn.on("open", () => {
    console.log("client2に接続できました。");
    conn.send("message");
  });
  conn.on("data", (data) => {
    console.log(data);
  });
}

export default getConnect;

//serverはheroku

// ユーザーの間で共通の鍵を考えてもらう。
// 部屋を開くほうのidは""鍵 + owner"
// 部屋を開くほうのidは""鍵 + visitor"
