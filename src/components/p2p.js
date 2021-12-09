import Peer from 'peerjs';

//idのパースどこでやる？

export function openRoom(id) {
  const ownerId = id + 'owner';
  console.log(ownerId);
  const peer = new Peer(ownerId, {
    host: 'peerjsdena.herokuapp.com',
    port: 443,
    path: '/',
    secure: true,
  });
  // receive
  peer.on('connection', (conn) => {
    console.log('get connection with ' + id + 'visitor');
    conn.on('data', function (data) {
      // Will print 'hi!'
      console.log(data);
    });
  });
  console.log(peer);
}

export function enterRoom(id) {
  const visitorId = id + 'visitor';
  const ownerId = id + 'owner';
  console.log(visitorId);
  console.log(ownerId);
  const peer = new Peer(visitorId, {
    host: 'peerjsdena.herokuapp.com',
    port: 443,
    path: '/',
    secure: true,
  });
  console.log('connect peer server');

  // send
  const conn = peer.connect(ownerId);
  peer.on('error', function (err) {
    console.log(err);
  });
  conn.on('open', () => {
    conn.on('data', function (data) {
      console.log('Received', data);
    });
    console.log('get connection with ' + ownerId);
    conn.send('hi!');
  });
}

//serverはheroku

// ユーザーの間で共通の鍵を考えてもらう。数字
// 部屋を開くほうのidは""鍵 + owner"
// 部屋を開くほうのidは""鍵 + visitor"
