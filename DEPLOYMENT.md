# Deployment Guide

## 🚀 Deploying to GitHub Pages

This guide will help you deploy the Subway Pilot Chess game to GitHub Pages so that others can play it online.

### Prerequisites

1. A GitHub account
2. This repository forked or created in your GitHub account

### Steps to Deploy

1. **Navigate to your repository** on GitHub

2. **Go to Settings**
   - Click on the "Settings" tab in your repository

3. **Find the Pages section**
   - Scroll down to the "Pages" section in the left sidebar
   - Click on it to expand the GitHub Pages settings

4. **Configure GitHub Pages**
   - Under "Source", select "Deploy from a branch"
   - In the dropdown, select the branch you want to deploy (usually "main" or "master")
   - In the folder dropdown, select "/ (root)"
   - Click "Save"

5. **Wait for deployment**
   - It may take a few minutes for GitHub to deploy your site
   - Refresh the page after a minute or two

6. **Access your game**
   - Once deployed, you'll see a message like:
     "Your site is published at https://[your-username].github.io/subwaypilotchess/"
   - Visit this URL to play your game online!

### Custom Domain (Optional)

If you want to use a custom domain:

1. In the Pages settings, find the "Custom domain" section
2. Enter your custom domain
3. Follow GitHub's instructions to configure DNS settings with your domain provider

### Updating Your Deployment

To update your deployed game:

1. Make changes to your code locally
2. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Update game features"
   git push origin main
   ```
3. GitHub Pages will automatically redeploy your site
4. Changes will be live within a few minutes

### Troubleshooting

- **Page not found (404)**: Make sure your [index.html](file:///Users/Atom_1/subwaypilotchess/index.html) file is in the root of your repository
- **Styles not loading**: Check that all CSS file paths are correct
- **Game not working**: Verify that all JavaScript file paths are correct
- **Delay in updates**: GitHub Pages can take 1-10 minutes to update after pushes

### Notes

- GitHub Pages is a free service for hosting static websites
- Your game will be publicly accessible to anyone with the URL
- No server-side code is supported (only HTML, CSS, JavaScript)