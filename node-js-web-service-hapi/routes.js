const routes = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello world"
    }
  },
  {
    method: "GET",
    path: "/about",
    handler: (req, h) => {
      return "Welcome about"
    }
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
        return 'Halaman tidak ditemukan';
    },
},
]

module.exports = routes