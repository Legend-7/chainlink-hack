

function renderHeader() {
    const appSideContainer = document.getElementById("app-sidebar");
    const contentContainer = document.getElementById("app-content");
    
    const user = Moralis.User.current();
    if (!user) {
      console.log('no User logged in');
      return;
    }
    // show the logout, refresh buttons if user logged in
    appSideContainer.innerHTML = buildSideComponent(user);
    console.log('User logged in!');
    //document.getElementById("btn-logout").onclick = logOut;
  }
  

  function render() {
    const user = Moralis.User.current();
    if (user) {
      buildDashboard();
    } else {
      renderLogin();
    }
  }
  
  function init() {
    listenForAccountChange();
  
    // render on page load
    render();
  }
  init();
  
  
    