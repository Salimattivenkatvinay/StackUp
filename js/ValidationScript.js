

function echeck(str) {

    var at = "@"
    var dot = "."
    var lat = str.indexOf(at)
    var lstr = str.length
    var ldot = str.indexOf(dot)
    if (str.indexOf(at) == -1) {
        alert("Invalid Email Id")
        return false
    }
    if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) {
        alert("Invalid Email Id")
        return false
    }

    if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) {
        alert("Invalid Email Id")
        return false
    }

    if (str.indexOf(at, (lat + 1)) != -1) {
        alert("Invalid Email Id")
        return false
    }

    if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
        alert("Invalid Email Id")
        return false
    }

    if (str.indexOf(dot, (lat + 2)) == -1) {
        alert("Invalid Email Id")
        return false
    }

    if (str.indexOf(" ") != -1) {
        alert("Invalid Email Id")
        return false
    }

    if (str.length > 35) {
        alert("Invalid Email Id")
        return false
    }
    if (str.indexOf(at) < 3) {
        alert("Invalid Email Id ")
        return false
    }
    if (str.indexOf(at) >= 30) {
        alert("Invalid Email Id")
        return false
    }
    return true
}






//Login Validation
function ValidateMobileForm() {
    debugger;
    var mobile = document.getElementById('ctl00_content1_txtMobileNo');
    var otp = document.getElementById('ctl00_content1_txtOTP');

    if (mobile.value == 0) {
        alert("Enter mobile number");
        mobile.focus();
        return false;
    }
    else if (mobile.value.length != 10) {
        alert("Enter 10 digits of mobile number");
        mobile.value = "";
        mobile.focus();
        return false;
    }
    else if (otp.value == 0) {
        alert("Enter OTP");
        otp.focus();
        return false;
    }
    else if (otp.value.length != 6) {
        alert("Enter 6 digits of OTP");
        otp.value = "";
        otp.focus();
        return false;
    }
    return true;
}

function sendOTP() {
    debugger;
    var i = 0;
    if (i == 1) {
        alert("OTP Has Been Sent");
        return false;
    }
    return true;
}
function ValidateLoginForm() {
    debugger;

    var userid = document.getElementById('ctl00_content1_Txt_uid');
    var SignIn = document.getElementById('ctl00_content1_imgbtnSignIn');
    if (userid.value == 0) {
        alert("Enter Email");
        userid.focus();
        return false;
    }
    if (echeck(userid.value) == false) {
        userid.focus();
        return false;
    }
    var pwd = document.getElementById('ctl00_content1_Txt_pwd');
    if (pwd.value == 0) {
        alert("Enter Password");
        pwd.focus();
        return false;
    }

    //if (username.length != 0 && pwd.length != 0) {
    //    SignIn.focus();
    //    return true;
    //}


    return true;
}




// validate Activation link send

function ValidateActivation() {
    var userName = document.getElementById('ctl00_content1_txtActUname');
    if (userName.value.length == 0) {
        alert("Enter Login Email Id");
        userName.focus();
        return false;
    }
    if (echeck(userName.value) == false) {
        userName.focus();
        return false;
    }
    return true;
}

function ValidateForgotPassword() {
    var userName = document.getElementById('ctl00_content1_txtuname');
    if (userName.value.length == 0) {
        alert("Enter Login Email Id");
        userName.focus();
        return false;
    }
    if (echeck(userName.value) == false) {
        userName.focus();
        return false;
    }
    return true;
}

// New User Registration Validations

