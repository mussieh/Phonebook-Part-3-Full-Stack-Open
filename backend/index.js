const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("request-object", function (req, res) {
    if (req.body) {
        const body = req.body;
        return JSON.stringify({
            name: body.name,
            number: body.number,
        });
    }
});

app.use(morgan(":method :url :status :response-time ms :request-object"));

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/info", (request, response) => {
    response.send(
        `Phonebook has info for ${persons.length} people <br /> ${new Date()}`
    );
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

const generateId = () => {
    return Math.floor(Math.random() * 1000000) + 1;
};

app.put("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);

    const body = request.body;

    if (!body.number) {
        return response.status(400).json({
            error: "Number missing",
        });
    }

    const person = persons.find((person) => person.id === id);
    persons = persons.filter((person) => person.id !== id);
    person.number = body.number;
    persons = persons.concat(person);

    response.json(person);
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "Name missing",
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: "Number missing",
        });
    }

    const personExists = Boolean(
        persons.filter(
            (person) => person.name.toLowerCase() === body.name.toLowerCase()
        ).length
    );

    if (personExists) {
        return response.status(400).json({
            error: "The name already exists in the phone book",
        });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);

    response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
