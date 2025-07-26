# 🚀 Deploying a Web App to Azure using GitHub Actions + Publish Profile

This guide walks you through setting up an Azure Web App and deploying your Node.js or static website from GitHub using **GitHub Actions** and a **Publish Profile**.

---

## 🧱 Prerequisites

- Azure account
- GitHub account
- A Node.js or static website project pushed to a GitHub repo

---

## 🛠 Step 1: Create Azure Web App

1. Go to the [Azure Portal](https://portal.azure.com)
2. Search for **App Services** → Click **Create**
3. Choose the following:
   - **Runtime stack**: Node.js 22 LTS (or any runtime, even for static HTML)
   - **OS**: Linux or Windows (Linux preferred for simplicity)
   - **Region**: Closest to your users
   - **Plan**: Free (F1) or Basic (B1)
   - **App name**: Unique name (e.g., `mycomingsoonapp`)
4. Click **Review + Create** → then **Create**

---

## 🔓 Step 2: Enable Basic Authentication (One-Time Only)

> ⚠️ Required to generate the publish profile

1. After the app is created, go to the **App Service → Deployment Center**
2. Go to the **FTPS credentials** tab (or General settings)
3. Enable the toggle for **"Basic authentication"**
4. Return to **Overview tab** and click **"Get publish profile"**
5. This will download a `.PublishSettings` file

---

## 🔐 Step 3: Add the Publish Profile to GitHub Secrets

1. Open the downloaded `.PublishSettings` file in a text editor
2. Copy all its contents
3. Go to your GitHub repo → **Settings → Secrets and variables → Actions**
4. Click **New repository secret**
5. Set:
   - **Name**: `AZURE_PUBLISH_PROFILE`
   - **Value**: Paste the full contents of the file

---

## ⚙️ Step 4: Create GitHub Actions Workflow

Create this file in your repo:

**`.github/workflows/deploy.yml`**

```yaml
name: Deploy to Azure Web App

on:
  push:
    branches:
      - main  # or master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22.x'

      - name: Install dependencies
        run: npm install

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: YOUR_APP_NAME  # Replace with your actual Azure Web App name
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
          package: .
```

> Replace `YOUR_APP_NAME` with your Azure app's name (e.g., `mycomingsoonapp`)

---

## 🚀 Step 5: Push and Deploy

1. Make a commit and push to `main`:
   ```bash
   git add .
   git commit -m "Deploy to Azure"
   git push origin main
   ```
2. Go to GitHub → **Actions tab** → Watch the workflow deploy your app
3. Visit `https://your-app-name.azurewebsites.net` to see it live!

---

## ✅ Notes

- You can disable basic auth again after setup if your organization requires it.
- This method works even when FTP and user credentials are disabled.
- You can use this for Node.js apps, static HTML, or frontend frameworks (with build step).

---

## 📦 Example Repo Structure (for static or Node)

```
.
├── public/
│   └── index.html
├── server.js             # Optional, for Express apps
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 🤝 Need Help?

Feel free to raise issues or pull requests in this repo if you want to improve or customize the deploy pipeline.
