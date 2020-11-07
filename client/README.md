## Front-end for SE2020

## Getting Started

Must have Node JS Version >= 10
Get Latest Version of NodeJS [here](https://nodejs.org/en/)

Install the Node Module

```bash
npm i or yarn install
```

```bash
Change PORT Name in .env if you want
```

## Run the development server:

```bash
Change API URL in  /src/api/axiosCreate and   Change Upload Folder Path in /src/utils/baseURL
```

```bash
npm start
# or
yarn start
```

Open [http://localhost:PORT](http://localhost:4000) with your browser to see the result.

## To Deploy

Must have Node JS Version >= 10
Get Latest Version of NodeJS [here](https://nodejs.org/en/)

## Step 1

```bash
cd se2020/client
```

## Step 2

```bash
npm install
```

## Step 3

```bash
Change API URL in  /src/api/axiosCreate and  Change Upload Folder Path in  /src/utils/baseURL
```

## Step 4

```bash
    npm run build
```

## Step 4

```bash
    npm install -g serve
```

## Step 5

```bash
  serve -s build -l 4000
```

Remark: the last command "4000" shown above will serve your static site on the port 4000
