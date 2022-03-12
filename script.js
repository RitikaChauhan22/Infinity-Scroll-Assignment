(function() {
    const content = document.querySelector('.data');
    const loading = document.querySelector('.loading');
    
    let nextPage = 1;
  
    function renderUsers(users) {
      users.results.map(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = user.email;
        content.appendChild(userDiv);
      });
    }
  
    async function getUsers(page) {
      const userData = await fetch(
        `https://randomuser.me/api/?page=${page}&results=50`
      );
      const users = await userData.json();
      return users;
    }
  
    //scrolling

    async function loadMoreUser() {

      const {scrollTop, clientHeight, scrollHeight} = content;
      if(scrollHeight - scrollTop == clientHeight) {
        loading.classList.add("show");
      } 
      // console.log("scrollTop:" , scrollTop);
      // console.log("clientHeight:" , clientHeight);
      // console.log("scrollHeight:" , scrollHeight);

      const users = await getUsers(nextPage);
      renderUsers(users);
      loading.classList.remove("show");
      nextPage += 1;

    }

    loadMoreUser();
    nextPage += 1;

    //event listener

    content.addEventListener("scroll", loadMoreUser);



  })();