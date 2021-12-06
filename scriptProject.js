function signUp() {
    var firstName = document.getElementById("firstName").value
    var verifFirstName = verifLength(firstName, 3)
    if (verifFirstName) {
        document.getElementById('verifFirstName').innerHTML = ""

    }
    else {
        document.getElementById('verifFirstName').innerHTML = "First name must have at least 3 caracters"
        document.getElementById('verifFirstName').style.color = "red"
    }
    var lastName = document.getElementById("lastName").value
    var verifLastName = verifLength(lastName, 5)
    if (verifLastName) {
        document.getElementById('verifLastName').innerHTML = ""

    }
    else {
        document.getElementById('verifLastName').innerHTML = "Last name error"
        document.getElementById('verifLastName').style.color = "red"
    }

    var email = document.getElementById("email").value
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("verifEmail").innerHTML = "";
    }
    else {
        document.getElementById("verifEmail").innerHTML = "Invalid Email"
        document.getElementById("verifEmail").style.color = "red";
    }


    var password = document.getElementById("password").value

    if (password.length < 8) {
        document.getElementById('verifContainPswd').innerHTML = "Password Too Short"
        document.getElementById('verifContainPswd').style.color = "red"

    }
    else if (password.length > 16) {
        document.getElementById('verifContainPswd').innerHTML = "Password Too Long"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/\d/) == -1) {
        document.getElementById('verifContainPswd').innerHTML = "No number In Password"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/[a-z]/) == -1) {
        document.getElementById('verifContainPswd').innerHTML = "No Lowercase In Password"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/[A-Z]/) == -1) {
        document.getElementById('verifContainPswd').innerHTML = "No Uppercase In Password"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        document.getElementById('verifContainPswd').innerHTML = "Bad Char In Password"
        document.getElementById('verifContainPswd').style.color = "red"

    }
    else {
        document.getElementById('verifContainPswd').innerHTML = ""
    }

    var confirmPwd = document.getElementById("confirmPwd").value;
    if (password == confirmPwd) {
        document.getElementById("verifConfirmPassword").innerHTML = "";
    }
    else {
        document.getElementById("verifConfirmPassword").innerHTML = "Confirm Password Error"
        document.getElementById("verifConfirmPassword").style.color = "red";
    }


    var tel = document.getElementById("tel").value;
    if ((tel.length == 8) && (isNaN(tel) == false)) {
        document.getElementById("telError").innerHTML = "";
    }
    else {
        document.getElementById("telError").innerHTML = "Tel number must have 8 caracters"
        document.getElementById("telError").style.color = "red";
    }
    var emailExist = userEmail(email)
    if (!emailExist) {
        document.getElementById("emailExistError").innerHTML = ""
    }
    else {
        document.getElementById("emailExistError").innerHTML = "email allready exist"
        document.getElementById("emailExistError").style.color = "red";
    }

    if ((tel.length == 8) && (!emailExist) && (isNaN(tel) == false) && (tel.length == 8) && (isNaN(tel) == false) && (password == confirmPwd)
        && (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1) && (password.search(/[A-Z]/) != -1) &&
        (password.search(/[a-z]/) != -1) && (password.search(/\d/) != -1) && (password.length > 8) && password.length < 16) {

        var idUser = JSON.parse(localStorage.getItem("idUser") || 10);

        // regroupement des donnes
        var user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPwd: confirmPwd,
            tel: tel,
            role: "client"
        }

        // recuperation des anciennes valeurs
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        // ajout de l'objet user dans le tableau usersTab
        users.push(user);
        //  sauvegarde du tableau userTab (mise à jour)
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUser", idUser + 1)
        location.reload();

    }
}



