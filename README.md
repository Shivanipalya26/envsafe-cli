# envsafe-cli

 **Validate and manage your `.env` files easily** — ensure your team always has the right environment variables.

## ✨ Features

- ✅ Compare `.env` and `.env.example` to detect missing or extra keys  
- ⚡ Generate `.env.example` from `.env` in one command  
- 🛠 Prepare `.env` from `.env.example` with optional autofill  
- 📄 List environment keys with or without values  
- 🎨 Colorful terminal output for better readability   
- 🤖 GitHub Action integration for CI checks  

---

## 📦 Installation

```bash
npm install -g envsafe-cli
```

Or run without installing:

```bash
npx envsafe-cli
```

---

## 🚀 Usage

```bash
envsafe-cli                 Compare .env and .env.example
envsafe-cli --init          Generate .env.example from .env
envsafe-cli --prepare       Create .env from .env.example
    --fill=<value>          (optional) Fill values in .env (default is empty)
    --force                 Overwrite if file exists
envsafe-cli --list[=<file>] List env keys (defaults to .env)
    --with-values           Show values too
envsafe-cli --version       Show CLI version
envsafe-cli --help          Show help
```

---

## 🔍 Examples

### 1️⃣ Compare `.env` and `.env.example`
```bash
envsafe-cli
```
Output:
```
All env keys are present!
Missing required env var: PORT
```

---

### 2️⃣ Generate `.env.example` from `.env`
```bash
envsafe-cli --init
```

---

### 3️⃣ Prepare `.env` from `.env.example`
```bash
envsafe-cli --prepare
```

---

### 4️⃣ List env keys
From `.env`:
```bash
envsafe-cli --list
```
From `.env.example`:
```bash
envsafe-cli --list=.env.example
```
With values:
```bash
envsafe-cli --list=.env.example --with-values
```

---

## 📜 License
MIT © [Shivani Palya](https://github.com/Shivanipalya26)
