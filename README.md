 # BigLab 2

## Team name: Re Fusion

Team members:
* s294908 BOSCOLO FEDERICO
* s305035 CARDINALE KEVIN
* s303477 FERRO LORENZO
* s303880 GANCITANO PIETRO


## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering BigLabs and exam sessions.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |
| testuser@polito.it | password | Pietro |

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]


### **GET /films/:user**
**Retrieve the list of all the available films for an authenticated user.**

Sample request:

    GET /films/:user

Sample response:

    200 OK
    [
        {
            "id": 1
            "title": "Pulp Fiction"
            "favorite": 1,
            "watchDate": "2022-03-11",
            "rating": 5
        },
        {
            "id": 2
            "title": "21 Grams"
            "favorite": 0,
            "watchDate": "2022-03-17",
            "rating": 4
        },
        {
            "id": 3
            "title": "Star Wars"
            "favorite": 0,
            "watchDate": null,
            "rating": null
        }
    ]
Error responses: `401 Unauthorized` if user isn't logged in, `503 Service Unavailable`.

### **GET /films/favorites/:user**
**Retrieve a list of favorite films for an authenticated user.**

Sample request:

    GET /films/favorites/:user

Sample response:

    200 OK
    [
        {
            "id": 1
            "title": "Pulp Fiction"
            "favorite": 1,
            "watchDate": "2022-03-11",
            "rating": 5
        },
        {
            "id": 2
            "title": "21 Grams"
            "favorite": 0,
            "watchDate": "2022-03-17",
            "rating": 4
        }
    ]
Error responses: `401 Unauthorized` if user isn't logged in, `503 Service Unavailable`.

### **GET /films/best-rated/:user**
**Retrieve a list of best-rated films for an authenticated user.**

Sample request:

    GET /films/best-rated/:user

Sample response:

    200 OK
    [
        {
            "id": 1
            "title": "Pulp Fiction"
            "favorite": 1,
            "watchDate": "2022-03-11",
            "rating": 5
        }
    ]
Error responses: `401 Unauthorized` if user isn't logged in, `503 Service Unavailable`.

### **GET /films/seen-last-month/:user**
**Retrieve all films seen in the last month.**

Sample request:

    GET /films/seen-last-month/:user

Sample response:

    200 OK
    [
        {
            "id": 8
            "title": " Shrek 4 "
            "favorite": 1,
            "watchDate": "2022-06-10",
            "rating": 3
        }
    ]

Error responses: `401 Unauthorized` if user isn't logged in, `503 Service Unavailable`.

### **GET /films/unseen/:user**
**Retrieve all films that are yet to be watched.**

Sample request:

    GET /films/unseen/:user

Sample response:

    200 OK
    [
        {
            "id": 9
            "title": "Shrek 5"
            "favorite": 0,
            "watchDate": '',
            "rating": 0
        }
    ]

Error responses: `401 Unauthorized` if user isn't logged in, `503 Service Unavailable`.

### **GET /films/:id**
**Retrieve a specific film given its id.**

Sample request:

    GET /films/1

Sample response:

    200 OK
    [
        {
            "id": 1
            "title": "Fight club"
            "favorite": 1,
            "watchDate": "2022-05-01",
            "rating": 5
        }
    ]

Error responses: `401 Unauthorized` if user isn't logged in, `404 Not Found` in case of non-existing film, `503 Service Unavailable`.

### **POST /film**
**Create a new film.**

Sample request:

    POST /film
Sample request body:

    {
        "title": "Home Alone"
        "favorite": 1,
        "watchDate": "2003-12-25",
        "rating": 5,
        "user": 3
    }

Sample response:

    201 Created


Error responses: `401 Unauthorized` if user isn't logged in, `404 Not Found` in case of non-existing film, `503 Service Unavailable`.


### **PUT /film/:id**
**Edit an existing film.**

Sample request:

    PUT /film/3
Sample request body:

    {
        "title": "The Matrix: Resurrections"
        "favorite": 0,
        "watchDate": "2022-03-01",
        "rating": 1
    }

Sample response:

    200 OK


Error responses: `401 Unauthorized` if user isn't logged in, `404 Not Found` in case of non-existing film, `422 Unprocessable Entity` if object isn't well formed, `503 Service Unavailable`.

### **PUT /film/:id/favorite**
**Mark or unmark a specific film as favorite.**

Sample request:

    PUT /film/3/favorite

Sample response:

    200 OK


Error responses: `401 Unauthorized` if user isn't logged in, `404 Not Found` in case of non-existing film, `503 Service Unavailable`.

### **DELETE /films/:id**
**Delete the selected film.**

Sample request:

    DELETE /films/3

Sample response:

    204 No Content


Error responses: `401 Unauthorized` if user isn't logged in, `404 Not Found` in case of non-existing film, `503 Service Unavailable`.
