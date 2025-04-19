let posts = [
  { id: 1, title: "Post 1", content: "This is the content of post 1" },
  { id: 2, title: "Post 2", content: "This is the content of post 2" },
  { id: 3, title: "Post 3", content: "This is the content of post 3" },
  { id: 4, title: "Post 4", content: "This is the content of post 4" },
];

// @descriptio: Get all posts
// @route: GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (limit) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
};

// @description: Get a single post by ID
// @route: GET /api/posts/:id
export const getPostById = (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }
  //
  res.status(200).json(post);
  //
};
// @description: Get the content of a post by ID
// @route: GET /api/posts/:id/content

export const getPostContent = (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post.content);
};

// @description: Create a new post
// @route: POST /api/posts
export const createPost = (req, res, next) => {
  console.log(req.body);
  if (!req.body.title || !req.body.content) {
    const error = new Error("Title and content are required.");
    error.status = 400;
    return next(error);
  }

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// @description: Update a post by ID
// @route: PUT /api/posts/:id

export const updatePost = (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }

  if (!req.body.title || !req.body.content) {
    const error = new Error("Title and content are required.");
    error.status = 400;
    return next(error);
  }
  if (req.body.title.length < 5) {
    const error = new Error("Title must be at least 5 characters long.");
    error.status = 400;
    return next(error);
  }

  post.title = req.body.title;
  post.content = req.body.content;
  res.status(200).json(post);
};

// @description: Delete a post by ID
// @route: DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }

  posts.splice(postIndex, 1);
  res.status(204).json({ message: "Post deleted successfully." });
};
