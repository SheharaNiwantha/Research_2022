let BASE_URL = "http://192.168.8.100:8080/Bin/pages/Bin/"; 

const Funtion_Auth = async(mail,pass) => {
    // var data = JSON.stringify({
    //     "email": mail,
    //     "password": pass
    // });

    var data = new FormData()
    data.append('email', mail);
    data.append('password', pass);

    var url = BASE_URL + "API/driverAuth.php";

    console.log("url "+url);

    try {
        let responce = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data
        });
        let code = responce.status;
        console.log("return "+responce.status);
        let responce_Values = await responce.json();
        var data = {
            "code" : code,
            "responce" : responce_Values
        }
        console.log("response value  "+responce_Values);
        console.log("datas "+JSON.stringify(data));

        return data;
    } catch (error) {
        console.log("error on funtion_auth : " + error);
    }
}

export {Funtion_Auth};