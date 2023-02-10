/* Email Sender */
let emailMessage = $("textarea, #message").val();
let emailAddress = $("#emailAddress").val();

// Open email client
$("#emailSubmit").click(function () {
    
    window.open("mailto:asiegbuemmanuelekee@gmail.com?subject=Inquiries&body=" + emailMessage);
    //document.location = "mailto:" + emailAddress + "?subject=Inquiries&body=" + emailMessage + "";
});