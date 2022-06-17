import 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
emailjs.init("YrFOavxX81MtHW9A7");
window.send = function (e){
    const email  = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = document.getElementById('subject').value;
    const name = document.getElementById('name').value;

    const params = {
        'user_name' : name,
        user_email : email,
        message : message,
        subject : subject,
        to_name : 'Gilbert'
    }

    console.log(params)
    
    emailjs.send('service_smm9jhp', 'template_7900ea7',params)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       alert('Message Sent')
       window.location.href='/Landing-Page'
    }, function(error) {
       console.log('FAILED...', error);
    });
}