# gwik-cli

## Instalation

```bash
npm install -g gwik-cli
```

## Usage

New Application

```bash
gwik new app
```

New Module

```bash
gwik make:module user
```

New Request Body Validation

```bash
gwik make:request create-user --module=user
```

New Multipart Form Data Validation

```bash
gwik make:request update-photo --module=user --type=multipart
```

New Middleware

```bash
gwik make:middleware log
```