function displayUsers() {
    var displays1 = `<table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Tel</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    
                                  <tbody>`;


    var users = JSON.parse(localStorage.getItem("users") || "[]");

    for (let i = 0; i < users.length; i++) {

        displays1 +=
            `
                            <tr>
                                <th scope="row">${users[i].id}</th>
                                <td>${users[i].firstName}</td>
                                <td>${users[i].lastName}</td>
                                <td>${users[i].email}</td>
                                <td>${users[i].tel}</td>
                                <td>${users[i].role}</td>
                                <td><i class="far fa-edit" onclick="editUser(${users[i].id})" style="color: green;cursor:pointer"></i>
                                    <i class="fas fa-user-minus" onclick="delete1(${i},'users')" style="color:red;cursor:pointer"></i>
                                    </td>
                            </tr>`;
    }
    displays1 += `
                        </tbody>
                    </table>`;

    document.getElementById("displays1").innerHTML = displays1;

}

function displayPro1() {
    var displays2 = `<table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">idClient</th>
                                                <th scope="col">idPro</th>
                                                <th scope="col">Date Time</th>
                                                <th scope="col">Action</th>
                                                <th scope="col">Statut</th>
                                            </tr>
                                        </thead>
                                        
                                      <tbody>`;


    var rendezvous = JSON.parse(localStorage.getItem("rendezvous") || "[]");
var connectedUser=JSON.parse(localStorage.getItem("connectedUser"))
    for (let i = 0; i < rendezvous.length; i++) {
        if (connectedUser.id==rendezvous[i].idPro) {
            
        

        displays2 +=
            `
                                <tr>
                                    <th scope="row">${rendezvous[i].id}</th>
                                    <td>${rendezvous[i].idClient}</td>
                                    <td>${rendezvous[i].idPro}</td>
                                    <td>${rendezvous[i].reserveDate}</td>
                                    <td>${rendezvous[i].statut}</td>
                                    <td><i class="far fa-edit" onclick="editDateRendezVous(${rendezvous[i].id})" style="color: green;cursor:pointer"></i>
                                        <i class="fas fa-check" onclick="accept(${rendezvous[i].id})" style="color: green;cursor:pointer"></i>
                                        <i class="fas fa-times" onclick="rejet(${rendezvous[i].id})" style="color:red;cursor:pointer"></i>
                                        </td>
                                </tr>`;
    }}
    displays2 += `
                            </tbody>
                        </table>`;

    document.getElementById("displays2").innerHTML = displays2;

}
function displayPro2() {
    var displays3 = `<table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">idClient</th>
                                                    <th scope="col">idPro</th>
                                                    <th scope="col">Date Time</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Statut</th>
                                                </tr>
                                            </thead>
                                            
                                          <tbody>`;


    var rendezvous = JSON.parse(localStorage.getItem("rendezvous") || "[]");

    for (let i = 0; i < rendezvous.length; i++) {

        displays3 +=
            `
                                    <tr>
                                        <th scope="row">${rendezvous[i].id}</th>
                                        <td>${rendezvous[i].idClient}</td>
                                        <td>${rendezvous[i].idPro}</td>
                                        <td>${rendezvous[i].reserveDate}</td>
                                        <td>${rendezvous[i].statut}</td>
                                        <td><i class="far fa-edit" onclick="editDateRendezVous(${rendezvous[i].id})" style="color: green;cursor:pointer"></i>
                                            </td>
                                    </tr>`;
    }
    displays3 += `
                                </tbody>
                            </table>`;

    document.getElementById("displays3").innerHTML = displays3;

}
function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

function verifLength(ch, nb) {
    return ch.length >= nb;
}
function insertAdmins() {
    var admin1 = {
        id: 1,
        firstName: "mouhib",
        lastName: "bouazizi",
        email: "mouhib@gmail.com",
        password: "12345678",
        tel: "22162152",
        role: "admin"
    };
    var admin2 = {
        id: 2,
        firstName: "imed",
        lastName: "malek",
        email: "imed@gmail.com",
        password: "12345678",
        tel: "22000000",
        role: "admin"
    };
    var admin3 = {
        id: 3,
        firstName: "ameni",
        lastName: "khadhraoui",
        email: "imed@gmail.com",
        password: "147852369",
        tel: "22162152",
        role: "admin"
    };
    var admin4 = {
        id: 4,
        firstName: "siwar",
        lastName: "cherni",
        email: "siwar@gmail.com",
        password: "147852369",
        tel: "22162152",
        role: "admin"
    };
    var users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push(admin1, admin2, admin3, admin4)



    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("adminAdd", true)

}