function validateRegistrationForm() {
    var userName = document.getElementById('ctl00_content1_txtEmail');
    var str = userName.value;
    if (userName.value.length == 0) {
        alert("Enter Login Email Id");
        userName.focus();
        return false;
    }
    if (echeck(userName.value) == false) {
        userName.focus();
        return false;
    }
    if (str.indexOf('kapilchits') != -1) {
        alert("Please register with your personal email id");
        return false
    }
    var reuserName = document.getElementById('ctl00_content1_txtreEmail');
    if (reuserName.value.length == 0) {
        alert("Re-enter Login Email Id");
        reuserName.focus();
        return false;
    }
    if (echeck(reuserName.value) == false) {
        reuserName.focus();
        return false;
    }
    if (userName.value != reuserName.value) {
        alert("Login Email Id and Re-enter Login Email Id are not matching");
        reuserName.focus();
        return false;
    }
    var pwd = document.getElementById('ctl00_content1_txtPassword');
    if (pwd.value.length == 0) {
        alert("Enter Password");
        pwd.focus();
        return false;
    }
    if (pwd.value.length < 6) {
        alert("Password Should be Minimum Six characters");
        pwd.focus();
        return false;
    }

    var CPwd = document.getElementById('ctl00_content1_txtCPwd');
    if (CPwd.value.length == 0) {
        alert("Enter Confirm Password");
        CPwd.focus();
        return false;
    }
    if (pwd.value != CPwd.value) {
        alert("Password and Confirm Password are not matching");
        CPwd.focus();
        return false;
    }

    var Name = document.getElementById('ctl00_content1_txtSName');
    if (Name.value.length == 0) {
        alert("Enter Sur Name");
        Name.focus();
        return false;
    }
    var Name = document.getElementById('ctl00_content1_txtName');
    if (Name.value.length == 0) {
        alert("Enter Name");
        Name.focus();
        return false;
    }
    if (Name.value.length < 2) {
        alert("Name Should be Minimum 2 characters");
        Name.focus();
        return false;
    }
    var FatherName = document.getElementById('ctl00_content1_txtfathername');
    if (FatherName.value.length == 0) {
        alert("Enter Father Name or Husband Name");
        FatherName.focus();
        return false;
    }
    if (FatherName.value.length < 2) {
        alert("Father Name Should be Minimum 2 characters");
        FatherName.focus();
        return false;
    }
    var now = new Date().getFullYear();
    var yy = document.getElementById('ctl00_content1_ddlYear').value;
    years = Math.floor(now - yy);
    if (years < 18) {
        alert("Below 18 years are not eligible to register");
        return false;
    }

    var Address2 = document.getElementById('ctl00_content1_txtAddress2');
    if (Address2.value.length == 0) {
        alert("Enter Address");
        Address2.focus();
        return false;
    }
    if (Address2.value.length < 20) {
        alert("Address Should be Minimum 20 characters");
        Address2.focus();
        return false;
    }
    var Address = document.getElementById('ctl00_content1_txtAddress');
    if (Address.value.length == 0) {
        alert("Enter City");
        Address.focus();
        return false;
    }
    if (Address.value.length < 2) {
        alert("City Should be Minimum 2 characters");
        Address.focus();
        return false;
    }

    var state = document.getElementById('ctl00_content1_ddlState');
    if (state.value == "" || state.value == "Select State") {
        alert('Select State');
        state.focus();
        return false;
    }
    var District = document.getElementById('ctl00_content1_ddldistrict');
    if (District.value == "Select District") {
        alert('Select District');
        District.focus();
        return false;
    }

    var Pincode = document.getElementById('ctl00_content1_txtpincode');
    if (Pincode.value.length == 0 || Pincode.value.length < 6) {
        alert("Enter valid Pincode");
        Pincode.focus();
        return false;
    }

    var PhoneCode = document.getElementById('ctl00_content1_txtStd');
    var Phone = document.getElementById('ctl00_content1_txtPhone');
    var Mobile = document.getElementById('ctl00_content1_txtMobile');
    if (Phone.value.length == 0 || PhoneCode.value.length == 0) {
        if (Mobile.value.length < 10 || Mobile.value.length > 12) {
            alert("Enter valid Mobile Number");
            Mobile.focus();
            return false;
        }
    }
    var image = document.getElementById('ctl00_content1_txtCaptcha');
    if (image.value.length == 0) {
        alert("Enter Word Verification text as above");
        image.focus();
        return false;
    }
    var Hiddenwordverification = document.getElementById('ctl00_content1_HiddenwordVerification');
    var txtwordverification = document.getElementById('ctl00_content1_txtCaptcha');

    if (Hiddenwordverification.value != txtwordverification.value) {
        alert("Enter Correct Word Verification text as above");
        txtwordverification.focus();
        return false;
    }
    var chk = document.getElementById('ctl00_content1_chkterms');
    if (!chk.checked) {
        alert("Accept Terms and Conditions");
        chk.focus();
        return false;
    }
    return true;
}


