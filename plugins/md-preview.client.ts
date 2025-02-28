import { defineNuxtPlugin } from "#app";
import { MdPreview, MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import "md-editor-v3/lib/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("MdPreview", MdPreview);
  nuxtApp.vueApp.component("MdEditor", MdEditor);
});