function rejet(id) {
    var rendezvous = searchById(id, "rendezvous")
    var tab = JSON.parse(localStorage.getItem("rendezvous") || "[]")
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == rendezvous.id) {
            tab[i].statut = "rejete"
        }

    }
    localStorage.setItem("rendezvous", JSON.stringify(tab))
    location.reload();

}
function accept(id) {
    var rendezvous = searchById(id, "rendezvous")
    var tab = JSON.parse(localStorage.getItem("rendezvous") || "[]")
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == rendezvous.id) {
            tab[i].statut = "confirme"
        }

    }
    localStorage.setItem("rendezvous", JSON.stringify(tab))
    location.reload();

}



function editUser(id) {
    var user = searchById(id, "users")
    console.log(user)
    var editUser = `
       <div class="col-md-12 form-group">
       <input type="tel" class="form-control" id="tel" name="name" placeholder="Tel" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${user.tel}>
       <span id="telError"></span>
       </div>
    
       <div class="col-md-12 form-group">
       <input type="password" class="form-control" id="password" name="name" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${user.password}>
       <span id="passwordError"></span>
       </div>
       
       <div class="col-md-12 form-group">
       <button type="submit" value="submit" class="primary-btn" onClick="validateEditUser(${user.id})">Validate</button>
       </div>
        `
    document.getElementById("editUser").innerHTML = editUser
}
function editDateRendezVous(id) {
    var date = searchById(id, "rendezvous")
    console.log(date)
    var editDateRendezVous = `
       <div class="col-md-12 form-group">
       <input type="datetime-local" class="form-control" id="datetime" name="name" placeholder="date_time" value=${date.reserveDate}>
       </div>
       
    
       
       <div class="col-md-12 form-group">
       <button type="submit" value="submit" class="btn btn-primary" onClick="validateEditDate(${date.id})">Validate</button>
       </div>
        `
    document.getElementById("datetime").innerHTML = editDateRendezVous
}


function searchById(id, cle) {
    var tab = JSON.parse(localStorage.getItem(cle) || "[]")
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            return tab[i]
        }
    }
}

function validateEditUser(id) {
    //recuperation des nouvelles valeurs
    var newPassword = document.getElementById('password').value
    var verifPaasword = verifLength(newPassword, 8);
    if (verifPaasword) {
        document.getElementById("passwordError").innerHTML = "";
    }
    else {
        document.getElementById("passwordError").innerHTML = "Invalid Password"
        document.getElementById("passwordError").style.color = "red";
    }

    var newTel = document.getElementById('tel').value
    if ((newTel.length == 8) && (isNaN(newTel) == false)) {
        document.getElementById("telError").innerHTML = "";
    }
    else {
        document.getElementById("telError").innerHTML = "Tel number must have 8 caracters"
        document.getElementById("telError").style.color = "red";
    }


    if (verifPaasword && (newTel.length == 8) && (isNaN(newTel) == false)) {

        // recuperation des nouvelle valeurs de LS
        var users = JSON.parse(localStorage.getItem("users") || "[]")
        // parcours tab recherche user a modifier et moification du password et tel


        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].tel = newTel;
                users[i].password = newPassword;
                users[i].confirmPwd = newPassword;

            }

        }


        // sauvegarde du mise a jours
        localStorage.setItem("users", JSON.stringify(users))
        // refresh de la page
        location.reload()

    }
}
function validateEditDate(id) {
    //recuperation des nouvelles valeurs
    var newdate = document.getElementById('datetime').value

    console.log(newdate);
    // recuperation des nouvelle valeurs de LS
    var rendezvous = JSON.parse(localStorage.getItem("rendezvous") || "[]")
    // parcours tab recherche user a modifier et moification du password et tel


    for (let i = 0; i < rendezvous.length; i++) {
        if (rendezvous[i].id == id) {
            rendezvous[i].reserveDate = newdate;

        }

    }


    // sauvegarde du mise a jours
    localStorage.setItem("rendezvous", JSON.stringify(rendezvous))
    // refresh de la page
    location.reload()

}