// FOR ENTER ONLY NUMBERS

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


//FOR ENTER ONLY ALPHANUMERIC

function letternumber(e) {
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    keychar = String.fromCharCode(key);
    keychar = keychar.toLowerCase();
    if ((key == null) || (key == 0) || (key == 8) ||
            (key == 9) || (key == 13) || (key == 27))
        return true;

    else if ((("abcdefghijklmnopqrstuvwxyz0123456789").indexOf(keychar) > -1))
        return true;
    else
        return false;
}



//FOR ENTER ONLY NUMBER+COMMA

function Amount(e) {
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    keychar = String.fromCharCode(key);
    keychar = keychar.toLowerCase();
    if ((key == null) || (key == 0) || (key == 8) ||
            (key == 9) || (key == 13) || (key == 27))
        return true;

    else if (((",0123456789").indexOf(keychar) > -1))
        return true;
    else
        return false;
}

//FOR ENTER ONLY CHARECTER

function Charecter(e) {
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    keychar = String.fromCharCode(key);
    keychar = keychar.toLowerCase();
    if ((key == null) || (key == 0) || (key == 8) ||
            (key == 9) || (key == 13) || (key == 27))
        return true;

    else if ((("abcdefghijklmnopqrstuvwxyz ").indexOf(keychar) > -1))
        return true;
    else
        return false;
}


//AddNewChitValidations

function validateAddnewchitform() {
    debugger;
    var Branch = document.getElementById('ctl00_content1_ddlbranch');
    if (Branch.value == "Select") {
        debugger
        alert("Select Branch");
        Branch.focus();
        return false;
    }
    var grpcode = document.getElementById('ctl00_content1_ddlgroupcodes');
    debugger
    if (grpcode.value == "Select") {
        alert("Select Chit Code");
        grpcode.focus();
        return false;
    }
    var TicketNo = document.getElementById('ctl00_content1_txtticketno');
    if (TicketNo.value.length == 0) {
        alert("Enter Ticket Number");
        TicketNo.focus();
        return false;
    }
    var image = document.getElementById('ctl00_content1_txtaddnewCaptha');
    if (image.value.length == 0) {
        alert("Enter Word verification text as above");
        image.focus();
        return false;
    }
    var Hiddenwordverification = document.getElementById('ctl00_content1_hidaddnewCaptcha');

    var txtwordverification = document.getElementById('ctl00_content1_txtaddnewCaptha');
    if (Hiddenwordverification.value != txtwordverification.value) {
        alert("Enter Correct Word Verification text as above");
        txtwordverification.focus();
        return false;
    }
    return true;
}


// VALIDATION FOR ENROLE NEW CHIT  PAGE

