"use client";

import { createClient, LiveMap, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
  throttle: 16,
});

// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {};

type File = LiveObject<{
  title: string;
  description: string;
  url: string;
  state: "uploading" | "ready" | "deleting";
}>;

type Files = LiveMap<string, File>;

// Optionally, Storage represents the shared document that persists in the
// Room, even after all Users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  files: Files;
};

// Optionally, UserMeta represents static/readonly metadata on each User, as
// provided by your own custom auth backend (if used). Useful for data that
// will not change during a session, like a User's name or avatar.
export type UserMeta = {};

// Optionally, the type of custom events broadcast and listened to in this
// room. Must be JSON-serializable.
type RoomEvent = {};

export const {
  suspense: { RoomProvider, useMutation, useStorage },
  /* ...all the other hooks you’re using... */
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