function delete1(position, cle) {
    var tab = JSON.parse(localStorage.getItem(cle));
    tab.splice(position, 1);
    localStorage.setItem(cle, JSON.stringify(tab));
    location.reload();
}



function signUpPro() {
    var firstName = document.getElementById("firstName").value
    var verifFirstName = verifLength(firstName, 3)
    if (verifFirstName) {
        document.getElementById('verifFirstName').innerHTML = ""

    }
    else {
        document.getElementById('verifFirstName').innerHTML = "First name must have at least 3 caracters"
        document.getElementById('verifFirstName').style.color = "red"
    }
    var lastName = document.getElementById("lastName").value
    var verifLastName = verifLength(lastName, 5)
    if (verifLastName) {
        document.getElementById('verifLastName').innerHTML = ""

    }
    else {
        document.getElementById('verifLastName').innerHTML = "Last name error"
        document.getElementById('verifLastName').style.color = "red"
    }

    var email = document.getElementById("email").value
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("verifEmail").innerHTML = "";
    }
    else {
        document.getElementById("verifEmail").innerHTML = "Invalid Email"
        document.getElementById("verifEmail").style.color = "red";
    }

    var password = document.getElementById("password").value

    if (password.length < 8) {
        document.getElementById('verifContainPswd').innerHTML = "Password Too Short"
        document.getElementById('verifContainPswd').style.color = "red"

    }
    else if (password.length > 16) {
        document.getElementById('verifContainPswd').innerHTML = "Password Too Long"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/\d/) == -1) {
        document.getElementById('verifContainPswd').innerHTML = "No number In Password"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/[a-z]/) == -1) {
        document.getElementById('verifContainPswd').innerHTML = "No Lowercase In Password"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/[A-Z]/) == -1) {
        document.getElementById('verifContainPswd').innerHTML = "No Uppercase In Password"
        document.getElementById('verifContainPswd').style.color = "red"


    }
    else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        document.getElementById('verifContainPswd').innerHTML = "Bad Char In Password"
        document.getElementById('verifContainPswd').style.color = "red"

    }
    else {
        document.getElementById('verifContainPswd').innerHTML = ""
    }

    var confirmPwd = document.getElementById("confirmPwd").value;
    if (password == confirmPwd) {
        document.getElementById("verifConfirmPassword").innerHTML = "";
    }
    else {
        document.getElementById("verifConfirmPassword").innerHTML = "Confirm Password Error"
        document.getElementById("verifConfirmPassword").style.color = "red";
    }


    var tel = document.getElementById("tel").value;
    if ((tel.length == 8) && (isNaN(tel) == false)) {
        document.getElementById("telError").innerHTML = "";
    }
    else {
        document.getElementById("telError").innerHTML = "Tel number must have 8 caracters"
        document.getElementById("telError").style.color = "red";
    }
    var specialite = document.getElementById("specialite").value;
    if (specialite == "---") {
        document.getElementById("specialiteError").innerHTML = "please enter your speciality";
        document.getElementById("specialiteError").style.color = "red";

    }
    else {
        document.getElementById("specialiteError").innerHTML = "";

    }
    var gouvernorat = document.getElementById("gouvernorat").value
    if (gouvernorat == "---") {
        document.getElementById("gouvernoratError").innerHTML = "please enter your governorate";
        document.getElementById("gouvernoratError").style.color = "red";
    }
    else {
        document.getElementById("gouvernoratError").innerHTML = "";
    }
    var photoPro = document.getElementById("uploadImage").value
    var photo = replaceCh(photoPro)
    var delegation = document.getElementById("delegation").value


    if ((tel.length == 8) && (isNaN(tel) == false) && (tel.length == 8) && (isNaN(tel) == false) && (password == confirmPwd)
        && (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1) && (password.search(/[A-Z]/) != -1) &&
        (password.search(/[a-z]/) != -1) && (password.search(/\d/) != -1) && (password.length > 8) && password.length < 16 && (specialite != "---") && (gouvernorat != "---")) {

        var idUserPro = JSON.parse(localStorage.getItem("idUserPro") || 100);

        // regroupement des donnes
        var user = {
            id: idUserPro,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPwd: confirmPwd,
            gouvernorat: gouvernorat,
            delegation: delegation,
            specialite: specialite,
            tel: tel,
            photoPro: photo,
            role: "Professional"

        }

        // recuperation des anciennes valeurs
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        // ajout de l'objet user dans le tableau usersTab
        users.push(user);
        //  sauvegarde du tableau userTab (mise à jour)
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUserPro", idUserPro + 1)
        location.replace("file:///C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/signIn.html");


    }
}

