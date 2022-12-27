const token = localStorage.getItem("token");
const btn = document.getElementById("buttonAdd");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hello");
  const name = document.getElementById("name");
  const des = document.getElementById("des");
  const categ = document.getElementById("categ");
  const obj = {
    name: name.value,
    des: des.value,
    categ: categ.value,
  };
  console.log(obj);
  const token = localStorage.getItem("token");
  axios
    .post("http://localhost:3000/addTask", obj, {
      headers: { Authorization: token },
    })
    .then((response) => {
      showListofRegisteredUser(response.data.data);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>something went wrong </h4>";
      console.log(err);
    });
  name.value = "";
  des.value = "";
  categ.value = "";
});

function showListofRegisteredUser(user) {
  const parentNode = document.getElementById("userlist");
  const createNewUserHtml = `<li id='${user.id}'>${user.name} - ${user.des} - ${user.categ}
                                        <button class="btn btn-primary" onclick=deleteUser('${user.id}')>Delete</button>
                                        <button class="btn btn-primary" onclick=EditUser('${user.name}','${user.des}','${user.categ}','${user.id}')>Edit</button>
                                        <button class="btn btn-primary" onclick=addTeam('${user.id}')>Add Team</button>

                                    </li>`;
  // console.log(createNewUserHtml);
  parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
  console.log(parentNode.innerHTML);
}

window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/getTask", {
      headers: { Authorization: token },
    })
    .then((response) => {
      for (let i = 0; i < response.data.response.length; i++) {
        let name = response.data.response[i].name;
        let des = response.data.response[i].des;
        let categ = response.data.response[i].categ;
        let id = response.data.response[i].id;

        const parentNode = document.getElementById("userlist");
        const createNewUserHtml = `<li id='${id}'>${name} - ${des} - ${categ}
                                        <button class="btn btn-primary" onclick=deleteUser('${id}')>Delete</button>
                                        <button class="btn btn-primary" onclick=EditUser('${name}','${des}','${categ}','${id}')>Edit</button>
                                        <button class="btn btn-primary" onclick=addTeam('${id}')>Add Team</button>

                                        </li>`;

        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function addTeam(e){
  window.location='group.html';
}

function deleteUser(userid) {
  const token = localStorage.getItem("token");
  axios
    .delete(`http://localhost:3000/del/${userid}`, {
      headers: { Authorization: token },
    })

    .then((response) => removeItemFromScreen(userid))
    // console.log(response))
    .catch((err) => console.log(err));
}

function removeItemFromScreen(userid) {
  const parentNode = document.getElementById("userlist");
  const elem = document.getElementById(userid);
  parentNode.removeChild(elem);
}

function EditUser(name, des, categ, id) {
  document.getElementById("name").value = name;
  document.getElementById("des").value = des;
  document.getElementById("categ").value = categ;

  deleteUser(id);
}
