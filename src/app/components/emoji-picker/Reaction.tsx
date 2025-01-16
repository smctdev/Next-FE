import ReactionPicker, { EmojiClickData } from "emoji-picker-react";

export default function Reaction({
  children,
  onReactionSelect,
  isReactionPickerOpen,
  reactionPickerRef,
}: any) {
  const handleReactionClick = (emojiData: EmojiClickData, event: any) => {
    const emoji = emojiData.emoji;
    onReactionSelect(emoji);
  };

  return (
    <div ref={reactionPickerRef} className="relative">
      {isReactionPickerOpen && (
        <div className="absolute bottom-full mb-2 left-0">
          <ReactionPicker
            autoFocusSearch={false}
            reactionsDefaultOpen={true}
            onReactionClick={handleReactionClick}
          />
        </div>
      )}
      {children}
    </div>
  );
}
