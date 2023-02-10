/* Email Sender */

let form_id = "email_form";
let sendButton = $("#emailSubmit");


let data = {
    "access_token": "qrvr2vi6pdj4ps5so1kli56z"
};

function onSuccess() {
    // Remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

function onError(error) {
    // Remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

function send() {
    sendButton.val('Sending…');
    sendButton.prop('disabled',true);

    let subject = $("#emailAddress").val();
    let message = $("#message").val();
    data['subject'] = subject;
    data['text'] = message;

    $.post('https://postmail.invotes.com/send',
        data,
        onSuccess
    ).fail(onError);

    return false;
}

sendButton.on('click', send);

let _form = $("#" + form_id);
_form.submit(function( event ) {
    event.preventDefault();
});