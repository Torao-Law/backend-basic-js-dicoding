const http = require("http")

const requestListener = (req, res) => {
  const { method, url } = req
  res.setHeader('Content-type', 'text/html')
  
  // ========== LATIHAN METHOD ===============
  // if (method === "GET") {
  //   res.end("<h1>Ini get</h1>");
  // } 
  
  // if(method === 'POST') {
  //   let body = [];
   
  //   req.on('data', (chunk) => {
  //     body.push(chunk);
  //   });
   
  //   req.on('end', () => {
  //     body = Buffer.concat(body).toString();
  //     const { name } = JSON.parse(body);
  //     res.end(`<h1>Hai, ${name}!</h1>`);
  //   });
  // }

  // ========== LATIHAN URL, STATUS RESPONSE, STATUS HEADER ===============
  if(url === "/") {
    if (method === "GET") {
      res.statusCode = 200
      res.end('<h1>Ini adalah homepage</h1>');
    } else {
      res.statusCode = 404
      res.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }
  } else if (url === "/about") {
    if(method === 'GET') {
      res.statusCode = 200
      res.end('<h1>Halo! Ini adalah halaman about</h1>')
    } else if(method === 'POST') {
      let body = []

      req.on("data", (chunk) => {
        body.push(chunk)
      })

      req.on("end", () => {
        body = Buffer.concat(body).toString()
        const { name } = JSON.parse(body)

        res.statusCode = 201
        res.end(`Halo, ${name}`)
      })
    } else {
      res.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
    }
  } else {
    res.statusCode = 404
    res.end("<h1>Halaman tidak dapat ditemukan!")
  }
}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
})