function ValidateEnroleNewChitPage() {
    debugger;
    var name = document.getElementById('ctl00_content1_txtName');
    if (name.value.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "").length == 0) {
        alert("Enter Your Name");
        name.focus();
        return false;
    }
    else {
        if (name.value.length <= 2) {
            alert("Name Should be Minimum 2 characters");
            name.focus();
            return false;
        }
    }

    //var savingamount = document.getElementById('ctl00_content1_txtsavingamount');
    //var savingmonths = document.getElementById('ctl00_content1_ddlsavingmonths');
    var sumassured = document.getElementById('ctl00_content1_ddlsumassured');

    if (sumassured.value == "Select Chit Value") {
        alert("Select Chit Value");
        sumassured.focus();
        return false;
    }

    var Branch = document.getElementById('ctl00_content1_ddlbranch');
    if (Branch.value == "Select Nearest Branch") {
        alert("Enter Nearest Branch");
        Branch.focus();
        return false;
    }

    //if (savingamount.value.length == 0 && savingmonths.value == "Select") {
    //    alert("Enter Saving Amount or Select Saving Months");
    //    savingamount.focus();
    //    return false;
    //}
    //if (savingamount.value.length > 0) {
    //    if (savingamount.value.length < 4) {
    //        alert("Enter Saving Amount must be greater than Three digits");
    //        savingamount.focus();
    //        return false;
    //    }
    //}

    //var ContactAddress = document.getElementById('ctl00_content1_txtcontactAddress');
    //if (ContactAddress.value.length == 0) {
    //    alert("Enter Location");
    //    ContactAddress.focus();
    //    return false;
    //}

    var Contactnumber = document.getElementById('ctl00_content1_txtcontactnumber');
    if (Contactnumber.value.length == 0) {
        alert("Enter Contact Number");
        Contactnumber.focus();
        return false;
    }
    if (Contactnumber.value.length < 10) {
        alert("Enter Valid Contact Number");
        Contactnumber.focus();
        return false;
    }

    var Email = document.getElementById('ctl00_content1_txtmail');
    if (Email.value.length == 0) {
        alert("Enter Email Id");
        Email.focus();
        return false;
    }

    if (echeck(Email.value) == false) {
        Email.focus();
        return false;
    }


    var image = document.getElementById('ctl00_content1_CaptchaInput');
    if (image.value.length == 0) {
        alert("Enter the above verification code");
        // image.value = "";
        image.focus();
        return false;
    }
    //var Hiddenwordverification = document.getElementById('ctl00_content1_HiddenwordVerification');
    var Hiddenwordverification = document.getElementById("CaptchaDiv").innerHTML
    var txtwordverification = document.getElementById('ctl00_content1_CaptchaInput');
    if (Hiddenwordverification != txtwordverification.value) {
        debugger;
        alert("Enter Correct Number Verification text as above");
        txtwordverification.value = "";
        txtwordverification.focus();

        return false;
    }

    return true;
}

function ValidateJoinNewChitPage() {
    debugger;
    var name = document.getElementById('txtName');
    if (name.value.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "").length == 0) {
        alert("Enter Your Name");
        name.focus();
        return false;
    }
    else {
        if (name.value.length <= 2) {
            alert("Name Should be Minimum 2 characters");
            name.focus();
            return false;
        }
    }

    //var savingamount = document.getElementById('ctl00_content1_txtsavingamount');
    //var savingmonths = document.getElementById('ctl00_content1_ddlsavingmonths');
    var sumassured = document.getElementById('ddlsumassured');

    if (sumassured.value == "Select Chit Value") {
        alert("Select Chit Value");
        sumassured.focus();
        return false;
    }

    var Branch = document.getElementById('ddlbranch');
    if (Branch.value == "Select Nearest Branch") {
        alert("Enter Nearest Branch");
        Branch.focus();
        return false;
    }

    //if (savingamount.value.length == 0 && savingmonths.value == "Select") {
    //    alert("Enter Saving Amount or Select Saving Months");
    //    savingamount.focus();
    //    return false;
    //}
    //if (savingamount.value.length > 0) {
    //    if (savingamount.value.length < 4) {
    //        alert("Enter Saving Amount must be greater than Three digits");
    //        savingamount.focus();
    //        return false;
    //    }
    //}

    //var ContactAddress = document.getElementById('txtcontactAddress');
    //if (ContactAddress.value.length == 0) {
    //    alert("Enter Location");
    //    ContactAddress.focus();
    //    return false;
    //}

    var Contactnumber = document.getElementById('txtcontactnumber');
    if (Contactnumber.value.length == 0) {
        alert("Enter Contact Number");
        Contactnumber.focus();
        return false;
    }
    if (Contactnumber.value.length < 10) {
        alert("Enter Valid Contact Number");
        Contactnumber.focus();
        return false;
    }

    var Email = document.getElementById('txtmail');
    if (Email.value.length == 0) {
        alert("Enter Email Id");
        Email.focus();
        return false;
    }

    if (echeck(Email.value) == false) {
        Email.focus();
        return false;
    }


    var image = document.getElementById('CaptchaInput');
    if (image.value.length == 0) {
        alert("Enter the above verification code");
        image.focus();
        return false;
    }
    //var Hiddenwordverification = document.getElementById('ctl00_content1_HiddenwordVerification');
    var Hiddenwordverification = document.getElementById("CaptchaDiv").innerHTML
    var txtwordverification = document.getElementById('CaptchaInput');
    if (Hiddenwordverification != txtwordverification.value) {
        alert("Enter Correct Number Verification text as above");
        txtwordverification.focus();
        return false;
    }

    return true;
}


