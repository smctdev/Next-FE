export default function PlayMessageTone() {
  const audio = new Audio("/media/message-ringtone.mp3");
  audio.play().catch((e) => console.log("Playback failed:", e));
  return;
}
