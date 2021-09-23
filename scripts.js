document.addEventListener("DOMContentLoaded", function() {
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, element) {
    return parent.appendChild(element);
  }

  function addZero(num){
    if (num <= 9) 
      return "0" + num;
    else
      return num;
  }

  const div = document.getElementById('instagram_posts');
  const url = 'https://us-central1-squid-apis.cloudfunctions.net/test-front-basic';
  
  function fetchData() {
    try { 
      const data = fetch(url)
        .then(response => response.json())
        .then(response => response);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function renderData() {
    const data = await fetchData();
    console.log(data);
      return data.map(post => {
        const userName = post.metadados.users_in_photo;
        const squidUserName = post.usuario.username;
        const datePost = new Date(post.criadoEm);
        const formattedDate = `${addZero((datePost.getDate()))}/
          ${(addZero(datePost.getMonth() + 1))}/${datePost.getFullYear()} 
          ${datePost.getHours()}:${addZero(datePost.getMinutes())}`;

        const postDiv = createNode('div');
        const postInfo = createNode('div');
        const postDetails = createNode('div');

        const img = createNode('img');

        const profileURL = createNode('p');
        const likes = createNode('p');
        const comments = createNode('p');
        const postDate = createNode('p');

        img.classList.add('post_img');
        postDiv.classList.add('col');
        postInfo.classList.add('post_info');
        postDetails.classList.add('post_details');
        
        {userName.length >= 1 
          ? profileURL.innerHTML = `@${userName[0].user.username}`
          : profileURL.innerHTML = `@${squidUserName}`}

        img.src = `${post.imagens.thumbnail.url}`;
        likes.innerHTML = `<i class="fas fa-heart"></i> ${post.upvotes}`;
        comments.innerHTML = `<i class="fas fa-comment"></i> ${post.comentarios}`;
        postDate.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDate}`;

        append(div, postDiv);
        append(postDiv, postInfo);
        append(postInfo, img);
        append(postInfo, postDetails);
        append(postDetails, profileURL);
        append(postDetails, likes);
        append(postDetails, comments);
        append(postDetails, postDate);
      });
  }
  renderData();

});