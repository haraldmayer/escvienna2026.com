// src/lib/i18n.js
import de from "../i18n/de.json";
import el from "../i18n/el.json";
import en from "../i18n/en.json";
import es from "../i18n/es.json";
import fr from "../i18n/fr.json";
import it from "../i18n/it.json";
import ja from "../i18n/ja.json";
import nl from "../i18n/nl.json";
import pl from "../i18n/pl.json";
import sv from "../i18n/sv.json";
import tr from "../i18n/tr.json";

import shared from "../i18n/shared.json";

export const translations = {
  de,
  el,
  en,
  es,
  fr,
  it,
  ja,
  nl,
  pl,
  sv,
  tr,
};

export const sharedTranslations = shared;

export function getStaticPaths() {
  return [
    { params: { lang: "de" } },
    { params: { lang: "el" } },
    { params: { lang: "en" } },
    { params: { lang: "es" } },
    { params: { lang: "fr" } },
    { params: { lang: "it" } },
    { params: { lang: "ja" } },
    { params: { lang: "nl" } },
    { params: { lang: "pl" } },
    { params: { lang: "sv" } },
    { params: { lang: "tr" } },
  ];
}