function replaceCh(ch) {


    var newCh = ch.replace(/\\/g, "/");
    var res = newCh.replace("fakepath", "Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/images");
    return res;

}
function change() {
    var gouvernorat = document.getElementById("gouvernorat").value
    if (gouvernorat == "ariana") {
        var delegations = `
            <span><strong>Delegation</strong></span>
            <select name="" id="delegation">
            <option value="" id="">---</option>
            <option value="ettadhamen" id="ettadhamen">Ettadhamen</option>
            <option value="kalaatElAndalous" id="kalaatElAndalous">Kalaat El Andalous</option>
            <option value="Mnihla" id="mnihla">Mnihla</option>
            <option value="raoued" id="raoued">Raoued</option>
            <option value="sidiThabet" id="sidiThabet">Sidi Thabet</option>
            <option value="soukra" id="soukra">Soukra</option></select>`;
        document.getElementById("delegations").innerHTML = delegations;
    }

    else if (gouvernorat == "benArous") {
        var delegations = `
            <span><strong>Delegation</strong></span>
            <select name="" id="delegation">
            <option value="" id="">---</option>
            <option value="BenArous" id="benArous">Ben Arous</option>
            <option value="Boumhel" id="boumhel">Boumhel</option>
            <option value="ElMourouj" id="elMourouj">El Mourouj</option>
            <option value="Ezzahra" id="ezzahra">Ezzahra</option>
            <option value="Fouchana" id="fouchana">Fouchana</option>
            <option value="HammamChott" id="hammamChott">Hammam Chott</option>
            <option value="HammamLif" id="hammamLif">Hammam Lif </option>
            <option value="MHamdia" id="mHamdia">MHamdia</option>
            <option value="Megrine" id="megrine">Megrine</option>
            <option value="Mornag" id="mornag">Mornag</option>
            <option value="Rades" id="rades">Rades</option>
            <option value="MedinaJedida" id="medinaJedida">Medina Jedida</option></select>`;
        document.getElementById("delegations").innerHTML = delegations;

    }

    else if (gouvernorat == "manouba") {
        var delegations = `
            <span><strong>Delegation</strong></span>
            <select name="" id="delegation" >
            <option value="" id="">---</option>
            <option value="borjElAmri" id="borjElAmri">Borj El Amri</option>
            <option value="douarHicher" id="douarHicher">Douar Hicher</option>
            <option value="elBattan" id="elBattan">El Battan</option>
            <option value="jedaida" id="jedaida">Jedaida</option>
            <option value="manouba" id="manouba">Manouba</option>
            <option value="mornaguia" id="mornaguia">Mornaguia</option>
            <option value="ouedEllil" id="ouedEllil">Oued Ellil</option>
            <option value="tebourba" id="tebourba">Tebourba</option></select>`;
        document.getElementById("delegations").innerHTML = delegations;

    }


    else if (gouvernorat == "tunis") {
        var delegations = `
            <span><strong>Delegation</strong></span>
            <select name="" id="delegation">
            <option value="" id="">---</option>
            <option value="babBhar" id="babBhar">Bab Bhar</option>
            <option value="sijoumi" id="sijoumi">Sijoumi</option>
            <option value="sidiHassine" id="sidiHassine">Sidi Hassine</option>
            <option value="sidiElBechir" id="sidiElBechir">Sidi El Bechir</option>
            <option value="omraneSuperieur" id="omraneSuperieur">Omrane Superieur</option>
            <option value="omrane" id="omrane">Omrane</option>
            <option value="medina" id="medina">Medina</option>
            <option value="leKram" id="leKram">Le Kram</option>
            <option value="laMarsa" id="laMarsa">La Marsa</option>
            <option value="laGoulette" id="laGoulette">La Goulette</option>
            <option value="kabaria" id="kabaria">Kabaria</option>
            <option value="hrairia" id="hrairia">Hrairia</option>
            <option value="ezzouhour" id="ezzouhour">Ezzouhour</option>
            <option value="elTahrir" id="elTahrir">El Tahrir</option>
            <option value="elOuardia" id="elOuardia">El Ouardia</option>
            <option value="elMenzah" id="elMenzah">El Menzah</option>
            <option value="elKhadra" id="elKhadra">El Khadra</option>
            <option value="carthage" id="carthage">Carthage</option>
            <option value="bouhaira" id="bouhaira">Bouhaira</option>
            <option value="bardo" id="bardo">Bardo</option>
            <option value="babSouika" id="babSouika">Bab Souika</option></select>`;
        document.getElementById("delegation").innerHTML = delegations;

    }


}

