"use strict";

fetch(`${env.baseUrl}/user`)
  .then((response) => response.json())
  .then((user) => {
    document.getElementById("nimi").innerHTML = user.Username;
    document.getElementById("email").innerHTML = user.email;
    document.querySelector('input[name="UserID"]').value = user.UserID;

    if (user.Cars.length > 0) {
      const myLatestCarImage = user.Cars[user.Cars.length - 1].Image;
      // Tämä linkki pitää vaihtaa sitten serverin osoitteeseen!
      document.getElementById("pic").src = "../../uploads/" + myLatestCarImage;
    } else {
      document.getElementById("pic").src = "images/car2.jpeg";
      document.getElementById("carSubmit").style.display = "block";
      document.getElementById("submitCar").style.display = "block";
    }
  });