//SUGGESTIONS FORM ENROLE NEW CHIT VALIDATIONS

function ValidateSuggestionsEnrole() {
    var Suggestionstype = document.getElementById('ctl00_content1_ddlsuggestiontype');
    if (Suggestionstype.value == "Select") {
        alert("Select Category");
        Suggestionstype.focus();
        return false;
    }
    var name = document.getElementById('ctl00_content1_txtName');
    if (name.value.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "").length == 0) {
        alert("Enter Your Name");
        name.focus();
        return false;
    }
    else {
        if (name.value.length <= 2) {
            alert("Enter Your Name Properly");
            name.focus();
            return false;
        }
    }
    var Branch = document.getElementById('ctl00_content1_ddlbranch');
    if (Branch.value == "Select Nearest Branch") {
        alert("Enter Nearest Branch");
        Branch.focus();
        return false;
    }
    var savingamount = document.getElementById('ctl00_content1_txtsavingamount');
    var savingmonths = document.getElementById('ctl00_content1_ddlsavingmonths');
    var sumassured = document.getElementById('ctl00_content1_ddlsumassured');

    if (sumassured.value == "Select Chit Value") {
        alert("Select Chit Value");
        sumassured.focus();
        return false;
    }

    if (savingamount.value.length == 0 && savingmonths.value == "Select") {
        alert("Enter Saving Amount or Select Saving Months");
        savingamount.focus();
        return false;
    }
    if (savingamount.value.length > 0) {
        if (savingamount.value.length < 4) {
            alert("Enter Saving Amount must be greater than Four digits");
            savingamount.focus();
            return false;
        }
    }
    var Email = document.getElementById('ctl00_content1_txtmail');
    if (Email.value.length == 0) {

    }
    else {
        if (echeck(Email.value) == false) {
            Email.focus();
            return false;
        }
    }

    var Contactnumber = document.getElementById('ctl00_content1_txtcontactnumber');
    if (Contactnumber.value.length == 0) {
        alert("Enter Contact Number");
        Contactnumber.focus();
        return false;
    }
    if (Contactnumber.value.length < 10) {
        alert("Enter Valid Contact Number");
        Contactnumber.focus();
        return false;
    }
    //var ContactAddress = document.getElementById('ctl00_content1_txtcontactAddress');
    //if (ContactAddress.value.length == 0) {
    //    alert("Enter Contact Address");
    //    ContactAddress.focus();
    //    return false;
    //}
    var image = document.getElementById('ctl00_content1_txtCaptcha');
    if (image.value.length == 0) {
        alert("Enter Word Verification text as above");
        image.focus();
        return false;
    }
    var Hiddenwordverification = document.getElementById('ctl00_content1_HiddenwordVerification');
    var txtwordverification = document.getElementById('ctl00_content1_txtCaptcha');
    if (Hiddenwordverification.value != txtwordverification.value) {
        alert("Enter Correct Word Verification text as above");
        txtwordverification.focus();
        return false;
    }

    return true;
}


