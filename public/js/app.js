const output = document.getElementById("output");
const button = document.getElementById("get-posts-btn");

const getPosts = async () => {
  try {
    const response = await fetch("/api/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    output.innerHTML = "";
    data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.id = `post-${post.id}`;

      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      `;
      output.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

button.addEventListener("click", getPosts);
