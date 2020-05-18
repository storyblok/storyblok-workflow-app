<p align="center">
  <h1 align="center">Storyblok Stage Kanban App</h1>
</p>

![App preview image](./screenshoot.png)

> Kanban app to change the Workflow Stage from a story

## Development

Firstly, to create an app on Storyblok, you need to enter to the [our partner program](https://www.storyblok.com/partners).

### Installation

``` bash
# clone this repository
$ git clone https://github.com/storyblok/storyblok-workflow-app.git

# Enter the directory
$ cd storyblok-workflow-app

# install dependencies
$ yarn install # npm install
```

### Configure the the Oauth2 module

To run the project in development, firstly, you need to configure our `nuxt-auth` module ([check out the documentation](https://github.com/storyblok/nuxt-auth)) with your oauth credentials (these credentials are available in the app settings area of Storyblok).

Rename the file `.env-example` to `.env` and fill out the variables.

~~~text
CONFIDENTIAL_CLIENT_ID="Id from Storyblok App"
CONFIDENTIAL_CLIENT_SECRET="Secret from Storyblok App"
CONFIDENTIAL_CLIENT_REDIRECT_URI=https://YOUR_ID.ngrok.io/auth/callback
~~~

### Setup an SSL tunnel

We recommend you to use [ngrok](https://ngrok.com/) to create a tunel to your development environment. In you terminal, execute:

```bash
$ ngrok http 3000 # the 3000 port is the Nuxt default
```

Use the urls you get from ngrok to fill out the following fields in the app settings area in Storyblok:

* `Url to your app` field: `https://YOUR_ID.ngrok.io/auth/connect/storyblok`
* `Oauth2 callback url` field: `https://YOUR_ID.ngrok.io/auth/callback` (this URL must be include in `redirect_uri` property in `nuxt-auth` module)

### Check the App in Development

After all, start the Nuxt dev server:

```bash
$ yarn dev # npm run dev
```

Now click the "Open" button in the app settings area of your app in Storyblok to install the app on a space.

### Deploy

This app is like any other Nuxt app, so, the deploy is the same ([check the Nuxt documentation about this](https://nuxtjs.org/guide/commands#production-deployment)). **The only thing that you must be concern, is the URLs configurations**.

---

<p align="center">
  <h5 align="center">Powered by <a href="https://www.storyblok.com/" title="link to the Storyblok website">Storyblok</a></h5>
</p>
