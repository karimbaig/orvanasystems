export type RoomState = { light: number; curtains: number; tv: boolean; locked: boolean; alarm: boolean; temp: number };
export const roomScenes = [
  { id: "morning", label: ["Morning", "الصباح"], state: { light: 100, curtains: 0, tv: false, locked: false, alarm: false, temp: 22 } },
  { id: "evening", label: ["Evening", "المساء"], state: { light: 60, curtains: 100, tv: false, locked: false, alarm: false, temp: 23 } },
  { id: "relax", label: ["Relax", "استرخاء"], state: { light: 35, curtains: 100, tv: false, locked: true, alarm: false, temp: 24 } },
  { id: "cinema", label: ["Cinema", "سينما"], state: { light: 10, curtains: 100, tv: true, locked: true, alarm: false, temp: 22 } },
  { id: "leaving", label: ["Away", "خارج المنزل"], state: { light: 0, curtains: 100, tv: false, locked: true, alarm: true, temp: 26 } },
  { id: "night", label: ["Good night", "تصبح على خير"], state: { light: 0, curtains: 100, tv: false, locked: true, alarm: true, temp: 21 } },
] as const;

export function roomPhoto(state: RoomState) {
  return state.tv ? "cinema" : state.curtains >= 50 ? "evening" : "morning";
}