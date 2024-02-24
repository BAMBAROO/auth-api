const routes = (handler) => ([
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
  },
//   {
//     method: 'GET',
//     path: '/nabila',
//     handler: () => `
//     <p>Hai Nabila,</p>
//     <p>Sejak pertama kali kita bertemu, hidupku seperti mendapat warna baru. Setiap momen bersamamu adalah lukisan indah yang membuat hatiku berdetak lebih cepat. Kebersamaan kita seperti melibatkan diriku dalam kisah cinta yang tak terlupakan.</p>
//     <p>Kau adalah sinar matahari dalam hari-hariku yang kelam, menghangatkan setiap sudut hatiku. Melalui senyumanmu, aku menemukan kebahagiaan yang tidak terhingga. Nabila, kau adalah bunga indah di taman hatiku, yang mekar dengan kelembutan dan kecantikan.</p>
//     <p>Setiap kata cinta terasa seperti melodi yang dinyanyikan oleh hatiku untukmu. Aku bersyukur memilikimu dalam hidupku, dan aku berjanji untuk selalu menjagamu dengan penuh cinta dan kesetiaan. Nabila, kau adalah impian yang menjadi kenyataan, dan aku tak sabar untuk menjalani setiap petualangan bersamamu.</p>
//     <p>Semoga setiap hari kita lewati penuh dengan kebahagiaan, tawa, dan cinta yang tak pernah pudar. Aku mencintaimu lebih dari apapun, Nabila.</p>
//     <p>Dengan cinta,</p>
//     <p>Bryan Wayne</p>
// `,
//   },
]);

module.exports = routes;
