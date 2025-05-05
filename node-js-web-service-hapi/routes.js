const routes = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello world"
    }
  },
  {
    method: '*',
    path: '/',
    handler: (request, h) => {
      return 'Halaman tidak dapat diakses dengan method tersebut';
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (req, h) => {
      return "Welcome about"
    }
  },  
  {
    method: "GET",
    path: "/hello/{name?}",
    handler: (request, h) => {
      const { name = "Dandi" } = request.params
      const { lang } = request.query;
 
      if(lang === 'id') {
          return `Hai, ${name}!`;
      }

      return `Hallo ${name}, Koniciwaaaaa`
    }
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
        return 'Halaman tidak ditemukan';
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: (req, h) => {
      const { uname, upass } = req.payload

      return `Your ${uname} and your ${upass}`
    }
  }
]

module.exports = routes