function login() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var users = JSON.parse(localStorage.getItem("users") || "[]")
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            findedUser = users[i]
        }
    }

    if (findedUser) {
        localStorage.setItem("connectedUser", JSON.stringify(findedUser))
        if (findedUser.role == "client") {
            console.log(findedUser.role);
            location.replace("index.html")
        }
        else if (findedUser.role == "Professional") {
            location.replace("index.html")
        }
        else if (findedUser.role == "admin") {
            location.replace("dashboardadmin.html")
        }
    }
    else {
        document.getElementById("error").innerHTML = "Please Try Again"
        document.getElementById("error").style.color = 'red'
    }
}


function recherche() {
    var recherche = `
    <input type="text"placeholder="search" id="search_input" onkeypress="searchPr(event)">
    `
    document.getElementById("recherche").innerHTML = recherche


}

function searchPr(event) {
    // Recupération du code de la boutton 
    var key = event.keyCode;
    // si le code = 13 càd code bouton entrée
    if (key == 13) {
        // récupération de la valeur de la catégorie à rechercher
        var category = document.getElementById("search_input").value;
        // stockage de la categorie à rechercher
        localStorage.setItem("categoryToSearch", category);
        location.replace('result.html');
    }
}




function searchProductByCategory() {
    // Récupération de la categorie à partir de LS
    var category = localStorage.getItem('categoryToSearch');
    console.log(category)

    // Récupération des produits
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
    var resultTab = [];

    // parcours du tableau et filtrage des produits dans le tableau resultTab
    for (let i = 0; i < users.length; i++) {
        if (users[i].specialite == category) {
            resultTab.push(users[i]);
        }

    }
    console.log(resultTab);
    var shopProducts = `<div class="row">
                            <div id="shopProducts">`;
    // Affichage du résultat de la recherche
    for (let i = 0; i < resultTab.length; i++) {
        shopProducts += `

        
                    <div class="col-md-4 col-sm-6 wow fadeInUp" data-wow-duration="300ms" data-wow-delay="0ms">
                        <div class="media service-box">
						<div class="">
						  <div class="inner">              
                          <img class="img-fluid" style="height: 4cm;width: 4cm;" src="${resultTab[i].photoPro}"  alt="">
						  </div>
						</div> 
                                <p>${resultTab[i].firstName} ${resultTab[i].lastName}</p>
                                <p>${resultTab[i].gouvernorat}</p>
                                <p>${resultTab[i].delegation}</p>
                        </div>
                    </div><!--/.col-md-4-->

        `;
    }
    shopProducts += `</div>
                        </div>`
    //  envoie du code html du js vers html 
    document.getElementById("shopProducts").innerHTML = shopProducts;
}