//SUGGESTIONS FORM VALIDATIONS


function ValidateSuggestions() {

    var name = document.getElementById('ctl00_content1_txtName');
    if (name.value.length <= 2) {
        alert("Enter Your Name ");
        name.focus();
        return false;
    }

    var Branch = document.getElementById('ctl00_content1_ddlbranch');
    if (Branch.value == "Select Nearest Branch") {
        alert("Enter Nearest Branch");
        Branch.focus();
        return false;
    }

    var Email = document.getElementById('ctl00_content1_txtemail');
    if (Email.value.length == 0) {
        alert("Enter Email ID");
        Email.focus();
        return false;
    }
    if (echeck(Email.value) == false) {
        Email.focus();
        return false;
    }
    var MobileNo = document.getElementById('ctl00_content1_txtmobileno');
    if (MobileNo.value.length == 0) {
        alert("Enter Mobile Number");
        MobileNo.focus();
        return false;
    }
    if (MobileNo.value.length < 10 || MobileNo.value.length > 12) {
        alert("Enter valid Mobile Number");
        MobileNo.focus();
        return false;
    }

    var Comments = document.getElementById('ctl00_content1_txtcomments');
    if (Comments.value.length == 0) {
        alert("Enter Comments");
        Comments.focus();
        return false;
    }
    var image = document.getElementById('ctl00_content1_txtCaptcha');
    if (image.value.length == 0) {
        alert("Enter Word Verification text as above");
        image.focus();
        return false;
    }
    var Hiddenwordverification = document.getElementById('ctl00_content1_HiddenwordVerification');
    var txtwordverification = document.getElementById('ctl00_content1_txtCaptcha');
    if (Hiddenwordverification.value != txtwordverification.value) {
        alert("Enter Correct Word Verification text as above");
        txtwordverification.focus();
        return false;
    }

    return true;
}


// VALIDATE EDIT USER DETAILS

function ValidateeditUserDetails() {
    debugger;
    var name = document.getElementById('ctl00_content1_txtname');
    var fathername = document.getElementById('ctl00_content1_txtfathername');
    var address = document.getElementById('ctl00_content1_txtaddress');
    var state = document.getElementById('ctl00_content1_ddlstate');
    var district = document.getElementById('ctl00_content1_ddldistrict');
    var city = document.getElementById('ctl00_content1_txtcity');
    var pincode = document.getElementById('ctl00_content1_txtpincode');
    var mobileno = document.getElementById('ctl00_content1_txtmobileno');
    var captcha = document.getElementById('ctl00_content1_txtCaptcha');

    if (name.value == "") {
        alert('Enter Your Name');
        name.focus();
        return false;
    }
    else if (name.value.length < 2) {
        alert('Name Should be Minimum 2 characters');
        name.focus();
        return false;
    }
    if (fathername.value == "") {
        alert('Enter Father Name or Husband Name');
        fathername.focus();
        return false;
    }
    else if (fathername.value.length < 2) {
        alert('Father Name Should be Minimum 2 characters');
        fathername.focus();
        return false;
    }
    var now = new Date().getFullYear();
    var yy = document.getElementById('ctl00_content1_ddlYear').value;
    years = Math.floor(now - yy);
    if (years < 18) {
        alert("Age Must Be Above 18 Years");
        return false;
    }
    if (address.value == "") {
        alert('Enter address');
        address.focus();
        return false;
    }
    else if (address.value.length < 20) {
        alert('Address Should be Minimum 20 characters');
        address.focus();
        return false;
    }
    if (state.value == "" || state.value == "Select State") {
        alert('Please Select State');
        state.focus();
        return false;
    }
    if (district.value == "" || district.value == "Select District") {
        alert('Please Select District');
        district.focus();
        return false;
    }
    if (city.value == "") {
        alert('Enter City');
        city.focus();
        return false;
    }
    else if (city.value.length < 2) {
        alert('City Should be Minimum 2 characters');
        city.focus();
        return false;
    }
    if (pincode.value == "") {
        alert('Enter Pincode');
        pincode.focus();
        return false;
    }
    if (mobileno.value == "") {
        alert('Enter Mobile Number');
        mobileno.focus();
        return false;
    }
    if (mobileno.value.length < 10) {
        alert('Mobile Number is Not Valid');
        mobileno.focus();
        return false;
    }
    if (captcha.value == "") {
        alert('Enter Word Verification text as above');
        captcha.focus();
        return false;
    }
    var Hiddenwordverification = document.getElementById('ctl00_content1_HiddenwordVerification');
    var txtwordverification = document.getElementById('ctl00_content1_txtCaptcha');
    if (Hiddenwordverification.value != txtwordverification.value) {
        alert("Enter Correct Word Verification text as above");
        txtwordverification.focus();
        return false;
    }

    return true;
}

