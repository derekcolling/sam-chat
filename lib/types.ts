import type { InferUITool, UIMessage } from "ai";
import { z } from "zod";
import type { ArtifactKind } from "@/components/artifact";
import type { createDocument } from "./ai/tools/create-document";
import type { getWeather } from "./ai/tools/get-weather";
import type { getEvents } from "./ai/tools/get-events";
import type { requestSuggestions } from "./ai/tools/request-suggestions";
import type { updateDocument } from "./ai/tools/update-document";
import type { getParking } from "./ai/tools/get-parking";
import type { getBeachSafety } from "./ai/tools/get-beach-safety";
import type { saveUserProfileTool } from "./ai/tools/save-user-profile";
import type { Suggestion } from "./db/schema";

export type DataPart = { type: "append-message"; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type weatherTool = InferUITool<typeof getWeather>;
type eventsTool = InferUITool<typeof getEvents>;
type createDocumentTool = InferUITool<ReturnType<typeof createDocument>>;
type updateDocumentTool = InferUITool<ReturnType<typeof updateDocument>>;
type requestSuggestionsTool = InferUITool<
  ReturnType<typeof requestSuggestions>
>;
type parkingTool = InferUITool<typeof getParking>;
type beachSafetyTool = InferUITool<typeof getBeachSafety>;
type saveUserProfileToolType = InferUITool<ReturnType<typeof saveUserProfileTool>>;
export type ChatTools = {
  getWeather: weatherTool;
  getEvents: eventsTool;
  getParking: parkingTool;
  getBeachSafety: beachSafetyTool;
  createDocument: createDocumentTool;
  updateDocument: updateDocumentTool;
  requestSuggestions: requestSuggestionsTool;
  saveUserProfile: saveUserProfileToolType;
  // Client-side tool: output type declared explicitly since there is no server execute
  askVisitorQuiz: { input: { reason: string }; output: { success: boolean; result: string } };
};

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  suggestion: Suggestion;
  appendMessage: string;
  id: string;
  title: string;
  kind: ArtifactKind;
  clear: null;
  finish: null;
  "chat-title": string;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};