function searchPro() {
    // Récupération des pro
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
    var resultTab = [];

    // parcours du tableau et filtrage des produits dans le tableau resultTab
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == "Professional") {
            resultTab.push(users[i]);
        }

    }
    console.log(resultTab);

    var usersPro = ``;
    // Affichage du résultat de la recherche
    for (let i = 0; i < resultTab.length; i++) {
        usersPro += `
                    <div class="col-md-4 col-sm-6 wow fadeInUp" data-wow-duration="300ms" data-wow-delay="0ms">
                        <div class="media service-box">
						<div class="">
						  <div class="inner">              
                          <img class="img-fluid" style="height: 4cm;width: 4cm;" src="${resultTab[i].photoPro}"  alt="">						  </div>
						</div> 
                                <p >${resultTab[i].firstName} ${resultTab[i].lastName}</p>
                                <p >${resultTab[i].gouvernorat} ${resultTab[i].delegation}</p>
                                <p >${resultTab[i].specialite}</p> 
                        </div>
                    </div><!--/.col-md-4-->
        `;
    }

    //  envoie du code html du js vers html 
    document.getElementById("usersPro").innerHTML = usersPro;
}
function mechanic() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var mechanicTab = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].specialite == "mechanic") {
            mechanicTab.push(users[i]);

        }
    }
    var usersPro = ``;
    // Affichage du résultat de la recherche
    for (let i = 0; i < mechanicTab.length; i++) {
        usersPro += `
                    <div class="col-md-4 col-sm-6 wow fadeInUp" data-wow-duration="300ms" data-wow-delay="0ms">
                        <div class="media service-box">
						<div class="">
						  <div class="inner">              
                          <img class="img-fluid" style="height: 4cm;width: 4cm;" src="${mechanicTab[i].photoPro}"  alt="">						  </div>
						</div> 
                            <div class="media-body">
                                <h4 class="media-heading" style="margin-left: 24mm;margin-top: 3mm;">${mechanicTab[i].firstName} ${mechanicTab[i].lastName}</h4>
                                <p style="margin-left: 24mm;margin-top: 3mm;">${mechanicTab[i].gouvernorat} ${mechanicTab[i].delegation}</p>
                                <p style="margin-left: 24mm;margin-top: 3mm;">${mechanicTab[i].specialite} </p>
                                <button type="submit" value="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick="save(${mechanicTab[i].id})" style="border-radius: 5px;margin-left:23mm">Reserve</button>
         
                            </div>
                        </div>
                    </div><!--/.col-md-4-->
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            
                            <div class="modal-body">
                            <input type="datetime-local" id="datetime"style="margin-left: 10mm;">
                                <button type="button" class="btn btn-primary" style="margin-left: 3.5cm;border-radius: 8px;margin-bottom: 10mm;margin-top: 9mm;"onClick="confirmSave()" ><strong><a style="color: white;">Confirm</a> </strong> </button>

                            
                                                            
                            </div>

                        </div>
                    </div>
                </div>`;
    }
    //  envoie du code html du js vers html 
    document.getElementById("usersPro").innerHTML = usersPro;
}


