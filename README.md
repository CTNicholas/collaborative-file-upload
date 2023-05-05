https://user-images.githubusercontent.com/33033422/236485311-df7cbe18-3152-44a6-82cf-bdc32948673e.mp4

## Vercel Blob + Liveblocks demo

This demo shows you how to use [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) to upload images, with a [Liveblocks](https://liveblocks.io/) real-time collaborative app.

### Set up Liveblocks

- Install all dependencies with `npm install`
- Create an account on [liveblocks.io](https://liveblocks.io/dashboard)
- Copy your **public** key from the [dashboard](https://liveblocks.io/dashboard/apikeys)
- Create an `.env.local` file and add your **public** key as the `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` environment
  variable
- Run `npm run dev` and go to [http://localhost:3000](http://localhost:3000)
