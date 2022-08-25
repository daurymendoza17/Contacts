const { Router } = require('express');
const router = Router();
const adm = require('firebase-admin');

0

var serviceAccount = require("../../final-project-567ed-firebase-adminsdk-kgo4y-5aa3f4d6b4.json")

adm.initializeApp({
   credential: adm.credential.cert(serviceAccount),
   databaseURL: 'https://final-project-567ed-default-rtdb.firebaseio.com/'
});

const db = adm.database();


router.get('/', (req, res) => {
  db.ref('Contacts').once('value', (snapshot) => {
     const save = snapshot.val();
     res.render('index', {Contacts: save});


  });
  

});

router.post('/nuevo', (req, res) => {
      console.log(req.body);

      const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
       };
      db.ref('Contacts').push(newContact);
      res.redirect('/');

});

router.get('/delete-contact/:id', (req, res) => {
db.ref('Contacts/' + req.params.id).remove();
  res.redirect('/');

});

router.get('/update-contact/:id', (req, res) => {
  db.ref('Contacts/' + req.params.id).update();
    res.redirect('/');
  
  });

module.exports = router;