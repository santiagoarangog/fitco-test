<p align="center">
  <a href="https://www.fitcolatam.com/" target="blank"><img src="https://raw.githubusercontent.com/santiagoarangog/fitco-test/refs/heads/main/src/assets/images/fitco-logo.png" width="400" alt="FitCo Test Logo" /></a> 
</p>

# FitCo Test &bull; API

Welcome to the **API project** of the FitCo Test.

This project encompasses all aspects related to services provided by FitCo Test.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the Repository:**

```sh
git clone https://github.com/santiagoarangog/fitco-test.git
```

2. **Install Dependencies:**

```sh
npm install or npm i
```

2. **Start the VUE Virtual Server:**

```bash
npm run start
```

## Run with Watch
```bash
npm run start:dev
```

## Linter

To execute the linting command, run:

```bash
npm run lint
```

And finish with command, run: 
```bash
npm run start
```
With this, we will validate that everything is working correctly.


## Test Coverage

To assess test coverage:

1. **Generate Coverage Data:**
```bash
npm run test:cov 
```

3. **Generate HTML Reports:**
```bash
cd test
npx serve coverage/
```

---

## Running the API and Web Application Locally

This guide provides steps to build and serve the Api and web application locally with `http-server`.

### 1. **Build the Application for Web**

```bash
npm run build
```

### 2. **Install `http-server` (If Not Already Installed)**

Install `http-server` globally with `npm`:
```bash
npm install -g http-server
```

### 3. **Serve the Build Directory Using `http-server`**

Change to `build/web` and start `http-server`:
```bash
cd api/build
http-server -p 80 -a localhost
```

```bash
cd build
http-server -p 3000 -a localhost
```

### 4. **Access the Application in Your Browser**

Open:
```
http://localhost:80
```

&

```
http://localhost:3000
```

---

## Build
To generate the distributed version, execute the following command:

```bash
npm run build
```

## Postman Documentation

https://documenter.getpostman.com/view/35020357/2sAYJ6DfWz