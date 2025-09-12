function login() {
  const loginForm = document.getElementById("login_form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      fetch("http://95.130.227.53:3003/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            console.log("Login successfully");
            return response.json();
          } else {
            console.log("Login failed");
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
        })
        .catch((err) => {
          console.error("error:", err);
        });
    } catch (error) {
      console.log(error);
    }
  });
}

async function getAdmins() {
  let accessToken = localStorage.getItem("accessToken");

  const accessTokenExpTime = getTokenExpTime(accessToken);
  console.log("accessTokenExpTime:", accessTokenExpTime);
  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("AccessToken faol");
    } else {
      console.log("Access tokenni vaqti chiqib ketdi");
      accessToken = await refreshToken();
    }
  } else {
    console.log("AccessToken chiqish vaqti berilmagan");
  }

  fetch("http://95.130.227.53:3003/api/admins", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status:", response.status);
      }
    })
    .then((adminData) => {
      console.log(adminData);
      displayAdmins(adminData);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function displayAdmins(adminData) {
  const adminsList = document.getElementById("list-admins");
  adminData.forEach((admin) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${admin.full_name} - ${admin.email}`;
    adminsList.appendChild(listItem);
  });
}

function getTokenExpTime(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshToken() {
  const loginUrl = "/login";
  try {
    const response = await fetch("http://95.130.227.53:3003/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.error && data.error == "jwt expired") {
      console.log("Refresh tokenning vaqti chiqib ketgan");
      return window.location.replace(loginUrl);
    }
    console.log("Tokenlar refresh token yordami yangilandi");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
    return window.location.replace(loginUrl);
  }
}

async function getOrders() {
  let accessToken = localStorage.getItem("accessToken");

  const accessTokenExpTime = getTokenExpTime(accessToken);
  console.log("accessTokenExpTime:", accessTokenExpTime);
  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("AccessToken faol");
    } else {
      console.log("Access tokenni vaqti chiqib ketdi");
      accessToken = await refreshToken();
    }
  } else {
    console.log("AccessToken chiqish vaqti berilmagan");
  }

  fetch("http://95.130.227.53:3003/api/orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status:", response.status);
      }
    })
    .then((orderData) => {
      console.log(orderData);
      displayOrders(orderData);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function displayOrders(orderData) {
  const adminsList = document.getElementById("list-orders");
  orderData.forEach((order) => {
    const listItem = document.createElement("li");
    listItem.textContent = `id.${order.id}, product link-${order.product_link}, Price-$${order.sum}, quantity-${order.quantity}`;
    adminsList.appendChild(listItem);
  });
}

async function getOpers() {
  let accessToken = localStorage.getItem("accessToken");

  const accessTokenExpTime = getTokenExpTime(accessToken);
  console.log("accessTokenExpTime:", accessTokenExpTime);
  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("AccessToken faol");
    } else {
      console.log("Access tokenni vaqti chiqib ketdi");
      accessToken = await refreshToken();
    }
  } else {
    console.log("AccessToken chiqish vaqti berilmagan");
  }

  fetch("http://95.130.227.53:3003/api/operations", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status:", response.status);
      }
    })
    .then((operData) => {
      console.log(operData);
      displayOpers(operData);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function displayOpers(operData) {
  const opersList = document.getElementById("list-opers");
  operData.forEach((oper) => {
    const listItem = document.createElement("li");
    listItem.textContent = `id.${oper.id}, operation date-${oper.operation_date}, Description-${oper.desc}, Admin id-${oper.adminId}, Order id-${oper.orderId}, Status id-${oper.statusId}`;
    opersList.appendChild(listItem);
  });
}
