document.addEventListener("DOMContentLoaded", function() {
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, element) {
    return parent.appendChild(element);
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
        const img = createNode('img');
        const postDiv = createNode('div');
        const profileURL = createNode('p');
        const likes = createNode('p');
        const comments = createNode('p');
        const postDate = createNode('p');

        div.classList.add('row');
        postDiv.classList.add('col');
        img.classList.add('post-img');
        
        {userName.length >= 1 ? profileURL.innerHTML = `${userName[0].user.username}` : profileURL.innerHTML = `${squidUserName}`}
        img.src = `${post.imagens.thumbnail.url}`
        append(div, postDiv);
        append(postDiv, profileURL);
        append(postDiv, img);
      });
  }
  renderData();

});