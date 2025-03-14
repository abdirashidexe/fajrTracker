import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: 'some secret',      // used to sign the session id cookie
    cookie: { maxAge: 30000 },  // cookie expires after 30 seconds
    saveUninitialized: false    // if you have a login system, want to set to false. otherwise, going to generate a new session id EVERY SINGLE TIME you make a request to your server. you might not want that sometimes.
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let entries = [];

const PORT = 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/summary', (req, res) => {
    const entry = {
        fname: req.body.fname,
        date: req.body.date,
        difficulty: req.body.difficulty
    };

    entries.push(entry);
    console.log(entries);
    res.render('summary', {entries, entry});
});

app.post('/login', (req, res) => {
    console.log(req.sessionID);
    const { username, password } = req.body;
    if (user && passsword)
    {
        if(req.session.authenticated)
        {
            res.json(req.session);
        } else {
            if (password === '123')
            {
                req.session.authenticated = true;
                req.session.user  = {
                    user, password
                };
                res.json(req.session);
            } else
            {
                res.status(403).json({ msg: 'Bad Credentials!' });
            }
        }
    } else res.status(403).json({ msg: 'Bad Credentials!' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});