/// Validation Script for Change Password

function ValidateAdminLogin() {
    var oldpwd = document.getElementById('ctl00_content1_txtoldpassword');
    var pwd = document.getElementById('ctl00_content1_txtnewpassword');
    if (oldpwd.value.length == 0) {
        alert("Enter Old Password");
        oldpwd.focus();
        return false;
    }
    if (oldpwd.value.length < 6) {
        alert("Password Should be Minimum Six characters");
        oldpwd.focus();
        return false;
    }
    if (pwd.value.length == 0) {
        alert("Enter Password");
        pwd.focus();
        return false;
    }
    if (pwd.value.length < 6) {
        alert("Password Should be Minimum Six characters");
        pwd.focus();
        return false;
    }

    var CPwd = document.getElementById('ctl00_content1_txtconfirmpassword');
    if (CPwd.value.length == 0) {
        alert("Enter Confirm Password");
        CPwd.focus();
        return false;
    }
    if (pwd.value != CPwd.value) {
        alert("New Password and Confirm Password are not matching");
        CPwd.focus();
        return false;
    }
    return true;
}

/// Validation Script for Admin Login

function ValidateChangePassword() {
    debugger;
    //var uid = document.getElementById('ctl00_content1_Txt_uid');
    var oldPassword = document.getElementById('ctl00_content1_txtoldpassword');
    //var RefNo = document.getElementById('<%rbInward.ClientID%>');
    //var pwd = document.getElementById('ctl00_content1_Txt_pwd');
    var newPassword = document.getElementById('ctl00_content1_txtnewpassword');
    var confirmPassword = document.getElementById('ctl00_content1_txtconfirmpassword');
    if (oldPassword.value.length == 0) {
        alert("Enter Old Password");
        oldPassword.focus();
        return false;
    }
    if (newPassword.value.length == 0) {
        alert("Enter New Password");
        newPassword.focus();
        return false;
    }
    else if (newPassword.value.length < 6) {
        alert("New Password Should be Minimum Six characters");
        newPassword.focus();
        return false;
    }

    if (confirmPassword.value.length == 0) {
        alert("Enter Confirm Password");
        confirmPassword.focus();
        return false;
    }

    if (newPassword.value != confirmPassword.value) {
        alert("New Password and Confirm Password are not matching");
        confirmPassword.focus();
        return false;
    }

    return true;
}


function goBack() {
    debugger;
    window.history.back()
}
function AlertforPayment() {
    debugger;
    alert("Please enter minimum total amount of 50 Rupees");

}