function confirmSave() {

    var reserveDate = document.getElementById("datetime").value
    var idRendezVous = JSON.parse(localStorage.getItem("idRendezVous") || 1);
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]")
    var idPro = JSON.parse(localStorage.getItem("idPro"))
    var rdv = {
        id: idRendezVous,
        idClient: connectedUser.id,
        idPro: idPro,
        reserveDate: reserveDate,
        statut: "en attente"

    }
    // recuperation des anciennes valeurs
    var rendezvous = JSON.parse(localStorage.getItem("rendezvous") || "[]");
    // ajout de l'objet user dans le tableau usersTab
    rendezvous.push(rdv);
    //  sauvegarde du tableau userTab (mise à jour)
    localStorage.setItem("rendezvous", JSON.stringify(rendezvous));
    localStorage.setItem("idRendezVous", idRendezVous + 1)
    location.reload();


}
function setHeader() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    if (connectedUser) {
        // fama utilisateur connecté
        if (connectedUser.role == "client") {
            // Links mta3 client
            var header = `
            <ul class="nav navbar-nav">
                        <li class="scroll active"><a href="index.html">Home</a></li> 
                        <li class="scroll"><a href="C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/ourService.html">Our Service</a></li>
                        <li class="scroll" data-toggle="modal" data-target="#exampleModal"> <a style="cursor: pointer;">professional</a></li>
                        <li class="scroll"><a href="file:///C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/dashboardclient.html">Hello ${connectedUser.firstName}</a></li> 
                        <li class="scroll"><a href="C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/signIn.html" onclick="logOut()">Logout</a></li>                        
                        <li class="nav-item">
                            <i class="fas fa-search" style="margin-top: 10mm;margin-left: 5mm;cursor: pointer;" onclick="recherche()" >
                            </i>      
                            <span id="recherche"></span>
                        
                        </li>
                    </ul>`

            document.getElementById("linksId").innerHTML = header;

        }
        if (connectedUser.role == "admin") {
            // Links mta3 admin
            var header = `
             <ul class="nav navbar-nav">
                         <li class="scroll active"><a href="index.html">Home</a></li> 
                         <li class="scroll"><a href="C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/ourService.html">Our Service</a></li>
                         <li class="scroll" > <a href="file:///C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/dashboardadmin.html"style="cursor: pointer;">Dashboard Admin</a></li>
                         <li class="scroll"><a>Hello ADMIN</a></li> 
                         <li class="scroll"><a href="C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/signIn.html" onclick="logOut()">Logout</a></li>                        
                         <li class="nav-item">
                             <i class="fas fa-search" style="margin-top: 10mm;margin-left: 5mm;cursor: pointer;" onclick="recherche()" >
                             </i>      
                             <span id="recherche"></span>
                         
                         </li>
                     </ul>`;

            document.getElementById("linksId").innerHTML = header;

        }
        else if (connectedUser.role == "Professional") {
            // Links mta3 Professional
            var header = `
        <ul class="nav navbar-nav">
                    <li class="scroll active"><a href="index.html">Home</a></li> 
                    <li class="scroll"><a href="C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/ourService.html">Our Service</a></li>
                    <li class="scroll" data-toggle="modal" data-target="#exampleModal"> <a style="cursor: pointer;" href="file:///C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/dashboardpro.html">Dashboard Pro</a></li>
                    <li class="scroll"><a>Hello ${connectedUser.firstName}</a></li> 
                    <li class="scroll"><a href="C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/signIn.html" onclick="logOut()">Logout</a></li>                        
                    <li class="nav-item">
                        <i class="fas fa-search" style="margin-top: 10mm;margin-left: 5mm;cursor: pointer;" onclick="recherche()" >
                        </i>      
                        <span id="recherche"></span>
                    
                    </li>
                </ul>`;
            document.getElementById("linksId").innerHTML = header;

        }
    }
    else {
        // mafamech (visiteur)
        var header = `
                        <ul class="nav navbar-nav">
                        <li class="scroll active"><a href="index.html">Home</a></li> 
                        <li class="scroll"><a href="#about">About Us</a></li>
                        <li class="scroll" data-toggle="modal" data-target="#exampleModal"> <a style="cursor: pointer;">professional</a></li>
                        <li class="scroll"><a href="C:/Users/BOUAZIZI/Desktop/projet/super-car-service-free-web-template/signIn.html" onclick="signUp()">Sign Up</a></li>                        
                        
                    </ul>`
        document.getElementById("linksId").innerHTML = header;
    }

}
function logOut() {
    localStorage.removeItem("connectedUser");
    location.reload();
}

function userEmail(email) {
    var users = JSON.parse(localStorage.getItem("users") || "[]")
    var exist = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            exist = true
        }

    }
    return exist

}
function save(id) {
    localStorage.setItem("idPro", id)
}



