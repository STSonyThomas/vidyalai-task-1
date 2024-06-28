const express = require('express');
const { fetchPosts, fetchPhotos } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts(req.query);

  const postsWithImages = await posts.reduce(async (acc, post) => {
    const photos = await fetchPhotos(post);
    const user = await fetchUserById(post.userId);
    return [
      ...await acc,
      {
        ...post,
        images: [
          { url: photos[Math.floor(Math.random()*photos.length)].url }, //selects a random photo from the photos array of the post
          { url: photos[Math.floor(Math.random()*photos.length)].url },
          { url: photos[Math.floor(Math.random()*photos.length)].url },
        ],
        user: user, //user object containing user name and user email
      },
    ];
  }, []);

  res.json(postsWithImages);
});

module.exports = router;
