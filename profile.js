async function logOut() {
    await Moralis.User.logOut();
    render();
    console.log("logged out. User:", Moralis.User.current());
  }
  
  async function loginWithMetaMask() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate();
    }
    console.log(user);
  
    render();
  }
  
  async function loginWithEmail(isSignUp) {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
  
    if (!email || !pass) {
      alert("please provide both email and password");
      return;
    }
  
    try {
      if (isSignUp) {
        // when using email for username
        // assign it to the username property
        const user = new Moralis.User();
        user.set("username", email);
        user.set("password", pass);
  
        await user.signUp();
      } else {
        await Moralis.User.logIn(email, pass);
      }
  
      render();
    } catch (error) {
      console.log(error);
      alert("invalid username or password");
    }
  }

  function addressAlreadyLinked(user, address) {
    return user && address && user.attributes.accounts && user.attributes.accounts.includes(address);
  }
  
  async function onUnlinkAddress(event) {
    event.preventDefault();
    try {
      const address = event.target.dataset.addr;
      console.log("onUnlinkAddress:: addr:", address);
  
      const confirmed = confirm("Are you sure you want to remove this address?");
      if (!confirmed) {
        return;
      }
  
      await Moralis.unlink(address);
      alert("Address removed from profile!");
      render();
    } catch (error) {
      console.error(error);
      alert("Error unlinking address. See console.");
    }
  }
  
  
  function buildLoginComponent(isSignUp = false) {
    const btnSignUp = isSignUp ? "" : `<button type="button" id="btn-login-email-signup">Sign Up With Email</button>`;
  
    return `
      <div class="container login">
        <button id="btn-login-metamask">Login/Signup With MetaMask</button>
        <hr/>
        <div id="frm-login">
          <div class="form-group">
            <label for="email">User/Email</label>
            <input type="text" id="email" name="email"/>
          </div>
          <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" id="pass" name="pass"/>
          </div>
          <button type="button" id="btn-login-email" type="button">Submit</button>
          ${btnSignUp}
        </div>
      </div>
    `;
  }
  
  function renderLogin(isSignUp) {
    const contentContainer = document.getElementById("app-content");

    contentContainer.innerHTML = buildLoginComponent(isSignUp);
    document.getElementById("btn-login-metamask").onclick = loginWithMetaMask;
    document.getElementById("btn-login-email").onclick = function () {
      loginWithEmail(isSignUp);
    };
    if (!isSignUp) {
      document.getElementById("btn-login-email-signup").onclick = function () {
        loginWithEmail(true);
      };
    }
  }
  
  function getAddressTxt(address) {
    return `${address.substr(0, 4)}...${address.substr(address.length - 4, address.length)}`;
  }
  
  function buildProfileComponent(user) {
    return `
      <div class="container">
        <div>
          <div class="form-group">
            <label for="name">Username</label>
            <input type="text" id="name" value="${user.attributes.username || ""}"/>
          </div>
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              cols="50"
              maxlength="200" >${user.attributes.bio || ""}</textarea>
          </div>
          <div id="profile-set-pass">
            ${buildSetPassComponent()}
          </div>
          ${buildAddrListComponent(user)}
          <button class="mt" type="button" id="btn-profile-save">Save Profile</button>
        </div>
      </div>
    `;
  }
  
  function buildAddrListComponent(user) {
    // add each address to the list
    let addressItems = "";
    if (user.attributes.accounts && user.attributes.accounts.length) {
      addressItems = user.attributes.accounts
        .map(function (account) {
          return `<li>
            <button class="btn-addr btn-remove" type="button" data-addr="${account}">X</button>
            ${getAddressTxt(account)}
          </li>`;
        })
        .join("");
    } else {
      // no linked addreses, add button to link new address
      addressItems = `
      <li>
        <button class="btn-addr" type="button" id="btn-add-addr">+</button>
        Link
      </li>
      `;
    }
  
    return `
      <div>
        <h3>Linked Addresses</h3>
        <ul>
          ${addressItems}
        </ul>
      </div>
    `;
  }
  
  function renderProfile(user) {
    const contentContainer = document.getElementById("app-content");

    contentContainer.innerHTML = buildProfileComponent(user);
    document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
    document.getElementById("btn-profile-save").onclick = onSaveProfile;
    document.querySelectorAll(".btn-remove").forEach(function (button) {
      button.onclick = onUnlinkAddress;
    });
  
    const btnAddAddress = document.getElementById("btn-add-addr");
    if (btnAddAddress) {
      btnAddAddress.onclick = onAddAddress;
    }
  }
  
  function onSetPassword(event) {
    const containerSetPass = document.getElementById("profile-set-pass");
    containerSetPass.innerHTML = buildSetPassComponent(true);
    document.getElementById("btn-save-pass").onclick = onSaveNewPassword;
    document.getElementById("btn-cancel-pass").onclick = onCancelNewPassword;
  }
  
  function buildSetPassComponent(showForm = false) {
    if (!showForm) {
      return `
        <p>Setting a password allows login via username</p>
        <button type="button" id="btn-profile-set-pass">Set Password</button>
      `;
    }
  
    return `
      <div class="set-password">
        <div class="form-group">
          <label for="pass">New Password</label>
          <input type="password" id="pass" autocomplete="off" />
        </div>
        <div class="form-group">
          <label for="confirm-pass">Confirm</label>
          <input type="password" id="confirm-pass" autocomplete="off" />
        </div>
        <button type="button" id="btn-save-pass">Save Password</button>
        <button type="button" id="btn-cancel-pass">Cancel</button>
      </div>
    `;
  }
  
  
async function onSaveProfile(event) {
    event.preventDefault();
    const user = Moralis.User.current();
  
    try {
      // get values from the form
      const username = document.getElementById("name").value;
      const bio = document.getElementById("bio").value;
      console.log("username:", username, "bio:", bio);
  
      // update user object
      user.setUsername(username); // built in
      user.set("bio", bio); // custom attribute
  
      await user.save();
      alert("saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error while saving. See the console.");
    }
  }
  async function onSaveNewPassword(event) {
    event.preventDefault();
    const user = Moralis.User.current();
  
    try {
      // make sure new and confirmed password the same
      const newPass = document.getElementById("pass").value;
      const confirmPass = document.getElementById("confirm-pass").value;
  
      if (newPass !== confirmPass) {
        alert("passwords not equal");
        return;
      }
  
      user.setPassword(newPass);
      await user.save();
      alert("Password updated successfully!");
  
      render();
    } catch (error) {
      console.error(error);
      alert("Error while saving new password. See the console");
    }
  }
  
  function onCancelNewPassword() {
    const containerSetPass = document.getElementById("profile-set-pass");
    containerSetPass.innerHTML = buildSetPassComponent();
    document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
  }
  
  function buildDashboard() {
      const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = 
    `
    <div id="app-sidebar">
  
    </div>
    <div id="app-content">
  
    </div>
    `
    renderHeader();//render sidebar
  
  }
  