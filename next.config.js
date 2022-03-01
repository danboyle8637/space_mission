const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development" ? true : false,
    dest: "public",
  },
  images: {
    domains: ["ik.imagekit.io", "imagedelivery.net"],
  },
});

// module.exports = {
//   images: {
//     domains: ["ik.imagekit.io", "imagedelivery.net"],
//   },
// };
