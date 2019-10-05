let validator={};

validator.userName=function (name)
{
    //console.log("name :",name)
    if(!name.match(/^[a-zA-Z0-9\s]*$/))
    {
        let err=new Error("Invalid Product name");
        err.status=406;
        throw err;
    }
}

validator.userEmail=function (email)
{
    //console.log("email :",email)
    if(!email.match(/^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/))
    {
        let err=new Error("Invalid Email");
        err.status=406;
        throw err;
    }
}


validator.userPassword=function (password)
{
    //console.log("password :",password)
    if(!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/))
    {
        let err=new Error("Invalid Password ");
        err.status=406;
        throw err;
    }
}

validator.userPhone=function (phone)
{
    //console.log("phone :",phone)
    if(!phone.match(/^[1-9][0-9]{9}$/))
    {
        let err=new Error("Invalid Password ");
        err.status=406;
        throw err;
    }
}
module.exports = validator;